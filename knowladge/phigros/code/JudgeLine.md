# JudgeLine.cs

> 源文件：`code/JudgeLine.cs`

````csharp
// Namespace: 
[Serializable]
public class JudgeLine // TypeDefIndex: 4674
{
	// Fields
	public float bpm; // 0x10
	public List<SpeedEvent> speedEvents; // 0x18
	public List<ChartNote> notesAbove; // 0x20
	public List<ChartNote> notesBelow; // 0x28
	public List<JudgeLineEvent> judgeLineDisappearEvents; // 0x30
	public List<JudgeLineEvent> judgeLineMoveEvents; // 0x38
	public List<JudgeLineEvent> judgeLineRotateEvents; // 0x40

	// Methods

	// RVA: 0x1D28AFC Offset: 0x1D24AFC VA: 0x1D28AFC
	public void Mirror(bool oldVersion) { }

	// RVA: 0x1D28F54 Offset: 0x1D24F54 VA: 0x1D28F54
	public void .ctor() { }
}
````
