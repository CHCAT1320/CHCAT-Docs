# JudgeControl.cs

> 源文件：`code/JudgeControl.cs`

````csharp
// Namespace: 
public class JudgeControl : MonoBehaviour // TypeDefIndex: 4664
{
	// Fields
	public List<GameObject> judgeLines; // 0x20
	public List<JudgeLineControl> judgeLineControls; // 0x28
	public FingerManagement fingerManagement; // 0x30
	public ProgressControl progressControl; // 0x38
	public float nowTime; // 0x40
	public float pauseTime; // 0x44
	public GameObject pauseRing; // 0x48
	public GameObject backButton; // 0x50
	public CircleCollider2D backButtonCollider; // 0x58
	public GameObject retryButton; // 0x60
	public CircleCollider2D retryButtonCollider; // 0x68
	public List<ChartNote> chartNoteSortByTime; // 0x70
	private int startIndex; // 0x78
	private int endIndex; // 0x7C
	public static bool InChallengeMode; // 0x0
	public static float PerfectTimeRange; // 0x4
	public static float GoodTimeRange; // 0x8
	public static float BadTimeRange; // 0xC
	public bool stopJudge; // 0x80
	[SerializeField]
	private NoteUpdateManager noteUpdateManager; // 0x88
	[SerializeField]
	private PreviewElementUpdateControl previewElementUpdateControl; // 0x90
	[SerializeField]
	private Camera mainCamera; // 0x98
	private readonly List<Vector4> blockedTouchPositions; // 0xA0
	private bool wasTouchingAnyBlock; // 0xA8
	private float minDeltaTime; // 0xAC
	private int code; // 0xB0
	private float badTime; // 0xB4
	private float touchPos; // 0xB8

	// Methods

	// RVA: 0x1D206B0 Offset: 0x1D1C6B0 VA: 0x1D206B0
	private void Start() { }

	// RVA: 0x1D207E4 Offset: 0x1D1C7E4 VA: 0x1D207E4
	private void Update() { }

	// RVA: 0x1D20A38 Offset: 0x1D1CA38 VA: 0x1D20A38
	private void CheckPause(int fingerIndex) { }

	// RVA: 0x1D21104 Offset: 0x1D1D104 VA: 0x1D21104
	private void CheckNote(int fingerIndex) { }

	// RVA: 0x1D21828 Offset: 0x1D1D828 VA: 0x1D21828
	private void CheckFlick(int fingerIndex) { }

	// RVA: 0x1D20BCC Offset: 0x1D1CBCC VA: 0x1D20BCC
	private void CheckBlocks() { }

	// RVA: 0x1D21E58 Offset: 0x1D1DE58 VA: 0x1D21E58
	private void ProcessBlockedTouches() { }

	// RVA: 0x1D21E14 Offset: 0x1D1DE14 VA: 0x1D21E14
	private void UpdateLowPassFilterState(bool isTouchingAnyBlock) { }

	// RVA: 0x1D22010 Offset: 0x1D1E010 VA: 0x1D22010
	private bool TryGetBlockingBlock(Vector2 worldPosition, out PreviewBlockControl blockingBlock) { }

	// RVA: 0x1D22560 Offset: 0x1D1E560 VA: 0x1D22560
	private static bool IsPositionInsideBlock(PreviewBlockControl block, Vector2 worldPosition) { }

	// RVA: 0x1D20D10 Offset: 0x1D1CD10 VA: 0x1D20D10
	private void GetFingerPosition() { }

	// RVA: 0x1D2265C Offset: 0x1D1E65C VA: 0x1D2265C
	public void .ctor() { }

	// RVA: 0x1D227D8 Offset: 0x1D1E7D8 VA: 0x1D227D8
	private static void .cctor() { }

	[CompilerGenerated]
	// RVA: 0x1D22464 Offset: 0x1D1E464 VA: 0x1D22464
	private void <ProcessBlockedTouches>g__AddBlockedTouchPosition|34_0(Vector2 screenPosition) { }
}

// Namespace: 
public class JudgeLineControl : MonoBehaviour // TypeDefIndex: 4665
{
	// Fields
	public GameObject Click; // 0x20
	public GameObject Drag; // 0x28
	public GameObject Hold; // 0x30
	public GameObject Flick; // 0x38
	public Sprite ClickHL; // 0x40
	public Sprite HoldHL0; // 0x48
	public Sprite HoldHL1; // 0x50
````
