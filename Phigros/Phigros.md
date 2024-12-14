# Phigros

该文档帮助你解析Phigros的谱面文件

---

那么我们现在开始！！！

你必须知道Phigros的谱面文件是JSON格式

### 文件结构

1. `formatVersion`：`int`

    这个是该谱面文件的版本，常见的值有`1`和`3`
2. `offset`：`float`

    这是该谱面的偏移，单位为`s`，常见的值为`0.0`
3. `judgeLineList`：`Array`

    判定线的列表，里面储存着所有判定线的各种信息

### judgeLineList

结构大概如下
```
judgeLineList":[
        {
            "bpm":,
            "notesAbove":[],
            "speedEvents":[],
            "judgeLineMoveEvents":[],
            "judgeLineRotateEvents":[],
            "judgeLineDisappearEvents":[]
        }
        ......
        省略其他判定线
    ]
```

1. `bpm`:`float`

    当前判定线的bpm（每分钟的拍数）
2. `notesAbove`:`Array`

    当前判定线的正向`note`列表，储存着该判定线的所有的正向`note`
    结构如下
    ```
    notesAbove":[
            {
                "type":,
                "time":,
                "positionX":,
                "holdTime":,
                "speed":,
                "floorPosition":
            }
            ......
            省略其他note
        ]
    ```
    1. `type`:`int`

        note的类型

        `1`为Tap

        `2`为Drag

        `3`为Hold

        `4`为Flick

3. `time`:`int`

    note的打击时间

    相当于 128 分音符

    若要转换为s

    公式为

    time * 1.875 / bpm

    例如
        ```
        bpm = 128.0
        time = 384
        那么note的打击时间就为
        time * 1.875 / bpm = 384 * 1.875 / 128.0 = 5.625s
        也就是说，在谱面时间为5.625s时
        该note被打击
        ```