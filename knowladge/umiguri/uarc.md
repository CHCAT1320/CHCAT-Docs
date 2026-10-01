# UARC / UNA

角色 / 语音的 `data.arc` 和语言包 `*.una` 用同一套渲染进程 JS 类 `vs`（`ds` 是流式封装），构造：`new vs(path, 0, P2)`。

| 用途 | 调用 | P2 | 第一遍 XOR |
|------|------|----|------------|
| 角色 / 语音 `data.arc` | `new ds(..., 0, 1)` | 1 | `Wa` |
| 语言包 `*.una` | `new ds(..., 0, 2)` | 2 | `Wa` |
| 其它 | `P2=0` | 0 | `Va` |

`Gi = [Va, Wa, Wa]`。

## 1. 文件头

```
[0..3]  magic "UARC" 或 "UNA "
[4]     flags: bit0 = 压缩(M2)  bit1 = 加密目录(R2)
        现有文件均为 0x03（压缩 + 加密目录）
[5..8]  uint32 LE: header_offset = -1 - (0x10C3B1B8 ^ enc) + 5
        即 4 - (0x10C3B1B8 ^ enc)
```

## 2. 目录解密（与 LARC 同密钥，用 ROR）

JS `$a(t,i) = t>>>i | (t & -1>>>32-i)<<32-i` 是循环右移。
`ROL(n) ≡ ROR(32-n)`，所以和 LARC 原生 ROL 是同一把钥匙：

```
t = 0xBA444C27;  t = ROR32(t, 2);  // = ROL 30
e = 0x1AF8FD38;  e = ROR32(e, 3);  // = ROL 29
n = 0xD1BF40DC;  n = ROR32(n, 5);  // = ROL 27
r = 0x6C1A60AB;  r = ROR32(r, 3);  // = ROL 29
```

每条记录**没有** 32 字节 SHA-256：

```
offset, size = u32le[i] ^ t, u32le[i+4] ^ e
namelen = buf[i+8] ^ (n & 0xFF)
文件名逐字节 r = ROR32(r, 3); ch ^= r
记录长度 = 9 + namelen
```

文件数据：`[offset+5, offset+5+size)`。

## 3. 内容解密

```
Gi[P2](buf, offset)     // 按绝对偏移 XOR 表
Na(buf)                 // 第二遍反馈 XOR
if M2: gzip(buf[1:])    // 跳过 1 字节后 gzip
return buf.subarray(P2==2 ? 1 : 0)
```

`Na`（JS 原文）：

```js
function Na(s){
  let i=250, e=0, n=0, r;
  for(let t=0;t<s.byteLength;++t){
    r=n; n=s[t];
    t%5==0 ? s[t]^=105 :
    t%19==0 ? s[t]^=209 :
    t%83==0 ? s[t]^=72 :
    t%97==0 ? s[t]^=2 :
    s[t]^=i;
    s[t]^= (117&r)|(72&e);
    (i-=t%3)<0 && (i=255);
    e=s[t];
  }
}
```

`Va` / `Wa`：对绝对下标 `e`，`t = (e & 31) << 1`，查 64 项表，`buf[e-base] ^= table[t]`。
奇数 `t` 实际不会出现（`<<1` 总是偶数）。

`Wa` 偶数字节 XOR 表（`t = 0,2,4,...,62`）：

```
252, 113, 156, 155, 255, 249, 162, 245,
242, 193,  75,  10, 214, 144,  43, 144,
203, 251, 210,  71, 100, 247, 124,  53,
 14, 113, 152, 245, 148, 178, 179, 154
```

`Va` 偶数字节 XOR 表：

```
168,  89, 219, 160,  53, 237, 148, 123,
157, 121, 229,  93, 129, 179, 127, 220,
112,  35, 192,  26,  50,   1,  41, 247,
 71,  54,  75, 151, 236,  95,  18, 245
```

::: tip TIP
压缩用 `DecompressionStream("gzip")`（`tc.prototype.gR`）。
JS 里 `P2==2` 还会 `subarray(1)`，实测会吃掉 `DDS` / `KRSM` 魔数，解包器不跟这一步。
:::

## 4. `.krtbl`

明文 `KRSM` 表，不是加密容器。`ms.uf()` 解析：块 magic `541871939`（列定义）、`1398230866`（行数据）。游戏用它存 `player.krtbl` / `records.krtbl` 等设置。

## 5. 渲染进程符号

实现位置：`extracted_larc/br/main.js`。

| 符号 | 作用 |
|------|------|
| `function vs` / `ds` | UARC / UNA 读取 |
| `function $a` | ROR32 |
| `function Va` / `Wa` / `Na` | 内容 XOR |
| `function tc` / `gR` | gzip 解压 |
| `function so(t,i,e)` | `t[i] ^= e` |
