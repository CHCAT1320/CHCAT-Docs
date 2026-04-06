# CH-RZL-EDIT 谱面文件格式说明

CH-RZL-EDIT 谱面文件采用 `JSON` 格式储存， 可以使用任何文本编辑器编写、修改

::: warning WARNING
请谨慎将官方谱面转换为 `CRE` 格式，可能会出现不可预知的问题！！！
:::

## 文件结构

**· meta** `string`: 储存谱面基本信息

**· themes** `array`: 储存谱面主题

**· rizTime** `array`: 储存谱面riztime

**· bpmList** `array`: 储存谱面bpm变化

**· lines** `array`: 储存谱面线条

**· canvases** `array`: 储存谱面画布

**· camera** `object`: 储存谱面摄像机事件

## meta

**· CREVersion** `int`: 记录谱面制作时 `CH-RZL-EDIT` 版本号

**· charter** `string`: 谱师

**· illustrator** `string`: 曲绘作者

**· level** `string`: 谱面难度

**· name** `string`: 谱面名称

**· musician** `string`: 曲师

**· offset** `float`: 谱面偏移

## themes

**· backgroundColor** `array`: 背景颜色

**· noteColor** `array`: 谱面颜色

**· effectsColor** `array`: 特效颜色

## rizTime

**· startTime** `float`: 开始时间

**· endTime** `float`: 结束时间

**· transTime** `float`: 过渡时间

## bpmList

**· time** `float`: bpm变化开始时间

**· bpm** `float`: bpm值

## lines

**· linePoints** `array`: 线条点

**· notes** `array`: 谱面音符

**· judgeRingColors** `array`: 判定圈颜色

**· lineColors** `array`: 线条颜色

## canvases

**· moveXEvents** `array`: x移动事件

**· speedEvents** `array`: 速度事件

## camera

**· moveXEvents** `array`: x移动事件

**· scaleEvents** `array`: 缩放事件

<audio controls src="./前面的区域以后再来探索吧.wav"></audio>