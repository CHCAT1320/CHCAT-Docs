---
title: RYCEAM 谱面格式说明
---

# RYCEAM 谱面格式说明

RYCEAM 谱面是**逐行文本**格式：每一行是一条记录，字段之间用空白分隔，时间统一使用**拍（beat）**而不是秒。常见扩展名有 `.rym`、`.rea` 和 `.txt`。

::: warning 来源与适用范围
本文由逆向整理，非官方定义。依据为 `libil2cpp.so` 的 Il2CppDumper `dump.cs`、Ghidra 反编译得到的 `ChartFormatV4Reader` / `ChartFormatV5Reader`，并与实际谱面样本交叉验证。

游戏里常见的文件版本是 `#4` 与 `#5`。少量谱面不是明文行格式（疑似加密或压缩），不在本文范围内。
:::

## 字符替换

谱面在读取前会先对**整个文件**做一次单字符替换。替换表如下：

| 文件中的字符 | 解码后的字符 |
| :---: | :---: |
| `&` | `7` |
| `(` | `2` |
| `)` | `3` |
| `+` | `-` |
| `-` | `.` |
| `/` | `9` |
| `<` | `5` |
| `>` | `6` |
| `_` | `4` |
| `{` | `0` |
| `\|` | `8` |
| `}` | `1` |

其余字符保持不变。解码后的内容才是后文描述的行记录。

例如 `0000.txt` 的开头：

```text
#_
! +(<
@,? )_{
^? }
^ { }&{
:? |
: { +} +} { +} { }
```

解码后为：

```text
#4
! -25
@,? 340
^? 1
^ 0 170
:? 8
: 0 -1 -1 0 -1 0 1
```

再看一条音符和一条轨道事件：

```text
, { } )> { { { } } { +} { { { {
] { { { { { }{ }{ { { } +}
```

解码后：

```text
, 0 1 36 0 0 0 1 1 0 -1 0 0 0 0
] 0 0 0 0 0 10 10 0 0 1 -1
```

::: tip 浮点数格式
数值使用不变文化（invariant culture）解析，小数点为 `.`，不要写成 `,`。
:::

## 文件结构

一条谱面通常按下面的顺序组织。带 `?` 的记录用于预分配数组，建议出现在对应数据行之前。

```text
#<version>                 文件版本
! <offsetMs>               谱面偏移，毫秒
@,? <noteCount>            声明音符数

^? <bpmCount>              BPM 段数
^ <beat> <bpm>             BPM 段

:? <trackCount>            轨道数
$? <transformCount>        变换节点数（V5）
$ ...                      变换节点（V5）
: ...                      轨道

[? <track> <layerCount>    轨道事件层数
]? <track> <layer> <eventType> <count>
] ...                      轨道事件

,? <track> <noteCount>     轨道音符数
, ...                      音符

% <cameraParentTrack>      相机父轨道（V4）
%]? <eventType> <count>
%] ...                     相机事件

~? <storyboardCount>       故事板数量
~ ...                      故事板配置
~]? <storyboard> <eventType> <count>
~] ...                     故事板事件

=? <customEasingCount>     自定义缓动数量
= ...                      自定义缓动

;? <effectCount>           特效 shader 数量（V5）
; ...                      特效 shader 头（V5）
;s ...                     特效状态（V5）
;e ...                     特效事件（V5）
```

记录可以按实际需要省略没有数据的部分，但数据行应位于其 `?` 头之后。未识别的记录应跳过。

## 时间与 BPM

### 偏移

```text
! <offsetMs>
```

`offsetMs` 是整数毫秒。读取后：

$$
\text{offset} = \frac{\text{offsetMs}}{1000}
$$

单位为秒。游戏读取时可能还会叠加或扣除音频偏移；如果没有该信息，直接除以 1000 即可。

### BPM 段

```text
^? <bpmCount>
^ <changeBeat> <bpm>
```

- `changeBeat`：该 BPM 段开始的拍数。
- `bpm`：该段的 BPM。
- 读取后按 `changeBeat` 升序排序；若没有任何 BPM 段，默认 `120 BPM`。

每段的 `duration` 是它开始前的累计秒数（不含 `offset`）。给定拍数求秒：

$$
\text{time}(b) =
\begin{cases}
b \cdot \dfrac{60}{\text{bpm}_0} - \text{offset}, & b < \text{changeBeat}_0 \\[6pt]
g.\text{duration} + (b - g.\text{changeBeat}) \cdot \dfrac{60}{g.\text{bpm}} - \text{offset}, & \text{否则}
\end{cases}
$$

其中 $g$ 是满足 $g.\text{changeBeat} \le b$ 的最后一个 BPM 段。

反向换算：

$$
\text{beat}(t) = g.\text{changeBeat} + (t + \text{offset} - g.\text{duration}) \cdot \frac{g.\text{bpm}}{60}
$$

### 音符与长条

- 音符的 `hitTime` 为 `time(hitBeat)`。
- `holdBeat` 是**持续拍数**，不是结束拍：

$$
\text{holdTime} = \text{time}(\text{hitBeat} + |\text{holdBeat}|) - \text{hitTime}
$$

非 Hold 音符的 `holdBeat` 为 `0`。

## 轨道

### 轨道定义

V4：

```text
: <index> <parent> <bindingEventIndex> <bindingEventOffset> <bindingJudgementIndex> <noteSpeedFixing> <disableJudgement>
```

V5：

```text
: <index> <bindingEventIndex> <bindingEventOffset> <bindingJudgementIndex> <noteSpeedFixing> <disableJudgement>
```

| 字段 | 说明 |
| --- | --- |
| `index` | 轨道下标，从 0 开始 |
| `parent` | 父轨道下标，`-1` 为根（仅 V4；V5 由 `$` 定义） |
| `bindingEventIndex` | 绑定的另一条轨道下标，`-1` 为不绑定 |
| `bindingEventOffset` | 绑定事件的时间偏移，单位拍 |
| `bindingJudgementIndex` | 判定绑定轨道/组的索引，具体由运行时处理 |
| `noteSpeedFixing` | 为 `1` 时音符速度不乘全局速度 |
| `disableJudgement` | 为 `1` 时该轨道不参与判定 |

一个轨道可以绑定另一条轨道的事件层：求值时会把被绑定轨道的事件层在 `beat + bindingEventOffset` 处叠加到本轨道上。

### 事件层与事件数组

```text
[? <track> <layerCount>
]? <track> <layer> <eventType> <count>
] <track> <layer> <eventType> <payload>
```

- `[?` 预分配 `layerCount` 个事件层；每层固定有 12 个事件数组。
- `]?` 预分配某个 `(track, layer, eventType)` 的事件数组。
- `]` 写入一条事件。

`payload` 为 8 个字段：

```text
<startBeat> <endBeat> <startValue> <endValue> <ease> <startRange> <endRange> <customEaseIndex>
```

| 字段 | 说明 |
| --- | --- |
| `startBeat` / `endBeat` | 起止拍数 |
| `startValue` / `endValue` | 起止值 |
| `ease` | 缓动类型，见[缓动枚举](#缓动枚举) |
| `startRange` / `endRange` | 缓动曲线的取值区间，默认 `0` / `1` |
| `customEaseIndex` | 自定义缓动下标，`-1` 表示不使用 |

`ease` 与 `startRange` / `endRange` 的关系：

- 先按 `ease` 计算曲线；
- 若取值区间不是 `[0, 1]`，在 `[startRange, endRange]` 内采样并归一化；
- 若 `customEaseIndex >= 0`，使用对应自定义缓动，并**忽略** `ease` 与区间。

### 轨道事件类型

::: danger 6 与 7 的顺序
轨道事件的 `6` 是 **Scale**，`7` 是 **Alpha**，不要写反。
:::

| 编号 | 事件 | 合成方式 | 说明 |
| :---: | --- | --- | --- |
| 0 | MoveX | 相加 | 轨道局部 X 偏移 |
| 1 | MoveY | 相加 | 轨道局部 Y 偏移 |
| 2 | MoveZ | 相加 | 轨道局部 Z 偏移 |
| 3 | RotateX | 相加 | 绕 X 轴旋转 |
| 4 | RotateY | 相加 | 绕 Y 轴旋转 |
| 5 | RotateZ | 相加 | 绕 Z 轴旋转 |
| 6 | Scale | 相乘 | 轨道/音符缩放，运行时常用 `NowScale = Scale * 10` |
| 7 | Alpha | 相加 | 透明度，最终钳制到 `0..1` |
| 8 | Speed | 时间积分 | 音符滚动速度 |
| 9 | GlobalScale | 相乘 | 整个轨道组的缩放 |
| 10 | JudgeScale | 相乘 | 判定相关缩放 |
| 11 | JudgeOffset | 相加 | 判定相关偏移 |

`Speed` 不是简单的数值叠加，而是对时间积分得到音符走过的距离；多个层的结果相加。

## 音符

### 音符列表

```text
,? <track> <noteCount>
, <track> <type> <hitBeat> <holdBeat> <dflickKey> <dflickNum> <localSpeed> <localAlpha> <attribute> <bindingEventIndex> <bindingEventOffset> <posX> <posY> [posZ [rotX rotY rotZ]]
```

`posZ` 与旋转字段可以省略：

- 14 个字段（包含 `,`）：到 `posY` 为止；
- 15 个字段：额外包含 `posZ`；
- 18 个字段：包含 `posZ`、`rotX`、`rotY`、`rotZ`。

省略的字段按 `0` 处理。

| 字段 | 说明 |
| --- | --- |
| `track` | 所属轨道下标 |
| `type` | 音符类型 |
| `hitBeat` | 判定拍数 |
| `holdBeat` | Hold 持续拍数；其他类型为 `0` |
| `dflickKey` | DFlick 链的分组键 |
| `dflickNum` | DFlick 链内的顺序 |
| `localSpeed` | 音符局部速度倍率 |
| `localAlpha` | 音符局部透明度 |
| `attribute` | 属性位掩码 |
| `bindingEventIndex` | 绑定的轨道下标 |
| `bindingEventOffset` | 绑定事件的时间偏移，单位拍 |
| `posX` / `posY` / `posZ` | 相对轨道的局部位置偏移 |
| `rotX` / `rotY` / `rotZ` | 相对轨道的局部旋转偏移 |

### 音符类型

| 值 | 类型 |
| :---: | --- |
| 0 | Click |
| 1 | Drag |
| 2 | DFlick |
| 3 | Hold |
| 4 | Flick |

### 音符属性

`attribute` 是位掩码：

| 位 | 名称 | 说明 |
| :---: | --- | --- |
| 1 | `IsFake` | 假音符，不参与判定 |
| 2 | `IsNoHitSound` | 不播放打击音 |
| 4 | `IsNoHitEffect` | 不播放打击特效 |

可以按位或组合，例如 `3` 表示假音符且不播放打击音。

### DFlick

DFlick 音符（`type = 2`）通过 `dflickKey` 与 `dflickNum` 连接：

- 相同 `dflickKey` 的 DFlick 按 `dflickNum` 升序排列；
- 相邻两个音符之间绘制连接线；
- `dflickNum = 0` 使用链头贴图；非 `0` 使用链尾贴图；
- `dflickKey = 0` 也是合法分组。部分解析器会把 `0` 当作无效键，但实际谱面中存在 `key = 0` 的链，建议按普通键处理。

### 音符绑定

`bindingEventIndex` 指向另一条轨道；求值时把该轨道的事件层在 `beat + bindingEventOffset` 处叠加到音符的位置、旋转与透明度上。`-1` 表示不绑定。

`localSpeed` 会再乘以全局音符速度；若所属轨道的 `noteSpeedFixing = 1`，则不乘全局速度。

## 相机

### 相机父轨道

V4：

```text
% <parentTrackIndex>
```

`parentTrackIndex >= 0` 时，相机基准位置和旋转复制该轨道；`-1` 表示自由相机。自由相机基准位置为 `(0, 0, -10)`。

V5 通常由 `$` 的 Camera 节点确定相机层级，不再使用 `%`。

### 相机事件

```text
%]? <eventType> <count>
%] <eventType> <payload>
```

| 编号 | 事件 |
| :---: | --- |
| 0 | MoveX |
| 1 | MoveY |
| 2 | MoveZ |
| 3 | RotateX |
| 4 | RotateY |
| 5 | RotateZ |
| 6 | FOV |

位置与旋转是对基准相机的**局部偏移**。FOV 事件的值是绝对 FOV，默认 `60`，上限为 `179`，下限由运行时或播放器决定（常见为 `1`）。绑定相机只复制父轨道的位置与旋转，不复制缩放。

## 故事板

```text
~? <storyboardCount>
~ <index> <scaleX> <scaleY> <scaleZ> [parentIndex]
~]? <storyboard> <eventType> <count>
~] <storyboard> <eventType> <payload>
```

- `~` 配置故事板整体缩放系数，默认 `1`；V4 可以额外给出父故事板下标，V5 由 `$` 定义层级。
- `~]?` / `~]` 写入故事板事件，`payload` 与轨道事件相同。

| 编号 | 事件 |
| :---: | --- |
| 0 | MoveX |
| 1 | MoveY |
| 2 | MoveZ |
| 3 | RotateX |
| 4 | RotateY |
| 5 | RotateZ |
| 6 | ScaleX |
| 7 | ScaleY |
| 8 | ScaleZ |
| 9 | ColorR |
| 10 | ColorG |
| 11 | ColorB |
| 12 | Alpha |
| 13 | Frame |

故事板的具体资源（贴图、模型、帧动画等）由谱面外部配置决定；谱面文本只描述这 14 条事件通道。

## 自定义缓动

```text
=? <customEasingCount>
= <index> <type> <data...>
```

| `type` | 数据 | 说明 |
| :---: | --- | --- |
| 0 | `x1 y1 x2 y2` | CSS 风格三次贝塞尔曲线，隐式起点 `(0,0)`、终点 `(1,1)` |
| 1 | 若干采样值 | 采样曲线表，按 `t` 在表中线性插值 |

`type 1` 的求值方式：

1. `t` 被钳制到 `[0, 1]`；
2. `position = t * (len - 1)`；
3. 取相邻两个采样值做线性插值。

轨道/相机/故事板事件中的 `customEaseIndex` 指向这里的下标。

### 缓动枚举

| 值 | 名称 | 值 | 名称 |
| :---: | --- | :---: | --- |
| 0 | Linear | 1 | InSine |
| 2 | OutSine | 3 | InOutSine |
| 4 | InQuad | 5 | OutQuad |
| 6 | InOutQuad | 7 | InCubic |
| 8 | OutCubic | 9 | InOutCubic |
| 10 | InQuart | 11 | OutQuart |
| 12 | InOutQuart | 13 | InQuint |
| 14 | OutQuint | 15 | InOutQuint |
| 16 | InExpo | 17 | OutExpo |
| 18 | InOutExpo | 19 | InCirc |
| 20 | OutCirc | 21 | InOutCirc |
| 22 | InElastic | 23 | OutElastic |
| 24 | InOutElastic | 25 | InBack |
| 26 | OutBack | 27 | InOutBack |
| 28 | InBounce | 29 | OutBounce |
| 30 | InOutBounce |  |  |

超出范围的 `ease` 在实现中通常退化为线性。

## V5 差异

### 变换树

V5 用显式的变换节点代替 V4 的父下标：

```text
$? <transformCount>
$ <type> <fatherId> <order>
```

| 字段 | 说明 |
| --- | --- |
| `type` | `0` Camera，`1` Track，`2` Storyboard |
| `fatherId` | 父节点下标，`-1` 为根 |
| `order` | 同一父节点下的排序 |

节点下标就是 `$` 行的出现顺序（从 0 开始）。例如：

```text
$? 56
$ 0 -1 0
$ 1 -1 1
$ 1 -1 2
...
```

表示节点 0 是相机，节点 1、2 是轨道。

### 轨道记录

V5 的 `:` 不再包含 `parent`：

```text
: <index> <bindingEventIndex> <bindingEventOffset> <bindingJudgementIndex> <noteSpeedFixing> <disableJudgement>
```

轨道的层级由 `$` 的 Track 节点给出。

### 特效

V5 新增后处理特效：

```text
;? <effectCount>
; <hexCipher> <stateCount> <eventCount> <paramCount>
;s <param0> ... <paramN-1>
;e <startBeat> <endBeat> <startValue> <endValue> <ease> <startRange> <endRange> <customEaseIndex>
```

- `;` 的 `hexCipher` 是 16 字节（32 个十六进制字符）的密文，游戏内解密为 `EFFECT_*` 等后处理 shader 名。
- `stateCount` 个 `;s` 行，每行有 `paramCount` 个浮点参数。
- `eventCount` 个 `;e` 行，事件字段与轨道事件相同，但没有事件类型（整个 shader 只有一组事件数组）。

已知的后处理效果名包括：

```text
EFFECT_CHROMATIC       EFFECT_CRT             EFFECT_EDGE_DETECT
EFFECT_FILM_GRAIN      EFFECT_FISHEYE         EFFECT_GLITCH
EFFECT_GRAYSCALE       EFFECT_HUE_SHIFT       EFFECT_INVERT
EFFECT_KAWASE_BLUR     EFFECT_NOISE           EFFECT_PIXELATE
EFFECT_POSTERIZE       EFFECT_RADIAL_BLUR     EFFECT_SATURATION
EFFECT_SCANLINES       EFFECT_SEPIA           EFFECT_SPLIT_SCREEN
EFFECT_VIGNETTE
```

### 故事板

V5 的 `~` 通常只保留 `index` 与三个缩放系数，父节点由 `$` 提供：

```text
~ <index> <scaleX> <scaleY> <scaleZ>
```

## 解析建议

- 先做字符替换，再按行、按空白切分。
- 把 `?` 头理解为预分配；数据行严格放在对应头之后。
- 注意事件 `6 = Scale`、`7 = Alpha`。
- 注意 `holdBeat` 是持续拍数，不是结束拍。
- `!` 的单位是毫秒，参与时间计算前要除以 1000。
- 音符尾部的 `posZ` 与旋转字段可省略，缺省为 `0`。
- `customEaseIndex = -1` 表示不使用自定义缓动。
- V4 与 V5 的 `:` 字段布局不同；先读 `#` 版本，再选择解析分支。
- 少量谱面不是明文行格式，遇到无法解码的内容应先判断是否为加密/压缩格式。
