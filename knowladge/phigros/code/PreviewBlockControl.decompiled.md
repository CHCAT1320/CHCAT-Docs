# PreviewBlockControl.decompiled.cs

> 源文件：`code/PreviewBlockControl.decompiled.cs`

````csharp
// =============================================================================
// PreviewBlockControl / TouchBlockBehavior —— 由 APK libil2cpp.so(ARM64) 反汇编还原的等价 C#
//
// 依据：libil2cpp.so + dump.cs(Il2CppDumper 6.7.46)，capstone 5.0.7。
// 每个方法标注 VA（取自 dump.cs，APK 实测）；泛型实参、静态单例等由 ELF 重定位/元数据槽反查确定。
//
// 字段偏移(dump.cs)：
//  0x20 destroyInterval | 0x28 progressControl | 0x30 levelControl | 0x38 blockInfo(GameInformation.BlockArea)
//  0x40 screenWidth | 0x44 screenHeight | 0x48 index | 0x50 renderer(SpriteRenderer)
//  0x58 disabledBlockShowDuration | 0x5C disabledBlockReadyDuration
//  0x60 isDragging | 0x68 enabledLayer | 0x70 disabledLayer | 0x78 readyLayer | 0x80 touchLayer
//  0x88 lastPhase | 0x8C isDisabled | 0x8D wasVisible | 0x8E wasReady
// BlockArea：topRightPercentage 0x10 | bottomLeftPercentage 0x18 | appearTime 0x20 | enableTime 0x24
//            disableTime 0x28 | disappearTime 0x2C | isSubtract 0x30 | rotateEvents 0x38 | moveEvents 0x40 | scaleEvents 0x48
// RotateEvent：anchor 0x10 | time 0x18 | easeType 0x1C | rotation 0x20
// MoveEvent：endPosition 0x10 | time 0x18 | easeTypeX 0x1C | easeTypeY 0x20
// ScaleEvent：anchor 0x10 | time 0x18 | easeTypeX 0x1C | easeTypeY 0x20 | scale 0x24
// =============================================================================

using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace ProjectEditor.PreviewScripts
{
    public class PreviewBlockControl : MonoBehaviour
    {
        [SerializeField] private float destroyInterval;         // 0x20
        public ProgressControl progressControl;                 // 0x28
        public LevelControl levelControl;                       // 0x30
        public GameInformation.BlockArea blockInfo;             // 0x38
        public float screenWidth;                               // 0x40
        public float screenHeight;                              // 0x44
        public int index;                                       // 0x48
        [SerializeField] private SpriteRenderer renderer;       // 0x50
        [SerializeField] private float disabledBlockShowDuration;  // 0x58
        [SerializeField] private float disabledBlockReadyDuration; // 0x5C
        [HideInInspector] public bool isDragging;               // 0x60
        private string enabledLayer;                            // 0x68
        private string disabledLayer;                           // 0x70
        private string readyLayer;                              // 0x78
        private string touchLayer;                              // 0x80
        private BlockPhase lastPhase;                           // 0x88
        private bool isDisabled;                                // 0x8C
        private bool wasVisible;                                // 0x8D
        private bool wasReady;                                  // 0x8E

        // dump.cs TypeDefIndex 4924：HiddenBefore=0, Disabled=1, Ready=2, Active=3, HiddenAfter=4
        public enum BlockPhase { HiddenBefore = 0, Disabled = 1, Ready = 2, Active = 3, HiddenAfter = 4 }

        private readonly struct Geometry
        {
            public readonly Vector2 size;         // Item1
            public readonly Vector2 center;       // Item2
            public readonly Vector2 anchorWorld;  // Item3
            public Geometry(Vector2 s, Vector2 c, Vector2 a) { size = s; center = c; anchorWorld = a; }
        }

        // ---- VA 0x1D7060C ---------------------------------------------------
        // 仅当 blockInfo.isSubtract 为真时，才把三个 layer 名字段设成静态字符串常量。
        // 普通块（isSubtract=false）**不设置** enabledLayer/disabledLayer/readyLayer
        // （保持 null → NameToLayer(null) 行为由后续协程承担）。反汇编实测。
        private void Start()
        {
            if (blockInfo == null) throw new NullReferenceException();
            if (blockInfo.isSubtract)                 // 0x30
            {
                enabledLayer  = KEnabledLayerName;    // 0x68 ← .rodata/元数据字符串常量
                disabledLayer = KDisabledLayerName;   // 0x70
                readyLayer    = KReadyLayerName;      // 0x78
            }
        }
        // 三个 layer 名常量取自静态字符串槽 0x4144aa0 / 0xa98 / 0xa90（名字字面量未在本环境解出）。
        private const string KEnabledLayerName  = null;
        private const string KDisabledLayerName = null;
        private const string KReadyLayerName    = null;

        // ---- VA 0x1D7069C ---------------------------------------------------
        private void Update()
        {
            UpdateBlocksTransform();
            UpdateBlockActivation();
            UpdateBlockAnimations();
            EnsureTouchHover();   // g__DestroyAfterInterval|16_0，见下方同名方法
        }

        // ---- VA 0x1D706C4 ---------------------------------------------------
        public void UpdateBlocksTransform()
        {
            if (isDragging) return;
            if (blockInfo == null || progressControl == null) throw new NullReferenceException();
            float now = progressControl.nowTime;                 // ProgressControl +0x88
            if (blockInfo.appearTime > now)                       // 未出现 → 藏到远处
            {
                transform.localPosition = new Vector3(1000f, 0f, 0f);
                return;
            }
            if (now >= blockInfo.disappearTime)                   // 已消失 → 藏
            {
                transform.localPosition = new Vector3(1000f, 0f, 0f);
                return;
            }
            Vector2 tr = blockInfo.topRightPercentage;            // 0x10
            Vector2 bl = blockInfo.bottomLeftPercentage;          // 0x18
            Vector2 screen = new Vector2(screenWidth, screenHeight);
            Vector2 trW = (tr - new Vector2(0.5f, 0.5f)) * screen;
            Vector2 blW = (bl - new Vector2(0.5f, 0.5f)) * screen;
            Vector2 center = (trW + blW) * 0.5f;
            transform.localPosition = new Vector3(center.x, center.y, 0f);
            Vector2 size = new Vector2(Mathf.Abs(trW.x - blW.x), Mathf.Abs(trW.y - blW.y));
            transform.localScale = new Vector3(size.x, size.y, 1f);
        }

        // ---- VA 0x1D707CC ---------------------------------------------------
        private void UpdateBlockActivation()
        {
            if (progressControl == null || blockInfo == null) throw new NullReferenceException();
            float now = progressControl.nowTime;                  // 0x88
            float enable = blockInfo.enableTime;                  // 0x24
            float disable = blockInfo.disableTime;                // 0x28
            float appear = blockInfo.appearTime;                  // 0x20
            float disappear = blockInfo.disappearTime;            // 0x2C

            bool inWindow = enable <= now && now < disable;
            bool notInWindow = !inWindow;                         // 反汇编 w20
            bool visible = appear <= now && now < disappear;      // w21
            bool ready = (enable - disabledBlockReadyDuration) <= now && now < enable; // w22，用 0x5C

            // DisabledBlockShow：进入窗口且本帧刚“出现”
            if (visible && !wasVisible && !notInWindow)
                StartCoroutine(DisabledBlockShow());
            // DisabledBlockReady：进入预备窗口
            if (ready && !wasReady)
                StartCoroutine(DisabledBlockReady());
            // 层级切换（仅切换到 disabledLayer；回到窗口时只清 isDisabled，层由协程改）
            if (notInWindow)
            {
                if (!isDisabled) { isDisabled = true; gameObject.layer = LayerMask.NameToLayer(disabledLayer); }
            }
            else if (isDisabled) isDisabled = false;

            // 减块用半透明
            Color c = renderer.color;
            c.a = blockInfo.isSubtract ? SubtractAlpha : 1f;      // SubtractAlpha ≈ 0.1（.rodata 0xC261F0）
            renderer.color = c;

            wasVisible = visible;
            wasReady = ready;
        }
        private const float SubtractAlpha = 0.1f;   // .rodata 0xC261F0 实测

        // ---- VA 0x1D7098C ---------------------------------------------------
        private void UpdateBlockAnimations()
        {
            if (isDragging) return;
            if (!IsTimeValid()) return;

            // anchor = Vector2.one × 0.5 = (0.5, 0.5)
            // 反汇编：静态 Vec2.one(static_fields+8) × 0.5（Vector2_TypeInfo 经重定位反查）
            Vector2 anchor = Vector2.one * 0.5f;
            Geometry geo = GetBlockGeometry(anchor);

            var dc = new AnimState
            {
                currentSize = geo.size,
                originalSize = geo.size,
                currentCenter = geo.center,
                currentRotation = 0f,
            };
            (Vector2 size, Vector2 center) sc = UpdateScale(ref dc);
            dc.currentSize = sc.size;
            dc.currentCenter = sc.center;
            (float rot, Vector2 rotCenter) rot = UpdateRotation(ref dc);

            Vector2 pos = UpdateMovement(geo.center, rotCenter);
            transform.localPosition = new Vector3(pos.x, pos.y, 0f);
            transform.localScale = new Vector3(Mathf.Abs(sc.size.x), Mathf.Abs(sc.size.y), 1f);
            transform.eulerAngles = new Vector3(0f, 0f, rot);
        }

        private struct AnimState
        {
            public Vector2 currentSize;      // +0x8
            public Vector2 currentCenter;    // +0x10
            public Vector2 originalSize;     // +0x18
            public float currentRotation;    // +0x20
        }

        // ---- VA 0x1D70C7C ---------------------------------------------------
        private bool IsTimeValid()
        {
            if (blockInfo == null || progressControl == null) throw new NullReferenceException();
            float now = progressControl.nowTime;
            if (blockInfo.appearTime > now) return false;
            return now < blockInfo.disappearTime;
        }

        // ---- VA 0x1D70CC0 ---------------------------------------------------
        // 返回 (size, center, anchorWorld)
        private Geometry GetBlockGeometry(Vector2 anchor)
        {
            if (blockInfo == null) throw new NullReferenceException();
            Vector2 tr = blockInfo.topRightPercentage;
            Vector2 bl = blockInfo.bottomLeftPercentage;
            Vector2 screen = new Vector2(screenWidth, screenHeight);
            Vector2 half = new Vector2(0.5f, 0.5f);
            Vector2 trW = (tr - half) * screen;
            Vector2 blW = (bl - half) * screen;
            Vector2 size = trW - blW;
            Vector2 center = (blW + trW) * 0.5f;
            Vector2 anchorWorld = (anchor - half) * screen;
            return new Geometry(size, center, anchorWorld);
        }

        // ---- VA 0x1D71404 ---------------------------------------------------
        // currentCenter += (InterpolateMoveEvent(index) - originalCenter)
        private Vector2 UpdateMovement(Vector2 originalCenter, Vector2 currentCenter)
        {
            if (blockInfo == null || blockInfo.moveEvents == null) throw new NullReferenceException();
            if (blockInfo.moveEvents.Count >= 1)
            {
                int i = FindCurrentEventIndex(blockInfo.moveEvents, e => e.time);
                if (i != -1)
                {
                    Vector2 e = InterpolateMoveEvent(i);
                    currentCenter += e - originalCenter;
                }
            }
            return currentCenter;
        }

        // ---- VA 0x1D7157C ---------------------------------------------------
        private Vector2 AnchorToWorld(Vector2 anchor)
            => new Vector2((anchor.x - 0.5f) * screenWidth, (anchor.y - 0.5f) * screenHeight);

        // ---- VA 0x1D71598 ---------------------------------------------------
        private static Vector2 ScaleAroundAnchor(Vector2 point, Vector2 anchor, float stepX, float stepY)
            => new Vector2(anchor.x + (point.x - anchor.x) * stepX,
                           anchor.y + (point.y - anchor.y) * stepY);

        // ---- VA 0x1D715B4 ---------------------------------------------------
        private static Vector2 RotateAroundAnchor(Vector2 point, Vector2 anchor, float deltaDeg)
        {
            // 阈值 = max(|deltaDeg| * 1e-6, 8 * Mathf.Epsilon)；Epsilon = 1.401298E-45（Mathf 唯一静态字段）
            // 即 ~1e-44，对正常角度该守卫恒不触发。
            float eps = Mathf.Max(Mathf.Abs(deltaDeg) * 1e-6f, 8f * Mathf.Epsilon);
            if (Mathf.Abs(deltaDeg) < eps) return point;
            float rad = deltaDeg * 0.017453292f;      // Deg2Rad（.rodata 0xC34510）
            float sin = Mathf.Sin(rad), cos = Mathf.Cos(rad);   // 反汇编为单次 sincosf
            float dx = point.x - anchor.x;
            float dy = point.y - anchor.y;
            return new Vector2(anchor.x + (dx * cos - dy * sin),
                               anchor.y + (dx * sin + dy * cos));
        }

        // ---- VA 0x1D716A0 ---------------------------------------------------
        private static float SafeDiv(float numerator, float denominator)
        {
            float eps = Mathf.Max(Mathf.Abs(denominator) * 1e-6f, 8f * Mathf.Epsilon);
            return Mathf.Abs(denominator) < eps ? 1f : numerator / denominator;
        }

        // ---- VA 0x1D719D8 ---------------------------------------------------
        // GetEaseWithIndex(easeType, (nowTime - currentTime) / (nextTime - currentTime))
        private float CalculateEasedProgress(float currentTime, float nextTime, int easeType)
        {
            if (progressControl == null) throw new NullReferenceException();
            float progress = (progressControl.nowTime - currentTime) / (nextTime - currentTime);
            return GetEase.GetEaseWithIndex(easeType, progress);
        }

        // ---- VA 0x1D7172C ---------------------------------------------------
        private Vector2 InterpolateMoveEvent(int index)
        {
            var ev = blockInfo.moveEvents;
            if (ev == null) throw new NullReferenceException();
            int last = ev.Count - 1;
            if (last <= index)
                return AnchorToWorld(ev[index].endPosition);
            MoveEvent cur = ev[index], next = ev[index + 1];
            float tx = CalculateEasedProgress(cur.time, next.time, cur.easeTypeX);
            float ty = CalculateEasedProgress(cur.time, next.time, cur.easeTypeY);
            tx = Mathf.Clamp01(tx);
            ty = Mathf.Clamp01(ty);
            Vector2 v = new Vector2(
                Mathf.Lerp(cur.endPosition.x, next.endPosition.x, tx),
                Mathf.Lerp(cur.endPosition.y, next.endPosition.y, ty));
            return AnchorToWorld(v);
        }

        // ---- VA 0x1D71868 ---------------------------------------------------
        // 返回 (scale, anchor)
        private (Vector2 scale, Vector2 anchor) InterpolateScaleEvent(int index)
        {
            var ev = blockInfo.scaleEvents;
            if (ev == null) throw new NullReferenceException();
            int last = ev.Count - 1;
            if (last <= index)
                return (ev[index].scale, ev[index].anchor);
            ScaleEvent cur = ev[index], next = ev[index + 1];
            float tx = Mathf.Clamp01(CalculateEasedProgress(cur.time, next.time, cur.easeTypeX));
            float ty = Mathf.Clamp01(CalculateEasedProgress(cur.time, next.time, cur.easeTypeY));
            Vector2 scale = new Vector2(
                Mathf.Lerp(cur.scale.x, next.scale.x, tx),
                Mathf.Lerp(cur.scale.y, next.scale.y, ty));
            return (scale, cur.anchor);
        }

        // ---- VA 0x1D71A08 ---------------------------------------------------
        // 返回 (rotation, anchor)
        private (float rotation, Vector2 anchor) InterpolateRotateEvent(int index)
        {
            var ev = blockInfo.rotateEvents;
            if (ev == null) throw new NullReferenceException();
            int last = ev.Count - 1;
            if (last <= index)
                return (ev[index].rotation, ev[index].anchor);
            RotateEvent cur = ev[index], next = ev[index + 1];
            float t = Mathf.Clamp01(CalculateEasedProgress(cur.time, next.time, cur.easeType));
            return (Mathf.Lerp(cur.rotation, next.rotation, t), cur.anchor);
        }

        // ---- VA 0x1D71C40 ---------------------------------------------------
        public bool IsActive(float t)
        {
            if (blockInfo == null) throw new NullReferenceException();
            return blockInfo.enableTime <= t && blockInfo.disableTime > t;
        }

        // ---- VA 0x1D71B40（编辑器回写：transform → blockInfo 百分比 + 写回列表）----
        // 读 localPosition / localScale（世界→百分比反算），改写 topRightPercentage /
        // bottomLeftPercentage，再把 blockInfo 写回 levelControl 列表的第 index 项。
        private void UpdateBlockInfo()
        {
            if (blockInfo == null) throw new NullReferenceException();
            Vector3 lp = transform.localPosition;
            Vector3 ls = transform.localScale;
            float hx = ls.x * 0.5f, hy = ls.y * 0.5f;         // half scale
            // 中心 + 半尺寸 → 右上百分比；中心 − 半尺寸 → 左下百分比
            float cx = lp.x / screenWidth, cy = lp.y / screenHeight;   // 0x40/0x44
            float ex = hx / screenWidth,   ey = hy / screenHeight;
            blockInfo.bottomLeftPercentage = new Vector2((cx - ex) + 0.5f, (cy - ey) + 0.5f);  // 0x18
            blockInfo.topRightPercentage   = new Vector2((cx + ex) + 0.5f, (cy + ey) + 0.5f);  // 0x10
            // 写回：levelControl(0x30) → +0x140 = chart(Chart) → +0x20 = chart.blockAreaList，
            // 尾调用 `List<BlockArea>.set_Item(index, blockInfo)`（VA 0x2E0F2F8），index = 本对象 0x48。
            levelControl.chart.blockAreaList[index] = blockInfo;
        }

        // ---- VA 0x1D70B10（<Update>g__DestroyAfterInterval|16_0）------------
        private void EnsureTouchHover()
        {
            if (blockInfo == null || progressControl == null) throw new NullReferenceException();
            float now = progressControl.nowTime;
            float end = Mathf.Max(blockInfo.disableTime, blockInfo.disappearTime) + destroyInterval;
            if (now > end) Destroy(gameObject);
        }

        // ---- VA 0x1F9A2DC（FindCurrentEventIndex<object>）-------------------
        // 从头线性扫描（无二分）：返回「最后一个 time ≤ now 的事件」的下标，
        // 范围 [-1, Count-2]。Count==0 或 now < events[0].time 时返回 -1。
        // 用严格比较 `t > now` 判停 ⇒ 等时刻取最靠后的那个（见 behavior.md §3.3）。
        private int FindCurrentEventIndex<T>(List<T> events, Func<T, float> getTime)
        {
            if (events == null) throw new NullReferenceException();
            if (progressControl == null) throw new NullReferenceException();
            float now = progressControl.nowTime;                 // 0x28 → +0x88
            int result = -1;
            for (int i = 1; i < events.Count; i++)
            {
                if (getTime(events[i]) > now) return result;     // fcmp/b.hi：首个严格大于 now 即返回 i-1
                result = i;
            }
            return result;                                        // 全 ≤ now ⇒ Count-2（或 -1 若 Count<2）
        }

        // ---- VA 0x1D70D78（<UpdateBlockAnimations>g__UpdateScale|24_0）--------
        // 返回 (size = scaleFactor * originalSize, center)。
        // 对 index 之前的每个事件把 center 按 SafeDiv(下一事件 scale / 本事件 scale) 绕锚点缩放，
        // 再叠加当前事件的插值比例；size 用当前（或插值）scale 乘 originalSize。
        private (Vector2 size, Vector2 center) UpdateScale(ref AnimState dc)
        {
            if (blockInfo == null || blockInfo.scaleEvents == null) throw new NullReferenceException();
            var ev = blockInfo.scaleEvents;
            if (ev.Count == 0) return (dc.currentSize, dc.currentCenter);
            int index = FindCurrentEventIndex(ev, e => e.time);
            if (index == -1) return (dc.currentSize, dc.currentCenter);

            Vector2 screen = new Vector2(screenWidth, screenHeight);
            Vector2 half = new Vector2(0.5f, 0.5f);
            Vector2 p = dc.currentCenter;
            for (int i = 0; i < index; i++)
            {
                ScaleEvent e0 = ev[i], e1 = ev[i + 1];
                Vector2 a = (e0.anchor - half) * screen;
                p = ScaleAroundAnchor(p, a,
                        SafeDiv(e1.scale.x, e0.scale.x), SafeDiv(e1.scale.y, e0.scale.y));
            }

            Vector2 size;
            if (index >= ev.Count - 1)
            {
                size = ev[index].scale * dc.originalSize;
            }
            else
            {
                ScaleEvent cur = ev[index], next = ev[index + 1];
                float tx = Mathf.Clamp01(CalculateEasedProgress(cur.time, next.time, cur.easeTypeX));
                float ty = Mathf.Clamp01(CalculateEasedProgress(cur.time, next.time, cur.easeTypeY));
                Vector2 interp = new Vector2(
                    Mathf.Lerp(cur.scale.x, next.scale.x, tx),
                    Mathf.Lerp(cur.scale.y, next.scale.y, ty));
                Vector2 a = (cur.anchor - half) * screen;
                p = ScaleAroundAnchor(p, a,
                        SafeDiv(interp.x, cur.scale.x), SafeDiv(interp.y, cur.scale.y));
                size = interp * dc.originalSize;
            }
            return (size, p);
        }

        // ---- VA 0x1D710F4（<UpdateBlockAnimations>g__UpdateRotation|24_1）-------
        // 返回 (rotation, center)。累积 index 之前每个事件的 Δrotation（绕锚点旋转 center），
        // 再叠加当前事件（插值）的 Δrotation。
        private (float rotation, Vector2 center) UpdateRotation(ref AnimState dc)
        {
            if (blockInfo == null || blockInfo.rotateEvents == null) throw new NullReferenceException();
            var ev = blockInfo.rotateEvents;
            if (ev.Count == 0) return (dc.currentRotation, dc.currentCenter);
            int index = FindCurrentEventIndex(ev, e => e.time);
            if (index == -1) return (dc.currentRotation, dc.currentCenter);

            Vector2 screen = new Vector2(screenWidth, screenHeight);
            Vector2 half = new Vector2(0.5f, 0.5f);
            Vector2 p = dc.currentCenter;
            for (int i = 0; i < index; i++)
            {
                RotateEvent e0 = ev[i], e1 = ev[i + 1];
                Vector2 a = (e0.anchor - half) * screen;
                p = RotateAroundAnchor(p, a, e1.rotation - e0.rotation);
            }

            float rotation;
            if (index >= ev.Count - 1)
            {
                rotation = ev[index].rotation;
            }
            else
            {
                RotateEvent cur = ev[index], next = ev[index + 1];
                float t = Mathf.Clamp01(CalculateEasedProgress(cur.time, next.time, cur.easeType));
                rotation = Mathf.Lerp(cur.rotation, next.rotation, t);
                Vector2 a = (cur.anchor - half) * screen;
                p = RotateAroundAnchor(p, a, rotation - cur.rotation);
            }
            return (rotation, p);
        }

        // ---- VA 0x1D71E34（<DisabledBlockReady>d__39。）------------------------
        // 预备窗口开始时先切 readyLayer，等待 disabledBlockReadyDuration 后再切 enabledLayer。
        private IEnumerator DisabledBlockReady()
        {
            gameObject.layer = LayerMask.NameToLayer(readyLayer);
            yield return new WaitForSeconds(disabledBlockReadyDuration);
            gameObject.layer = LayerMask.NameToLayer(enabledLayer);
        }

        // ---- VA 0x1D71F90（<DisabledBlockShow>d__40。）------------------------
        // 颜色按 disabledBlockShowDuration 线性淡入。起始/目标色取自 .rodata：
        //   普通：(1,1,1,0) → (1,1,1,1)；减块：(1,0,1,0.1) → (1,1,1,0.1)
        private IEnumerator DisabledBlockShow()
        {
            Color startColor  = blockInfo.isSubtract ? new Color(1f, 0f, 1f, 0.1f) : new Color(1f, 1f, 1f, 0f);
            Color targetColor = blockInfo.isSubtract ? new Color(1f, 1f, 1f, 0.1f) : new Color(1f, 1f, 1f, 1f);
            renderer.color = startColor;
            float t = 0f;
            while (t <= disabledBlockShowDuration)
            {
                t += Time.deltaTime;
                renderer.color = Color.Lerp(startColor, targetColor, Mathf.Clamp01(t / disabledBlockShowDuration));
                yield return null;
            }
            renderer.color = targetColor;
        }
    }

    // =========================================================================
    public class TouchBlockBehavior : MonoBehaviour
    {
        public float size;                  // 0x20
        public float animationDuration;     // 0x24
        public Vector3 idlePosition;        // 0x28
        private Coroutine animationRoutine; // 0x38

        // ---- VA 0x1D1CE04 ---------------------------------------------------
        public void Initialize()
        {
            if (animationRoutine != null) { StopCoroutine(animationRoutine); animationRoutine = null; }
            transform.localScale = Vector3.zero;               // 静态单例 = Vector3.zeroVector
            transform.localPosition = idlePosition;
        }

        // ---- VA 0x1D1D904 ---------------------------------------------------
        public void UpdatePosition(Vector2 position)
        {
            Vector3 p = transform.position;
            transform.position = new Vector3(position.x, position.y, p.z);
        }

        // ---- VA 0x1D1D968 ---------------------------------------------------
        public void Show()
        {
            if (animationRoutine != null) { StopCoroutine(animationRoutine); animationRoutine = null; }
            animationRoutine = StartCoroutine(Animation(Vector3.zero, new Vector3(size, size, size), true));
        }

        // ---- VA 0x1D1DA88 ---------------------------------------------------
        public void Hide()
        {
            if (animationRoutine != null) { StopCoroutine(animationRoutine); animationRoutine = null; }
            animationRoutine = StartCoroutine(Animation(transform.localScale, Vector3.zero, false));
        }

        // ---- VA 0x1D1E900（<Animation>d__8。）----------------------------------
        // 线性插值（帧率无关）：start→end，t 超过 animationDuration 后收尾；
        // 若是 Hide（isShowing=false），结束时把 transform.position 归到 idlePosition。
        private IEnumerator Animation(Vector3 startScale, Vector3 endScale, bool isShowing)
        {
            transform.localScale = startScale;
            float t = 0f;
            while (t <= animationDuration)
            {
                transform.localScale = Vector3.Lerp(startScale, endScale, Mathf.Clamp01(t / animationDuration));
                t += Time.deltaTime;
                yield return null;
            }
            transform.localScale = endScale;
            animationRoutine = null;
            if (!isShowing) transform.position = idlePosition;
        }
    }
}
````
