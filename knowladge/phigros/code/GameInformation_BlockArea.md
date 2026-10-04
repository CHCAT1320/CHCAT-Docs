# GameInformation_BlockArea.cs

> 源文件：`code/GameInformation_BlockArea.cs`

````csharp
// Namespace: 
[Serializable]
public class GameInformation.BlockArea // TypeDefIndex: 4437
{
	// Fields
	public Vector2 topRightPercentage; // 0x10
	public Vector2 bottomLeftPercentage; // 0x18
	public float appearTime; // 0x20
	public float enableTime; // 0x24
	public float disableTime; // 0x28
	public float disappearTime; // 0x2C
	public bool isSubtract; // 0x30
	public List<GameInformation.RotateEvent> rotateEvents; // 0x38
	public List<GameInformation.MoveEvent> moveEvents; // 0x40
	public List<GameInformation.ScaleEvent> scaleEvents; // 0x48

	// Methods

	// RVA: 0x1CA32A8 Offset: 0x1C9F2A8 VA: 0x1CA32A8
	public void Mirror() { }

	// RVA: 0x1CA3650 Offset: 0x1C9F650 VA: 0x1CA3650
	public void .ctor() { }
}
````
