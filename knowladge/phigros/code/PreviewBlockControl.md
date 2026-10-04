# PreviewBlockControl.cs

> 源文件：`code/PreviewBlockControl.cs`

````csharp
// Namespace: ProjectEditor.PreviewScripts
public class PreviewBlockControl : MonoBehaviour // TypeDefIndex: 4929
{
	// Fields
	[SerializeField]
	private float destroyInterval; // 0x20
	public ProgressControl progressControl; // 0x28
	public LevelControl levelControl; // 0x30
	public GameInformation.BlockArea blockInfo; // 0x38
	public float screenWidth; // 0x40
	public float screenHeight; // 0x44
	public int index; // 0x48
	[SerializeField]
	private SpriteRenderer renderer; // 0x50
	[SerializeField]
	private float disabledBlockShowDuration; // 0x58
	[SerializeField]
	private float disabledBlockReadyDuration; // 0x5C
	[HideInInspector]
	public bool isDragging; // 0x60
	private string enabledLayer; // 0x68
	private string disabledLayer; // 0x70
	private string readyLayer; // 0x78
	private string touchLayer; // 0x80
	private PreviewBlockControl.BlockPhase lastPhase; // 0x88
	private bool isDisabled; // 0x8C
	private bool wasVisible; // 0x8D
	private bool wasReady; // 0x8E

	// Methods

	// RVA: 0x1D7060C Offset: 0x1D6C60C VA: 0x1D7060C
	private void Start() { }

	// RVA: 0x1D7069C Offset: 0x1D6C69C VA: 0x1D7069C
	private void Update() { }

	// RVA: 0x1D706C4 Offset: 0x1D6C6C4 VA: 0x1D706C4
	public void UpdateBlocksTransform() { }

	// RVA: 0x1D707CC Offset: 0x1D6C7CC VA: 0x1D707CC
	private void UpdateBlockActivation() { }

	// RVA: 0x1D7098C Offset: 0x1D6C98C VA: 0x1D7098C
	private void UpdateBlockAnimations() { }

	// RVA: 0x1D7157C Offset: 0x1D6D57C VA: 0x1D7157C
	private Vector2 AnchorToWorld(Vector2 anchor) { }

	// RVA: 0x1D71598 Offset: 0x1D6D598 VA: 0x1D71598
	private static Vector2 ScaleAroundAnchor(Vector2 point, Vector2 anchor, float stepX, float stepY) { }

	// RVA: 0x1D715B4 Offset: 0x1D6D5B4 VA: 0x1D715B4
	private static Vector2 RotateAroundAnchor(Vector2 point, Vector2 anchor, float deltaDeg) { }

	// RVA: 0x1D716A0 Offset: 0x1D6D6A0 VA: 0x1D716A0
	private static float SafeDiv(float numerator, float denominator) { }

	// RVA: 0x1D71404 Offset: 0x1D6D404 VA: 0x1D71404
	private Vector2 UpdateMovement(Vector2 originalCenter, Vector2 currentCenter) { }

	// RVA: 0x1D71868 Offset: 0x1D6D868 VA: 0x1D71868
	private ValueTuple<Vector2, Vector2> InterpolateScaleEvent(int index) { }

	// RVA: 0x1D7172C Offset: 0x1D6D72C VA: 0x1D7172C
	private Vector2 InterpolateMoveEvent(int index) { }

	// RVA: 0x1D71A08 Offset: 0x1D6DA08 VA: 0x1D71A08
	private ValueTuple<float, Vector2> InterpolateRotateEvent(int index) { }

	// RVA: 0x1D70C7C Offset: 0x1D6CC7C VA: 0x1D70C7C
	private bool IsTimeValid() { }

	// RVA: -1 Offset: -1
	private int FindCurrentEventIndex<T>(List<T> events, Func<T, float> getTime) { }
	/* GenericInstMethod :
	|
	|-RVA: 0x1F9A2DC Offset: 0x1F962DC VA: 0x1F9A2DC
	|-PreviewBlockControl.FindCurrentEventIndex<object>
	|
	|-RVA: 0x1F9A398 Offset: 0x1F96398 VA: 0x1F9A398
	|-PreviewBlockControl.FindCurrentEventIndex<__Il2CppFullySharedGenericType>
	*/

	// RVA: 0x1D719D8 Offset: 0x1D6D9D8 VA: 0x1D719D8
	private float CalculateEasedProgress(float currentTime, float nextTime, int easeType) { }

	// RVA: 0x1D70CC0 Offset: 0x1D6CCC0 VA: 0x1D70CC0
	private ValueTuple<Vector2, Vector2, Vector2> GetBlockGeometry(Vector2 anchor) { }

	// RVA: 0x1D71B40 Offset: 0x1D6DB40 VA: 0x1D71B40
	public void UpdateBlockInfo() { }

	// RVA: 0x1D71C40 Offset: 0x1D6DC40 VA: 0x1D71C40
	public bool IsActive(float t) { }

	[IteratorStateMachine(typeof(PreviewBlockControl.<DisabledBlockReady>d__39))]
	// RVA: 0x1D70C1C Offset: 0x1D6CC1C VA: 0x1D70C1C
	private IEnumerator DisabledBlockReady() { }

	[IteratorStateMachine(typeof(PreviewBlockControl.<DisabledBlockShow>d__40))]
	// RVA: 0x1D70BBC Offset: 0x1D6CBBC VA: 0x1D70BBC
	private IEnumerator DisabledBlockShow() { }

	// RVA: 0x1D71CC8 Offset: 0x1D6DCC8 VA: 0x1D71CC8
	public void .ctor() { }

	[CompilerGenerated]
	// RVA: 0x1D70B10 Offset: 0x1D6CB10 VA: 0x1D70B10
	private void <Update>g__DestroyAfterInterval|16_0() { }

	[CompilerGenerated]
	// RVA: 0x1D70D78 Offset: 0x1D6CD78 VA: 0x1D70D78
	private ValueTuple<Vector2, Vector2> <UpdateBlockAnimations>g__UpdateScale|24_0(ref PreviewBlockControl.<>c__DisplayClass24_0 ) { }

	[CompilerGenerated]
	// RVA: 0x1D710F4 Offset: 0x1D6D0F4 VA: 0x1D710F4
	private ValueTuple<float, Vector2> <UpdateBlockAnimations>g__UpdateRotation|24_1(ref PreviewBlockControl.<>c__DisplayClass24_0 ) { }
}
````
