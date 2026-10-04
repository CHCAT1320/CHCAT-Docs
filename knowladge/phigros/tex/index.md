# 贴图资源

4 张块系统贴图，从 `sharedassets12.assets` 导出。**全部为 Point 过滤**；Wrap 模式与 sRGB 设置见 [材质细节](../materials.md)。

| 贴图 | 尺寸 | 用途 |
| --- | --- | --- |
| [Block.png](./Block.md) | 32×32 | `BlockSprite._MainTex`（块本体，Clamp/sRGB）。 |
| [BlockNoise1.png](./BlockNoise1.md) | 256×256 | `_DisplaceMap` / `_TouchDisplaceMap`（位移，Mirror/sRGB）。 |
| [PointNoise.png](./PointNoise.md) | 128×128 | `_SparkMap`（火花，Repeat/Linear）。 |
| [FD_Noise.png](./FD_Noise.md) | 256×256 | `_NoiseMap`（触摸层噪声，Mirror/Linear）。 |

> 返回 [BlockArea 总览](../index.md)。
