# 着色器（GLSL）

以下 9 个文件为从 APK 提取、Unity 编译后的 **GLSL ES 3.00**，共 **13** 个 program。注意 `EdgeMask` / `GlowMask` / `BlockCompose` / `SubtractBlockBlender` 在两个 program 之间嵌了二进制记录头，一个文件含 2 个 program，无法直接编译。

| 文件 | 大小 | program | 说明 |
| --- | --- | --- | --- |
| [Unlit_BlockSprite.glsl](./Unlit_BlockSprite.md) | 2.2 KB | 1 | 块本体（`SpriteRenderer` 使用的单位 quad）。 |
| [Unlit_EdgeMask.glsl](./Unlit_EdgeMask.md) | 7.3 KB | 2 | 边缘遮罩膨胀（两轮 pass 变体）。 |
| [Unlit_GlowMask.glsl](./Unlit_GlowMask.md) | 6.2 KB | 2 | 辉光：加权膨胀 + 通道清零。 |
| [Unlit_BlockCompose.glsl](./Unlit_BlockCompose.md) | 6.0 KB | 2 | ①普通 / 减块 RT 位移扰动（输出标量）②两路遮罩合成。 |
| [Unlit_SubtractBlockBlender.glsl](./Unlit_SubtractBlockBlender.md) | 5.5 KB | 2 | 减块归属 / 覆盖度（含带 `_ComposeRT` 累减与不含两个变体）。 |
| [Unlit_ReadyBlock.glsl](./Unlit_ReadyBlock.md) | 3.3 KB | 1 | 预备态呼吸脉冲。 |
| [Unlit_DisabledBlock.glsl](./Unlit_DisabledBlock.md) | 4.5 KB | 1 | 禁用态（填充 + 火花）。 |
| [Unlit_ActiveBlock.glsl](./Unlit_ActiveBlock.md) | 25.4 KB | 1 | 主着色器，汇总所有 RT 输出最终画面。 |
| [Unlit_TouchEffect.glsl](./Unlit_TouchEffect.md) | 11.9 KB | 1 | 触摸层。 |

> 返回 [BlockArea 总览](../index.md)。
