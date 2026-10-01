# 动态与图文

动态（含转发、点赞、发布、置顶）与新版图文（Opus）接口。发布/删除/审核类操作需登录。

> 来源声明：本页接口资料整理自开源项目 `bilibili-api-python`（GPL-3.0）随包提供的 API 数据文件，仅作来源标注。使用前请以哔哩哔哩实际返回为准，并遵守其服务条款。

## 动态

### `send`

#### `upload_img` 上传图片

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/dynamic/feed/draw/upload_bfs` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `biz` | const str | draw |
| `category` | const str | daily |

#### `schedule` 发布定时动态

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.vc.bilibili.com/dynamic_draft/v1/dynamic_draft/add_draft` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `type` | int | 4 为有图动态，2 为无图动态 |
| `publish_time` | int | 发布时间戳 |
| `request(if type=4)` | — | 见 instant_draw.data，无 setting |
| `request(if type=2)` | — | 见 instant_text.data |

#### `instant_draw`

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/create_draw` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `biz` | const int | 3 |
| `category` | const int | 3 |
| `type` | const int | 0 |
| `pictures[].img_src` | str | 图片地址 |
| `pictures[].img_width` | int | 图片宽度 |
| `pictures[].img_height` | int | 图片高度 |
| `title` | — |  |
| `tags` | — |  |
| `description` | str | 动态文字内容 |
| `content` | str | 动态文字内容 |
| `from` | const str | create.dynamic.web |
| `up_choose_comment` | const int | 0 |
| `extension` | const str | {"emoji_type":1,"from":{"emoji_type":1},"flag_cfg":{}} |
| `at_uids` | commaSeparatedList[int] | 艾特用户 UID 列表，半角逗号分隔 |
| `at_control[].location` | int | @符号起始位置，0 为第一个字符 |
| `at_control[].type` | const int | 1 |
| `at_control[].length` | int | @区域长度（2 + 用户名字符串长度） |
| `at_control[].data` | int | 用户 UID |
| `setting.copy_forbidden` | const int | 0 |
| `setting.cachedTime` | const int | 0 |

#### `instant_text`

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/create` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `dynamic_id` | const int | 0 |
| `type` | const int | 4 |
| `rid` | const int | 0 |
| `content` | str | 动态文本内容 |
| `extension` | const str | {"emoji_type":1} |
| `at_uids` | commaSeparatedList[int] | 艾特用户 UID 列表，半角逗号分隔 |
| `ctrl[].location` | int | @符号起始位置，0 为第一个字符 |
| `ctrl[].type` | const int | 1 |
| `ctrl[].length` | int | @区域长度（2 + 用户名字符串长度） |
| `ctrl[].data` | int | 用户 UID |

#### `instant`

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/dynamic/feed/create/dyn` | 需登录 + WBI 签名 + dm 参数 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `content.contents[].raw_text` | — | 纯文本 |
| `content.contents[].biz_id` | — |  |
| `content.contents[].type` | — | 1 |
| `scene` | int | 1 纯文本, 2 带图 |
| `pics[].img_src` | str | 图片地址 |
| `pics[].img_height` | int | 图片高度 |
| `pics[].img_width` | int | 图片宽度 |
| `pics[].img_size` | int | 图片大小 (kb) |
| `topic.id` | int | 话题 id |

#### `sub_check` 动态发送预检测

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/dynamic/feed/create/submit_check` | 需登录 |

### 操作 `operate`

#### `delete` 删除动态

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/rm_dynamic` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `dynamic_id` | int | 动态 ID |

#### `like` 点赞

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.vc.bilibili.com/dynamic_like/v1/dynamic_like/thumb` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `dynamic_id` | int | 动态 ID |
| `up` | int | 1 点赞 2 取消 |
| `uid` | int | 自己 uid |

#### `repost` 转发

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.vc.bilibili.com/dynamic_repost/v1/dynamic_repost/repost` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `dynamic_id` | int | 动态 ID |
| `content` | str | 内容 |
| `extension` | const str | {"emoji_type":1} |

#### `set_top` 添加置顶

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/dynamic/feed/space/set_top` | 需登录 + JSON 请求体 + 无需 CSRF |

**请求体（JSON）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `dyn_str` | int | 动态 ID |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `csrf` | str | bili_jct |

#### `rm_top` 取消置顶

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/dynamic/feed/space/rm_top` | 需登录 + JSON 请求体 + 无需 CSRF |

**请求体（JSON）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `dyn_str` | int | 动态 ID |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `csrf` | str | bili_jct |

### 查询 `info`

#### `attention_new_dynamic` 获取发布新动态的关注者

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/w_dyn_uplist` | 需登录 |

#### `attention_live` 获取正在直播的关注者

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/w_live_users` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `size` | int | 用户数量 |

#### `repost` 动态转发信息，最多获取 560 条左右

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.vc.bilibili.com/dynamic_repost/v1/dynamic_repost/repost_detail` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `dynamic_id` | int | 动态 ID |
| `offset` | int | 每页第一条动态 ID |

#### `likes` 动态点赞信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.vc.bilibili.com/dynamic_like/v1/dynamic_like/spec_item_likes` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `dynamic_id` | int | 动态 ID |
| `pn` | — | 页码 |
| `ps` | — | 每页数量 |

#### `detail` 动态详细信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/polymer/web-dynamic/v1/detail` | 免登录 + WBI 签名 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `timezone_offset` | int | 时区偏移量 |
| `dynamic_id` | int | 动态 ID |
| `features` | str | 默认 itemOpusStyle |
| `x-bili-device-req-json.platform` | str | sweb |
| `x-bili-device-req-json.device` | str | pc |
| `x-bili-web-req-json.spm_id` | str | 333.1368 |

#### `reaction`

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/polymer/web-dynamic/v1/detail/reaction` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `web_location` | str | 333.1369 |
| `id` | int | 动态 ID |
| `offset` | str | 空 |

#### `dynamic_page_UPs_info` 获取动态页 UP 主信息列表

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/polymer/web-dynamic/v1/portal` | 需登录 |

#### `dynamic_page_info` 获取动态页信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/polymer/web-dynamic/v1/feed/all` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `timezone_offset` | int | 时区偏移量 |
| `type` | str | 动态分类类型 |
| `page` | int | 页码 |
| `features` | str | 默认 itemOpusStyle |
| `offset` | int | 每页最后一条动态 ID |
| `host_mid` | int | UP 主 UID |

#### `hot_dynamics` 获取热门动态

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/polymer/web-dynamic/v1/feed/hot` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `page` | int | 页码. Defaults to 1.  |

#### `lottery` 获取动态抽奖信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.vc.bilibili.com/lottery_svr/v1/lottery_svr/lottery_notice` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `business_id` | int | 动态 ID |
| `business_type` | int | 1 |
| `web_location` | str | 333.1330 |

### `schedule`

#### `list` 获取待发送定时动态列表

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.vc.bilibili.com/dynamic_draft/v1/dynamic_draft/get_drafts` | 免登录 |

#### `publish_now` 立即发送定时动态

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.vc.bilibili.com/dynamic_draft/v1/dynamic_draft/publish_now` | 免登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `draft_id` | int | 定时动态 ID |

#### `modify` 修改待发定时动态

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.vc.bilibili.com/dynamic_draft/v1/dynamic_draft/modify_draft` | 免登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `draft_id` | int | 定时动态 ID |

> 注：当 **include dynamic.send.schedule** 时，剩余参数见 dynamic.send.schedule

#### `delete` 删除待发定时动态

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.vc.bilibili.com/dynamic_draft/v1/dynamic_draft/rm_draft` | 免登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `draft_id` | int | 定时动态 ID |


---

## 图文（Opus）

### 查询 `info`

#### `detail` 动态详细信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/polymer/web-dynamic/v1/opus/detail` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `timezone_offset` | int | 时区偏移量 |
| `id` | int | 动态 ID |

### 操作 `operate`

#### `simple_action` 收藏/取消收藏

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/community/cosmo/interface/simple_action` | 需登录 + JSON 请求体 |

**请求体（JSON）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `meta.spmid` | — | 444.42.0.0 |
| `meta.from_spmid` | — | 333.1365.0.0 |
| `meta.from` | — | unknown |
| `entity.object_id_str` | — | 890484395664736288 |
| `entity.type.biz` | — | 2 |
| `action` | int | 3 or 4 |


---

