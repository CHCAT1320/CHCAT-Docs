# 视频

视频基本信息、分 P、播放地址、弹幕、点赞投币收藏、字幕、标签与相关推荐等接口。查询类接口大多免登录，写操作（点赞、投币、收藏、发弹幕等）必须登录并携带 Cookie。

> 来源声明：本页接口资料整理自开源项目 `bilibili-api-python`（GPL-3.0）随包提供的 API 数据文件，仅作来源标注。使用前请以哔哩哔哩实际返回为准，并遵守其服务条款。

## 视频信息与操作

### 查询 `info`

#### `stat` 视频数据

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/web-interface/archive/stat` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `aid` | int | av 号 |
| `bvid` | string | BV 号 |

#### `info` 视频详细信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/web-interface/view` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `aid` | int | av 号 |
| `bvid` | string | BV 号 |

#### `detail`

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/web-interface/wbi/view/detail` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `aid` | int | av 号 |
| `bvid` | string | BV 号 |
| `need_operation_card` | int | 0 |
| `need_elec` | int | 0 |

#### `cid_info` 获取 cid 对应的视频

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://hd.biliplus.com/api/cidinfo` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `cid` | int | 分 P CID |

#### `tags` 视频标签信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/web-interface/view/detail/tag` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `aid` | int | av 号 |
| `bvid` | string | BV 号 |

#### `chargers` 视频充电信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/web-interface/elec/show` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `aid` | int | av 号 |
| `bvid` | string | BV 号 |
| `mid` | int | 用户 UID |

#### `video_snapshot_pvideo` 视频预览快照(web)

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/pvideo` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `aid` | int | av 号 |

#### `video_snapshot` 视频快照(web)

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/player/videoshot` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `aid` | int | av 号 |
| `bvid` | string | BV 号 |
| `cid` | int | 分 P CID |
| `index` | int | json 数组截取时间表1为需要，0不需要 |

#### `pages` 分 P 列表

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/player/pagelist` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `aid` | int | av 号 |
| `bvid` | string | BV 号 |

#### `playurl` 视频下载的信息，下载链接需要提供 headers 伪装浏览器请求（Referer 和 User-Agent）

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/player/wbi/playurl` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `avid` | int | av 号 |
| `cid` | int | 分 P 编号 |
| `qn` | int | 视频质量编号，最高 127 |
| `otype` | const str | json |
| `fnval` | const int | 4048 |
| `platform` | int | 平台 |

#### `related` 获取关联视频

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/web-interface/archive/related` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `aid` | int | av 号 |
| `bvid` | string | BV 号 |

#### `relation` 获取用户与视频关联的信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/web-interface/archive/relation` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `aid` | int | av 号 |
| `bvid` | string | BV 号 |

#### `has_liked` 是否已点赞

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/web-interface/archive/has/like` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `aid` | int | av 号 |
| `bvid` | string | BV 号 |

#### `get_pay_coins` 是否已投币

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/web-interface/archive/coins` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `aid` | int | av 号 |
| `bvid` | string | BV 号 |

#### `has_favoured` 是否已收藏

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/v2/fav/video/favoured` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `aid` | int | av 号 |

#### `media_list` 获取收藏夹列表信息，用于收藏操作

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/v3/fav/folder/created/list-all` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `rid` | int | av 号 |
| `up_mid` | int | up 主的 uid |
| `type` | const int | 2 |

#### `get_player_info` 获取视频上一次播放的记录，字幕和地区信息。需要 分集的 cid, 返回数据中含有json字幕的链接

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/player/wbi/v2` | 需登录 + WBI 签名 + dm 参数 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `aid` | int | av 号。与 bvid 任选其一 |
| `cid` | int | 分 P id |
| `ep_id` | int | 番剧分集 id |
| `isGaiaAvoided` | bool | false |
| `web_location` | int | 1315873 |

#### `pbp`

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://bvc.bilivideo.com/pbp/data` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `cid` | int | 分 P 编号 |
| `bvid` | string | BV 号 |
| `aid` | int | av 号 |

#### `is_forbid` 是否允许笔记

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/note/is_forbid` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `aid` | int | av 号 |

#### `private_notes` 列出稿件私有笔记列表

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/note/list/archive` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `oid` | int | av 号 |
| `oid_type` | int | oid_type |

#### `public_notes` 列出稿件公开笔记列表

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/note/publish/list/archive` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `oid` | int | av 号 |
| `oid_type` | int | oid_type |
| `pn` | int | 页码 |
| `ps` | int | 每页项数 |

#### `video_online_broadcast_servers` 获取视频在线人数实时监测服务器列表

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/web-interface/broadcast/servers?platform=pc` | 免登录 |

#### `ai_conclusion` ai 总结

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/web-interface/view/conclusion/get` | 免登录 + WBI 签名 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `aid` | int | av 号 |
| `bvid` | string | BV 号 |
| `cid` | int | cid |
| `up_mid` | int | up_mid |

#### `online` 在线人数检测

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/player/online/total` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `aid` | int | av 号 |
| `bvid` | int | bvid |
| `cid` | int | cid |

### 操作 `operate`

#### `like` 给视频点赞/取消点赞 

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/web-interface/archive/like` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `aid` | int | av 号 |
| `bvid` | string | BV 号 |
| `like` | int | 1 是点赞，2 是取消点赞 |

#### `coin` 给视频投币

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/web-interface/coin/add` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `aid` | int | av 号 |
| `bvid` | string | BV 号 |
| `multiply` | int | 几个币 |
| `select_like` | int bool | 是否同时点赞 |

#### `share` 视频分享

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/web-interface/share/add` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `aid` | int | av 号 |
| `bvid` | string | BV 号 |
| `csrf` | str | csrf |

#### `add_tag` 添加标签

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/tag/archive/add` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `aid` | int | av 号 |
| `tag_name` | str | 标签名 |

#### `del_tag` 删除标签

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/tag/archive/del` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `aid` | int | av 号 |
| `tag_id` | int | 标签 id |

#### `yjsl` 阿婆最爱的一键三连欧

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/web-interface/archive/like/triple` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `aid` | int | av 号 |
| `bvid` | string | BV 号 |

#### `subscribe_tag` 订阅标签

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/tag/subscribe/add` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `tag_id` | int | 标签 id |

#### `unsubscribe_tag` 取消订阅标签

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/tag/subscribe/cancel` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `tag_id` | int | 标签 id |

#### `appeal` 投诉稿件

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/web-interface/appeal/v2/submit` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `aid` | int | av 号 |
| `tid` | int | 投诉理由 tid, 见 https://api.bilibili.com/x/web-interface/archive/appeal/tags |
| `desc` | str | 理由详细描述 |
| `attach` | str | 附件路径 |

> 注：当 **一些 kwargs** 时，翻源代码理解吧

#### `favorite` 设置视频收藏状态

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/v3/fav/resource/deal` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `rid` | int | av 号。 |
| `type` | const int | 2 |
| `add_media_ids` | commaSeparatedList[int] | 要添加到的收藏夹 ID。 |
| `del_media_ids` | commaSeparatedList[int] | 要移出的收藏夹 ID。 |

#### `submit_subtitle` 上传字幕

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/v2/dm/subtitle/draft/save` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `type` | — | 1 |
| `oid` | int | 分 P id |
| `lan` | str | 字幕语言代码，参考 http://www.lingoes.cn/zh/translator/langcode.htm |
| `data.font_size` | float | 字体大小，默认 0.4 |
| `data.font_color` | str | 字体颜色，默认 "#FFFFFF" |
| `data.background_alpha` | float | 背景不透明度，默认 0.5 |
| `data.background_color` | str | 背景颜色，默认 "#9C27B0" |
| `data.Stroke` | str | 描边，目前作用未知，默认为 "none" |
| `data.body[].from` | int | 字幕开始时间（秒） |
| `data.body[].to` | int | 字幕结束时间（秒） |
| `data.body[].location` | int | 字幕位置，默认为 2 |
| `data.body[].content` | str | 字幕内容 |
| `submit` | bool | 是否提交，不提交为草稿 |
| `sign` | bool | 是否署名 |
| `bvid` | str | 视频 BV 号 |

#### `report_history` 上报观看历史

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/v2/history/report` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `aid` | int | av 号 |
| `cid` | int | 视频 cid |
| `progress` | int | 观看进度（默认0）秒  |
| `csrf` | str | csrf |

#### `report_start_watching` 上报开始观看

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/click-interface/click/web/h5` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `aid` | int | av 号 |
| `cid` | int | 视频 cid |
| `mid` | int | 用户 UID |
| `part` | int | 视频分 P 的编号 |
| `csrf` | str | csrf |

### 弹幕 `danmaku`

#### `get_danmaku` 获取弹幕列表

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/v2/dm/wbi/web/seg.so` | 免登录 + WBI 签名 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `oid` | int | video_info 中的 cid，即分 P 的编号 |
| `type` | const int | 1 |
| `segment_index` | int | 分片序号 |
| `pid` | int | av 号 |

#### `get_history_danmaku` 获取历史弹幕列表

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/v2/dm/web/history/seg.so` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `oid` | int | video_info 中的 cid，即分 P 的编号 |
| `type` | const int | 1 |
| `date` | str | 历史弹幕日期，格式：YYYY-MM-DD |

#### `view` 获取弹幕设置、特殊弹幕

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/v2/dm/web/view` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `type` | — | 1 |
| `oid` | int | 分 P 的编号 |
| `pid` | int | av 号 |

#### `get_history_danmaku_index` 存在历史弹幕的日期

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/v2/dm/history/index` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `oid` | int | 分 P 的编号 |
| `type` | const int | 1 |
| `month` | str | 年月 (yyyy-mm) |

#### `has_liked_danmaku` 是否已点赞弹幕

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/v2/dm/thumbup/stats` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `oid` | int | video_info 中的 cid，即分 P 的编号 |
| `ids` | commaSeparatedList[int] | 弹幕 id，多个以逗号分隔 |

#### `send_danmaku` 发送弹幕

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/v2/dm/post` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `type` | const int | 1 |
| `oid` | int | 分 P 编号 |
| `msg` | int | 弹幕内容 |
| `bvid` | int | bvid |
| `progress` | int | 发送时间（毫秒） |
| `color` | int | 颜色（十六进制转十进制） |
| `fontsize` | int | 字体大小（小 18 普通 25 大 36） |
| `pool` | int bool | 字幕弹幕（1 是 0 否） |
| `mode` | int | 模式（滚动 1 顶部 5 底部 4） |
| `plat` | const int | 1 |

#### `like_danmaku` 点赞弹幕

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/v2/dm/thumbup/add` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `dmid` | int | 弹幕 ID |
| `oid` | int | 分 P 编号 |
| `op` | int | 1 点赞 2 取消点赞 |
| `platform` | const str | web_player |

#### `edit_danmaku` 编辑弹幕

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/v2/dm/edit/state` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `type` | const int | 1 |
| `dmids` | int | 弹幕 ID |
| `oid` | int | 视频 cid |
| `state` | int | 1 删除 2 保护 3 取消保护 |

#### `snapshot` 获取弹幕快照

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/v2/dm/ajax` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `aid` | int or string | av 号或 BV 号 |

#### `recall` 撤回弹幕

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/dm/recall` | 免登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `dmid` | int | 弹幕 ID |
| `cid` | int | 分 P 编号 |
| `csrf` | — | cookies: bili_jct |


---

## 视频标签

### 查询 `info`

#### `tag_info` 获取标签详情

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/tag/info` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `tag_name` | str | 标签名 |
| `tag_id` | int | 标签 id |

> 注：当 **** 时，上面两个参数任选一个即可

#### `get_similar` 获取相关的标签

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/tag/change/similar` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `tag_id` | int | 标签 id |

#### `get_list` 获取相关的动态/视频

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.vc.bilibili.com/topic_svr/v1/topic_svr/topic_new` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `topic_id` | int | 标签 id |

#### `get_history_list` 获取从指定dynamic_id视频的后一位开始的相关的动态/视频, 先用get_list获取dynamic_id。

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.vc.bilibili.com/topic_svr/v1/topic_svr/topic_history` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `topic_id` | int | 标签 id |
| `offset_dynamic_id` | int | 起始视频/动态的dynamic_id(不包含自身) |


---

## 视频分区

### `count` 获取每个分区当日最新投稿数量

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/web-interface/online` | 免登录 |

### `new` 获取分区最新投稿视频

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/web-interface/dynamic/region` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `ps` | int | 每页项数 |
| `pn` | int | 页码 |
| `rid` | int | tid，分区 id |

### `get_hot_tags` 获取热门标签

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/tag/hots` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `rid` | int | tid，分区 id |

### `ranking`

#### `get_top10` 获取分区前十排行榜

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/web-interface/ranking/region` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `rid` | int | tid，分区 id |
| `day` | int | 3，7 |


---

## 互动视频

### 查询 `info`

#### `videolist` 视频列表数据

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://member.bilibili.com/x/vupre/web/archive/view` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `bvid` | str | bv 号 |

#### `edge_info` 互动视频节点信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/stein/edgeinfo_v2` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `bvid` | str | BV 号 |
| `graph_version` | int | 剧情图版本 |
| `edge_id` | int? | 节点 ID |

### 操作 `operate`

#### `savestory` 保存故事树

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/stein/graph/save` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `preview` | int | 0 不清楚是什么 |
| `data` | — | 故事树信息 |

#### `mark_score`

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/stein/mark` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `mark` | int | 星数 |
| `bvid` | str | BV 号 |


---

## 笔记

### `private`

#### `detail` 私有笔记详细信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/note/info` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `oid` | — | oid |
| `oid_type` | — | oid_type |
| `note_id` | — | note_id |

### `public`

#### `detail` 公开笔记详细信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/note/publish/info` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `cvid` | — | cvid |

### 操作 `operate`

#### `upload_img`

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/note/image/upload` | 需登录 |


---

