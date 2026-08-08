# 时间转换

将谱面坐标 `(measure, offset)` 转换为绝对秒数，支持 BPM 变化和拍号变化。

## 公式

每段（两个相邻事件之间）的时间计算公式为：

$$
\Delta t = \Delta ticks \times \frac{beats \times 60}{BPM \times resolution}
$$

其中 $beats$ 为拍号分子（每小节几拍），$resolution$ 为谱面分辨率。

## 实现

```python
def chart_time_to_seconds(
    target_measure: int,
    target_offset: int,
    bpm_events: list[tuple[int, int, float]],
    met_events: list[tuple[int, int, int, int]] | None = None,
    resolution: int = 384,
) -> float:
    """
    将谱面坐标 (measure, offset) 转换为绝对秒数。
    支持 BPM 变化和拍号变化。

    参数：
        target_measure: 目标小节号（从 0 开始）
        target_offset: 目标小节内偏移量
        bpm_events: BPM 变化事件列表，每个元素为 (measure, offset, bpm)
                    必须包含起始 BPM（measure=0, offset=0）
        met_events: 拍号变化事件列表，每个元素为 (measure, offset, numerator, denominator)
                    可选，默认全程 4/4 拍
        resolution: 每小节刻度数，默认 384

    返回：
        从谱面开始到目标位置的总秒数

    示例：
        >>> bpm_events = [(0, 0, 199.0), (4, 0, 240.0)]
        >>> chart_time_to_seconds(5, 0, bpm_events)
        5.824120603015075
    """
    if met_events is None:
        met_events = [(0, 0, 4, 4)]

    bpm_events = sorted(bpm_events, key=lambda e: (e[0], e[1]))
    met_events = sorted(met_events, key=lambda e: (e[0], e[1]))

    all_points = sorted(
        {(e[0], e[1]) for e in bpm_events} | {(e[0], e[1]) for e in met_events},
        key=lambda p: (p[0], p[1]),
    )

    target_ticks = target_measure * resolution + target_offset
    total_seconds = 0.0

    def get_bpm(m: int, o: int) -> float:
        current = bpm_events[0][2]
        for e in bpm_events:
            if (e[0], e[1]) <= (m, o):
                current = e[2]
            else:
                break
        return current

    def get_beats(m: int, o: int) -> int:
        current = met_events[0][2]
        for e in met_events:
            if (e[0], e[1]) <= (m, o):
                current = e[2]
            else:
                break
        return current

    for i in range(len(all_points)):
        seg_start_m, seg_start_o = all_points[i]
        seg_start_ticks = seg_start_m * resolution + seg_start_o

        if i + 1 < len(all_points):
            seg_end_m, seg_end_o = all_points[i + 1]
        else:
            seg_end_m, seg_end_o = target_measure, target_offset
        seg_end_ticks = seg_end_m * resolution + seg_end_o

        if target_ticks < seg_start_ticks:
            continue
        if target_ticks < seg_end_ticks:
            seg_end_ticks = target_ticks

        seg_ticks = seg_end_ticks - seg_start_ticks
        bpm = get_bpm(seg_start_m, seg_start_o)
        beats = get_beats(seg_start_m, seg_start_o)

        total_seconds += seg_ticks * beats * 60.0 / (bpm * resolution)

        if target_ticks <= seg_end_ticks:
            break

    return total_seconds
```

## 说明

- **BPM 变化**：通过 `bpm_events` 传入，每个事件在指定的 `(measure, offset)` 处生效
- **拍号变化**：通过 `met_events` 传入，影响刻度到时间的换算；每个事件在指定的 `(measure, offset)` 处生效
- **MET 注意**：`met_events` 中的参数顺序为 `(measure, offset, numerator, denominator)`，与谱面文件 MET_DEF 顺序（分子, 分母）一致；但 MET 事件的字段顺序为（分母, 分子），使用时需注意转换
