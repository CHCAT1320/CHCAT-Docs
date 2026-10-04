# BlockArea 逆向笔记

对 Phigros **4.0.1** 客户端中 **BlockArea**（块）系统的逆向记录。

该系统对应谱面 JSON 的**私有扩展字段 `blockAreaList`**（与 `judgeLineList` 平级），
不属于通用谱面格式。它描述判定屏上若干带生命周期的矩形区域，可被触摸，
并会压低 BGM 低通滤波器。

## 文档

按「数据结构 → 运行时行为 → 渲染表现」三层组织。三层各由一份文档负责，**互不重复**。

| 页面 | 层次 | 内容 |
| --- | --- | --- |
| [`data.md`](./data.md) | 数据规格 | **公共符号约定**（τ / p / P / H / S）、`Chart` / `BlockArea` / 三类事件字段、驱动者 `PreviewBlockControl` 字段表、全部调参值 |
| [`behavior.md`](./behavior.md) | 运行时行为 | 每帧执行顺序、坐标转换、缓动表与查表、变换、阶段判定、命中判定与触摸、音频 |
| [`render.md`](./render.md) | 渲染表现 | 图层与相机、RT 管线、材质参数、遮罩布局、**真实 GLSL 源码**与关键算法、发光权重 |
| [`materials.md`](./materials.md) | 材质细节 | 各材质的 **`_ST`（tiling）**、贴图**导入设置**（Wrap/Filter/sRGB）、两套独立位移系统 |
| [`shaders/`](./shaders/) | 着色器源码 | 9 个 GLSL ES 3.00 文件 / 13 个 program（其中 4 个含二进制哨兵，不能直接编译） |
| [`tex/`](./tex/) | 贴图资源 | 4 张块系统贴图（`Block` / `BlockNoise1` / `PointNoise` / `FD_Noise`，从 `sharedassets12.assets` 导出） |
| [`blockAreaList.json`](./blockAreaList.md) | 块数据样本 | c9s 剧情谱的 `blockAreaList`（48 块 / 4 减块）——**本仓库唯一可从 APK 字节溯源**的块语料 |
| [`block-params.json`](./block-params.md) | 材质参数 | 8 个材质保存的 `_ST` / 颜色 / 位移参数（`BlockRender` 持 7 个 + 3 个后处理） |
| [`code/PreviewBlockControl.decompiled.cs`](./code/PreviewBlockControl.decompiled.md) | 等价 C# | `PreviewBlockControl`（生命周期/阶段/几何/插值/变换/命中/协程）与 `TouchBlockBehavior` 的反汇编还原 C# |
| [`code/`](./code/) | IL2CPP 类声明 | Il2CppDumper 导出的相关 C# 类（`BlockRender` / `PreviewBlockControl` / `GameInformation.BlockArea` / `JudgeControl` / `TouchBlockBehavior` 等），字段偏移与 VA 注释即各文档字段表的来源 |
| [`code/BlockRender.decompiled.cs`](./code/BlockRender.decompiled.md) | 等价 C# | 由 ARM64 反汇编还原的渲染核心等价 C#（`Start` / `CopyReadyTouchParamsToActive` / `RenderEffects` / `LateUpdate` / `GetGlowRingWeight` / 低通 / `SubtractBlockPostProcessor`），未确定处均显式标注 |

::: tip 符号只定义一次
`τ` / `p` / `P` / `H` / `S` 的定义在 [`data.md` 符号约定](./data#符号约定)。
另两份文档不再重复定义，直接引用。
:::

提取出的着色器位于 [`shaders/`](./shaders/) —— **9 个 BlockArea 相关文件 / 13 个 program**，
Unity 编译后的 GLSL ES 3.00。

::: warning 「124」与「9」的准确口径
- **124**：全游戏提取到的 shader **program** 数（来自 `tools/_extract_all_shaders.py` 的提取计数）。
- **123**：这些 program **落盘**后的 `.glsl` 文件数——因存在同名 shader，落盘时相互覆盖。
- **9 / 13**：BlockArea 相关的文件数 / program 数。

`tools/_catalog_shaders.py` 统计的是**落盘文件**（123）与其中的 `#version` 块数，
不是 124；需要 124 这个数请看提取脚本的输出。
:::

## 置信度标记

本文档的结论分三级，**每条结论都应能归入其中之一**：

| 标记 | 含义 | 判定标准 |
| --- | --- | --- |
| ✅ **已验证** | 直接读出 | 有 VA 地址、字段偏移、`.rodata` 常量值或序列化路径可核验 |
| 🔶 **推断** | 由证据推导 | 结论合理但依赖对反汇编/渲染语义的解读，无直接字节依据 |
| ❓ **未确认** | 存疑待查 | 已知有疑问，或仅有间接线索 |

各文档中大量结论属于 🔶，尤其在缺少谱面语料与 IL2CPP 交叉验证时
（见下方「本仓库的可验证性限制」）。

**已撤回的结论**（曾写入文档，后经复核推翻）：

| 曾经的结论 | 实际情况 | 发现方式 |
| --- | --- | --- |
| 着色器源码不可得 | **错误**。源码经 LZ4 压缩存于 `Shader.m_CompressedBlob`，已提取 | 实测解压 |
| BlockArea 时间单位为 T | **错误**。单位为**秒**；`judgeLineList` 的事件才用整数 T | 统计 1884 个块时间值 |
| 旋转为顺时针 | **错误**。反汇编中 sin/cos 寄存器对应关系被读反，实为标准逆时针 | 手工核算 δ=90° 变换 |
| `SubtractBlockBlender` 输出 `[−1,1]` | **错误**。`st ∈ {0,1}`，实际范围 `[0,2]` | 推导 `v` 值域 |
| Ready 阶段为「扫光带」 | **错误**。实为 `sin` 呼吸脉冲 | 读 GLSL |
| 发光权重 Σ = 223.1 | **错误**。实为 `251.5922` | 实算 `Σ i^2.65` |
| `PreviewBlockControl` 是纯编辑器脚本 | **错误**。虽在 `ProjectEditor` 命名空间下，但实例在关卡场景中且启用 | 场景 `sharedassets12.assets` pathID 374 |
| `ScaleEvent` 字段为 `stepX`/`stepY` | **错误**。序列化字段名是 `scale`，`stepX`/`stepY` 是形参名 | `dump.cs` 偏移 `0x24` |
| 发光权重的两个 epsilon 取值不明 | **错误**。即具名字段 `glowWeightFalloff` / `glowPassWeightThreshold` | `BlockRender` 字段表 |
| **块的数据不在谱面 JSON 内** | **错误**。它在 JSON 顶层 `blockAreaList` 字段里；准确说法是「不属于**通用谱面格式规范**」 | 直接读谱面 JSON |
| **相机掩码十六进制值** | **错误**。4 个掩码十进制对、十六进制错（如 `40960` 误写为 `0x0000C000`），与同表 layer 列矛盾 | 逐位解码核对 |
| **`_DilateTexelSize` 的 `.zw` 供像素比较** | **错误**。`.zw` 在 9 个 GLSL 中从未被读取；半径靠迭代轮数而非单次 UV 偏移 | grep 全部 22 处引用 |
| **`easeType 12` 越界读「无影响」** | **错误**。越界在**构建期**写入 `E[12][47..49]`，钳制只作用于运行期查表，这三点**会被采样** | 复核 `GetEaseWithProgress` 钳制作用域 |
| **遮罩 `.y` 范围 `0`~`1`** | **错误**。实际写入 `t.y * v * 10`，最大可达 **20** | 读 GLSL 写入式 |
| **`_Shine*` 有三个材质共用** | **错误**。只有 2 个材质（pathID 5、11）保存了 `_Shine*` | `block-params.json` |
| **发光权重表中间列** | **错误**。`(6−p)^2.65` 有 4 个值算错（Σ 与权重列正确） | 实算比对 |

::: warning 本仓库的可验证性限制
本仓库只附带 9 个 `.glsl`、一个 `block-params.json`、4 张块贴图（[`tex/`](./tex/)）、
一份 APK 可溯源的块样本（[`blockAreaList.json`](./blockAreaList.md)）与相关类声明
（[`code/`](./code/)），**不含** 1058 文件的谱面语料与 `libil2cpp.so`。因此：

- 涉及 VA 地址、`.rodata` 常量、指令序列的结论，只能核对**内部一致性**，无法独立复现；
- 统计类结论（1058 / 31 / 26 / 17830 / 879）依赖 `Phigros_Extractor` 解出的语料，
  本文档不附带该语料，也不附带分析脚本，故无法直接复算。

::: warning 分析脚本未附带
本文档不包含任何分析脚本（原脚本内含作者本机绝对路径，且依赖私有语料）。
文档中出现的 `tools/_xxx.py` 仅是**分析过程的引用**，不随本文档提供。
:::
:::

## 复现顺序

若目标是重新实现该机制，建议按以下顺序推进，每步都可独立验证：

1. **数据层** — 按 [`data.md`](./data.md) 解析 `blockAreaList`。
   验证：31 张含块谱面能全部读出，字段与本文档一致。
   不需要渲染。
2. **时间轴与阶段** — 实现 [`behavior.md` 生命周期与阶段](./behavior#4-生命周期与阶段) 的分支，输出 `BlockPhase`。
   验证：对 `Petrichor.voidMournfinale` 逐帧打印阶段，应与音轨上块的起止吻合。
3. **几何** — 实现 [`behavior.md` 坐标转换与变换](./behavior#1-坐标转换)。
   验证：`transform.localPosition` / `localScale` 与预期矩形一致；隐藏态应落在 `x = 1000`。
4. **缓动** — 按 [`behavior.md` 缓动](./behavior#2-时间与缓动) 生成 15×101 表。
   **注意四种死表**（`3/6/9/13` 恒 0，`14` 恒 1）、`12` 的两处断点，
   以及 `12` 的 `47`~`49` 三点因构建期越界读**无法复现**。
   验证：`easeType 0` 与 `14` 在 `ハテ.rNFrums.AT` 中的表现应与原版一致。
5. **触摸** — 实现 [`behavior.md` 命中判定与触摸](./behavior#5-命中判定与触摸)，**注意普通块外扩、减块内缩**。
   验证：`Petrichor.voidMournfinale.IN` 的 427 个块逐个验证命中区。
6. **音频** — BGM 低通 `22000 → 1500 Hz`，`0.25` s 扫频。
   验证：按住任一 Active 块时能听到压低。
7. **渲染** — 最后再按 [`render.md`](./render.md) 搭建 7 相机 / 13 RT 的管线。

    ::: warning 最小链会丢掉位移扰动
    `BlockCompose` 的**第一个** fragment program（读 `_NormalBlockRT` / `_SubtractBlockRT`，
    带 `_DisplaceMap` 双 tap 与 `_Time.x * _DisplaceSpeed`）是 `normalBlockRT` /
    `subtractBlockRT` 的**唯一消费者**。若只跑
    `BlockSprite → EdgeMask → GlowMask → BlockCompose → SubtractBlockBlender`
    这条链而只取 `BlockCompose` 的第二个 program，画面会**完全没有液态扰动效果**。
    :::

    建议顺序：先跑通第二个 program 确认遮罩合成正确，再补第一个 program 的扰动，
    最后处理 `ActiveBlock`（25 KB，已逐段解析，见 [`render.md`](./render#unlitactiveblock--主着色器汇总合成)）。

### 前置条件

- 目标渲染器需支持 GLES 3.0（`shaders/` 下为 GLSL ES 3.00）。
  **Unity 无法直接加载 GLSL**，迁回 ShaderLab 需按 [`render.md` 复现建议](./render#复现建议) 的四条注意事项改写。

  ::: warning 9 个文件里有 4 个不能直接编译
  `EdgeMask` / `GlowMask` / `BlockCompose` / `SubtractBlockBlender` 在两个 program
  之间嵌了二进制记录头，且一个文件含 2 个 program（共 13 个 program）。
  使用前需按 program 边界手工切分，详见
  [`render.md` 着色器清单](./render#着色器清单)。
  :::
- 阶段 1–6 **不需要**渲染器和 `shaders/`，纯逻辑即可完成。

## 数据来源

| 项 | 值 |
| --- | --- |
| 逆向对象 | `libil2cpp.so` (ARM64, IL2CPP metadata v31) |
| 引擎版本 | Unity **2022.3.62f2**（由 UnityFS 头泄漏） |
| 工具 | Il2CppDumper 6.x（`dump.cs`）、capstone、UnityPy **1.25.3**（必须，见 [`render.md` 警告](./render#图层与相机)） |
| 场景 | `assets/bin/Data/data.unity3d` → `level12` / `sharedassets12.assets` |
| 谱面 JSON | 🔶 1058 个难度文件（**外部 `Phigros_Extractor` 语料，未附带**；本机 APK 解出的 1032 个 `textassets` 谱面**均不含** `blockAreaList`） |
| 含 `blockAreaList` 键 | 🔶 **31** 个难度文件（其中 **26** 个非空、5 个是 `[]`），涉及 **8 首歌**（同上，未附带） |
| 块条目总数 | 🔶 **17830**（其中减块 **879**）（同上，未附带） |
| 可从 APK 溯源的块样本 | [`blockAreaList.json`](./blockAreaList.md) —— 加密包 `b855456f…` 解出的 c9s 剧情谱，**48 块 / 4 减块** |
| 提取着色器 | 全包 **124** 个 program（落盘 123 个文件），其中块相关 **9** 文件 / **13** 个 program |

::: tip 「31」是难度文件数，不是歌曲数
🔶 外部语料称含块的只有 8 首歌。完整统计与可信度说明见
[`data.md` 官方谱面实测统计](./data#官方谱面实测统计)。
:::

::: warning 场景 MonoBehaviour typetree 已被剥离
本构建中 MonoBehaviour 只保留 `m_Enabled` / `m_Name`，**组件字段无法从场景序列化读出**，
必须靠 `dump.cs` 的 IL2CPP 声明 + ARM64 反汇编。因此各文档中的字段表均标注了偏移量，
且调参值的来源需区分「场景序列化」与「反汇编 + `.rodata` 默认值」两类
（见 [`data.md` 调参](./data#调参)）。
:::

## 已知未解问题

评审中提出的清单**已全部查证闭合**（结论见下表）。与 APK 仍有的客观差距只剩：
块语料 `blockAreaList`（1058 文件）未随文档提供，见上文「数据来源」。

## 已解决（评审问题 → 结论）

| 评审问题 | 结论 |
| --- | --- |
| `easeType 12` 的完整数值 | **部分解决**：15 个采样点已重算吻合，但 `47`~`49` 因**构建期**越界读不可复现，见 [`behavior.md` 缓动表采样点对照](./behavior#缓动表采样点对照) |
| `GetGlowRingWeight` 的 epsilon | **不是**具名字段：实测为 `.rodata` 常量 `0.001`(`0xC26530`) 与 `1e-6`(`0xC26384`)；`glowWeightFalloff` 只是作为 `falloff` 参数传入，`glowPassWeightThreshold` 用在 `RenderEffects` 跳过低权轮次。材质 `_PassWeight = 0.0249` 仅交叉验证公式形式 |
| 7 台相机的 layer mask | 已取得全部实测值（**以十进制为准**，见 [`render.md` 图层与相机](./render#图层与相机)） |
| 材质常量 | 已读出 8 个材质的保存参数（`BlockRender` 持 7 个 + `subtractBlockMaterial` 挂在 3 个后处理上），见 [`block-params.json`](./block-params.md) |
| RT 的 ping-pong 规则 | **已证实**：`RenderEffects` 每轮用 `stp`/`ext` 交换 `pingA`(`0x110`)/`pingB`(`0x118`)，见 [`render.md` LateUpdate](./render#lateupdate--rendereffects-实测顺序) |
| 各 RT 的分辨率 | **已解**：`sceneColorRT = Screen/6`，块遮罩 = `Screen/8`，`effectRT`/ping = `Screen/4`（`BlockRender.Start` VA `0x1D1BC4C`），见 [`render.md` RT 尺寸](./render#rt-尺寸与格式反汇编实测) |
| 低通滤波器 Q 值 | **已解**：`set_Q` 从未被调用，恒为 Unity 默认 `1.0`；按下/放开目标分别为 `lowPassCutoffFrequency` 与 `22000`，见 [`behavior.md` 音频](./behavior#6-音频) |
| `SubtractBlockPostProcessor` | 已解：`if (cam.targetTexture == null) Blit(src,dest); else Blit(src,dest,material,targetPass)`，见 [`render.md`](./render#lateupdate--rendereffects-实测顺序) |
| `disabledBlockReadyDuration` 用途 | **已解**：它是 `Ready` 窗口宽度（`enableTime − 0x5C ≤ τ < enableTime`），**并非未使用**；`disabledBlockShowDuration`(0x58) 才是 `DisabledBlockShow` 的颜色淡入时长。见 [`behavior.md` 生命周期](./behavior#4-生命周期与阶段) |
| 阶段切换实现 | **已解**：`UpdateBlockActivation` **无** `if(!visible) return`，只在 `notInWindow` 切 `disabledLayer`；`readyLayer`/`enabledLayer` 由 `DisabledBlockReady` 协程设置 |
| 事件缓动字段 | 已解：`MoveEvent`/`ScaleEvent` 有 **`easeTypeX`(0x1C) 与 `easeTypeY`(0x20)** 双缓动，分量各自插值；`RotateEvent` 用 `easeType`(0x1C)+`rotation`(0x20) |
| `GetBlockGeometry` 返回 | `(size, center, anchorWorld)`（已按元组构造寄存器确认），见 [`code/PreviewBlockControl.decompiled.cs`](./code/PreviewBlockControl.decompiled.md) |
| 膨胀半径如何实现 | `_DilateTexelSize = (1/w, 1/h, w, h)` 取自 `effectRT`，但只用 `.xy` 做 1-texel 偏移，**半径靠迭代轮数**；见 [`render.md`](./render#rt-管线) |
| RT ↔ sampler 映射 | 见 [`render.md` RT 字段 ↔ 着色器 sampler 对照](./render#rt-字段--着色器-sampler-对照) |
| 事件起点 / 时间基准 | `p = (progressControl.nowTime − 本事件 time) / (下一事件 time − 本事件 time)`，`easeType` 取自本事件，见 [`behavior.md` 查表与进度](./behavior#22-查表与进度) |
| 每帧执行顺序 | `UpdateBlocksTransform` → `UpdateBlockActivation` → `UpdateBlockAnimations` → `DestroyAfterInterval` |
| `isDragging` 的作用 | 为真时变换更新整段跳过，块保持编辑器拖好的位置 |
| `PreviewBlockControl` 是否运行时 | 是。实例在 `sharedassets12.assets` pathID 374，与 `BlockRender` 同场景且启用 |
| 音频滤波器挂载位置 | 挂在 **`ProgressControl`**（字段 `0xB8` `AudioLowPassFilter`，**早期误写 `0xC0`**），配 `LerpLowPassFilter` 协程；既非 `AudioSource` 也非 `AudioMixer` 组 |
| 预备态 RT 为何无人读取 | 已解释：196/197 各渲染两个 layer，预备态与禁用态合并进同一张 RT |
| 减块如何吃音符 | 已澄清：不吃判定，只是视觉扣除 + alpha `0.1` |
| `wasVisible` / `idlePosition` 语义 | 已澄清，见 [`behavior.md` 命中判定与触摸](./behavior#5-命中判定与触摸) |
| 提取了多少 shader | 124 个程序；因重名落盘为 123 个文件 |
| 事件索引选取规则 | 已解：`FindCurrentEventIndex` 返回 `[-1, Count-2]`，**严格大于**比较（相等时继续前移），见 [`behavior.md` 事件插值](./behavior#23-事件插值) |
| 位移/缩放/旋转如何套到几何 | 已解：`UpdateMovement` 是**相对原始中心的增量**（`+=` 而非替换）；缩放/旋转**绕事件锚点**；详见 [`behavior.md` 变换](./behavior#3-变换) |
| `SafeDiv` 调用点 | 已解：`UpdateScale` 中 `SafeDiv(next.scale, cur.scale)` 求相邻事件的缩放比 |
| `UpdateScale` / `UpdateRotation` | 已解：逐事件把 `center` 绕锚点按比率缩放/旋转，`size = 插值scale × originalSize`、`rotation = 插值rotation`，见 [`code/PreviewBlockControl.decompiled.cs`](./code/PreviewBlockControl.decompiled.md) |
| `RotateAroundAnchor` 守卫常量 | 已解：`s3` = **`Mathf.Epsilon`**(`1.401298E-45`)，阈值 `max(|Δ|·1e-6, 8·Epsilon)`，early-return **永不触发**（初版「第二项极大」的说法方向相反） |
| `*ReadyBlockRT` 的消费者 | 已解：字段名带 `Ready` 的 RT 通过 **`_DisabledNormalBlockRT` / `_DisabledSubtractBlockRT`** sampler 被 `activeBlockMaterial` / `blockReadyMaterial` 采样（初版「无 GLSL 采样」错误——只是 RT 字段名与 sampler 名不同） |
| `renderer.color` 的 RGB | 已解：全代码仅两处写 `renderer.color`——`UpdateBlockActivation` 只改 `.a`（减块 `0.1`），`DisabledBlockShow` 用 `(1,1,1,*)`；故 **RGB 恒为 `(1,1,1)`** |
| 块相机投影 | 已解：7 台全 **正交**、`orthographicSize = 5.0`（`sharedassets12` pathID 195–201）、`localScale=1`；`PreviewElementUpdateControl.Awake` 定 `screenHeight=2·orthoSize`、`screenWidth=·aspect` ⇒ `screenWidth/Height` 是**世界单位**（≈17.78×10）**非像素**；初版「5.0 必被覆盖 / 1 单位=1 像素」均错误 |
| `formatVersion` / `offset` 与块时间轴 | 已解：`DestroyAndCreateAllBlocks` 把 `chart.blockAreaList[i]` **直接**赋给 `blockInfo`（不加 offset、不看 formatVersion）；块时间与 `progressControl.nowTime` 比较，而 `nowTime = audioTime − levelInformation.offset`（`ProgressControl` `0x90`）。故只有**关卡级 offset** 经时钟整体平移，`formatVersion` 与块无关 |
| 触摸按住的块被销毁时的路径 | 已解：**无专门路径**。`DestroyAfterInterval`(`0x1D70B10`) 仅在 `now > max(disableTime, disappearTime) + destroyInterval(5.0)` 时 `Object.Destroy(gameObject)`；届时块早已 `IsActive=false`、不会被 `TryGetBlockingBlock` 命中。触摸悬停槽由 `fingerId` 驱动、经 `EndTouchBlockFrame` 释放，与块生命周期无关；`BlockRender.OnDestroy`(`0x1D1DB54`) 只释放 `totalRT`/清相机 `targetTexture`，不碰触摸槽位 |
| `DisabledBlockReady` / `DisabledBlockShow` 协程 | 已解：Ready 先切 `readyLayer` → `WaitForSeconds(disabledBlockReadyDuration)` → 切 `enabledLayer`；Show 按 `disabledBlockShowDuration` 线性淡入颜色（普通 `(1,1,1,0)→(1,1,1,1)`，减块 `(1,0,1,0.1)→(1,1,1,0.1)`） |
| `TouchBlockBehavior.Animation` | 已解：`Vector3.Lerp(start,end,Clamp01(t/animationDuration))`；缩放起/终点 = **`Vector3.zero`**（静态单例 `0x413DAF0` → 元数据槽 `Vector3_TypeInfo` 首字段）；Hide 收尾时把 `position` 归到 `idlePosition` |
| 缓动表是否与游戏一致 | 已由 `GetEase.Instantiation`（VA `0x1CAE478`）反汇编复核：`E[idx]=u^n`、`E[idx+1]=1-(1-u)^n`，`idx∈{1,4,7,10}`、`n=idx/3+2`；`3/6/9=0`、`12=分段`、`13=0`、`14=1` |
| `Unlit/ActiveBlock` 完整解析 | 已逐段读出，见 [`render.md` ActiveBlock](./render#unlitactiveblock--主着色器汇总合成)：入口水平 `discard`、`_ReadyComposeRT` 预备亮度、火花 HSV 色相偏移、触摸 SDF 层、`glowAdj` / `alpha` 公式 |
| 材质 `_ST` / 贴图导入设置 | 已读出，见 [`materials.md`](./materials.md)。**全部 Point 过滤**；`_ST` 各向异性（`x ≠ y`）；active `_DisplaceMap` (0.8,0.3)、`_SparkMap` (3.0,1.2)、`_NoiseMap` (1.5,1.46)，compose `_DisplaceMap` (2.13,1.02)；`FD_Noise`/`BlockNoise1` 为 **Mirror**，仅 `PointNoise` 为 `Repeat` |

## 一句话结论

- **行为逻辑**：阶段 1–6 已还原并可复现。
- **画面**：着色器源码已获取，遮罩与合成结构完整。
- **仍缺**：无（评审清单已闭合）；客观差距见上文「数据来源」。

---

提取出的资产版权归 **南京鸽游网络有限公司**（Pigeon Games）所有，仅供技术研究。