# PreviewElementUpdateControl.cs

> 源文件：`code/PreviewElementUpdateControl.cs`

````csharp
// Namespace: Phigros2.Level.Scripts
public class PreviewElementUpdateControl : MonoBehaviour // TypeDefIndex: 4962
{
	// Fields
	[SerializeField]
	private LevelControl levelControl; // 0x20
	[SerializeField]
	private ProgressControl progressControl; // 0x28
	[SerializeField]
	private GameObject previewCanvas; // 0x30
	[SerializeField]
	private GameObject previewBlockPrefab; // 0x38
	[SerializeField]
	private GameObject blockRenderPrefab; // 0x40
	private float screenWidth; // 0x48
	private float screenHeight; // 0x4C
	[SerializeField]
	private Camera previewCam; // 0x50
	private List<PreviewBlockControl> previewBlocks; // 0x58
	[CompilerGenerated]
	private BlockRender <BlockRender>k__BackingField; // 0x60
	[CompilerGenerated]
	private bool <HasBlocks>k__BackingField; // 0x68

	// Properties
	public IReadOnlyList<PreviewBlockControl> Blocks { get; }
	public BlockRender BlockRender { get; set; }
	public bool HasBlocks { get; set; }

	// Methods

	// RVA: 0x1D79FBC Offset: 0x1D75FBC VA: 0x1D79FBC
	public IReadOnlyList<PreviewBlockControl> get_Blocks() { }

	[CompilerGenerated]
	// RVA: 0x1D79FC4 Offset: 0x1D75FC4 VA: 0x1D79FC4
	public BlockRender get_BlockRender() { }

	[CompilerGenerated]
	// RVA: 0x1D79FCC Offset: 0x1D75FCC VA: 0x1D79FCC
	private void set_BlockRender(BlockRender value) { }

	[CompilerGenerated]
	// RVA: 0x1D79FD4 Offset: 0x1D75FD4 VA: 0x1D79FD4
	public bool get_HasBlocks() { }

	[CompilerGenerated]
	// RVA: 0x1D79FDC Offset: 0x1D75FDC VA: 0x1D79FDC
	private void set_HasBlocks(bool value) { }

	// RVA: 0x1D79FE8 Offset: 0x1D75FE8 VA: 0x1D79FE8
	private void Awake() { }

	// RVA: 0x1D7A098 Offset: 0x1D76098 VA: 0x1D7A098
	public void CreateBlockRender() { }

	// RVA: 0x1D7A140 Offset: 0x1D76140 VA: 0x1D7A140
	public void DestroyAndCreateAllBlocks() { }

	// RVA: 0x1D7A344 Offset: 0x1D76344 VA: 0x1D7A344
	private void ClearAllBlocks() { }

	// RVA: 0x1D7A53C Offset: 0x1D7653C VA: 0x1D7A53C
	public PreviewBlockControl GetBlock(int index) { }

	// RVA: 0x1D7A594 Offset: 0x1D76594 VA: 0x1D7A594
	public void .ctor() { }
}
````
