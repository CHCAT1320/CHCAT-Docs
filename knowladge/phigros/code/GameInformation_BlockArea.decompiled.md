# GameInformation_BlockArea.decompiled.cs

> 源文件：`code/GameInformation_BlockArea.decompiled.cs`

````csharp
// =============================================================================
// GameInformation.BlockArea.Mirror() —— APK libil2cpp.so(ARM64) 反汇编还原
// VA 0x1CA32A8。字段偏移见 GameInformation_BlockArea.cs / data.md。
//
// 语义：水平镜像（**只翻 x，y 不动**）。
//   - 两个百分比角点：**交叉取补** —— tr.x ← 1−bl.x、bl.x ← 1−tr.x（共享旧值）；y 不变
//   - rotateEvents[i]：anchor.x ← 1−anchor.x（自身取补），rotation ← −rotation
//   - moveEvents[i]  ：endPosition.x ← 1−endPosition.x（自身取补）
//   - scaleEvents[i] ：anchor.x ← 1−anchor.x（自身取补）
// 每个事件列表在 foreach 前判空（null → 跳过该段）。
// =============================================================================

[System.Serializable]
public class GameInformationBlockArea_Mirror
{
    public UnityEngine.Vector2 topRightPercentage;      // 0x10
    public UnityEngine.Vector2 bottomLeftPercentage;    // 0x18
    public float appearTime;                            // 0x20
    public float enableTime;                            // 0x24
    public float disableTime;                           // 0x28
    public float disappearTime;                         // 0x2C
    public bool isSubtract;                             // 0x30
    public System.Collections.Generic.List<RotateEvent> rotateEvents; // 0x38
    public System.Collections.Generic.List<MoveEvent> moveEvents;     // 0x40
    public System.Collections.Generic.List<ScaleEvent> scaleEvents;   // 0x48

    // ---- VA 0x1CA32A8 -------------------------------------------------------
    public void Mirror()
    {
        // 角点：交叉取补（共享旧值）；y 不变
        float trx = topRightPercentage.x, blx = bottomLeftPercentage.x;
        topRightPercentage   = new UnityEngine.Vector2(1f - blx, topRightPercentage.y);
        bottomLeftPercentage = new UnityEngine.Vector2(1f - trx, bottomLeftPercentage.y);

        if (rotateEvents != null)
            foreach (var e in rotateEvents)
            {
                e.anchor   = new UnityEngine.Vector2(1f - e.anchor.x, e.anchor.y); // 自身取补
                e.rotation = -e.rotation;                                          // 取负
            }

        if (moveEvents != null)
            foreach (var e in moveEvents)
                e.endPosition = new UnityEngine.Vector2(1f - e.endPosition.x, e.endPosition.y); // 自身取补

        if (scaleEvents != null)
            foreach (var e in scaleEvents)
                e.anchor = new UnityEngine.Vector2(1f - e.anchor.x, e.anchor.y);   // 自身取补
    }

    // 事件类型占位（真实字段见 data.md）。用 class 以便 foreach 就地改写生效。
    public class RotateEvent { public UnityEngine.Vector2 anchor; public float time; public int easeType; public float rotation; }
    public class MoveEvent   { public UnityEngine.Vector2 endPosition; public float time; public int easeTypeX; public int easeTypeY; }
    public class ScaleEvent  { public UnityEngine.Vector2 anchor; public float time; public int easeTypeX; public int easeTypeY; public UnityEngine.Vector2 scale; }
}
````
