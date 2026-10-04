# TouchBlockBehavior.cs

> 源文件：`code/TouchBlockBehavior.cs`

````csharp
// Namespace: 
public class TouchBlockBehavior : MonoBehaviour // TypeDefIndex: 4657
{
	// Fields
	public float size; // 0x20
	public float animationDuration; // 0x24
	public Vector3 idlePosition; // 0x28
	private Coroutine animationRoutine; // 0x38

	// Methods

	// RVA: 0x1D1CE04 Offset: 0x1D18E04 VA: 0x1D1CE04
	public void Initialize() { }

	// RVA: 0x1D1D904 Offset: 0x1D19904 VA: 0x1D1D904
	public void UpdatePosition(Vector2 position) { }

	// RVA: 0x1D1D968 Offset: 0x1D19968 VA: 0x1D1D968
	public void Show() { }

	// RVA: 0x1D1DA88 Offset: 0x1D19A88 VA: 0x1D1DA88
	public void Hide() { }

	[IteratorStateMachine(typeof(TouchBlockBehavior.<Animation>d__8))]
	// RVA: 0x1D1E81C Offset: 0x1D1A81C VA: 0x1D1E81C
	private IEnumerator Animation(Vector3 startScale, Vector3 endScale, bool isShowing) { }

	// RVA: 0x1D1E8F4 Offset: 0x1D1A8F4 VA: 0x1D1E8F4
	public void .ctor() { }
}
````
