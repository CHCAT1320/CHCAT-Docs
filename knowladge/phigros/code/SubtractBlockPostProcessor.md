# SubtractBlockPostProcessor.cs

> 源文件：`code/SubtractBlockPostProcessor.cs`

````csharp
// Namespace: 
[ExecuteInEditMode]
[RequireComponent(typeof(Camera))]
public class SubtractBlockPostProcessor : MonoBehaviour // TypeDefIndex: 4655
{
	// Fields
	[SerializeField]
	private Material subtractBlockMaterial; // 0x20
	[SerializeField]
	private int targetPass; // 0x28
	[SerializeField]
	private Camera cam; // 0x30

	// Methods

	// RVA: 0x1D1E718 Offset: 0x1D1A718 VA: 0x1D1E718
	private void OnRenderImage(RenderTexture source, RenderTexture destination) { }

	// RVA: 0x1D1E814 Offset: 0x1D1A814 VA: 0x1D1E814
	public void .ctor() { }
}
````
