# 代码与类声明（C#）

BlockArea 相关的 C# 源文件全文。文件名不带 `decompiled` 的是 Il2CppDumper 从 `libil2cpp.so` 导出的 **IL2CPP 类声明**（各文档字段偏移与 VA 注释的来源）；带 `decompiled` 的是由 ARM64 反汇编**还原的等价 C#**，未确定处均显式标注。

| 文件 | 类型 | 说明 |
| --- | --- | --- |
| [BlockRender.cs](./BlockRender.md) | IL2CPP 声明 | 渲染核心 `BlockRender` 的类声明，含 7 台相机 / RT / 材质字段。 |
| [BlockRender.decompiled.cs](./BlockRender.decompiled.md) | 等价 C# | `Start` / `CopyReadyTouchParamsToActive` / `RenderEffects` / `LateUpdate` / `GetGlowRingWeight` / 低通 / `SubtractBlockPostProcessor`。 |
| [BlockRender_ShaderIDs.cs](./BlockRender_ShaderIDs.md) | IL2CPP 声明 | `BlockRender.ShaderIDs` 属性 ID 常量（`0x0`–`0xAC`，共 44 个）。 |
| [Chart.cs](./Chart.md) | IL2CPP 声明 | 谱面根结构 `Chart`，含私有扩展字段 `blockAreaList`。 |
| [GameInformation_BlockArea.cs](./GameInformation_BlockArea.md) | IL2CPP 声明 | 纯数据类 `GameInformation.BlockArea` 及旋转 / 移动 / 缩放事件。 |
| [GameInformation_BlockArea.decompiled.cs](./GameInformation_BlockArea.decompiled.md) | 等价 C# | `GameInformation.BlockArea.Mirror()`（VA `0x1CA32A8`，只翻 x 的水平镜像）反汇编还原。 |
| [JudgeControl.cs](./JudgeControl.md) | IL2CPP 声明 | 判定控制（音符命中；减块不参与判定）。 |
| [JudgeControl.decompiled.cs](./JudgeControl.decompiled.md) | 等价 C# | `JudgeControl` 块命中部分（`IsPositionInsideBlock` VA `0x1D22560` / `TryGetBlockingBlock` VA `0x1D22010`）。 |
| [JudgeLine.cs](./JudgeLine.md) | IL2CPP 声明 | 判定线声明。 |
| [PreviewBlockControl.cs](./PreviewBlockControl.md) | IL2CPP 声明 | 块驱动者 `PreviewBlockControl` 的类声明。 |
| [PreviewBlockControl.decompiled.cs](./PreviewBlockControl.decompiled.md) | 等价 C# | 生命周期 / 阶段 / 几何 / 插值 / 变换 / 命中 / 协程，含 `TouchBlockBehavior`。 |
| [PreviewElementUpdateControl.cs](./PreviewElementUpdateControl.md) | IL2CPP 声明 | 编辑器预览更新控制（世界视口尺寸来源）。 |
| [PreviewElementUpdateControl.decompiled.cs](./PreviewElementUpdateControl.decompiled.md) | 等价 C# | `Awake` 视口 / `CreateBlockRender` / `DestroyAndCreateAllBlocks` / `ClearAllBlocks` / `GetBlock` 反汇编还原。 |
| [SubtractBlockPostProcessor.cs](./SubtractBlockPostProcessor.md) | IL2CPP 声明 | 减块场景色扣除后处理。 |
| [TouchBlockBehavior.cs](./TouchBlockBehavior.md) | IL2CPP 声明 | 触摸标记行为（缩放动画 / 归位）。 |

> 返回 [BlockArea 总览](../index.md)。
