# 哔哩哔哩 Web API 文档

本文档收录哔哩哔哩（bilibili）网页端常用 HTTP 接口的地址、请求方式、参数与鉴权要求，并给出通用的调用方法。

::: warning 来源声明

本文档的接口地址与参数资料，整理自开源项目 **bilibili-api-python**（GPL-3.0-or-later）随包提供的 API 数据文件。此处仅作来源标注。

文档内容与该库的使用方式无关，所有示例均直接使用 HTTP 请求编写。接口由哔哩哔哩官方提供且可能随时调整，使用前请以实际返回为准，并遵守哔哩哔哩的用户协议与相关法律法规。

:::

## 通用约定

- **接口域名**：常见有 `api.bilibili.com`、`api.live.bilibili.com`、`api.vc.bilibili.com`、`passport.bilibili.com`、`app.bilibili.com`、`member.bilibili.com` 等，具体以各接口标注为准。
- **请求方法**：查询类接口多为 `GET`，写操作多为 `POST`。
- **请求头**：建议始终携带合法的 `User-Agent` 与 `Referer`，否则部分接口会返回 `412` 或 `403`。例如：

  ```http
  User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36
  Referer: https://www.bilibili.com
  ```

- **请求体**：`POST` 默认使用 `application/x-www-form-urlencoded`；个别接口使用 JSON 请求体，会在接口处标注「JSON 请求体」。
- **响应格式**：绝大多数接口返回 JSON，结构通常如下，`code = 0` 表示成功：

  ```json
  { "code": 0, "message": "0", "ttl": 1, "data": { } }
  ```

- **鉴权标记**：接口表格中的「鉴权」列含义如下。

  | 标记 | 含义 |
  | --- | --- |
  | 免登录 | 无需 Cookie，匿名即可请求 |
  | 需登录 | 必须携带登录后的 Cookie |
  | WBI 签名 | 需额外附加 `wts` 与 `w_rid` 参数，算法见下文 |
  | dm 参数 | 需附加一组 `dm_*` 参数（鼠标 / 键盘操作记录），由客户端生成 |
  | APP 签名 | 需附加 `appkey` 与 `sign`，算法见下文 |
  | JSON 请求体 | 请求体为 JSON 而非表单 |
  | 无需 CSRF | 写操作不校验 `csrf` |

## 鉴权与 Cookie

登录成功后，浏览器会保存以下 Cookie，调用「需登录」接口时随请求发送即可：

| Cookie | 说明 |
| --- | --- |
| `SESSDATA` | 登录态凭据，最关键的字段 |
| `bili_jct` | CSRF Token，写操作时需作为 `csrf` 参数一并提交 |
| `DedeUserID` | 当前用户 UID |
| `buvid3` / `buvid4` | 设备指纹，匿名请求也建议携带，可降低风控概率 |
| `ac_time_value` | 用于刷新 Cookie 的凭据 |
| `bili_ticket` | 部分接口要求的风控票据 |

获取登录 Cookie 的常见方式有两种：

1. **浏览器手动获取**：登录 `https://www.bilibili.com` 后，在开发者工具 → 应用 → Cookie 中复制上述字段。
2. **接口登录**：见 [登录与凭据](./account.md) 中的扫码 / 密码 / 短信登录接口。

### CSRF

所有写操作（`POST`）通常都需要在请求体中附带 `csrf` 字段，其值等于 Cookie 中的 `bili_jct`。缺少或错误会返回 `code = -111`。

## WBI 签名

部分接口（表格中标记「WBI 签名」）需要在 URL 查询参数中附加 `wts`（当前时间戳，秒）与 `w_rid`（签名），否则会返回 `code = -403`。

### 算法步骤

1. 请求 `https://api.bilibili.com/x/web-interface/nav`，从返回的 `data.wbi_img` 中取出 `img_url` 与 `sub_url`：

   ```json
   {
     "data": {
       "wbi_img": {
         "img_url": "https://i0.hdslb.com/bfs/wbi/7cd084941338484aae1ad9425b84077c.png",
         "sub_url": "https://i0.hdslb.com/bfs/wbi/4932caff0ff746eab6f01bf08b70ac45.png"
       }
     }
   }
   ```

2. 取两个 URL 的文件名（去掉目录与扩展名），得到 `img_key` 与 `sub_key`，拼接为长度 64 的字符串 `raw = img_key + sub_key`。
3. 按下表（`mixinKeyEncTab`）对 `raw` 重新排列，取前 32 位即为 `mixin_key`：

   ```text
   46, 47, 18, 2, 53, 8, 23, 32, 15, 50, 10, 31, 58, 3, 45, 35,
   27, 43, 5, 49, 33, 9, 42, 19, 29, 28, 14, 39, 12, 38, 41, 13,
   37, 48, 7, 16, 24, 55, 40, 61, 26, 17, 0, 1, 60, 51, 30, 4,
   22, 25, 54, 21, 56, 59, 6, 63, 57, 62, 11, 36, 20, 34, 44, 52
   ```

4. 将原有查询参数加上 `wts`（当前时间戳），按参数名 **升序** 排序并对键值做 URL 编码，得到字符串 `query`。
5. `w_rid = md5(query + mixin_key)`，把 `wts` 与 `w_rid` 一起作为查询参数发起请求。

### Python 实现

```python
import hashlib
import time
import urllib.parse

import requests

MIXIN_KEY_ENC_TAB = [
    46, 47, 18, 2, 53, 8, 23, 32, 15, 50, 10, 31, 58, 3, 45, 35,
    27, 43, 5, 49, 33, 9, 42, 19, 29, 28, 14, 39, 12, 38, 41, 13,
    37, 48, 7, 16, 24, 55, 40, 61, 26, 17, 0, 1, 60, 51, 30, 4,
    22, 25, 54, 21, 56, 59, 6, 63, 57, 62, 11, 36, 20, 34, 44, 52,
]

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    "Referer": "https://www.bilibili.com",
}

session = requests.Session()
session.headers.update(HEADERS)
# cookies 为登录后的 Cookie 字典，匿名请求也可不带
# session.cookies.update({"SESSDATA": "...", "bili_jct": "...", "DedeUserID": "..."})

nav = session.get("https://api.bilibili.com/x/web-interface/nav").json()["data"]
img_url = nav["wbi_img"]["img_url"].rsplit("/", 1)[-1].split(".")[0]
sub_url = nav["wbi_img"]["sub_url"].rsplit("/", 1)[-1].split(".")[0]
raw = img_url + sub_url
mixin_key = "".join(raw[i] for i in MIXIN_KEY_ENC_TAB)[:32]


def wbi_sign(params: dict) -> dict:
    params = dict(params)
    params["wts"] = int(time.time())
    # 部分接口还要求 web_location，可按需添加
    params["web_location"] = 1550101
    query = urllib.parse.urlencode(sorted(params.items()))
    params["w_rid"] = hashlib.md5((query + mixin_key).encode()).hexdigest()
    return params


params = wbi_sign({"aid": 170001, "cid": 279786000})
resp = session.get("https://api.bilibili.com/x/player/wbi/playurl", params=params)
print(resp.json())
```

::: tip TIP

`mixin_key` 会随 `img_key` / `sub_key` 变化，可以缓存，但收到 `-403` 时建议重新获取一次。

:::

## APP 签名

标记「APP 签名」的接口需要附加 `appkey` 与 `sign`（Web 端 appkey 为 `4409e2ce8ffd12b8`，appsec 为 `59b43e04ad6965f34319062b478f83dd`）。

```python
import hashlib
import urllib.parse

APPKEY = "4409e2ce8ffd12b8"
APPSEC = "59b43e04ad6965f34319062b478f83dd"


def app_sign(data: dict) -> dict:
    data = dict(data)
    data["appkey"] = APPKEY
    data = dict(sorted(data.items()))
    data["sign"] = hashlib.md5(
        (urllib.parse.urlencode(data) + APPSEC).encode()
    ).hexdigest()
    return data
```

## 反爬参数

部分接口对匿名请求较敏感，建议先准备好 `buvid3` / `buvid4` 与（可选的）`bili_ticket`。

### buvid3 / buvid4

1. `GET https://api.bilibili.com/x/frontend/finger/spi`，返回 `data.b_3` 与 `data.b_4`。
2. 将其作为 `buvid3`、`buvid4` Cookie 使用。可选地调用 `POST https://api.bilibili.com/x/internal/gaia-gateway/ExClimbWuzhi` 进行「激活」，激活需携带一组 `_uuid`、`buvid_fp` 等参数。

### bili_ticket（可选）

```python
import hashlib
import hmac
import time

import requests

ts = int(time.time())
hexsign = hmac.new(b"XgwSnGZ1p", f"ts{ts}".encode(), hashlib.sha256).hexdigest()
params = {
    "key_id": "ec02",
    "hexsign": hexsign,
    "context[ts]": ts,
    "csrf": "",
}
data = requests.post(
    "https://api.bilibili.com/bapis/bilibili.api.ticket.v1.Ticket/GenWebTicket",
    params=params,
    headers=HEADERS,
).json()["data"]
ticket = data["ticket"]  # 作为 bili_ticket Cookie 使用，有效期约 3 天
```

## 返回码

| `code` | 含义 |
| --- | --- |
| `0` | 成功 |
| `-101` | 账号未登录 |
| `-111` | CSRF 校验失败（`csrf` 缺失或错误） |
| `-400` | 请求错误 |
| `-403` | 权限不足或风控拦截（WBI 签名错误常触发） |
| `-404` | 资源不存在 |
| `-412` | 请求被拦截，通常缺少 `buvid3` 或请求头不合法 |
| `-509` | 请求过于频繁 |
| `-352` | 风控校验失败 |

## 调用示例

### GET（curl）

```bash
curl -s 'https://api.bilibili.com/x/web-interface/view?bvid=BV1xx411c7mD' \
  -H 'User-Agent: Mozilla/5.0' \
  -H 'Referer: https://www.bilibili.com'
```

### 带 Cookie 的 GET（Python）

```python
import requests

headers = {
    "User-Agent": "Mozilla/5.0",
    "Referer": "https://www.bilibili.com",
}
cookies = {
    "SESSDATA": "your_sessdata",
    "bili_jct": "your_bili_jct",
    "DedeUserID": "your_uid",
}

resp = requests.get(
    "https://api.bilibili.com/x/web-interface/nav",
    headers=headers,
    cookies=cookies,
)
print(resp.json())
```

### 写操作 POST（表单 + csrf）

```python
import requests

cookies = {
    "SESSDATA": "your_sessdata",
    "bili_jct": "your_bili_jct",
    "DedeUserID": "your_uid",
}
headers = {
    "User-Agent": "Mozilla/5.0",
    "Referer": "https://www.bilibili.com",
}
data = {
    "aid": 170001,
    "like": 1,          # 1 点赞，2 取消点赞
    "csrf": cookies["bili_jct"],
}

resp = requests.post(
    "https://api.bilibili.com/x/web-interface/archive/like",
    data=data,
    headers=headers,
    cookies=cookies,
)
print(resp.json())
```

### 下载视频流

`playurl` 返回的媒体地址（`durl[].url` 或 `dash`）需要携带 `Referer` 与 `User-Agent` 才能下载：

```python
import requests

url = "https://..."  # playurl 返回的地址
resp = requests.get(url, headers={
    "User-Agent": "Mozilla/5.0",
    "Referer": "https://www.bilibili.com",
}, stream=True)
with open("video.m4s", "wb") as f:
    for chunk in resp.iter_content(1024 * 256):
        f.write(chunk)
```

## 分类目录

- [视频](./video.md)
- [用户](./user.md)
- [番剧 / 影视 / 漫画](./bangumi.md)
- [直播](./live.md)
- [动态与图文](./dynamic.md)
- [专栏 / 音频 / 图集](./article.md)
- [评论与通用接口](./comment.md)
- [搜索 / 排行 / 热门](./search.md)
- [收藏夹](./favorite.md)
- [登录与凭据](./account.md)
- [活动 / 游戏 / 装扮 / 投票](./activity.md)
- [投稿与创作中心](./upload.md)
- [其它接口](./misc.md)

## 说明

- 接口地址、参数与注释以资料整理为准，可能滞后于哔哩哔哩线上版本。
- 涉及账号数据的接口请妥善保管 Cookie，不要泄露或提交到公开仓库。
- 请控制请求频率，避免触发风控；仅将本资料用于学习与研究。
