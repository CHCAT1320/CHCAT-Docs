# BlockRender.cs

> 源文件：`code/BlockRender.cs`

````csharp
// Namespace: 
[ExecuteInEditMode]
public class BlockRender : MonoBehaviour // TypeDefIndex: 4654
{
	// Fields
	[SerializeField]
	private Camera normalBlockCamera; // 0x20
	[SerializeField]
	private Camera subtractBlockCamera; // 0x28
	[SerializeField]
	private Camera disabledNormalBlockCamera; // 0x30
	[SerializeField]
	private Camera disabledSubtractBlockCamera; // 0x38
	[SerializeField]
	private Camera disabledNormalReadyBlockCamera; // 0x40
	[SerializeField]
	private Camera disabledSubtractReadyBlockCamera; // 0x48
	[SerializeField]
	private Camera touchBlockCamera; // 0x50
	[SerializeField]
	private ShaderVariantCollection blockShaderVariantCollection; // 0x58
	[SerializeField]
	private Material activeBlockMaterial; // 0x60
	[SerializeField]
	private Material disabledBlockMaterial; // 0x68
	[SerializeField]
	private Material blockReadyMaterial; // 0x70
	[SerializeField]
	private Material touchEffectMaterial; // 0x78
	[SerializeField]
	private Material blockComposeMaterial; // 0x80
	[SerializeField]
	private Material edgeMaskMaterial; // 0x88
	[SerializeField]
	private Material glowMaskMaterial; // 0x90
	[SerializeField]
	private List<Canvas> fxRenderList; // 0x98
	[SerializeField]
	private GameObject touchHoverPrefab; // 0xA0
	[HideInInspector]
	public Camera mainCamera; // 0xA8
	private CommandBuffer cmd; // 0xB0
	private RenderTexture sceneColorRT; // 0xB8
	private RenderTexture normalBlockRT; // 0xC0
	private RenderTexture subtractBlockRT; // 0xC8
	private RenderTexture disabledNormalBlockRT; // 0xD0
	private RenderTexture disabledSubtractBlockRT; // 0xD8
	private RenderTexture disabledNormalReadyBlockRT; // 0xE0
	private RenderTexture disabledSubtractReadyBlockRT; // 0xE8
	private RenderTexture composedEnabledBlockRT; // 0xF0
	private RenderTexture composedDisabledBlockRT; // 0xF8
	private RenderTexture touchBlockRT; // 0x100
	private RenderTexture effectRT; // 0x108
	private RenderTexture pingA; // 0x110
	private RenderTexture pingB; // 0x118
	private List<RenderTexture> totalRT; // 0x120
	private const int MaxTouchBlocks = 10;
	private readonly BlockRender.TouchBlockSlot[] touchBlockSlots; // 0x128
	[SerializeField]
	private int edgeSize; // 0x130
	[SerializeField]
	private int glowRadius; // 0x134
	[Tooltip("Glow ring weight falloff. 0 = uniform (1/R per ring). 1 = linear triangular. Larger = faster decay outward.")]
	[SerializeField]
	[Range(0, 4)]
	private float glowWeightFalloff; // 0x138
	[Range(0, 0.2)]
	[SerializeField]
	[Tooltip("Skip glow dilation passes whose ring weight is below this value. 0 = run all glowRadius passes.")]
	private float glowPassWeightThreshold; // 0x13C
	private List<Vector4> touchPos; // 0x140
	private float touchShineSpeed; // 0x148
	private float touchShineLowThreshold; // 0x14C
	private float touchShineBrightness; // 0x150

	// Methods

	// RVA: 0x1D1BC4C Offset: 0x1D17C4C VA: 0x1D1BC4C
	private void Start() { }

	// RVA: 0x1D1CC04 Offset: 0x1D18C04 VA: 0x1D1CC04
	private void UpdateDilateTexelSize() { }

	// RVA: 0x1D1CEBC Offset: 0x1D18EBC VA: 0x1D1CEBC
	private void Update() { }

	// RVA: 0x1D1CFD8 Offset: 0x1D18FD8 VA: 0x1D1CFD8
	private void LateUpdate() { }

	// RVA: 0x1D1D4CC Offset: 0x1D194CC VA: 0x1D1D4CC
	private void RefreshSceneColorCommands() { }

	// RVA: 0x1D1D600 Offset: 0x1D19600 VA: 0x1D1D600
	public void SetTouchPos(List<Vector4> pos) { }

	// RVA: 0x1D1CEC0 Offset: 0x1D18EC0 VA: 0x1D1CEC0
	private void UpdateTouchPos() { }

	// RVA: 0x1D1C6EC Offset: 0x1D186EC VA: 0x1D1C6EC
	private void CopyReadyTouchParamsToActive() { }

	// RVA: 0x1D1D608 Offset: 0x1D19608 VA: 0x1D1D608
	private static void CopyTexture(Material dst, int dstId, Material src, int srcId) { }

	// RVA: 0x1D1D114 Offset: 0x1D19114 VA: 0x1D1D114
	private void RenderEffects(RenderTexture sourceMask, RenderTexture destinationEffect) { }

	// RVA: 0x1D1D750 Offset: 0x1D19750 VA: 0x1D1D750
	private static float GetGlowRingWeight(int passIndex, int glowRadius, float falloff) { }

	// RVA: 0x1D1D6A0 Offset: 0x1D196A0 VA: 0x1D1D6A0
	private static void ClearRenderTexture(RenderTexture rt) { }

	// RVA: 0x1D1C5B0 Offset: 0x1D185B0 VA: 0x1D1C5B0
	private RenderTexture CreateRenderTexture(int width, int height, RenderTextureFormat format = 16, FilterMode filterMode = 0) { }

	// RVA: 0x1D1D7EC Offset: 0x1D197EC VA: 0x1D1D7EC
	public void BeginTouchBlockFrame() { }

	// RVA: 0x1D1D83C Offset: 0x1D1983C VA: 0x1D1D83C
	public void UpdateTouchBlock(int fingerId, Vector2 worldPosition) { }

	// RVA: 0x1D1D9FC Offset: 0x1D199FC VA: 0x1D1D9FC
	public void EndTouchBlockFrame() { }

	// RVA: 0x1D1DB54 Offset: 0x1D19B54 VA: 0x1D1DB54
	private void OnDestroy() { }

	// RVA: 0x1D1DE2C Offset: 0x1D19E2C VA: 0x1D1DE2C
	public void .ctor() { }
}
````
