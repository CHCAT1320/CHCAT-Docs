# UMIGURI NEXT 逆向总览

UMIGURI（ウミグリ）v2.01，Electron 25 定制打包，`app.asar` 被改名为 `app.larc`。

- 游戏版本：v2.01
- 逆向日期：2026-09-27

::: warning WARNING
本文档只记录逆向结果与文件格式，供互操作性 / 研究使用。请勿二次分发官方资源。
:::

## 进程与文件

| 文件 | 作用 |
|------|------|
| `UMIGURI.exe` | 启动器 |
| `uaclt.exe` | 自动更新客户端 |
| `libugdev.dll` | 只导出串口接口，不负责加密 |
| `core/bin/app.larc` | Electron 应用包（asar 改名） |

## 加密资产一览

| 文件 | Magic | 是否加密 | 解密位置 | 状态 |
|------|-------|----------|----------|------|
| `core/bin/app.larc` | `Re=L` + flags | 是 | `app.exe` 原生 asar | 已解开 |
| `data/**/data.arc` | `UARC` | 是 | 游戏 JS `vs`，`P2=1` | 已解开 |
| `core/una/*.una` | `UNA ` | 是 | 同上 `vs`，`P2=2` | 已解开 |
| `core/config/*.krtbl` | `KRSM` | 否 | 明文二进制表 | 无需解密 |
| `.ugc` / `.ucsl` / `.ugr` / `.upm` | 文本 | 否 | — | 谱面 / 技能 / 场景明文 |

格式细节见：

- [LARC（`app.larc`）](./larc.md)
- [UARC / UNA](./uarc.md)
- [游戏代码可读化](./code.md)

## 解包命令

```
python _re/scripts/unpack_uarc.py <file.arc|file.una> [p2] [outdir]
python _re/scripts/unpack_all.py
```

`unpack_all.py` 抽出全部 331 个条目。无后缀文件按魔数补扩展名，DDS 贴图转成 PNG。

LARC 内容解密当前仍用 Unicorn 跑 `app.exe` 的 `0x140346BD0`（`scripts/emu_decrypt.py`）。

分类汇总：

```
python _re/scripts/assemble_export.py
```

::: tip TIP
`unpack_uarc.py` 不带参数时会跑一组内置目标；也可以直接传单个文件，`p2` 省略时按魔数推断（`UNA ` → 2，`UARC` → 1）。
:::

## 格式转换

不可直接打开的格式都转成通用格式（原文件保留）：

| 原格式 | 内容 | 转成 | 脚本 |
|--------|------|------|------|
| `.dds` | 贴图（BC/DXT 等） | `.png` | `unpack_uarc.py` |
| `.krtbl` | `KRSM` 二进制数据表 | `.json` | `convert_tables.py` |
| `.rvs` | `RVST` 字符串表 | `.json` | `convert_tables.py` |
| `.rgf` | 纹理字体（zlib 图集 + 字形表） | `.png` + `.json` | `convert_opaque.py` |
| `.rsb` | ReverieUI 界面布局（WASM 引擎解析） | `.json`（块表 + 字符串） | `convert_opaque.py` |
| `.xcf` | GIMP 图像 | `.png`（每层一张） | `xcf_to_png.py` |
| 压缩 JS | `index.js` / `br/main.js` / `win_preload*.js` | `_可读代码/*.readable.js` | `bun x webcrack` |

`rsb` 的布局语义在引擎 WASM 里，只能给出块结构、纹理 / 字体引用名和字符串；配对 `.js` 头文件里有全部元素名。
`.xcf` 层数据按 GIMP RLE 自行解码。

其余格式本身通用，无需转换：`.wasm` `.glb` `.mp3` `.wav` `.png`，以及文本类 `.ugc` `.ucsl` `.ugr` `.upm` `.frs` `.vxs` `.js` `.css` `.html` `.json` `.ini` `.txt` `.xml`。

## 资源目录

明文资源和加密包抽出结果汇总在 `export/`，共约 508 个文件，贴图全部 PNG。

| 文件夹 | 内容 | 来源 |
|--------|------|------|
| `00_说明与脚本` | 加密说明、解包脚本 | `_re/` |
| `01_游戏代码` | Electron 主进程 / 渲染进程 | `app.larc` |
| `02_界面` | UI、字体、界面贴图、数据表 | `hiiragi.una` |
| `03_音符贴图` | 音符 / 特效 / 判定线 + 轨道背景 | `natsukawa.una` + `core/textures` |
| `04_音效` | 按键 SE、界面 SE | `core/sounds/`（明文） |
| `05_语音` | 系统 liko + 用户 tsukuyomi | `data.arc` + 明文 wav |
| `06_角色` | 东方立绘 + uni | `data.arc` + 明文 png |
| `07_场景` | player_scenes | 明文 |
| `08_谱面` | 示例 ugc / 课程 | 明文 |
| `09_技能` | ucsl | 明文 |
| `10_名牌` | nameplates | 明文 |
| `11_称号` | titles | 明文 + una |
| `12_英文界面` | 英文本地化贴图 / 表 | `sakuragi.una` |
| `13_启动器` | banner、README | 明文 |

常用位置：

- 按键音效：`export/04_音效/按键/`（`Tap_default.wav`、`ExTap.wav`、`Flick.wav` 等）
- 音符贴图：`export/03_音符贴图/判定与特效/`（`txTap.png`、`txHoldBg.png`、`txAirUp.png` 等）
- 轨道背景：`export/03_音符贴图/轨道背景/`
- 界面 SE：`export/04_音效/界面/`
- 界面布局（可读）：`export/02_界面/ui/*.json`（配 `*.js` 头文件）
- 数据表（可读）：`export/02_界面/数据表/*.json`
- 字体图集：`export/02_界面/字体/*.png`

::: tip TIP
`core/sounds/notes/` 里的 `ExTap` / `Flick` / `Air` / `Slide` 样本本身几乎静音（峰值 7），不是解包问题。
:::
