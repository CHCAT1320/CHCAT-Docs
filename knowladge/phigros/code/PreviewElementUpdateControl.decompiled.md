# PreviewElementUpdateControl.decompiled.cs

> 源文件：`code/PreviewElementUpdateControl.decompiled.cs`

````csharp
// =============================================================================
// PreviewElementUpdateControl —— 由 APK libil2cpp.so(ARM64) 反汇编还原的等价 C#
//
// 依据：libil2cpp.so + dump.cs(Il2CppDumper 6.7.46)，capstone 5.0.7。
// 每个方法标注 VA（取自 dump.cs，APK 实测）；泛型实参经 ScriptMetadataMethod 反查。
//
// 字段偏移(dump.cs)：
//   0x20 levelControl | 0x28 progressControl | 0x30 previewCanvas | 0x38 previewBlockPrefab
//   0x40 blockRenderPrefab | 0x48 screenWidth | 0x4C screenHeight | 0x50 previewCam
//   0x58 previewBlocks(List<PreviewBlockControl>) | 0x60 <BlockRender>k__BackingField
//   0x68 <HasBlocks>k__BackingField
// =============================================================================

using System.Collections.Generic;
using UnityEngine;

namespace Phigros2.Level.Scripts
{
    public class PreviewElementUpdateControl : MonoBehaviour
    {
        [SerializeField] private LevelControl levelControl;         // 0x20
        [SerializeField] private ProgressControl progressControl;   // 0x28
        [SerializeField] private GameObject previewCanvas;          // 0x30
        [SerializeField] private GameObject previewBlockPrefab;     // 0x38
        [SerializeField] private GameObject blockRenderPrefab;      // 0x40
        private float screenWidth;                                  // 0x48
        private float screenHeight;                                 // 0x4C
        [SerializeField] private Camera previewCam;                 // 0x50
        private List<PreviewBlockControl> previewBlocks;            // 0x58
        public BlockRender BlockRender { get; set; }                // 0x60
        public bool HasBlocks { get; set; }                         // 0x68

        public IReadOnlyList<PreviewBlockControl> Blocks => previewBlocks;

        // ---- VA 0x1D79FE8 ---------------------------------------------------
        // 分配 previewBlocks 列表；若 previewCam 存在，用它的 orthographicSize 定世界视口：
        //   screenHeight = 2 * orthoSize；screenWidth = screenHeight * aspect。
        private void Awake()
        {
            previewBlocks = new List<PreviewBlockControl>();     // 0x58
            if (previewCam != null)
            {
                screenHeight = previewCam.orthographicSize * 2f;         // 0x4C
                screenWidth  = screenHeight * previewCam.aspect;         // 0x48
            }
        }

        // ---- VA 0x1D7A098 ---------------------------------------------------
        // 在 previewCanvas 下实例化 blockRenderPrefab（Instantiate<GameObject>），
        // 取其 BlockRender 组件，并把 previewCam 赋给 blockRender.mainCamera(0xA8)。
        public void CreateBlockRender()
        {
            var go = Instantiate(blockRenderPrefab, previewCanvas.transform);
            if (go == null) throw new System.NullReferenceException();
            var br = go.GetComponent<BlockRender>();
            BlockRender = br;
            if (br != null) br.mainCamera = previewCam;
        }

        // ---- VA 0x1D7A140 ---------------------------------------------------
        // 先 ClearAllBlocks；再对 levelControl(0x20) → +0x140 = chart → +0x20 = chart.blockAreaList
        // 逐个：在 previewCanvas 下 Instantiate previewBlockPrefab → GetComponent<PreviewBlockControl>
        //   → 填 blockInfo/progressControl/levelControl/screenWidth/screenHeight/index → UpdateBlocksTransform()
        //   → 加入 previewBlocks 列表。
        // 结束时 HasBlocks = previewBlocks.Count > 0。
        public void DestroyAndCreateAllBlocks()
        {
            ClearAllBlocks();
            if (levelControl == null) throw new System.NullReferenceException();
            var src = levelControl.chart.blockAreaList;      // levelControl+0x140(chart) → +0x20(blockAreaList)
            for (int i = 0; i < src.Count; i++)
            {
                var blockArea = src[i];
                var go = Instantiate(previewBlockPrefab, previewCanvas.transform);
                var blk = go.GetComponent<PreviewBlockControl>();
                blk.progressControl = progressControl;       // 0x28
                blk.levelControl    = levelControl;          // 0x30
                blk.blockInfo       = blockArea;             // 0x38
                blk.screenWidth     = screenWidth;           // 0x40
                blk.screenHeight    = screenHeight;          // 0x44
                blk.index           = i;                     // 0x48
                blk.UpdateBlocksTransform();
                previewBlocks.Add(blk);
            }
            HasBlocks = previewBlocks.Count > 0;
        }

        // ---- VA 0x1D7A344 ---------------------------------------------------
        // 遍历 previewBlocks，对每个非 null 元素 DestroyImmediate(gameObject)；
        // 然后清空列表（List.Clear）。
        private void ClearAllBlocks()
        {
            if (previewBlocks != null)
            {
                foreach (var blk in previewBlocks)
                    if (blk != null) DestroyImmediate(blk.gameObject);
                previewBlocks.Clear();
            }
        }

        // ---- VA 0x1D7A53C ---------------------------------------------------
        public PreviewBlockControl GetBlock(int index) => previewBlocks[index];
    }
}
````
