# JudgeControl.decompiled.cs

> 源文件：`code/JudgeControl.decompiled.cs`

````csharp
// =============================================================================
// JudgeControl（块命中部分）—— 由 APK libil2cpp.so(ARM64) 反汇编还原的等价 C#
// VA 见各方法注释。字段偏移(dump.cs)：
//   0x40 nowTime | 0x90 previewElementUpdateControl | 0x70 chartNoteSortByTime
//   0xA0 blockedTouchPositions(List<Vector4>) | 0xA8 wasTouchingAnyBlock | 0xAC minDeltaTime
// =============================================================================

using System.Collections.Generic;
using UnityEngine;

public class JudgeControl
{
    public float nowTime;                                                    // 0x40
    private PreviewElementUpdateControl previewElementUpdateControl;         // 0x90
    private readonly List<Vector4> blockedTouchPositions;                    // 0xA0
    private bool wasTouchingAnyBlock;                                        // 0xA8

    // ---- VA 0x1D22560 -------------------------------------------------------
    // 命中测试：**无 inset**，恒半边长 0.5 的局部 AABB；lossyScale 退化(≤1e-4)直接失败。
    private static bool IsPositionInsideBlock(PreviewBlockControl block, Vector2 worldPosition)
    {
        if (block == null) return false;                       // Unity null 检查（implicit bool）
        Vector3 s = block.transform.lossyScale;
        const float kEps = 1e-4f;                              // .rodata 0xC26070
        if (Mathf.Abs(s.x) <= kEps) return false;
        if (Mathf.Abs(s.y) <= kEps) return false;
        Vector3 local = block.transform.InverseTransformPoint(
            new Vector3(worldPosition.x, worldPosition.y, 0f));
        return Mathf.Abs(local.x) <= 0.5f && Mathf.Abs(local.y) <= 0.5f;
    }

    // ---- VA 0x1D22010 -------------------------------------------------------
    // 遍历 Blocks，取 IsActive(nowTime) 且命中 IsPositionInsideBlock 的块；
    // 普通/减块分别记录首个命中，减块计数。返回：
    //   (减块命中数&1) != (普通块命中!=null) 时有命中；优先返回普通块。
    private bool TryGetBlockingBlock(Vector2 worldPosition, out PreviewBlockControl blockingBlock)
    {
        blockingBlock = null;
        var blocks = previewElementUpdateControl.Blocks;      // 0x90 → 0x58
        PreviewBlockControl normal = null;
        PreviewBlockControl subtract = null;
        int subtractHits = 0;

        foreach (var b in blocks)
        {
            if (b == null) continue;
            if (!b.IsActive(nowTime)) continue;               // 0x1D71C40
            if (!IsPositionInsideBlock(b, worldPosition)) continue;
            if (!b.blockInfo.isSubtract) { if (normal == null) normal = b; }
            else                         { if (subtract == null) subtract = b; subtractHits++; }
        }

        bool subtracted = (subtractHits & 1) != 0;
        if (subtracted == (normal != null)) return false;     // 抵消或未命中
        blockingBlock = (normal != null) ? normal : subtract;
        return true;
    }
}
````
