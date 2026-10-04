---
title: BlockArea 数据规格
---

# BlockArea 数据规格

本文档描述 BlockArea（下称「块」）的**数据结构**与**配置参数**，不含运行时行为。
行为的完整推导见 [`behavior.md`](./behavior.md)，渲染见 [`render.md`](./render.md)。

::: warning 适用范围
以下内容为笔者逆向整理，不代表官方定义。逆向对象为 `libil2cpp.so`（ARM64）与 Unity 场景数据，
对应客户端版本 **4.0.1**。字段偏移取自 Il2CppDumper 生成的 `dump.cs`。
:::

## 符号约定

::: tip 本表是全文档的公共符号定义
[`behavior.md`](./behavior.md) 与 [`render.md`](./render.md) 中的符号一律以此为准。
:::

- **τ**：**时间轴**，单位为**秒**（`float`）。

    - 用于全部块时间字段（`appearTime` / `enableTime` / `disableTime` / `disappearTime`）、
      事件 `time` 字段，以及 `destroyInterval` / `disabledBlockShowDuration` 等调参值。

    ::: danger 与通用谱面格式的时间单位不同
    `judgeLineList` 中各类事件的 `startTime` / `endTime` 使用整数 **T**，换算为：

    $$\text{秒} = T \times \frac{1.875}{\mathrm{BPM}}$$

    其中 1 小节 = 4 拍 = **128 T**（即 1 拍 = 32 T），BPM 每分钟拍数。
    例如 BPM 120 时 32 T = 1 拍 = 0.5 秒。

    而 `blockAreaList` 的四个时间字段直接使用**秒**（`float`，含小数）。

    实测 1884 个块时间值中 **94.5% 为非整数**（如 `46.666668`），
    而同批谱面 `judgeLineList` 的 `startTime` **全部为整数**（如 `1152`、`4640`）。

    因此**不要**把块的秒值当作 T 代入谱面换算。
    :::

- **p**：归一化进度，取值 `[0, 1]`，由[缓动表](./behavior#2-时间与缓动)查表得出。

    - ⚠️ 请勿与时间轴 **τ** 混淆。

- **P**：屏幕百分比长度，`P = 1` 表示屏幕的 100%。块的矩形由两个 `P` 坐标定义。
  坐标 `0` 为屏幕左下角，`1` 为右上角。

- **H**：画面**世界**高度（= `2·orthoSize` = `10`，非像素）。

- **S**：局部长度。块是一个**单位 quad**（边长 1），因此其局部半边长恒为 `0.5`。

块的渲染完全在屏幕空间完成，**不使用任何几何网格**。块的几何仅由 `Transform` 的
`localPosition` 与 `localScale` 表达。

## 数据来源

块的数据**就在谱面 JSON 内**，是顶层字段 `blockAreaList`，与 `judgeLineList` 平级。

```jsonc
// 某谱面 JSON 的顶层结构
{
  "formatVersion": ...,
  "offset": ...,
  "judgeLineList": [ ... ],
  "blockAreaList": [          // ← 块
    {
      "topRightPercentage":  { "x": 1.5, "y": 1.2 },
      "bottomLeftPercentage":{ "x": 0.5, "y": -0.2 },
      "appearTime": 44.0,
      "enableTime": 46.666668,
      "disableTime": 48.0,
      "disappearTime": 49.333332,
      "isSubtract": false,
      "rotateEvents": [ { "anchor": {...}, "time": ..., "easeType": ..., "rotation": ... } ],
      "moveEvents":   [ { "endPosition": {...}, "time": ..., "easeTypeX": ..., "easeTypeY": ... } ],
      "scaleEvents":  [ { "anchor": {...}, "time": ..., "easeTypeX": ..., "easeTypeY": ..., "scale": {...} } ]
    }
  ]
}
```

运行时由 `LevelControl.chart`（类型 `Chart`）持有整个谱面对象，
`Chart.blockAreaList` 即该数组。IL2CPP 中该字段声明类型为
`List<GameInformation.BlockArea>`，JSON 里表现为普通数组——**容器类型与
`judgeLineList` 不同**（后者是 `Array<JudgeLine>`）。

::: danger 注意：块不是「通用谱面格式」的一部分
`blockAreaList` 是 Phigros 客户端的**私有扩展字段**。按通用谱面格式规范解析或
校验谱面的工具（以及[通用格式文档](https://docs.lchzh.net/learning/phigros/)）
**不会**包含它，因此按标准格式读到的谱面会「丢失」全部块。

要读块必须直接访问原始 JSON 的这个顶层键。
:::

### 官方谱面实测统计

::: danger 本节统计**不是**从本仓库附带的 APK 资源复核的
下表来自外部的 `Phigros_Extractor` 语料（**1058** 个难度文件），**该语料未随文档提供**。
按本项目「以 APK 为准」的约定，这些数字应视作 **🔶 外部来源**，尚未与本机 APK 字节交叉验证。

关键事实：本机从 APK 解出的谱面语料（`textassets`，**1032** 个 `*__Chart_*.txt`）
**没有一份包含 `blockAreaList`**——用通用谱面格式提取时该私有键被整段丢弃。
因此这 1032 个文件**无法**复现下表。

**本机唯一能从 APK 字节溯源的块数据**是加密包 `b855456f943c1a99c25986f1c023bf47`
解出的 c9s 剧情谱（[`blockAreaList.json`](./blockAreaList.md)，**48** 个块、**4** 个减块，
时间 58.6–67.6 s）。复现/验证应以它为准，而不是下表。
:::

对 `Phigros_Extractor` 解出的 **1058** 个谱面 JSON（难度文件）逐一检查：

| 项 | 数量 |
| --- | --- |
| 含 `blockAreaList` **键**的谱面文件 | **31** |
| 其中 `blockAreaList` 为**非空**数组 | **26** |
| 其中为空数组 `[]` | 5 |
| 涉及的**歌曲**数（去重） | **8** |
| 块条目总数 | **17830** |
| 其中 `isSubtract = true` | **879** |

按难度分布：`AT` 8 个、`EZ` 7 个、`HD` 7 个、`IN` 7 个、`SP` 1 个、`Chart` 1 个。

::: warning 「31 个谱面」指的是难度文件，不是 31 首歌
据该外部语料，含块的只有 **8 首歌**：`Message.くるぶっこちゃん`、`Ametrine.GRYSCLMIssionary`、
`DesultorySignals.technoplanet`、`Petrichor.voidMournfinale`、`ハテ.rNFrums`、
`TrueHomeTrueWorldRework.816ThreeNumbers`、`LeaveAllBehind.rider`、`c9s.ilBx0rGL`。

复现验证时，这 8 首的 `IN` 难度块数最密集，适合做密集用例。
:::

::: tip 复现脚本
`tools/_verify_block_in_json.py` 打印任一谱面的
块结构；`tools/_count_blocks.py` 复现上表统计。
:::

**`formatVersion`**（实测 `3`）只影响音符/谱面的解析布局，**不参与块的时间轴**：
`DestroyAndCreateAllBlocks`（VA `0x1D7A140`）把 `chart.blockAreaList[i]` **直接**赋给
`PreviewBlockControl.blockInfo`，不加偏移、不做版本分支。

**`offset`**（实测 `0.0`）是谱面/歌曲级偏移，不逐块叠加；它经全局时钟生效：
`ProgressControl.Update`（VA `0x1D3483C`）里 `nowTime(0x88) = audioTime(0xB0) − _offset(0x90)`，
而 `_offset = levelInformation.offset`。块只用 `appearTime` 等原始值与 `nowTime` 比较，
因此只有**关卡级 offset** 会整体平移所有块的出现时刻。

## 结构

### 根结构 `Chart`

本文档只描述与块相关的字段。

- **formatVersion** `int`：格式版本。

- **offset** `float`：谱面偏移，单位秒。

- **judgeLineList** `Array<JudgeLine>`：判定线列表。含义见[通用谱面格式](https://docs.lchzh.net/learning/phigros/)。

- **blockAreaList** `List<BlockArea>`：**块列表**。私有扩展字段，缺失时视为空（该谱面无块机制）。

### 块 `BlockArea`

::: warning 这是纯数据类
`GameInformation.BlockArea` 是 `[Serializable]` 的**纯数据类**，除 `Mirror()` 外不含任何执行逻辑。
块的行为完全由 [`PreviewBlockControl`](#驱动者previewblockcontrol) 实现。
:::

- **topRightPercentage** `Vector2`（`0x10`）：块的**右上角**屏幕百分比坐标。

- **bottomLeftPercentage** `Vector2`（`0x18`）：块的**左下角**屏幕百分比坐标。

    - 两者共同定义块的矩形。

- **appearTime** `float`（`0x20`）：出现时刻，单位秒。

- **enableTime** `float`（`0x24`）：**生效**时刻，单位秒。

- **disableTime** `float`（`0x28`）：**失效**时刻，单位秒。

- **disappearTime** `float`（`0x2C`）：消失时刻，单位秒。

    - 四者满足 `appearTime ≤ enableTime < disableTime ≤ disappearTime`。

    - 四者不必满足严格不等式；相等时对应阶段被跳过。行为后果见
      [生命周期与阶段](./behavior#4-生命周期与阶段)。

- **isSubtract** `bool`（`0x30`）：是否为**减块**。

    - `false`：**普通块**，表现为障碍物，触摸判定区**向外扩张**。

    - `true`：**减块**，触摸判定区**向内收缩**。

    - 该字段同时决定三件事：走哪组 layer（共 3 台相机）、是否参与
      `SubtractBlockPostProcessor` 的场景色扣除、以及触摸区外扩还是内缩。

    - 减块**不吃音符判定**：音符命中由 `LevelControl` 独立处理。减块只是视觉上挖掉一块区域，
      且 `SpriteRenderer` 的 alpha 为 `0.1`（近乎不可见），因此「吃掉音符」是视觉表现而非判定逻辑。

- **rotateEvents** `List<RotateEvent>`（`0x38`）：旋转事件列表。

- **moveEvents** `List<MoveEvent>`（`0x40`）：移动事件列表。

- **scaleEvents** `List<ScaleEvent>`（`0x48`）：缩放事件列表。

::: tip
三类事件相互独立，可同时存在，各自按时间顺序插值，最终共同决定块的变换。
移动与缩放事件的 `easeTypeX` / `easeTypeY` 可以不同。
:::

### 旋转事件 `RotateEvent`

| 偏移 | 字段 | 类型 | 说明 |
| --- | --- | --- | --- |
| `0x10` | `anchor` | `Vector2` | 旋转锚点，单位 `P` |
| `0x18` | `time` | `float` | 事件时刻，单位**秒** |
| `0x1C` | `easeType` | `int` | 缓动类型，`0`~`14`。见[缓动类型表](./behavior#21-缓动类型表) |
| `0x20` | `rotation` | `float` | **绝对**目标角度，单位度，逆时针为正 |

::: tip 绝对角度，不是增量
`rotation` 每帧被直接赋给 `eulerAngles.z`，**不是**累加。
:::

### 移动事件 `MoveEvent`

| 偏移 | 字段 | 类型 | 说明 |
| --- | --- | --- | --- |
| `0x10` | `endPosition` | `Vector2` | 目标位置，单位 `P` |
| `0x18` | `time` | `float` | 事件时刻，单位**秒** |
| `0x1C` | `easeTypeX` | `int` | 水平方向缓动类型 |
| `0x20` | `easeTypeY` | `int` | 垂直方向缓动类型 |

::: tip 移动事件没有自己的锚点
`RotateEvent` 与 `ScaleEvent` 都带 `anchor`，但 `MoveEvent` **没有**——它只有 `endPosition`。
移动是以块自身的锚点（`topRightPercentage` / `bottomLeftPercentage`）为基准的。
:::

### 缩放事件 `ScaleEvent`

| 偏移 | 字段 | 类型 | 说明 |
| --- | --- | --- | --- |
| `0x10` | `anchor` | `Vector2` | 缩放锚点，单位 `P` |
| `0x18` | `time` | `float` | 事件时刻，单位**秒** |
| `0x1C` | `easeTypeX` | `int` | 水平方向缓动类型 |
| `0x20` | `easeTypeY` | `int` | 垂直方向缓动类型 |
| `0x24` | `scale` | `Vector2` | 缩放倍率 |

::: warning 字段名是 `scale`，不是 `stepX` / `stepY`
IL2CPP 声明为 `public Vector2 scale;`。`stepX` / `stepY` 是静态方法
`ScaleAroundAnchor(Vector2 point, Vector2 anchor, float stepX, float stepY)` 的**形参名**，
不是序列化字段名。复现数据结构时建议直接命名为 `scale` 以对齐原始字段。

从形参名与 [`ScaleAroundAnchor`](./behavior#31-绕锚点缩放) 的用法看，它承担**倍率**角色
（`1` 表示不缩放）。
:::

## 驱动者：`PreviewBlockControl`

每个块挂一个 `PreviewBlockControl`。它虽位于 `ProjectEditor.PreviewScripts`
命名空间下（Phigros 内置关卡编辑器的代码），但**确实是运行时活跃组件**——
实例就在关卡场景 `sharedassets12.assets`（pathID 374）里，与 `BlockRender`（334）
和 3 个 `SubtractBlockPostProcessor`（331/343/350）同处一文件且同时启用。

它没有任何其他类显式调用，全部逻辑靠 Unity 的 `Start` / `Update` 消息驱动。

### 字段表

| 偏移 | 类型 | 字段 | 说明 |
| --- | --- | --- | --- |
| `0x20` | `float` | `destroyInterval` | 销毁延迟 |
| `0x28` | `ProgressControl` | `progressControl` | 提供 `nowTime` |
| `0x30` | `LevelControl` | `levelControl` | — |
| `0x38` | `GameInformation.BlockArea` | `blockInfo` | 本块数据 |
| `0x40` / `0x44` | `float` | `screenWidth` / `screenHeight` | **世界视口尺寸** `(2·orthoSize·aspect, 2·orthoSize)`（≈`17.78 × 10`），非像素 |
| `0x48` | `int` | `index` | — |
| `0x50` | `SpriteRenderer` | `renderer` | — |
| `0x58` | `float` | `disabledBlockShowDuration` | 预警总时长 |
| `0x5C` | `float` | `disabledBlockReadyDuration` | **未参与判定**，见下 |
| `0x60` | `bool` | `isDragging` | 拖拽模式已激活 |
| `0x68`–`0x80` | `string` ×4 | `enabledLayer` / `disabledLayer` / `readyLayer` / `touchLayer` | layer 名 |
| `0x88` | `BlockPhase` | `lastPhase` | — |
| `0x8C` | `bool` | `wasVisible` | 防淡入重播 |

::: tip 四个 layer 是按**名字**切换的
都是字符串，运行时通过 `gameObject.layer = LayerMask.NameToLayer(name)` 切换。
这解释了为什么 7 个 layer 的**索引**（11–17）在代码里不写死。
各 layer 的实际索引与对应相机见 [`render.md` 图层与相机](./render#图层与相机)。
:::

::: danger `disabledBlockReadyDuration` 就是 `Ready` 窗口（初版判错）
初版称「该字段（`0.5`）在 `UpdateBlockActivation` 中**未被读取**、用途未确认」——**错误**。
`UpdateBlockActivation`（VA `0x1D707CC`）读取的正是 `disabledBlockReadyDuration`（`0x5C`）：

```csharp
bool ready = (enableTime - disabledBlockReadyDuration) <= now && now < enableTime;
```

`disabledBlockShowDuration`（`0x58`）只用于 `DisabledBlockShow` 协程的颜色淡入时长；
`DisabledBlockReady` 协程也读 `disabledBlockReadyDuration`（切 `readyLayer` →
`WaitForSeconds(disabledBlockReadyDuration)` → 切 `enabledLayer`）。
:::

## 调参

以下数值取自场景 `level12` / `sharedassets12.assets` 的序列化数据，单位均为**秒**。

| 字段 | 值 | 含义 |
| --- | --- | --- |
| `disabledBlockShowDuration` | `0.5` | **仅等于 `Ready` 阶段的长度**（见下） |
| `disabledBlockReadyDuration` | `0.5` | 未参与判定，见上 |
| `destroyInterval` | `5.0` | 消失后的销毁延迟 |
| `blockTouchInsetScreenHeightRatio` | `0.03` | 触摸区外扩基准（占屏高 `H` 比例） |
| `maxBlockTouchInsetLocal` | `0.25` | 触摸区外扩上限（局部单位） |
| `edgeSize` | `1` | 边缘膨胀轮数（**不是像素半径**，见 [`render.md`](./render#rt-管线)） |
| `glowRadius` | `6` | 发光膨胀名义轮数（实际 5 轮） |
| `glowWeightFalloff` | `2.65` | 发光权重衰减指数 |
| `glowPassWeightThreshold` | `0.01` | 低于此权重的轮次跳过 |

::: danger `disabledBlockShowDuration` 只管 `Ready` 一段
初版两处称它是「上线前**完整**预警窗口（`Disabled` + `Ready` 合计）」，
另一处却说「`Ready` 阶段的实际长度等于 `disabledBlockShowDuration`」——**自相矛盾**。

按 [`behavior.md` 阶段表](./behavior#4-生命周期与阶段)：

- `Ready` = `enableTime − showDuration ≤ τ < enableTime` → 长度**就是** `showDuration`
- `Disabled` = `appearTime ≤ τ < enableTime − showDuration` → 长度由 `appearTime` 决定，**不受它控制**

所以预警总窗是 `appearTime → enableTime`，通常**远大于** `0.5` 秒。
`showDuration` 只是「生效前多久开始显示预备态」。
:::

::: warning 这 9 个值的来源并非同一处
初版称本表「数值取自场景 `level12` / `sharedassets12.assets` 的**序列化数据**」。
但本构建的 MonoBehaviour typetree 已被剥离（只剩 `m_Enabled` / `m_Name`），
组件字段无法从场景序列化读出——详见 [`index.md` 的说明](./index.md#数据来源)。

实际情况是分两类：

| 来源 | 字段 |
| --- | --- |
| 场景序列化（`SpriteRenderer` / prefab 等非脚本组件） | 触摸标记参数 `size` / `animationDuration` / `idlePosition` |
| **反汇编 + `.rodata` 默认值** | `PreviewBlockControl` 与 `BlockRender` 上的其余 7 个 |
:::

::: tip
`disabledBlockShowDuration` 是「生效前多久开始进入预备态」，当前为 **0.5 秒**。
:::

::: tip 触摸标记参数
按下时在手指位置实例化 `touchHoverPrefab`：

| 字段 | 值 |
| --- | --- |
| `size` | `11.5` |
| `animationDuration` | `0.1` |
| `idlePosition` | `(0, 0, 100)`（**世界坐标**，缩放动画结束后的落点） |
:::

## 渲染调参摘要

| 材质 | 相机 | layer | 用途 |
| --- | --- | --- | --- |
| `activeBlockMaterial` | `normalBlockCamera` | `NormalBlock` | 普通块（生效） |
| `subtractBlockMaterial` | `subtractBlockCamera` | `SubtractBlock` | 减块（生效） |
| `disabledBlockMaterial` | `disabledNormalBlockCamera` | `DisabledNormalBlock` | 禁用普通块 |
| `disabledBlockMaterial` | `disabledSubtractBlockCamera` | `DisabledSubtractBlock` | 禁用减块 |
| `blockReadyMaterial` | `disabledNormalReadyBlockCamera` | `DisabledNormalReadyBlock` | 预备普通块 |
| `blockReadyMaterial` | `disabledSubtractReadyBlockCamera` | `DisabledSubtractReadyBlock` | 预备减块 |
| `touchEffectMaterial` | `touchBlockCamera` | `TouchBlock` | 触摸层 |
| `subtractBlockMaterial` | `SubtractBlockPostProcessor` ×3 | — | 减块场景色扣除 |

另有 3 个不直接对应相机的材质：`blockComposeMaterial`、`edgeMaskMaterial`、
`glowMaskMaterial`。完整管线、材质参数与着色器见 [`render.md`](./render.md)。