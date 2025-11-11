# Rizline谱面文件格式说明

Rizline谱面文件采用 `JSON` 格式储存， 可以使用任何文本编辑器编写、修改

::: warning WARNING

部分内容摘自 `Lchzh Docs`

该格式说明仅供参考，笔者不能完全保证其准确性

:::

### 附加
[过渡类型](./easeType.md)

## 定义

接下来我们规定：

$W$ 为游戏画面宽度，$H$ 为游戏画面高度

$tick$ 为时间，单位为 $\frac{60}{BPM}$s

::: tip TIP
Rizline 谱面文件中，原点为($\frac{W}{2}$, $\frac{H}{2} + 200$)，$X$ 轴向右为正方向，$Y$ 轴向下为正方向

所有事件均为 **关键帧**

所以第 $K$ 个事件与第 $K+ 1$ 的事件保持连接，即第 $K$ 个事件的结束时间为第 $K+ 1$ 个事件的开始时间。其中 $K$ 为当前事件序号
:::
## 文件结构

**· fileVerison** `int` : 文件版本号，目前已知的类型为 `0` 和 `1`，作用不明

::: details Tips:
到目前为止，仅在 `Tempest` 的 `IN` 难度谱面为 `1` ，在其他谱面均为 `0`，且该谱面与其他谱面没有什么区别
:::

**· songsName** `string` : 歌曲名，目前作用不明，仅在部分谱面中是正确命名，其余谱面均为 `""` 空字符串

**· themes** `array` : 记录谱面使用的主题

**· challengeTimes** `array` : 记录谱面的 `Riztime` 发生时间

**· bPM** `float` : 谱面 BPM，每分钟节拍数

**· bpmShifts** `array` : 记录谱面 BPM 变化时间

**· offset** `float` : 谱面延迟，目前仅为 `0.0`

**· lines** `array` : 记录谱面所有的线

**· canvasMoves** `array` : 记录谱面中所有的画布和画布事件

**· cameraMove** `object` : 记录谱面中摄像机移动事件


## themes 主题

该列表第一项为谱面常规主题，其余都是 `Riztime` 主题

**· colorsList** `array` : 记录主题使用的颜色

::: details Tips:
**·** 该列表包含三个元素，分别表示背景颜色、音符颜色、血条/特效颜色
```json
"colorsList": [
    {   // 背景颜色
        "r": 255,
        "g": 255,
        "b": 255,
        "a": 255
    },
    {   // 音符颜色
        "r": 254,
        "g": 212,
        "b": 212,
        "a": 255
    },
    {   // 血条/特效颜色
        "r": 217,
        "g": 217,
        "b": 217,
        "a": 255
    }
]
```
:::

## 挑战时间（`Riztime`） ChallengeTime

在**开始时刻**，动画从屏幕正下方开始以半圆的形状逐渐扩展，经过一段**过渡时间**切换到对应的挑战主题；在**结束时刻**，动画从屏幕正上方开始以半圆的形状逐渐收缩，经过一段**过渡时间**回到初始主题。动画重叠时以最上层的动画为准

**· checkPoint** `float` : 检查点，作用不明

**· start** `float` : 开始时刻，单位为 $tick$

**· end** `float` : 结束时刻，单位为 $tick$

**· transTime** `float` : 过渡时间，单位为 秒 $s$

## bpmShifts BPM 变化

**· time** `float` : 变化时刻，单位为 $tick$

**· value** `float` : 比例系数，实际 **BPM** 为 $value \times bPM$

**· easeType** `int` : 变化类型，没有实际意义，目前仅为 `0`

**· floorPosition** `float` : 累计值（单位为 秒 $s$），表示**time**时刻的累计偏移量

## 线 Lines

**· linePoints** `array` : 记录线的点

**· notes** `array` : 记录线的音符

**· judgeRingColor** `object` : 记录线的判定圈颜色

**· lineColor** `object` : 记录线的判定线颜色

::: details Tips:
判定圈颜色和线颜色格式如下
```json
"judgeRingColor / lineColor": [
    {
        "startColor": {
            "r": 191,
            "g": 191,
            "b": 191,
            "a": 0
        },
        "endColor": {
            "r": 191,
            "g": 191,
            "b": 191,
            "a": 255
        },
        "time": 4.0
    }
]
```
**· startColor** `object` : 起始颜色

**· endColor** `object` : 终止颜色

**· time** `float` : 变化时刻，单位为 $tick$

颜色变化为 **线性变化**，即从 `startColor` 到 `endColor` 变化。
::: warning WARNING
注意不是瞬间变化，起始时间为 `time` 时刻，结束时间为第 $k + 1$ 个事件的 `time` 时刻，其中 $k$ 为当前事件的序号
:::

::: details 判定圈和线的实际颜色:
生效时对应的 `rgba` 通道与线点的 `rgb` 通道混合，同时保留线点的 `a` 通道；否则线点的 `rgba` 通道颜色不变

示例代码：
```javascript
/**
 * 获取当前时间点的线颜色
 * @param {Number} tick - 当前时间点
 * @param {Array} pointColor - 线颜色列表
 * @param {Array} lineColor - 判定线颜色列表
 * @returns {Object} 当前时间点的线颜色
 */
function calculateMixedColor(tick, pointColor, lineColor) {
  // 如果线颜色列表为空，直接返回点颜色
  if (!lineColor || lineColor.length === 0) {
    return { ...pointColor };
  }
  
  // 获取当前时间点的线颜色
  const currentLineColor = getCurrentLineColor(lineColor, tick);
  
  // 如果当前时间在第一个颜色点之前，返回点原色
  if (!currentLineColor) {
    return { ...pointColor };
  }
  
  // 使用mixColor函数混合线颜色和点颜色，点的a通道作为混合权重
  return mixColor(pointColor, currentLineColor);
}
/**
 * 混合两种颜色
 * @param {Object} color1 - 第一种颜色 {r, g, b, a}
 * @param {Object} color2 - 第二种颜色 {r, g, b, a}
 * @returns {Object} 混合后的颜色
 */
function mixColor({ r: r1, g: g1, b: b1, a: a1 }, { r: r2, g: g2, b: b2, a: a2 }) {
  // 边界情况处理
  if (a2 === 0) return { r: r1, g: g1, b: b1, a: a1 };
  if (a2 === 255) return { r: r2, g: g2, b: b2, a: a1 };
  
  // 计算混合比例并应用
  const mixRatio = a2 / 255;
  return { 
    r: Math.round(r1 + (r2 - r1) * mixRatio), 
    g: Math.round(g1 + (g2 - g1) * mixRatio), 
    b: Math.round(b1 + (b2 - b1) * mixRatio), 
    a: a1
  };
}
/**
 * 从lineColor数组中根据当前时间获取线的插值颜色
 * @param {Array} lineColor - 线颜色数组，每个元素包含startColor, endColor, time
 * @param {number} tick - 当前时间点
 * @returns {Object|null} 插值后的颜色 {r, g, b, a}，如果无有效颜色返回null
 */
function getCurrentLineColor(lineColor, tick) {
  // 处理空数组情况
  if (!lineColor || !Array.isArray(lineColor) || lineColor.length === 0) {
    return null;
  }
  if (lineColor.length === 1) {
    return lineColor[0].startColor;
  }
  if (tick >= lineColor[lineColor.length - 1].time) {
    return lineColor[lineColor.length - 1].endColor;
  }

  // 转换为时间片段结构
  const colorSegments = lineColor.map((segment, index) => {
    const nextSegment = lineColor[index + 1];
    return {
      startSeconds: segment.time,
      endSeconds: nextSegment ? nextSegment.time : segment.time,
      startColor: segment.startColor,
      endColor: segment.endColor
    };
  });

  // 调用通用的时间颜色插值函数
  return getCurrentColor(colorSegments, tick);
}

/**
 * 通用的时间颜色插值函数
 * @param {Array} colorSegments - 颜色片段数组，每个包含startSeconds, endSeconds, startColor, endColor
 * @param {number} nowSeconds - 当前时间
 * @returns {Object|null} 插值后的颜色
 */
function getCurrentColor(colorSegments, nowSeconds) {
  // 空数组处理
  if (!colorSegments || !Array.isArray(colorSegments) || colorSegments.length === 0) {
    return null;
  }
  
  // 默认取第一个片段的起始颜色
  let currentColor = { ...colorSegments[0].startColor };
  
  // 遍历颜色片段寻找当前时间所在的区间
  for (const segment of colorSegments) {
    // 时间在当前片段结束之后，继续检查下一个
    if (nowSeconds > segment.endSeconds) {
      continue;
    }
    
    // 时间在当前片段开始之前，使用默认颜色并退出循环
    if (nowSeconds < segment.startSeconds) {
      break;
    }
    
    // 计算在当前片段中的时间比例（避免除以零）
    const duration = segment.endSeconds - segment.startSeconds;
    const progress = duration > 0 ? (nowSeconds - segment.startSeconds) / duration : 1;
    
    // 计算RGBa各通道的插值
    currentColor = interpolateColor(segment.startColor, segment.endColor, progress);
    break;
  }
  
  return currentColor;
}

/**
 * 颜色插值辅助函数
 * @param {Object} startColor - 起始颜色
 * @param {Object} endColor - 结束颜色
 * @param {number} progress - 插值进度（0-1）
 * @returns {Object} 插值后的颜色
 */
function interpolateColor(startColor, endColor, progress) {
  return {
    r: Math.round(startColor.r + (endColor.r - startColor.r) * progress),
    g: Math.round(startColor.g + (endColor.g - startColor.g) * progress),
    b: Math.round(startColor.b + (endColor.b - startColor.b) * progress),
    a: Math.round(startColor.a + (endColor.a - startColor.a) * progress)
  };
}
```
:::

## 画布和画布事件 CanvasMoves

该列表项目数等于谱面中画布 `Canvas` 的个数（需要验证），每个项目包含以下属性：

**· index** `int` : 画布序号，从 `0` 开始

**· xPositionKeyPoints** `array` : 记录画布 X 轴位置变化事件

**· speedKeyPoints** `array` : 记录画布速度变化事件

## 相机移动 CameraMove

**· scaleKeyPoints** `array` : 记录相机缩放变化事件

**· xPositionKeyPoints** `float` : 相机 X 轴位置
::: info INFO
注意视觉上的移动方向与其数值增减相反，可以理解为谱面实际位置不变而相机移动
:::

## 线点 LinePoint

**· time** `float` : 事件时刻，单位为 $tick$

**· canvasIndex** `int` : 画布序号，从 `0` 开始

**· xPosition** `float` : 线点 X 轴位置

**· floorPosition** `float` : 累计值（单位 $H$），表示该线点在对应图层中相对于初始时刻的累计垂直距离，通过该线点所在图层的 `speedKeyPoints` 计算而来

**· color** `object` : 线点颜色

**· easeType** `int` : 过渡类型，记录该线点与下一个线点之间连线的水平位置的[过渡类型](./easeType.md)

## 音符 Note

**· time** `float` : 打击时刻，单位为 $tick$

**· type** `int` : 音符类型，目前仅有 `0` `1` `2` 三种类型

**· floorPosition** `float` : 累计值（单位 $H$），表示该音符在对应图层中相对于初始时刻的累计垂直距离，通过该音符所在图层的 `speedKeyPoints` 计算而来

**· otherInformations** `array` : 附加信息列表，对于非 `Hold` 音符，该列表为空数组，对于 `Hold` 音符，该列表有 `3` 个元素，分别表示 `Hold` 尾的 `time` 、`canvasIndex` 和 `floorPosition`

## 关键点 KeyPoint

**· time** `float` : 事件时刻，单位为 $tick$

**· value** `float` : 事件值
::: info INFO
对于 `xPositionKeyPoints` 单位为 $W$

对于 `speedKeyPoints` 单位为 $H$

对于`scaleKeyPoints`，`value` 记录缩放比例，无单位
:::

**· easeType** `int` : 过渡类型，记录该事件与下一个事件之间的[过渡类型](./easeType.md)
::: info INFO
对于 `speedKeyPoints` 该值固定为 `0` 且无意义 （线性）
:::

**· floorPosition** `float` : 累计值
::: details floorPosition的计算:
大概公式为：

第 0 个事件的 `floorPosition` 等于 `0`

所以我们要求 $k >= 1$

$floorPosition = floorPosition_{k-1} + (time - time_{k-1}) \times value_{k}$
```javascript
function findSpeedValue(tick, events) {
    // 处理空列表情况
    if (events.length === 0) {
        return 0; // 或根据业务需求返回合理的默认值
    }
    
    // 统一转换为秒单位，避免重复计算
    const targetTime = tickToSeconds(tick);
    const processedEvents = events.map(event => ({
        ...event,
        timeInSec: tickToSeconds(event.time)
    })).sort((a, b) => a.timeInSec - b.timeInSec); // 确保事件按时间排序
    
    // 处理列表只有一项的情况
    if (processedEvents.length === 1) {
        const event = processedEvents[0];
        // 如果时间在关键帧之后，应用变化率；之前则返回0
        if (targetTime >= event.timeInSec) {
            return event.fp + (targetTime - event.timeInSec) * event.value;
        } else {
            return 0;
        }
    }
    
    // 处理时间大于最后一项的情况
    const lastEvent = processedEvents[processedEvents.length - 1];
    if (targetTime > lastEvent.timeInSec) {
        // 应用最后一项的变化率，而不是固定返回fp
        return lastEvent.fp + (targetTime - lastEvent.timeInSec) * lastEvent.value;
    }
    
    // 二分查找找到对应的区间
    let left = 0;
    let right = processedEvents.length - 1;
    let event1 = null;
    let event2 = null;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const midEvent = processedEvents[mid];
        
        if (midEvent.timeInSec === targetTime) {
            // 恰好找到匹配的时间点
            return midEvent.fp;
        } else if (midEvent.timeInSec < targetTime) {
            // 当前中间点时间小于目标时间，继续向右查找
            event1 = midEvent;
            left = mid + 1;
        } else {
            // 当前中间点时间大于目标时间，继续向左查找
            event2 = midEvent;
            right = mid - 1;
        }
    }
    
    // 如果找到了对应的区间，返回计算值
    if (event1 && event2) {
        return event1.fp + (targetTime - event1.timeInSec) * event1.value;
    }
    
    // 兜底返回（理论上不会走到这里）
    return 0;
}
```
:::

## y坐标计算

$Y$ 坐标计算公式为：

$Y = floorPosition \times scale \times (\frac{215}{32} + speed) \times \frac{10}{129}$

其中 $floorPosition$ 为当前事件的 `floorPosition` 与当前 `speedkeyPoint` 的 `floorPosition` 的差值

$floorPosition = floorPosition_{k} - floorPosition_{speedKeyPoint}$

$scale$ 为当前相机缩放比例

$speed$ 为谱面流速