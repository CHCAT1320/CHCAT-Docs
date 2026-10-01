# LARC（`app.larc`）

Electron 把 `app.asar` 改成 `app.larc`，格式在原生 `app.exe` 里解析，目录和内容都加密。

## 文件布局

```
[0..4]   magic "Re=L" + flag       (app.larc 的 flag = 0x26)
[5..8]   uint32 LE: header_offset = (enc ^ 0xEF3C3607) + 5
[9 .. header_offset)              文件数据区
[header_offset .. eof-5]          加密目录
[eof-5 .. eof]                    5 字节尾
```

flag 校验：`(flag & 0x27) == 0x26`。

## 1. 目录解密

密钥（uint32）：

```
A = 0xD1BF40DC   // 长度字节
B = 0xBA444C27   // 偏移
C = 0x1AF8FD38   // 大小
K = 0x6C1A60AB   // 文件名 / SHA-256
```

每条记录（循环左移 ROL）：

```
A = ROL32(A, 27);  namelen = buf[i+8] ^ (A & 0xFF)
B = ROL32(B, 30);  C = ROL32(C, 29)
f1 = u32le(buf+i)   ^ B      // 原始偏移
f2 = u32le(buf+i+4) ^ C      // 原始大小（含 1 字节 flag）
然后对 namelen 字节文件名、再 32 字节 SHA-256：每字节 K = ROL32(K, 29); byte ^= K
记录长度 = namelen + 0x29
```

磁盘上实际数据：

```
flag 字节 @ f1 + 5
payload   @ f1 + 6，长度 f2 - 1
SHA-256 覆盖的是 [f1+5, f1+5+f2) 的密文（含 flag）
```

`app.exe` 的 `Archive::Init`（VA `0x1403449F0`）写入条目时就是 `offset = f1+6`、`size = f2-1`。

## 2. 文件内容解密

原生函数 `0x140346BD0`，由 `0x140346B60` 构造状态后调用。

状态（32 字节）：

```
[0]      = 1
[8..15]  = int64(file_offset - 5)
[16..23] = running_pos（每个文件从 0 开始）
[24..25] = 0x00FA
[0x1A]   = bit_swap(flag) ^ TABLE[(file_offset + 0x1A) & 0x1F] ^ 0x47
[0x1B]   = 同上 ^ 0x2E
```

`bit_swap(b)`：保留 bit0,1,3,4,5,6；bit7→bit2；bit2→bit7。

```
bit_swap(b) = (b & 0x7B) | ((b >> 5) & 4) | ((b << 5) & 0x80)
```

32 字节表（VA `0x14802DE50`）：

```
F6 AC BE 8A 85 69 87 FE 4D 0E 54 C0 24 18 3E 2A
AD C1 F3 6F FC 61 B4 F0 AF 47 4E FF 38 A1 6E DD
```

两遍：

1. 每个字节先 `bit_swap`，再 `^ TABLE[(offset-5 + i) & 0x1F] ^ 0x47`
2. 与 JS `Na()` 同类的反馈 XOR（模 5 / 19 / 83 / 97 特判，状态字 `0xFA` 递减）

::: tip TIP
实现以 Unicorn 模拟原生函数为准（`scripts/emu_decrypt.py`）。已完整抽出 17 个文件，见 `extracted_larc/`。
:::

## 3. 抽出的 app 内容

```
app.ini
assetVersions.json
package.json          name: umiguri_for_windows
index.js              Electron 主进程（压缩）
win_preload.js
win_preload_discord_auth.js
br/index.html
br/main.js            渲染进程（压缩，含 UARC/UNA 实现）
br/main.css, ui.css
br/effekseer.wasm
br/terms/{ja-JP,en-US}.html
```

代码可读化见 [游戏代码可读化](./code.md)。

## 4. `app.exe` 关键代码位置

| VA | 作用 |
|----|------|
| `0x1403449F0` | 定制 `Archive::Init`，解析 `.larc` |
| `0x140346B60` | LARC 解密状态构造 |
| `0x140346BD0` | LARC 文件内容解密 |
| `0x14802DE50` | 32 字节 XOR 表 |
| `0x1403469AB` | asar readData 日志 |
