# Rizline 移动端其它 API

基址 `https://rizserver.pigeongames.net`。登录 / 拉档见 [移动端存档](./save.md)。完整字段对照 [RizlineGameSaveData/API.md](https://github.com/CHCAT1320/RizlineGameSaveData/blob/main/API.md)。

::: warning WARNING
写档接口本次都没打：结算、购买、领奖、改名、换绑、注册。成功态字段来自仓库，不是这次登录复测。
:::

::: tip TIP
实测日期 2026-09-19。公共头：`game_id` / `device_id` / `channel_id` / `i18n`。拉档后还要 `token` + `phone`。登录 / JWT 见 [移动端存档](./save.md)。
:::

```python
import requests
import uuid

BASE = "https://rizserver.pigeongames.net"
headers = {
    "game_id": "pigeongames.rizline",
    "device_id": str(uuid.uuid4()),
    "channel_id": "11",
    "i18n": "zh-CN",
    "Content-Type": "application/json",
}

def post(path, body=None, extra=None):
    h = dict(headers)
    if extra:
        h.update(extra)
    return requests.post(BASE + path, headers=h, json=body if body is not None else {}, timeout=20)
```

## HTTP 层（实测）

| 情况 | HTTP | `Content-Type` | 正文 |
| --- | --- | --- | --- |
| 账号业务失败 | `200` 或 `400` | `application/json` | `{"code":n,"msg":"..."}` |
| 缺 `game_id` | `400` | `text/html` | `Invalid game_id` |
| 缺 / 假 token 打 `/game/*` | `401` | `text/html` | `Expired` |
| 假 JWT + 有 `phone` | `401` | `text/html` | `Expired` |
| 有假 token、无 `phone` | `401` | `text/html` | `Expired` |
| 对只支持 POST 的账号路径 `GET` | `404` | `text/html` | `Cannot GET /login` 一类 |
| `send_verify_code` 无 `phone` | `400` | `text/html` | `Invalid phone!` |

::: tip TIP
无 token 时几乎所有 `/game/` 都是 `401 Expired`（含仓库标 404 的周挑战路径）。网关先拦，不能用来判断路由还在不在。
:::

::: tip TIP
登录成功后游戏接口 body 常是 AES-GCM 字节，解开后多为 `{"code":0,"data":...}`。`/game/rn_login` 没有这层包装，见存档页。
:::

---

## 账号

### `POST /account/check_phone`

查这个号走账密还是验证码。

请求：`{"phone": "..."}`

| 本次实测 | HTTP | 正文 |
| --- | --- | --- |
| `{}` / 缺 `phone` / `phone=123` | `200` | `{"code":2,"msg":"账户未注册"}` |
| 缺 `game_id` | `400` | `Invalid game_id` |
| 已注册可账密（仓库） | `200` | `{"code":0}` |
| 已注册必须验证码（仓库） | `200` | `{"code":1}` |

::: tip TIP
未注册也是 `200`，靠 `code==2` 判断，不要只看 HTTP 状态。缺 `phone` 和乱填号走同一条失败。
:::

### `POST /account/login`

:::tabs
== 账密
`{"phone","password"}`
== 验证码
`{"phone","code"}`
:::

| 本次实测 | HTTP | 正文 |
| --- | --- | --- |
| `{}` / 只有 phone / 未注册号+密码 | `400` | `{"code":2,"msg":"账户未注册"}` |
| `GET` | `404` | `Cannot GET /login` |
| 成功（仓库） | `200` | `{"code":0}` + 响应头 `set_token` |
| 账密被拒（仓库） | | body `code==3`，改验证码 |

JWT 字段见 [移动端存档](./save.md#jwt)。

::: tip TIP
未注册号登录是 `400` + `code=2`，不是 `401`。`GET /account/login` 才是 `Cannot GET /login`。
:::

### `POST /account/send_verify_code`

`{"phone","transaction"}`，登录填 `transaction: "login"`。

| 本次实测 | HTTP | 正文 |
| --- | --- | --- |
| 无 `phone` | `400` | `Invalid phone!` |
| 有 phone、无 / 错 `transaction` | `200` | 空 body，`application/octet-stream` |
| 未注册号 + `login` | `200` | 同样空 body |

::: tip TIP
有 `phone` 时，缺 / 错 `transaction`、未注册号都返回空 `200` + `octet-stream`，不代表发出了短信。无 `phone` 才是 `Invalid phone!`。
:::

::: warning WARNING
未测（会改账号）：`/account/register`、`/account/user/change_password`、`/account/user/change_phone`、`/account/user/check_code`、`/account/user/cancellation`、`/account/user/bind_id2meta`、`/account/user/bind_id2meta_taptap`、`/account/Insensitive_login`。
:::

---

## 用户信息

无 token：下列全部 `401 Expired`（含 `GET`）。

### `POST /game/fetch_user_info`

请求 `{}`。`data`：`username`、`dot`、`coin`、`features`（常 `[]`）。

::: tip TIP
比 `rn_login` 轻，只拿昵称和货币。无 token / `GET` 都是 `401 Expired`。
:::

### `POST /game/game_start`

请求 `{}`。`data` 为 32 位 hex，本局 `gameplayId`。每次调用换新 id，结算要带。

::: tip TIP
只开局、不结算也算一次新 id。无 token 是 `401`，不会给 id。
:::

### `POST /game/change_username`

`{"username"}`。无 token → `401`。

::: warning WARNING
成功态未测。带 token 会改昵称。
:::

### `POST /game/inherit_data`

`{"transCode"}`。无 token → `401`。

::: warning WARNING
成功态未测。会覆盖云存档。
:::

---

## 商店

无 token：`get_user_shop` / `query_purchase_info` / `buy_user_shop_item` / `purchase` 均为 `401 Expired`。

### `POST /game/get_user_shop`

`{"refresh": false|true}`。

::: tip TIP
读货架用 `refresh: false`。无 token 是 `401`。
:::

`data`：

| 字段 | 含义 |
| --- | --- |
| `shop[]` | 当日货架 |
| `shop[].id` | 商品资源 id；成对 bio 为 `bio.A;bio.B` |
| `shop[].price` | 总价 |
| `shop[].leftPrice` / `rightPrice` | 成对 bio 半价 |
| `shop[].isCoinPrice` | `true` 金币，`false` 点券 |
| `newcomerShop[]` | 新手货架 |
| `enableNewcomerFeature` | 是否还开新手店 |
| `refreshTime` | 下次自然刷新 ISO |
| `refreshed` | 本周期是否已手动刷新 |

### `POST /game/query_purchase_info`

`{"goodId": int}`。`data`：`true` 已买过，`false` 未买。

### `POST /game/buy_user_shop_item` / `POST /game/purchase`

分别买当日货架 / 商城数字 `goodId`。会改货币和背包。

::: warning WARNING
成功态未测。`refresh: true` 也会耗刷新次数，本次没打。
:::

---

## 邮件与公告

无 token：`401 Expired`。

### `POST /game/get_broadcasts`

请求 `{}`。只给游戏内 Toast，不是存档。

::: tip TIP
无公告时 `broadcasts` 为 `[]`。无 token / `GET` 都是 `401`。
:::

`data`：`syncId`；`broadcasts[]` 含 `broadcastId`、`message`、`startTime` / `endTime`、`interval`、`isCountdown`。无公告时 `broadcasts` 为 `[]`。

### `POST /game/get_mails`

请求 `{}`。

`data`：`syncId`；`mails[]` 含 `_id`、`mailId`、`title`、`content`、`receivedTime` / `expiredTime`、`read`、`deleted`、`attachments[{itemId,num}]`。

### `POST /game/read_mail` / `delete_mail`

`{"mailId": [...]}`。无 token → `401`。

::: warning WARNING
成功态未测。`read_mail` 会领附件。
:::

---

## 名片与记忆色

无 token：下列全部 `401 Expired`。

### `POST /game/fetch_own_rizcard`

`{"serialAfter": 0}` 从头拉，之后用上一页最大 `cardSerial`。

::: tip TIP
分页游标是上一页最大 `cardSerial`，不是页码。无 token 是 `401`。
:::

`data.cards[]`：`_id`、`cardSerial`、`userId`、`userName`、`exchangeTime`、`rizcard`。

### `POST /game/fetch_static_rizcard_progress`

`data.staticRizcardProgresses[]`：`achievementId`、`cardId`、`amount`、`targetAmount`、`state`（如 `owned`）。

### `POST /game/fetch_memory_progress`

`data.globalProgress`；`memoryProgress`：`selectedColor`、`blackTriggered` / `whiteTriggered`、`unlocked`、`allStar` / `maxStar`、`colors[{color,progress,maxProgress,lit,eroded,targetRevealed,targetTrackId}]`。

颜色：`red/orange/yellow/green/cyan/blue/purple`。

### `POST /game/fetch_memory_color`

`data` 为当前颜色字符串，如 `"red"`。

### `POST /game/set_rizcard` / `update_own_rizcard_read` / `set_memory_color`

无 token → `401`。

::: warning WARNING
成功态未测。会改当前名片 / 已读数 / 记忆色。
:::

---

## 周任务

无 token：`401 Expired`。

### `POST /game/get_weekly_tasks`

请求 `{}`。

`data`：`weekIndex`、`nextRefreshAt`；`tasks[]` 含 `taskId`、`name`、`progress`、`target`、`completed`、`rewarded`、`reward.{itemId,amount}`。

### `POST /game/claim_weekly_task_reward`

`{"taskId"}`。无 token → `401`。

::: warning WARNING
成功态未测。会发奖励。
:::

---

## 周挑战 / 预约

客户端有类型，仓库登录后打这些 URL 多为 **404**。本次 **无 token** 时：

| 路径 | 无 token |
| --- | --- |
| `/game/GetWeeklyRankInfo` | `401 Expired` |
| `/game/get_weekly_rank_info` | `401` |
| `/game/weekly_rank_info` | `401` |
| `/game/weekly_config` | `401`（`GET` 也是 `401`，不是 `Cannot GET`） |
| `/game/get_weekly_config` | `401` |
| `/game/EnsureWeeklyConfig` | `401` |
| `/game/weekly_player_info` | `401` |
| `/game/get_booking_status` | `401` |
| `/game/set_booking_status` | `401` |
| `/game/special_event` | `401` |

::: tip TIP
无 token 时 `GET /game/weekly_config` 也是 `401`，不是 `Cannot GET`。要确认路由，必须带有效 token。
:::

::: warning WARNING
登录后的成功态本次未复测。仓库称这些 URL 多为 `404`。下面字段只来自 dump。
:::

成功态字段（dump / 仓库）：周配置 `seasonId` / `rotationId` / `songs[]`；玩家 `rank` / `pendingMatchResults`；段位 `segment` / `stars` / `isPlus`；结算夹在 `after_play` 的 `WeeklyModeResult`。

---

## 结算与活动（未测写）

无 token 均为 `401 Expired`。

::: warning WARNING
成功态未测。`after_play` / 课题结算 / 兑换码会改 RKS、点券、掉落。不要随手带 token 打。
:::

| 接口 | 请求要点 |
| --- | --- |
| `/game/after_play` | `gameplayId` + 一局 `ResultParams` |
| `/game/after_play_in_challenge` | 课题 `levelId` + 结果 |
| `/game/watch_complete` | `gameplayId` + 曲目 / 难度 / `isAutoPlay` |
| `/game/get_order_event_state` | `{eventId}`；仓库：无活动 `data=null` |
| `/game/rn/redeem_gift_code` | 兑换码 |

`after_play` 成功会改 RKS、点券、掉落。`gameplayId` 来自 `game_start`。

---

## 本次无 token 一览

对下列路径 `POST {}`（及部分 `GET`）均为 **`401` + `Expired`**：

`rn_login`、`fetch_user_info`、`game_start`、`get_user_shop`、`get_mails`、`get_broadcasts`、`fetch_own_rizcard`、`fetch_static_rizcard_progress`、`fetch_memory_progress`、`fetch_memory_color`、`get_weekly_tasks`、`query_purchase_info`、`get_order_event_state`、`change_username`、`inherit_data`、`after_play`、`after_play_in_challenge`、`watch_complete`、`buy_user_shop_item`、`purchase`、`set_rizcard`、`update_own_rizcard_read`、`set_memory_color`、`read_mail`、`delete_mail`、`claim_weekly_task_reward`、`special_event`、`rn/redeem_gift_code`、`get_booking_status`、`set_booking_status`，以及上表全部周挑战路径。

::: tip TIP
`POST /game/rn_login` 缺 `game_id` 是 `400 Invalid game_id`，不是 `Expired`。假 JWT 无论带不带 `phone` 都是 `401 Expired`。
:::
