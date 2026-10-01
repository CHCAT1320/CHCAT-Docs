# 登录与凭据

扫码 / 密码 / 短信登录，Cookie 刷新，以及反爬所需的 `buvid3`、`buvid4`、`bili_ticket` 获取。登录成功后会下发 `SESSDATA`、`bili_jct`、`DedeUserID` 等 Cookie。

> 来源声明：本页接口资料整理自开源项目 `bilibili-api-python`（GPL-3.0）随包提供的 API 数据文件，仅作来源标注。使用前请以哔哩哔哩实际返回为准，并遵守其服务条款。

## 登录

### 扫码登录 `qrcode`

#### `get_qrcode_and_token` 请求二维码及登录密钥

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://passport.bilibili.com/x/passport-login/web/qrcode/generate?source=main-fe-header` | 免登录 |

#### `get_events` 获取最新信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://passport.bilibili.com/x/passport-login/web/qrcode/poll` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `qrcode_key` | str | 登录密钥 |
| `source` | — | main-fe-header |

#### `get_qrcode_and_token` 旧请求二维码及登录密钥

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://passport.bilibili.com/qrcode/getLoginUrl` | 免登录 |

#### `get_events` 旧获取最新信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://passport.bilibili.com/qrcode/getLoginInfo` | 免登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `oauthKey` | str | 登录密钥 |

#### `get_qrcode_and_auth_code` tv 请求二维码及登录密钥

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://passport.bilibili.com/x/passport-tv-login/qrcode/auth_code` | 免登录 + APP 签名 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `ts` | str | 时间戳 |
| `local_id` | int | 0 |

#### `get_events` tv 获取最新信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://passport.bilibili.com/x/passport-tv-login/qrcode/poll` | 免登录 + APP 签名 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `appkey` | str | appkey |
| `sign` | str | 签名 |
| `ts` | str | 时间戳 |
| `local_id` | int | 0 |
| `auth_code` | str | 登录密钥 |

### 账号密码登录 `password`

#### `get_token` 获取登录盐值、加密公钥

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://passport.bilibili.com/x/passport-login/web/key` | 免登录 |

#### `captcha` 获取极验信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://passport.bilibili.com/x/passport-login/captcha` | 免登录 |

#### `login` 登录

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://passport.bilibili.com/x/passport-login/web/login` | 免登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `username` | string | 账号 |
| `password` | string | 加密的密码 |
| `keep` | bool | true |
| `key` | string | 密钥 |
| `token` | string | 极验信息中的登录密钥 token |
| `challenge` | string | 极验 challenge |
| `validate` | string | 极验 validate |
| `seccode` | string | 极验 seccode |

### 短信登录 `sms`

#### `send` 发送验证码

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://passport.bilibili.com/x/passport-login/web/sms/send` | 免登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `tel` | string | 手机号码 |
| `cid` | int | 地区对应的 id (contries_codes.json 中对应的一个地区的 id 项，不是 country_id。 |
| `source` | string | main_web |
| `token` | string | 极验信息中的登录密钥 token |
| `challenge` | string | 极验 challenge |
| `validate` | string | 极验 validate |
| `seccode` | string | 极验 seccode |

#### `login` 验证码登录

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://passport.bilibili.com/x/passport-login/web/login/sms` | 免登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `tel` | string | 手机号码 |
| `cid` | int | 地区对应的 id (contries_codes.json 中对应的一个地区的 id 项，不是 country_id。 |
| `code` | string | 验证码 |
| `source` | string | main_web |
| `captcha_key` | string | 发送验证码时产生的返回值 |
| `keep` | bool | true |
| `go_url` | — | 跳转 url |

### 账号安全中心 `safecenter`

#### `check_info` 获取验证信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/safecenter/user/info` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `tmp_code` | str | 验证标记代码 |

#### `captcha` 获取极验信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://passport.bilibili.com/x/safecenter/captcha/pre` | 免登录 |

#### `send`

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://passport.bilibili.com/x/safecenter/common/sms/send` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `sms_type` | str | loginTelCheck，如无 requestId 则为 secLogin |
| `tmp_code` | str | 验证标记代码 |
| `gee_challenge` | str | 极验 challenge |
| `gee_gt` | str | 极验 gt |
| `gee_seccode` | str | 极验 seccode |
| `gee_validate` | str | 极验 validate |
| `recaptcha_token` | str | 极验 token |

#### `get_exchange` 获取交换验证码

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://passport.bilibili.com/x/safecenter/login/tel/verify` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `type` | — | (str)loginTelCheck |
| `code` | — | (int)验证码内容 |
| `tmp_code` | — | (str)验证标记代码,来自数据处理中的解析出的参数 tmp_token |
| `request_id` | — | (str)验证请求标记,来自数据处理中的解析出的参数 requestId |
| `captcha_key` | — | (str)验证秘钥,来自申请验证码的captcha_key（data->captcha_key） |

#### `get_exchange_no_request_id` 获取交换验证码

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://passport.bilibili.com/x/safecenter/sec/verify` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `verify_type` | — | (str)sms |
| `code` | — | (int)验证码内容 |
| `tmp_code` | — | (str)验证标记代码,来自数据处理中的解析出的参数 tmp_token |
| `captcha_key` | — | (str)验证秘钥,来自申请验证码的captcha_key（data->captcha_key） |

#### `get_cookies` 获取 cookies (头部会执行 set-cookies)

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://passport.bilibili.com/x/passport-login/web/exchange_cookie` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `code` | str | 交换代码 |
| `go_url` | — | (str)https://passport.bilibili.com/pc/passport/risk/secTip?gourl=https%3A%2F%2Fwww.bilibili.com%2F&bind_tel=1 如果无 requestId 则提供 |


---

## 凭据 / Cookie

### 查询 `info`

#### `check_cookies` 检查是否需要刷新 Cookie

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://passport.bilibili.com/x/passport-login/web/cookie/info` | 需登录 |

#### `valid` （本质作用为获取 cookies 信息）如果 code = 0 则 cookies 有效

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/web-interface/nav` | 免登录 |

#### `spi` 获取 buvid3 / buvid4

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/frontend/finger/spi` | 免登录 |

#### `ticket` 获取 bili_ticket

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/bapis/bilibili.api.ticket.v1.Ticket/GenWebTicket` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `key_id` | str | ec02 |
| `hexsign` | str | hmac_sha256("XgwSnGZ1p", f"ts{int(time.time())}") |
| `content[ts]` | int | time stamp |
| `csrf` | — |  |

### 操作 `operate`

#### `get_refresh_csrf` 获取刷新 CSRF，记得替换 correspondPath

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://www.bilibili.com/correspond/1/{correspondPath}` | 需登录 |

#### `refresh_cookies` 刷新 Cookies

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://passport.bilibili.com/x/passport-login/web/cookie/refresh` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `refresh_csrf` | — | refresh_csrf |
| `csrf` | — | Cookie 中的 bili_jct 字段 |
| `source` | — | main_web |
| `refresh_token` | — | Cookie 中的 ac_time_value 字段 |

#### `confirm_refresh` 确认刷新

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://passport.bilibili.com/x/passport-login/web/confirm/refresh` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `csrf` | — | 从新的 cookie 中获取 |
| `refresh_token` | — | 在刷新前 localStorage 中的ac_time_value获取，并非刷新后返回的值 |

#### `active` 激活 buvid3

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/internal/gaia-gateway/ExClimbWuzhi` | 免登录 + JSON 请求体 |

**请求体**：see https://github.com/SocialSisterYi/bilibili-API-collect/issues/933


---

## 私信 / 消息

### 消息会话 `session`

#### `fetch` 获取指定用户的近三十条消息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.vc.bilibili.com/svr_sync/v1/svr_sync/fetch_session_msgs` | 需登录 + WBI 签名 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `talker_id` | int | 私聊时为用户UID 应援团时为团号 |
| `session_type` | int | 会话类型，1 私聊 2 应援团 |
| `begin_seqno` | int | 起始 Seqno 可由具体消息获得 |

#### `new` 获取新消息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.vc.bilibili.com/session_svr/v1/session_svr/new_sessions` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `begin_ts` | int | 起始时间戳 |

#### `get` 获取已有消息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.vc.bilibili.com/session_svr/v1/session_svr/get_sessions` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `session_type` | int | 1: 私聊, 2: 通知, 3: 应援团, 4: 全部 |
| `group_fold` | int | 默认为 1 |
| `unfollow_fold` | int | 默认为 0 |
| `sort_rule` | int | 默认为 2 |
| `build` | int | 默认为 0 |
| `mobi_app` | — | web |

#### `get_session_detail` 获取会话详情

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.vc.bilibili.com/session_svr/v1/session_svr/session_detail` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `talker_id` | int | 私聊时为用户UID 应援团时为团号 |
| `session_type` | int | 会话类型 |

#### `likes` 获取点赞

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/msgfeed/like` | 需登录 |

#### `unread` 获取未读的信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/msgfeed/unread` | 需登录 |

#### `replies` 获取收到的回复

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/msgfeed/reply` | 需登录 |

#### `at` 获取未读 AT

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/msgfeed/at` | 需登录 |

#### `system_msg` 获取系统信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://message.bilibili.com/x/sys-msg/query_user_notify` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `page_size` | int | 要获取的信息数量 |

#### `session_settings` 获取消息设置

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.vc.bilibili.com/link_setting/v1/link_setting/get` | 需登录 |

### 操作 `operate`

#### `send_msg` 给用户发信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.vc.bilibili.com/web_im/v1/web_im/send_msg` | 需登录 + WBI 签名 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `msg[sender_uid]` | int | 自己的 UID |
| `msg[receiver_id]` | int | 对方 UID |
| `msg[receiver_type]` | const int | 1 |
| `msg[msg_type]` | int | 消息类型 |
| `msg[msg_status]` | const int | 0 |
| `msg[content]` | str | 消息内容 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `sender_uid` | int | 自己的 UID |
| `receiver_id` | int | 对方 UID |


---

## 客户端 / 地理位置

### `zone` 通过 IP 获取地理位置

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/web-interface/zone` | 免登录 |

### `live_zone` 通过 IP 获取地理位置

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.live.bilibili.com/xlive/web-room/v1/index/getIpInfo` | 免登录 |


---

## APP 开屏

### `splash`

#### `list` 获取开屏启动画面

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://app.bilibili.com/x/v2/splash/list` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `mobi_app` | str | android, iphone, ipad |
| `platform` | str | android, ios |
| `height` | int | 屏幕高度 |
| `width` | int | 屏幕宽度 |
| `birth` | str | 生日日期(四位数，例 0101) |

#### `brand` 获取特殊开屏启动画面

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://app.bilibili.com/x/v2/splash/brand/list` | 免登录 + APP 签名 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `mobi_app` | str | android, iphone, ipad |
| `platform` | str | android, ios |
| `screen_height` | int | 屏幕高度 |
| `screen_width` | int | 屏幕宽度 |


---

