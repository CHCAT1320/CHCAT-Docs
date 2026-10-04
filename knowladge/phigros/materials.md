---
title: BlockArea 材质与贴图（_ST / 导入设置）
---

# BlockArea 材质与贴图

本文补充 [`render.md`](./render.md) 未展开的一项：各材质对贴图的**采样方式**——
`_ST`（tiling / offset）与贴图的**导入设置**（Wrap / Filter / sRGB）。
这些值直接决定「噪声/位移/火花的频率与锐度」，缺失会导致画面频率与锐度与游戏不符。

数据来源：`sharedassets12.assets` 中 `Material.m_SavedProperties.m_TexEnvs`
与 `Texture2D.m_TextureSettings`（UnityPy **1.25.x** 读出）。

## 1. 贴图导入设置

| pathID | 名称 | 尺寸 | 格式 | colorSpace | WrapU/V | Filter | MipCount |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 15 | `FD_Noise_00000` | 256×256 | 7 | Linear | **Mirror** | **Point** | 1 |
| 16 | `Block` | 32×32 | 63 | sRGB | Clamp | **Point** | 1 |
| 17 | `PointNoise` | 128×128 | 63 | Linear | Repeat | **Point** | 1 |
| 30 | `BlockNoise1` | 256×256 | 63 | sRGB | **Mirror** | **Point** | 1 |

要点：

- **全部为 Point（Nearest）过滤**，不是 Bilinear。用线性过滤会让噪声/火花变糊，
  与游戏观感不符。
- `BlockNoise1` 是 **sRGB** 贴图（作颜色纹理），`PointNoise` / `FD_Noise` 是线性
  数据贴图。
- `Block`(16) 是 `BlockSprite` 用的块本体贴图，**Clamp** 且 sRGB。
- **`FD_Noise` 与 `BlockNoise1` 是 `Mirror` 环绕，不是 `Repeat`**（`m_WrapU/V = 2`）；
  只有 `PointNoise` 是 `Repeat`（`m_WrapU/V = 0`）。采样越界时镜像而非平铺，
  在低 `_ST` 频率下边缘表现不同。

::: danger 枚举易读错
Unity 的 `TextureWrapMode`：`0 = Repeat`、`1 = Clamp`、`2 = Mirror`。
`m_TextureSettings.m_WrapU/V` 存的是**原始数字**，不要想当然当成 `Repeat`。
上方表格已按 APK 实测逐项解码。
:::

## 2. 各材质的 `_ST`（scale.xy = tiling，offset.zw = 0）

从材质 `m_TexEnvs` 读出的 `m_Scale` 与 `m_Offset`（**所有材质的 offset 恒 `0`**）。

::: danger `_ST` 的 `x ≠ y`（各向异性）
早期版本称“`x == y`”，**与 APK 不符**。实测每个 `m_Scale` 的 `x` 与 `y` 都不同：

| 材质 (pathID) | shader | `_DisplaceMap`(30) | `_SparkMap`(17) | `_NoiseMap`(15) |
| --- | --- | --- | --- | --- |
| `activeBlockMaterial` (5) | `Unlit/ActiveBlock` | **(0.80, 0.30)** | **(3.00, 1.20)** | **(1.50, 1.46)** |
| `blockComposeMaterial` (6) | `Unlit/BlockCompose` | **(2.13, 1.02)** | — | — |
| `disabledBlockMaterial` (8) | `Unlit/DisabledBlock` | **(0.50, 0.20)** | **(3.00, 1.20)** | — |
| `touchEffectMaterial` (13) | `Unlit/TouchEffect` | **(0.55, 0.30)**（`_TouchDisplaceMap`） | — | **(1.50, 1.46)** |

> `activeBlockMaterial` 同时有 `_TouchDisplaceMap`(30) = **(0.55, 0.30)**，供触摸层使用。
> 表中 `(x, y)` 即 `_ST.xy`；顶点阶段套用 `uv * _ST.xy + _ST.zw`（`_ST.zw = 0`）。
:::

::: warning `_ST ≠ 1` 是易漏点
实现时把 `uv * _ST.xy + _ST.zw` 套上再采样，否则位移/火花的**频率**会错：
`_SparkMap.x` 差 3 倍、`_DisplaceMap.x` 差 0.8/2.13 倍；且 `x`/`y` 需分别取用，
按标量处理会让纵向频率错误。
:::

## 3. 两套彼此独立的位移系统

`render.md` 已给 `BlockCompose` program 1 的位移公式；此处强调**它和 `ActiveBlock`
的位移是两套不同参数**，不要混用：

| 用途 | 材质 | `_DisplaceMap` ST | `_DisplaceSpeed` | `_DisplaceStrength` | 像素化 |
| --- | --- | --- | --- | --- | --- |
| 遮罩位移（compose） | `blockComposeMaterial` | **(2.13, 1.02)** | **2.59** | **0.10** | 无 |
| 填充/火花位移 | `activeBlockMaterial` | **(0.80, 0.30)** | **1.50** | **0.15** | `_BackgroundPixelScale = 6.0` |

- compose 位移：对 `_NormalBlockRT` / `_SubtractBlockRT` 采样前做双正交扰动，
  **不做像素化**。
- active 位移：对填充与火花做位移，采样 `_DisplaceMap` 前用
  `floor(uv * _ScreenParams / max(_BackgroundPixelScale,1)) * scale + scale*0.5`
  做**像素化**（`_BackgroundPixelScale = 6.0`）。

## 4. 复现用参数一览（ActiveBlock）

| 参数 | 值 | 参数 | 值 |
| --- | --- | --- | --- |
| `_EdgeOpacity` | 0.80 | `_GlowIntensity` | 0.80 |
| `_FillOpacity` | 0.667 | `_FillStrength` | 0.667 |
| `_BackgroundPixelScale` | 6.0 | `_DisplaceBlendIntensity` | 0.411 |
| `_DisplaceSpeed` | 1.5 | `_DisplaceStrength` | 0.15 |
| `_SparkMapOpacity` | 5.69 | `_SparkDisplaceIntensity` | 2.39 |
| `_SparkHueShiftAmount` | 0.20 | `_DisplaceDirection` | (1,1) |
| `_SDFCellSize` | 0.11 | `_SDFMoveSpeed` | 9.3 |
| `_SDFFalloff` | 0.34 | `_SDFSmoothness` | 0.63 |
| `_NoiseRadius` | 0.48 | `_NoiseSmoothness` | 1.0 |
| `_NoiseEvoSpeed` | 0.03 | `_NoiseDirChangeSpeed` | 60.0 |
| `_NoiseDisplaceStrength` | 1.0 | `_ShineSpeed` | 37.9 |
| `_ShineBrightness` | 0.12 | | |

颜色：`_FillColor (0.713,0.235,0.235)`、`_EdgeColor (1,0.330,0.330)`、
`_GlowColor (1,0.179,0.179)`、`_SparkTint (1,0.285,0.285)`、`_NoiseTint (1,0,0)`。

## 5. 随文档附带的贴图资源

本文档附带这 4 张块系统贴图（从 `sharedassets12.assets` 的 `Texture2D` 导出，PNG）：

| 文件 | pathID | 原名 | 尺寸 | 用途 |
| --- | --- | --- | --- | --- |
| [`tex/FD_Noise.png`](./tex/FD_Noise.md) | 15 | `FD_Noise_00000` | 256×256 | `_NoiseMap`（触摸层噪声，Mirror/Linear） |
| [`tex/Block.png`](./tex/Block.md) | 16 | `Block` | 32×32 | `BlockSprite._MainTex`（块本体，Clamp/sRGB） |
| [`tex/PointNoise.png`](./tex/PointNoise.md) | 17 | `PointNoise` | 128×128 | `_SparkMap`（火花，Repeat/Linear） |
| [`tex/BlockNoise1.png`](./tex/BlockNoise1.md) | 30 | `BlockNoise1` | 256×256 | `_DisplaceMap` / `_TouchDisplaceMap`（位移，Mirror/sRGB） |

> 复现时请按上表设置 **Wrap / Filter / colorSpace**，再叠加各材质的 `_ST`。
> `Block.png` 极小（32×32），是 `BlockSprite` 采样 `.x` 通道的块遮罩来源。

## 6. 提取脚本

```python
import UnityPy
env = UnityPy.load(r"...\sharedassets12.assets")
for o in env.objects:
    if o.type.name == "Material":
        t = o.read_typetree()
        for key, v in t["m_SavedProperties"]["m_TexEnvs"]:
            print(t["m_Name"], key, v["m_Scale"], v["m_Offset"])
    elif o.type.name == "Texture2D":
        t = o.read_typetree()
        print(o.path_id, t["m_Name"], t["m_Width"], t["m_Height"], t["m_TextureSettings"])
```
