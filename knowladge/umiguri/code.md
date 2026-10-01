# 游戏代码可读化

从 `app.larc` 抽出的 JS 都是压缩过的。用 `bun x webcrack` 反压缩后放在 `export/01_游戏代码/_可读代码/`。

| 文件 / 目录 | 说明 |
|-------------|------|
| `index_modules/` | 主进程按 webpack 拆成 97 个模块（`_index.md` 有清单，参数已改成 `module/exports/__webpack_require__`） |
| `index.readable.js` | 主进程整份（webcrack 反压缩） |
| `main.readable.js` | 渲染进程整份 |
| `main.gamelogic.readable.js` | 渲染进程里**游戏逻辑**部分（去掉 THREE / Effekseer / 引擎胶水），含 UARC/UNA、UI、谱面 |
| `main.gameonly.readable.js` | 同上，但保留整包结构、把 1–187352 行的库 / 引擎替换成注释桩（原行号 = 本文件行号 + 187352） |
| `libs/` | 抽出的 three.js r137 + Effekseer + Emscripten（第三方，非游戏代码）+ `threejs_r137.constants.md` 常量注解 |
| `gameplay/` | 谱面播放链路的可读性重构（`main.gamelogic.renamed.js` + 导读 `README.md` + `apply_renames.js`） |

## `main.js` 结构

```
THREE.js
→ Effekseer（内嵌 wasm + 胶水）
→ Emscripten 引擎
→ 游戏逻辑（约 2.998M 起）
```

前三段是编译 / 生成产物，行号化后可读性有限；游戏逻辑段已单独抽出。
