# 评论与通用接口

评论的读取、发送、点赞、举报，以及昵称校验、动态分享、在线人数、收藏夹等跨模块通用接口。评论类型（`type`）取值见文末说明。

> 来源声明：本页接口资料整理自开源项目 `bilibili-api-python`（GPL-3.0）随包提供的 API 数据文件，仅作来源标注。使用前请以哔哩哔哩实际返回为准，并遵守其服务条款。

## 通用与评论

### `dynamic_share` str: 站内资源分享到动态

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.vc.bilibili.com/dynamic_repost/v1/dynamic_repost/share` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `uid` | int | up uid，经测试可为 0 |
| `type` | int | 8 视频(rid=av)，64 专栏(rid=cv)，256 音频(rid=au)，2048 自定义分享，4097 番剧(rid=ep)， |
| `share_uid` | int | 自己的 uid，经测试可为 0 |
| `content` | str | 动态内容 |
| `rid` | int | 视频是 aid，专栏是 cvid，以此类推 |
| `csrf,csrf_token` | str | 同时提供这两个 |

> 注：当 **if (data.type == 2048)** 时，{"sketch[title]":"str: 标题","sketch[biz_type]":"const int: 131","sketch[cover_url]":"str: 图片链接","sketch[target_url]":"str: 跳转链接，仅限站内，间接站外跳转：https://game.bilibili.com/linkfilter/?url="}

### `online` 获取在线人数

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/web-interface/online` | 免登录 |

### `nickname`

#### `check_nickname` 检验昵称是否可用

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://passport.bilibili.com/web/generic/check/nickname` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `nickName` | string | 昵称 |

### `comment`

#### `send` 发送评论

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/v2/reply/add` | 需登录 + WBI 签名 + dm 参数 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `oid` | int | 各种类型 id |
| `type` | int | 1 视频，12 专栏，11 画册（图文）动态，17 文字动态，14 音频，19 歌单。下同。 |
| `message` | str | 评论内容 |
| `plat` | const int | 1 |
| `statistics.appId` | — | 100 |
| `statistics.platform` | — | 5 |
| `root` | int | 根评论 rpid，即在谁的评论下面回复，为空时在 oid 下直接评论 |
| `parent` | int | 父评论 rpid，即回复谁的评论，为空时在 oid 下直接评论 |
| `pictures[].img_src` | str | 图片地址 |
| `pictures[].img_width` | int | 图片宽度 |
| `pictures[].img_height` | int | 图片高度 |
| `pictures[].img_size` | int | 图片大小 |

#### `like` 点赞/取消点赞评论

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/v2/reply/action` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `oid` | int | av 号 |
| `type` | int | 同 comment.send |
| `action` | int bool | 1 点赞 0 取消点赞 |
| `rpid` | int | 评论编号 |

#### `hate` 踩/取消踩评论

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/v2/reply/hate` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `oid` | int | av 号 |
| `type` | int | 同 comment.send |
| `action` | int bool | 1 踩 0 取消踩 |
| `rpid` | int | 评论编号 |

#### `pin` 置顶/取消置顶评论

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/v2/reply/top` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `oid` | int | av 号 |
| `type` | int | 同 comment.send |
| `action` | int bool | 1 置顶 0 取消置顶 |
| `rpid` | int | 评论编号 |

#### `del` 删除评论

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/v2/reply/del` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `oid` | int | av 号 |
| `type` | int | 同 comment.send |
| `rpid` | int | 评论编号 |

#### `get` 获取评论，分页模式

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/v2/reply` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `pn` | int | 页码 |
| `type` | — |  |
| `oid` | int | 动态时画册 id 或动态 id |
| `sort` | int | 排序方式，2 按热度 0 按时间 |

#### `sub_reply` 获取评论的回复评论

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/v2/reply/reply` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `pn` | int | 页码 |
| `ps` | const int | 10 |
| `type` | — |  |
| `oid` | int | id |
| `root` | int | 根评论 ID |

#### `reply_lazy_loading` 获取评论的主评论，慢加载模式

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/v2/reply/main` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `next` | int | 评论页选择 |
| `ps` | int | 每页评论数 |
| `type` | — | CommentResourceType：资源类型枚举 |
| `oid` | int | id |
| `mode` | int | 默认为 3。0 3：仅按热度 1：按热度+按时间 2：仅按时间 |

#### `reply_by_session_id` 新版评论区

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/v2/reply/wbi/main` | 免登录 + WBI 签名 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `oid` | int | id |
| `type` | — |  |
| `mode` | int | 默认为 3。0 3：仅按热度 1：按热度+按时间 2：仅按时间 |
| `pagination_str` | str | 分页依据 |
| `next` | int | 页码 0 第一页 |
| `ps` | const int | 1~30 |

#### `report` 举报评论

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/v2/reply/report` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `type` | num | 评论区类型代码，必要。类型代码见 https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/comment/readme.md#%E8%AF%84%E8%AE%BA%E5%8C%BA%E7%B1%BB%E5%9E%8B%E4%BB%A3%E7%A0%81 |
| `oid` | int | 目标评论区id，必要 |
| `rpid` | int | 目标评论rpid，必要 |
| `reason` | int | 举报原因，见 https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/comment/action.md#%E4%B8%BE%E6%8A%A5%E8%AF%84%E8%AE%BA |
| `content` | str | 其他举报备注内容 |
| `csrf` | str | CSRF Token（位于cookie），Cookie方式必要 |

### `favorite`

#### `get_favorite_list_old` 获取媒体收藏情况，必须使用 Referer

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/medialist/gateway/base/created` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `up_mid` | int | 用户 uid |
| `type` | int | 12 音频 |
| `pn` | int | 页码 |
| `ps` | const int | 100 |
| `rid` | int | 音频(au) |

#### `get_favorite_list` 获取收藏夹列表信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/v3/fav/folder/created/list-all` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `up_mid` | int | 用户 uid |

> 注：当 **if 需要获取媒体收藏情况** 时，{"type":"int: 2 视频","rid":"int: 视频(aid)"}

#### `get_favorite_list_content` 获取收藏夹内容

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/v3/fav/resource/list` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `media_id` | int | 收藏夹 id |
| `ps` | const int | 20 |
| `pn` | int | 页码 |
| `keyword` | str | 搜索关键词 |
| `order` | str | 排序依据。mtime 最近收藏，mtime 最多播放，mtime 最新投稿 |
| `type` | const int | 0 |
| `tid` | int | 分区 ID，0 为全部 |

#### `operate_favorite` 收藏夹修改

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/medialist/gateway/coll/resource/deal` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `rid` | int | 视频 aid，音频 aid |
| `type` | int | 2 视频，12 音频 |
| `add_media_ids` | commaSeparatedList[int] | 添加收藏（多个收藏夹时半角逗号分隔） |
| `del_media_ids` | commaSeparatedList[int] | 移除收藏（多个收藏夹时半角逗号分隔） |


---

## 表情

### `list` 获取表情包

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/emote/user/panel/web` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `business` | — | 使用场景 reply/dynamic |

### `detail` 获取表情包系列明细

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/emote/package` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `business` | — | 使用场景 reply/dynamic |
| `ids` | int/list[int] | 查询 id |

### `all` 获取所有表情包

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/emote/setting/panel` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `business` | — | 使用场景 reply/dynamic |

### `add` 添加表情包

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/emote/package/add` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `package_id` | — | 表情包ip |
| `business` | — | 使用场景 reply/dynamic |
| `csrf` | — | 凭证 |


---

## 附：评论资源类型 `type`

评论接口的 `type` 字段表示目标资源类型，常用取值如下。

| 值 | 资源类型 |
| --- | --- |
| `1` | 视频 |
| `4` | 活动 |
| `6` | 小黑屋 |
| `11` | 画册（图文动态） |
| `12` | 专栏 |
| `14` | 音频 |
| `17` | 动态 |
| `19` | 歌单 |
| `22` | 漫画 |
| `33` | 课程 |

