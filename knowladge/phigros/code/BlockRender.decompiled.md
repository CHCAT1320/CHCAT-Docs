# BlockRender.decompiled.cs

> 源文件：`code/BlockRender.decompiled.cs`

````csharp
// =============================================================================
// BlockArea 渲染核心 —— 由 APK 内 libil2cpp.so(ARM64) 反汇编还原的等价 C#
//
// 依据：libil2cpp.so + dump.cs(Il2CppDumper 6.7.46)，capstone 5.0.7。
// 每个方法标注 VA；泛型实参、静态单例、内置枚举等均由 ELF 重定位/元数据槽反查确定。
//
// ShaderIDs 字段名取自 dump.cs `BlockRender.ShaderIDs`（0x0..0xAC 共 44 个），
// 属性名 = "_" + 字段名，且与 9 个 GLSL 的 uniform 名逐一吻合（三重印证）。
// Graphics.Blit 会自动把 source 作为 _MainTex 绑定，故下面显式 SetTexture
// 出现的 +0x14 是 ComposedRT(_ComposeRT)，不是 _MainTex。
// =============================================================================

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public partial class BlockRender : MonoBehaviour
{
    // 材质/相机/RT 字段偏移(dump.cs)：
    // 相机 0x20 normal | 0x28 subtract | 0x30 disabledNormal | 0x38 disabledSubtract
    //      0x40 disabledNormalReady | 0x48 disabledSubtractReady | 0x50 touch
    // 材质 0x60 active | 0x68 disabled | 0x70 ready | 0x78 touchEffect
    //      0x80 compose | 0x88 edgeMask | 0x90 glowMask
    // RT   0xB8 sceneColor | 0xC0 normal | 0xC8 subtract | 0xD0 disabledNormal
    //      0xD8 disabledSubtract | 0xE0 disabledNormalReady | 0xE8 disabledSubtractReady
    //      0xF0 composedEnabled | 0xF8 composedDisabled | 0x100 touch | 0x108 effect
    //      0x110 pingA | 0x118 pingB | 0x120 totalRT
    // 其它 0xA0 touchHoverPrefab | 0xA8 mainCamera | 0xB0 cmd | 0x98 fxRenderList
    //      0x128 touchBlockSlots(10) | 0x130 edgeSize | 0x134 glowRadius
    //      0x138 glowWeightFalloff | 0x13C glowPassWeightThreshold
    //      0x140 touchPos | 0x148 touchShineSpeed | 0x14C touchShineLowThreshold
    //      0x150 touchShineBrightness | 0x58 blockShaderVariantCollection

    // 字段名/顺序 = dump.cs BlockRender.ShaderIDs；属性名 "_"+字段名（与 GLSL 一致）
    private static class ShaderIDs
    {
        public static readonly int NormalBlockRT          = Shader.PropertyToID("_NormalBlockRT");          // 0x00
        public static readonly int SubtractBlockRT        = Shader.PropertyToID("_SubtractBlockRT");        // 0x04
        public static readonly int DisabledNormalBlockRT  = Shader.PropertyToID("_DisabledNormalBlockRT");  // 0x08
        public static readonly int DisabledSubtractBlockRT= Shader.PropertyToID("_DisabledSubtractBlockRT");// 0x0C
        public static readonly int SceneColor             = Shader.PropertyToID("_SceneColor");             // 0x10
        public static readonly int ComposedRT             = Shader.PropertyToID("_ComposeRT");              // 0x14
        public static readonly int EffectRT               = Shader.PropertyToID("_EffectRT");               // 0x18
        public static readonly int DilateTexelSize        = Shader.PropertyToID("_DilateTexelSize");        // 0x1C
        public static readonly int PassWeight             = Shader.PropertyToID("_PassWeight");             // 0x20
        public static readonly int GlowFirstPass          = Shader.PropertyToID("_GlowFirstPass");          // 0x24
        public static readonly int TouchHoverRT           = Shader.PropertyToID("_TouchHoverRT");           // 0x28
        public static readonly int TouchPosCount          = Shader.PropertyToID("_TouchPosCount");          // 0x2C
        public static readonly int TouchPos               = Shader.PropertyToID("_TouchPos");               // 0x30
        public static readonly int TouchPosShine          = Shader.PropertyToID("_TouchPosShine");          // 0x34
        public static readonly int TouchPosShineSpeed     = Shader.PropertyToID("_TouchPosShineSpeed");     // 0x38
        public static readonly int TouchPosLowThreshold   = Shader.PropertyToID("_TouchPosLowThreshold");   // 0x3C
        public static readonly int TouchPosBrightness     = Shader.PropertyToID("_TouchPosBrightness");     // 0x40
        public static readonly int ReadyComposeRT         = Shader.PropertyToID("_ReadyComposeRT");         // 0x44
        public static readonly int ShineSpeed             = Shader.PropertyToID("_ShineSpeed");             // 0x48
        public static readonly int ShineBrightness        = Shader.PropertyToID("_ShineBrightness");        // 0x4C
        public static readonly int ShineColor             = Shader.PropertyToID("_ShineColor");             // 0x50
        public static readonly int DisplaceMap            = Shader.PropertyToID("_DisplaceMap");            // 0x54
        public static readonly int DisplaceSpeed          = Shader.PropertyToID("_DisplaceSpeed");          // 0x58
        public static readonly int DisplaceStrength       = Shader.PropertyToID("_DisplaceStrength");       // 0x5C
        public static readonly int DisplaceDirection      = Shader.PropertyToID("_DisplaceDirection");      // 0x60
        public static readonly int TouchDisplaceMap       = Shader.PropertyToID("_TouchDisplaceMap");       // 0x64
        public static readonly int TouchDisplaceSpeed     = Shader.PropertyToID("_TouchDisplaceSpeed");     // 0x68
        public static readonly int TouchDisplaceStrength  = Shader.PropertyToID("_TouchDisplaceStrength");  // 0x6C
        public static readonly int TouchDisplaceDirection = Shader.PropertyToID("_TouchDisplaceDirection"); // 0x70
        public static readonly int GlowColor              = Shader.PropertyToID("_GlowColor");              // 0x74
        public static readonly int TouchGlowColor         = Shader.PropertyToID("_TouchGlowColor");         // 0x78
        public static readonly int BackgroundPixelScale   = Shader.PropertyToID("_BackgroundPixelScale");   // 0x7C
        public static readonly int TouchBackgroundPixelScale = Shader.PropertyToID("_TouchBackgroundPixelScale"); // 0x80
        public static readonly int NoiseMap               = Shader.PropertyToID("_NoiseMap");               // 0x84
        public static readonly int NoiseTint              = Shader.PropertyToID("_NoiseTint");              // 0x88
        public static readonly int NoiseRadius            = Shader.PropertyToID("_NoiseRadius");            // 0x8C
        public static readonly int NoiseSmoothness        = Shader.PropertyToID("_NoiseSmoothness");        // 0x90
        public static readonly int NoiseEvoSpeed          = Shader.PropertyToID("_NoiseEvoSpeed");          // 0x94
        public static readonly int NoiseDirChangeSpeed    = Shader.PropertyToID("_NoiseDirChangeSpeed");    // 0x98
        public static readonly int NoiseDisplaceStrength  = Shader.PropertyToID("_NoiseDisplaceStrength");  // 0x9C
        public static readonly int SDFCellSize            = Shader.PropertyToID("_SDFCellSize");            // 0xA0
        public static readonly int SDFSmoothness          = Shader.PropertyToID("_SDFSmoothness");          // 0xA4
        public static readonly int SDFFalloff             = Shader.PropertyToID("_SDFFalloff");             // 0xA8
        public static readonly int SDFMoveSpeed           = Shader.PropertyToID("_SDFMoveSpeed");           // 0xAC
    }

    // 触摸槽位（BlockRender 内嵌类型；+0x10 fingerId / +0x14 touchedThisFrame / +0x18 behavior）
    private class TouchBlockSlot
    {
        public int fingerId = -1;
        public bool touchedThisFrame;
        public TouchBlockBehavior behavior;
    }

    // ---- VA 0x1D1BC4C -------------------------------------------------------
    private void Start()
    {
        if (mainCamera == null) mainCamera = Camera.main;
        if (mainCamera == null) return;                       // 反汇编 0x1D1C4E8

        if (blockShaderVariantCollection != null) blockShaderVariantCollection.WarmUp();
        mainCamera.forceIntoRenderTexture = true;

        // ---- 13 张 RT（尺寸/格式见注释；除法来源见 render.md）----
        int w = Screen.width, h = Screen.height;
        sceneColorRT              = CreateRenderTexture(w / 6, h / 6);                       // fmt 16
        // fxRenderList 的画布拉满屏（用 mainCamera 的正交尺寸）
        float halfH = mainCamera.orthographicSize;
        float fullW = halfH * 2f * mainCamera.aspect;
        foreach (var canvas in fxRenderList)
        {
            canvas.worldCamera = mainCamera;
            // 反汇编：canvas.gameObject.GetComponent<RectTransform>()，再 set_sizeDelta
            canvas.gameObject.GetComponent<RectTransform>().sizeDelta = new Vector2(fullW, halfH * 2f);
        }
        int mw = w / 8, mh = h / 8;
        normalBlockRT             = CreateRenderTexture(mw, mh, (RenderTextureFormat)16);    // 0xC0
        subtractBlockRT           = CreateRenderTexture(mw, mh, (RenderTextureFormat)16);    // 0xC8
        composedEnabledBlockRT    = CreateRenderTexture(mw, mh, (RenderTextureFormat)16);    // 0xF0
        disabledNormalBlockRT     = CreateRenderTexture(mw, mh, (RenderTextureFormat)25);    // 0xD0
        disabledSubtractBlockRT   = CreateRenderTexture(mw, mh, (RenderTextureFormat)25);    // 0xD8
        disabledNormalReadyBlockRT= CreateRenderTexture(mw, mh, (RenderTextureFormat)25);    // 0xE0
        disabledSubtractReadyBlockRT = CreateRenderTexture(mw, mh, (RenderTextureFormat)25);// 0xE8
        composedDisabledBlockRT   = CreateRenderTexture(mw, mh, (RenderTextureFormat)25);    // 0xF8
        touchBlockRT              = CreateRenderTexture(mw, mh, (RenderTextureFormat)16);    // 0x100
        effectRT    = CreateRenderTexture(w / 4, h / 4, (RenderTextureFormat)25, FilterMode.Bilinear); // 0x108
        pingA       = CreateRenderTexture(w / 4, h / 4, (RenderTextureFormat)25);             // 0x110
        pingB       = CreateRenderTexture(w / 4, h / 4, (RenderTextureFormat)25);             // 0x118

        // ---- 7 台相机 targetTexture（0x20..0x50，各 8 字节）----
        normalBlockCamera.targetTexture = normalBlockRT;
        subtractBlockCamera.targetTexture = subtractBlockRT;
        disabledNormalBlockCamera.targetTexture = disabledNormalBlockRT;
        disabledSubtractBlockCamera.targetTexture = disabledSubtractBlockRT;
        disabledNormalReadyBlockCamera.targetTexture = disabledNormalReadyBlockRT;
        disabledSubtractReadyBlockCamera.targetTexture = disabledSubtractReadyBlockRT;
        touchBlockCamera.targetTexture = touchBlockRT;

        // ---- 材质纹理绑定（nameID 偏移取自码流，已按 ShaderIDs 表还原）----
        blockComposeMaterial.SetTexture(ShaderIDs.NormalBlockRT, normalBlockRT);
        blockComposeMaterial.SetTexture(ShaderIDs.SubtractBlockRT, subtractBlockRT);
        blockComposeMaterial.SetTexture(ShaderIDs.DisabledNormalBlockRT, disabledNormalBlockRT);
        blockComposeMaterial.SetTexture(ShaderIDs.DisabledSubtractBlockRT, disabledSubtractBlockRT);

        activeBlockMaterial.SetTexture(ShaderIDs.EffectRT, effectRT);
        activeBlockMaterial.SetTexture(ShaderIDs.ComposedRT, composedEnabledBlockRT);
        activeBlockMaterial.SetTexture(ShaderIDs.SceneColor, sceneColorRT);
        activeBlockMaterial.SetTexture(ShaderIDs.ReadyComposeRT, composedDisabledBlockRT);
        activeBlockMaterial.SetTexture(ShaderIDs.DisabledNormalBlockRT, disabledNormalReadyBlockRT);
        activeBlockMaterial.SetTexture(ShaderIDs.DisabledSubtractBlockRT, disabledSubtractReadyBlockRT);
        activeBlockMaterial.SetTexture(ShaderIDs.TouchHoverRT, touchBlockRT);

        touchShineSpeed        = activeBlockMaterial.GetFloat(ShaderIDs.TouchPosShineSpeed);
        touchShineLowThreshold = activeBlockMaterial.GetFloat(ShaderIDs.TouchPosLowThreshold);
        touchShineBrightness   = activeBlockMaterial.GetFloat(ShaderIDs.TouchPosBrightness);

        disabledBlockMaterial.SetTexture(ShaderIDs.ComposedRT, composedDisabledBlockRT);

        blockReadyMaterial.SetTexture(ShaderIDs.DisabledNormalBlockRT, disabledNormalReadyBlockRT);
        blockReadyMaterial.SetTexture(ShaderIDs.DisabledSubtractBlockRT, disabledSubtractReadyBlockRT);
        blockReadyMaterial.SetTexture(ShaderIDs.ComposedRT, composedDisabledBlockRT);

        touchEffectMaterial.SetTexture(ShaderIDs.TouchHoverRT, touchBlockRT);
        edgeMaskMaterial.SetTexture(ShaderIDs.ComposedRT, composedEnabledBlockRT);
        glowMaskMaterial.SetTexture(ShaderIDs.ComposedRT, composedEnabledBlockRT);

        CopyReadyTouchParamsToActive();
        UpdateDilateTexelSize();

        // ---- 10 个触摸槽位 ----
        // 反汇编：Instantiate<GameObject>(touchHoverPrefab, transform) →
        //         GetComponent<TouchBlockBehavior>() → Initialize() → new TouchBlockSlot { fingerId=-1, behavior }
        for (int i = 0; i < 10; i++)
        {
            var go = Object.Instantiate<GameObject>(touchHoverPrefab, transform);
            var behavior = go.GetComponent<TouchBlockBehavior>();
            behavior.Initialize();
            touchBlockSlots[i] = new TouchBlockSlot { fingerId = -1, behavior = behavior };
        }
    }

    // ---- VA 0x1D1C6EC -------------------------------------------------------
    // 从 blockReadyMaterial 拷 Shine*、从 touchEffectMaterial 拷 touch 参数到 activeBlockMaterial
    private void CopyReadyTouchParamsToActive()
    {
        if (activeBlockMaterial == null || blockReadyMaterial == null || touchEffectMaterial == null) return;
        var dst = activeBlockMaterial;

        dst.SetFloat(ShaderIDs.ShineSpeed,      blockReadyMaterial.GetFloat(ShaderIDs.ShineSpeed));
        dst.SetFloat(ShaderIDs.ShineBrightness, blockReadyMaterial.GetFloat(ShaderIDs.ShineBrightness));
        dst.SetColor(ShaderIDs.ShineColor,      blockReadyMaterial.GetColor(ShaderIDs.ShineColor));

        CopyTexture(dst, ShaderIDs.TouchDisplaceMap, touchEffectMaterial, ShaderIDs.DisplaceMap);
        dst.SetFloat(ShaderIDs.TouchDisplaceSpeed,     touchEffectMaterial.GetFloat(ShaderIDs.DisplaceSpeed));
        dst.SetFloat(ShaderIDs.TouchDisplaceStrength,  touchEffectMaterial.GetFloat(ShaderIDs.DisplaceStrength));
        dst.SetVector(ShaderIDs.TouchDisplaceDirection, touchEffectMaterial.GetVector(ShaderIDs.DisplaceDirection));
        dst.SetColor(ShaderIDs.TouchGlowColor,         touchEffectMaterial.GetColor(ShaderIDs.GlowColor));
        dst.SetFloat(ShaderIDs.TouchBackgroundPixelScale, touchEffectMaterial.GetFloat(ShaderIDs.BackgroundPixelScale));

        CopyTexture(dst, ShaderIDs.NoiseMap, touchEffectMaterial, ShaderIDs.NoiseMap);
        dst.SetColor(ShaderIDs.NoiseTint, touchEffectMaterial.GetColor(ShaderIDs.NoiseTint));
        dst.SetFloat(ShaderIDs.NoiseRadius,           touchEffectMaterial.GetFloat(ShaderIDs.NoiseRadius));
        dst.SetFloat(ShaderIDs.NoiseSmoothness,       touchEffectMaterial.GetFloat(ShaderIDs.NoiseSmoothness));
        dst.SetFloat(ShaderIDs.NoiseEvoSpeed,         touchEffectMaterial.GetFloat(ShaderIDs.NoiseEvoSpeed));
        dst.SetFloat(ShaderIDs.NoiseDirChangeSpeed,   touchEffectMaterial.GetFloat(ShaderIDs.NoiseDirChangeSpeed));
        dst.SetFloat(ShaderIDs.NoiseDisplaceStrength, touchEffectMaterial.GetFloat(ShaderIDs.NoiseDisplaceStrength));
        dst.SetFloat(ShaderIDs.SDFCellSize,           touchEffectMaterial.GetFloat(ShaderIDs.SDFCellSize));
        dst.SetFloat(ShaderIDs.SDFSmoothness,         touchEffectMaterial.GetFloat(ShaderIDs.SDFSmoothness));
        dst.SetFloat(ShaderIDs.SDFFalloff,            touchEffectMaterial.GetFloat(ShaderIDs.SDFFalloff));
        dst.SetFloat(ShaderIDs.SDFMoveSpeed,          touchEffectMaterial.GetFloat(ShaderIDs.SDFMoveSpeed));
    }

    // ---- VA 0x1D1C5B0 -------------------------------------------------------
    private RenderTexture CreateRenderTexture(int width, int height,
        RenderTextureFormat format = (RenderTextureFormat)16, FilterMode filterMode = FilterMode.Point)
    {
        var rt = new RenderTexture(width, height, 0, format, RenderTextureReadWrite.Default);
        rt.useMipMap = false;
        rt.filterMode = filterMode;
        rt.autoGenerateMips = false;
        rt.Create();
        totalRT.Add(rt);
        return rt;
    }

    // ---- VA 0x1D1D6A0 -------------------------------------------------------
    private static void ClearRenderTexture(RenderTexture rt)
    {
        if (rt == null) return;
        var prev = RenderTexture.active;
        RenderTexture.active = rt;
        GL.Clear(false, true, Color.clear);
        RenderTexture.active = prev;
    }

    // ---- VA 0x1D1D600 / 0x1D1D608 -------------------------------------------
    public void SetTouchPos(List<Vector4> pos) { touchPos = pos; }

    private static void CopyTexture(Material dst, int dstId, Material src, int srcId)
    {
        if (src == null) return;
        dst.SetTexture(dstId, src.GetTexture(srcId));
        dst.SetTextureScale(dstId, src.GetTextureScale(srcId));
        dst.SetTextureOffset(dstId, src.GetTextureOffset(srcId));
    }

    // ---- VA 0x1D1CEBC -------------------------------------------------------
    // 仅是一条尾调用：Update() => UpdateTouchPos()（反汇编首指令即 b 0x1D1CEC0）。
    private void Update() => UpdateTouchPos();

    // ---- VA 0x1D1DB54 -------------------------------------------------------
    // 释放：移除命令缓冲 → 清部分相机的 targetTexture → Release + Clear(totalRT)。
    // 反汇编里**只**清这 4 台：0x20 normal / 0x28 subtract / 0x30 disabledNormal / 0x50 touch；
    // 0x38 disabledSubtract、0x40/0x48 两台 *Ready* **未在此撤销**（不对称，照抄）。
    private void OnDestroy()
    {
        if (mainCamera != null && cmd != null)
            mainCamera.RemoveCommandBuffer(CameraEvent.BeforeImageEffects, cmd);  // 0x12 = 18
        if (cmd != null) cmd.Release();
        cmd = null;

        if (normalBlockCamera != null)         normalBlockCamera.targetTexture = null;          // 0x20
        if (subtractBlockCamera != null)       subtractBlockCamera.targetTexture = null;        // 0x28
        if (disabledNormalBlockCamera != null) disabledNormalBlockCamera.targetTexture = null;  // 0x30
        if (touchBlockCamera != null)          touchBlockCamera.targetTexture = null;           // 0x50
        // 0x38 / 0x40 / 0x48 未清（照抄 APK 行为）。

        if (totalRT != null)
        {
            foreach (var rt in totalRT)
                if (rt != null) rt.Release();
            totalRT.Clear();
        }
    }

    // ---- VA 0x1D1CC04 -------------------------------------------------------
    private void UpdateDilateTexelSize()
    {
        if (effectRT == null || edgeMaskMaterial == null || glowMaskMaterial == null) return;
        var v = new Vector4(1f / effectRT.width, 1f / effectRT.height,
                            effectRT.width, effectRT.height);
        edgeMaskMaterial.SetVector(ShaderIDs.DilateTexelSize, v);
        glowMaskMaterial.SetVector(ShaderIDs.DilateTexelSize, v);
    }

    // ---- VA 0x1D1D750 -------------------------------------------------------
    // .rodata: kEpsFalloff = 0.001f (0xC26530), kEpsSum = 1e-6f (0xC26384)
    private static float GetGlowRingWeight(int passIndex, int glowRadius, float falloff)
    {
        const float kEpsFalloff = 0.001f;
        const float kEpsSum = 1e-6f;
        if (glowRadius < 1) return 0f;
        if (falloff > kEpsFalloff)
        {
            float sum = 0f;
            for (int i = glowRadius; i > 0; i--) sum += Mathf.Pow(i, falloff);
            if (sum > kEpsSum) return Mathf.Pow(glowRadius - passIndex, falloff) / sum;
        }
        return 1f / glowRadius;
    }

    // ---- VA 0x1D1CFD8 -------------------------------------------------------
    private void LateUpdate()
    {
        if (composedEnabledBlockRT == null || composedDisabledBlockRT == null || effectRT == null) return;
        UpdateDilateTexelSize();
        Graphics.Blit(null, composedEnabledBlockRT, blockComposeMaterial, 0);
        RenderEffects(composedEnabledBlockRT, effectRT);
        Graphics.Blit(null, composedDisabledBlockRT, blockComposeMaterial, 1);
        RefreshSceneColorCommands();
    }

    // ---- VA 0x1D1D114 -------------------------------------------------------
    private void RenderEffects(RenderTexture sourceMask, RenderTexture destinationEffect)
    {
        ClearRenderTexture(destinationEffect);
        // 显式绑定的 +0x14 是 _ComposeRT（sourceMask 同时由 Blit 自动绑为 _MainTex）
        edgeMaskMaterial.SetTexture(ShaderIDs.ComposedRT, sourceMask);
        glowMaskMaterial.SetTexture(ShaderIDs.ComposedRT, sourceMask);

        if (edgeSize >= 1)
        {
            if (edgeSize == 1)
            {
                Graphics.Blit(sourceMask, destinationEffect, edgeMaskMaterial, 1);
            }
            else
            {
                Graphics.Blit(sourceMask, pingA, edgeMaskMaterial, 0);
                for (int p = 1; p < edgeSize - 1; p++)
                {
                    Graphics.Blit(pingA, pingB, edgeMaskMaterial, 0);
                    (pingA, pingB) = (pingB, pingA);
                }
                Graphics.Blit(pingA, destinationEffect, edgeMaskMaterial, 1);
            }
        }

        if (glowRadius >= 1)
        {
            ClearRenderTexture(pingA);
            ClearRenderTexture(pingB);
            float w = GetGlowRingWeight(0, glowRadius, glowWeightFalloff);
            if (w >= glowPassWeightThreshold)
            {
                int pass = 1;
                while (true)
                {
                    glowMaskMaterial.SetFloat(ShaderIDs.PassWeight, w);
                    if (pass == 1)
                    {
                        glowMaskMaterial.SetFloat(ShaderIDs.GlowFirstPass, 1f);
                        Graphics.Blit(sourceMask, pingA, glowMaskMaterial, 0);
                        glowMaskMaterial.SetFloat(ShaderIDs.GlowFirstPass, 0f);
                    }
                    else
                    {
                        Graphics.Blit(pingA, pingB, glowMaskMaterial, 0);
                        (pingA, pingB) = (pingB, pingA);
                    }
                    if (pass >= glowRadius) break;
                    w = GetGlowRingWeight(pass, glowRadius, glowWeightFalloff);
                    pass++;
                    if (w < glowPassWeightThreshold) break;
                }
                // pass 1 只写 .y（辉光），保留 effectRT.x（边缘）
                Graphics.Blit(pingA, destinationEffect, glowMaskMaterial, 1);
            }
        }
    }

    // ---- VA 0x1D1D4CC -------------------------------------------------------
    // 先把当前相机目标拷到 sceneColorRT（供 ActiveBlock 的 _SceneColor 用），
    // 再用 activeBlockMaterial 全屏合成回相机目标。
    // BuiltinRenderTextureType：None=0、CurrentActive=1、CameraTarget=2（APK 元数据实测）。
    private void RefreshSceneColorCommands()
    {
        if (cmd == null) return;
        cmd.Clear();
        cmd.Blit(BuiltinRenderTextureType.CameraTarget, sceneColorRT);
        cmd.Blit(BuiltinRenderTextureType.None, BuiltinRenderTextureType.CameraTarget, activeBlockMaterial);
    }

    // ---- VA 0x1D1D7EC -------------------------------------------------------
    public void BeginTouchBlockFrame()
    {
        if (touchBlockSlots == null) throw new NullReferenceException();
        foreach (var slot in touchBlockSlots)
            if (slot != null) slot.touchedThisFrame = false;
    }

    // ---- VA 0x1D1D83C -------------------------------------------------------
    public void UpdateTouchBlock(int fingerId, Vector2 worldPosition)
    {
        if (touchBlockSlots == null) throw new NullReferenceException();
        foreach (var slot in touchBlockSlots)
            if (slot != null && slot.fingerId == fingerId)
            { slot.touchedThisFrame = true; slot.behavior.UpdatePosition(worldPosition); return; }
        foreach (var slot in touchBlockSlots)
            if (slot != null && slot.fingerId == -1)
            {
                slot.fingerId = fingerId;
                slot.touchedThisFrame = true;
                slot.behavior.UpdatePosition(worldPosition);
                slot.behavior.Show();
                return;
            }
    }

    // ---- VA 0x1D1D9FC -------------------------------------------------------
    public void EndTouchBlockFrame()
    {
        if (touchBlockSlots == null) throw new NullReferenceException();
        foreach (var slot in touchBlockSlots)
            if (slot != null && slot.fingerId != -1 && !slot.touchedThisFrame)
            { slot.behavior.Hide(); slot.fingerId = -1; }
    }

    // ---- VA 0x1D1CEC0 -------------------------------------------------------
    private void UpdateTouchPos()
    {
        var mat = activeBlockMaterial;
        if (mat == null) return;
        mat.SetVectorArray(ShaderIDs.TouchPos, touchPos);
        mat.SetInt(ShaderIDs.TouchPosCount, touchPos.Count);
        // Lerp(lowThreshold, 1, 0.5 + 0.5*sin(shineSpeed*Time.time)) * brightness
        // 0x3E51240 = sinf（PLT→dynsym 实测）
        float shine = Mathf.Lerp(touchShineLowThreshold, 1f,
                                 0.5f + 0.5f * Mathf.Sin(touchShineSpeed * Time.time))
                      * touchShineBrightness;
        mat.SetFloat(ShaderIDs.TouchPosShine, shine);
    }
}

// =============================================================================
public class SubtractBlockPostProcessor : MonoBehaviour
{
    // 字段：0x20 material | 0x28 targetPass | 0x30 cam
    // ---- VA 0x1D1E718 -------------------------------------------------------
    private void OnRenderImage(RenderTexture source, RenderTexture destination)
    {
        if (cam != null && cam.targetTexture == null)
            Graphics.Blit(source, destination);
        else
            Graphics.Blit(source, destination, material, targetPass);
    }
}

// =============================================================================
public partial class ProgressControl : MonoBehaviour
{
    // 字段：0xB8 lowPassFilter | 0xC0 lowPassFilterLerpDuration | 0xC4 lowPassCutoffFrequency
    //       0xC8 lowPassFilterCoroutine
    // ---- VA 0x1D353A8 -------------------------------------------------------
    public void SetLowPassFilter(bool isEnabled)
    {
        if (lowPassFilter == null) return;
        if (lowPassCutoffFrequency <= 0f)
            lowPassCutoffFrequency = lowPassFilter.cutoffFrequency;
        if (lowPassFilterCoroutine != null) StopCoroutine(lowPassFilterCoroutine);
        lowPassFilterCoroutine = StartCoroutine(LerpLowPassFilter(isEnabled));
    }

    // ---- VA 0x1D35474(factory) / 0x1D35510(MoveNext)；无 set_Q → Q = 默认 1.0 ----
    private IEnumerator LerpLowPassFilter(bool enableFilter)
    {
        lowPassFilter.enabled = enableFilter;
        float start = lowPassFilter.cutoffFrequency;
        float target = enableFilter ? lowPassCutoffFrequency : 22000f;   // 22000 = .rodata 0xC2654C
        float duration = Mathf.Max(lowPassFilterLerpDuration, 0f);
        float t = 0f;
        while (t < duration)
        {
            t += Time.deltaTime;
            lowPassFilter.cutoffFrequency = Mathf.Lerp(start, target, Mathf.Clamp01(t / duration));
            yield return null;
        }
        lowPassFilter.cutoffFrequency = target;
    }
}

// =============================================================================
// 本文件覆盖的 BlockRender / SubtractBlockPostProcessor / ProgressControl 方法
// 均已从字节确定，无残留占位。
// =============================================================================
````
