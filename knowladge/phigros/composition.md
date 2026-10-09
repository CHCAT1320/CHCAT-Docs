---
title: BlockArea 叠加与样式总表
---

# BlockArea 叠加与样式总表

本文档枚举**块的所有形态**（普通 / 减块 × 五个 `BlockPhase` 状态，外加 `Residual` 过渡）以及**它们相互叠加时的表现**，
便于复现和编辑器做可视化。结论取自 `libil2cpp.so` 反汇编与解压出的真实 GLSL
（渲染细节见 [`render.md`](./render)、状态见 [`states.md`](./states)、行为见 [`behavior.md`](./behavior)）。

## 1 两个正交维度

块的样式由**两个正交维度**共同决定：

| 维度 | 取值 | 来源 |
| --- | --- | --- |
| **性质** | 普通块 / 减块 | `BlockArea.isSubtract`（`0x30`） |
| **状态** | `HiddenBefore` / `Disabled` / `Ready` / `Active` / `Residual` / `HiddenAfter` | 由四个时间点切分（见 [`states.md`](./states)） |

所以「一个块在某一时刻」共有 `2 × 6 = 12` 种组合（`Residual` 复用 `Disabled` 外观）。

## 2 单块样式矩阵（性质 × 状态）

| 状态 | 普通块（`isSubtract=false`） | 减块（`isSubtract=true`） |
| --- | --- | --- |
| `HiddenBefore` | 移出画 `(1000,0,0)`，不渲染 | 同左 |
| `Disabled` | 显示；α 淡入到 `1`；走 `disabledLayer` | 显示；α=**0.1**（近乎不可见）；走 `disabledLayer` |
| `Ready` | 呼吸脉冲（`readyLayer`→`enabledLayer`） | 同左（**减块也有预备态**） |
| `Active` | **生效**：填充+火花+边缘+辉光；参与命中 | **生效**：同为可视块，但α=0.1；参与命中且**抵消**普通块 |
| `Residual` | 已失效、可见，退回 `disabledLayer` 外观 | 同左 |
| `HiddenAfter` | 移出画；延时销毁 | 同左 |

::: tip 减块是「另一种渲染路径」而非「透明块」
`isSubtract` 决定三件事（[`data.md`](./data)）：
1. 走减块专用相机 → `subtractBlockRT`（普通块走 `normalBlockRT`）；
2. `SubtractBlockPostProcessor` 场景色扣除链；
3. 命中区里对普通块做**抵消**（奇偶，见 §6）。
:::

## 3 状态之间的「唯一可见性」层级

同一块在任一时刻只处于**一个**状态；渲染时只有部分状态进入画面：

| 送入 RT 的遮罩 | 对应状态 | 相机（layer） |
| --- | --- | --- |
| `normalBlockRT` / `subtractBlockRT` | `Active` | 198 / 199 |
| `disabledNormalBlockRT`（禁用+预备合并） | `Disabled` + `Ready` | 196 / 197 |
| `disabledNormalReadyBlockRT`（纯预备） | `Ready` | 195 / 201 |
| `touchBlockRT` | 触摸悬停 | 200 |

`Unlit/ActiveBlock` 是**汇总着色器**：一次性读取上述所有 RT + `sceneColorRT` + `effectRT`，
按分支合成，取代了「每状态一个着色器」。

## 4 多块叠加：普通块之间

- `Unlit/BlockSprite` 的固定混合是 **`Blend SrcAlpha, One`（加性）**（`render.md` 管线状态表），
  因此多个**普通块**重叠时，它们在同一张 `normalBlockRT` 上**累加**（不是取 `max`）。
- 普通块之间**没有相互抵消**——累加后由后续 `BlockCompose`/`ActiveBlock` 统一处理。
- 视觉上重叠区更亮/更实，边缘/辉光也会叠加。

## 5 多块叠加：普通块 ⊕ 减块（核心）

普通块与减块在 `BlockCompose` 里做**差**合成：

```
BlockCompose prog1（生效态）：  out = abs(subtractMask − normalMask)
BlockCompose prog2（禁用/预备）：out = abs(ds.x·ds.y − dn.x)
```

含义：**减块从普通块覆盖里「挖洞」**（重叠处相消），孤立区域则保留自身。

| 空间关系 | 表现 |
| --- | --- |
| 普通块单独（`n` 有值，`s=0`） | `abs(0−n)=n` → 正常生效体 |
| 减块单独（`s` 有值，`n=0`） | `abs(s−0)=s` → **同样呈现为一块生效体**（靠 α=0.1 显淡） |
| 普通 ∩ 减块 | 重叠区 `abs(s−n)` **相消**，边缘处残留一圈 |
| 多个减块 | 在 `subtractBlockRT` 上先累加，再与普通块相减 |

::: danger 减块「挖洞」是**渲染近似**，且未经游戏内逐帧验证
9 个 shader 里**没有**独立的「场景色扣除」实现，唯一的合成就是上面的 `abs(s−n)`。
因此：
- **孤立**的减块在画面上与普通生效块基本一致（靠 α=0.1 才显得淡）；
- 只有**与普通块重叠**时才真正「抵消」。

【实测】c9s 语料的 4 个减块里，**2 个在时空上没有重叠的普通块**——即它们**不产生实际扣除效果**。
编辑器预览请按此如实呈现，并在 UI 标明该表现**未经游戏内验证**。
:::

## 6 多块叠加：命中判定的抵消（与渲染独立）

**渲染**用 `abs(s−n)` 做差；**命中**用**奇偶抵消**（`JudgeControl.TryGetBlockingBlock`，VA `0x1D22010`）：

```csharp
// 命中区 = 裸半边 0.5 的局部 AABB（无 inset）
bool subtracted = (减块命中数 & 1) != 0;      // 奇数个减块覆盖 ⇒ 该点被挖空
if (subtracted == (普通块命中 != null)) return false;   // 同为真/同为假 ⇒ 不命中
return (普通块命中 != null) ? 普通块 : 减块;            // 否则优先普通块
```

| 物理点被… | 命中结果 |
| --- | --- |
| 无块 | 不命中 |
| 仅普通块 | 命中该普通块 |
| 仅减块（奇数） | 命中该减块 |
| 偶数个减块 | 相当于被挖回，若同时有普通块则命中普通块 |
| 普通块 + 奇数减块 | **抵消 → 不命中** |

::: warning 渲染与判定对「抵消」的规则不同
- 渲染：`abs(s−n)`（连续差值）；
- 判定：减块**奇偶数**（离散奇偶）。

两者不是同一套数学，复现时**不要**互相套用。
:::

## 7 触摸悬停层（与块状态正交）

按下 `Active` 块时，在手指位置实例化 `touchHoverPrefab`（`TouchBlockBehavior`），
送入 `touchBlockRT` → `ActiveBlock` 的 `touch` 分支，叠加噪声/SDF 提亮（`_TouchPos*`）。
该层**独立于块的性质与状态**，最多同时 10 个（`fingerId` 复用）。

## 8 完整组合速查（性质 × 状态 × 交互）

| # | 性质 | 状态 | 渲染 | 命中 | 备注 |
| --- | --- | --- | --- | --- | --- |
| 1 | 普通 | HiddenBefore/After | 移出画 | ✗ | — |
| 2 | 普通 | Disabled | 淡入 α1 | ✗ | `disabledLayer` |
| 3 | 普通 | Ready | 呼吸脉冲 | ✗ | 纯预备遮罩 |
| 4 | 普通 | Active | 生效体 | ✓ | 命中优先 |
| 5 | 普通 | Residual | 退回禁用外观 | ✗ | 可见但已失效 |
| 6 | 减块 | HiddenBefore/After | 移出画 | ✗ | — |
| 7 | 减块 | Disabled | α0.1 | ✗ | — |
| 8 | 减块 | Ready | 呼吸脉冲 | ✗ | — |
| 9 | 减块 | Active | 生效体 | ✓（奇数） | 抵消普通块 |
| 10 | 减块 | Residual | 退回禁用外观 | ✗ | — |
| 11 | 普通+减块 | 同时 Active 且重叠 | `abs(s−n)` 挖洞 | 奇偶抵消 | 渲染≠判定规则 |
| 12 | 任意 | 被触摸 | +触摸层 | — | 独立叠加 |

## 9 一句话总结

块只有**两个维度**：**普通/减块**与**六个状态**；渲染上减块用**连续差值**从普通块挖洞、
命中上减块用**奇偶**抵消普通块，二者规则不同；触摸悬停是与二者正交的独立叠加层。
