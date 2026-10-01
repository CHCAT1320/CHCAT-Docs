# 用户

用户基本信息、关系（关注/粉丝）、投稿、收藏、历史、动态、追番等信息。多数只读接口免登录；涉及“我的”数据时需要登录 Cookie。

> 来源声明：本页接口资料整理自开源项目 `bilibili-api-python`（GPL-3.0）随包提供的 API 数据文件，仅作来源标注。使用前请以哔哩哔哩实际返回为准，并遵守其服务条款。

## 用户信息

### 查询 `info`

#### `login_log`

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/member/web/login/log` | 需登录 |

#### `moral_log`

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/member/web/moral/log` | 需登录 |

#### `exp_log`

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/member/web/exp/log` | 需登录 |

#### `name_to_uid`

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/polymer/web-dynamic/v1/name-to-uid` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `names` | string | 多个名称, 用,分割 |

#### `my_info` 获取自己的信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/space/myinfo` | 需登录 |

#### `edit_my_info` 修改自己的信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/member/web/update` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `birthday` | string | 用户生日 |
| `sex` | string | 用户性别 |
| `uname` | string | 用户昵称 |
| `usersign` | string | 用户签名 |

#### `info` 用户基本信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/space/wbi/acc/info` | 免登录 + WBI 签名 + dm 参数 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `mid` | int | uid |
| `w_webid` | str | w_webid |

#### `space_notice` 用户个人空间公告

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/space/notice` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `mid` | int | uid |

#### `user_tag` 用户关注的 TAG / 话题,认证方式：SESSDATA

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/space/tag/sub/list` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `vmid` | int | uid |
| `pn` | int | 页码 |
| `ps` | int | 每页项数 |

#### `user_top_videos` 用户置顶视频

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/space/top/arc` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `vmid` | int | uid |

#### `masterpiece` 用户代表作

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/space/masterpiece` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `vmid` | int | uid |

#### `relation_stat` 获取用户关系信息（关注数，粉丝数，悄悄关注，黑名单数）

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/relation/stat` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `vmid` | int | uid |

#### `upstat` 视频播放量，文章阅读量，总点赞数

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/space/upstat` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `mid` | int | uid |

#### `user_medal` 读取用户粉丝牌详细信息，如果隐私则不可以

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.live.bilibili.com/xlive/web-ucenter/user/MedalWall` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `target_id` | int | uid |

#### `live` 直播间基本信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/space/wbi/acc/info` | 免登录 + WBI 签名 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `mid` | int | uid |
| `w_webid` | str | w_webid |

#### `video` 搜索用户视频

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/space/wbi/arc/search` | 免登录 + WBI 签名 + dm 参数 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `mid` | int | uid |
| `ps` | const int | 30 |
| `tid` | int | 分区 ID，0 表示全部 |
| `pn` | int | 页码 |
| `keyword` | str | 关键词，可为空 |
| `w_webid` | str | w_webid |

#### `media_list` 以medialist形式获取用户视频列表

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/v2/medialist/resource/list` | 免登录 + WBI 签名 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `mobi_app` | str | 定值 web |
| `type` | int | 视频类型，通过uid获取用户视频时为1 |
| `biz_id` | int | uid |
| `oid` | int | 起始视频 aid， 默认为列表开头 |
| `otype` | int | oid类型， 接受任意值不影响结果 |
| `ps` | int | 每页视频数量， 最大为100 |
| `direction` | bool | 相对于给定oid的查询方向，true：向列表末尾方向，false：向列表开头方向 |
| `desc` | bool | 列表是否逆序排列 |
| `sort_field` | int | 用于排序的栏 1 发布时间，2 播放量，3 收藏量 |
| `tid` | int | 分区 ID，0 表示全部， 1 部分（未知），不接受2及以上 |
| `with_current` | bool | 返回的列表中是否包含给定oid自身 |

#### `reservation` 获取用户空间预约

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/space/reservation` | 免登录 + WBI 签名 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `vmid` | int | uid |

#### `album` 相簿

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.vc.bilibili.com/link_draw/v1/doc/doc_list` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `uid` | int | uid 此项必须 |
| `page_size` | int | 每页项数 此项必须 |
| `page_num` | int | 页码 |
| `biz` | str | 全部：all 绘画：draw 摄影：photo 日常：daily 默认为 all |

#### `audio` 音频

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/audio/music-service/web/song/upper` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `uid` | int | uid |
| `ps` | const int | 30 |
| `pn` | int | 页码 |
| `order` | int | 1 最新发布，2 最多播放，3 最多收藏 |

#### `article` 专栏

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/space/wbi/article` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `mid` | int | uid |
| `ps` | const int | 30 |
| `pn` | int | 页码 |
| `sort` | str | publish_time 最新发布，publish_time 最多阅读，publish_time 最多收藏 |

#### `article_lists` 专栏文集

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/article/up/lists` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `mid` | int | uid |
| `sort` | int | 0 最近更新，1 最多阅读 |

#### `dynamic` 用户动态信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/space_history` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `host_uid` | int | uid |
| `offset_dynamic_id` | int | 动态偏移用，第一页为 0 |
| `need_top` | int bool | 是否显示置顶动态 |

#### `dynamic_new` 用户动态信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/polymer/web-dynamic/v1/feed/space` | 免登录 + WBI 签名 + dm 参数 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `host_mid` | int | uid |
| `offset` | int | 动态偏移用，第一页为 0 |
| `timezone_offset` | int | -400 |
| `features` | str | itemOpusStyle |
| `x-bili-device-req-json.platform` | str | sweb |
| `x-bili-device-req-json.device` | str | pc |
| `x-bili-web-req-json.spm_id` | str | 333.1368 |

#### `upower_qa_list` 用户充电问答列表

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/upower/qa/list` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `up_mid` | int | uid |
| `anchor` | int | 动态偏移用，第一页为 0 |
| `privilege_type` | int | 0 |
| `fans_filter` | int | 0 |
| `up_filter` | int | 0 |
| `ps` | int | 每页数量 |
| `t` | int | 时间戳，单位毫秒 |

#### `upower_qa_detail` 用户充电问答

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/upower/qa/info` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `qa_id` | int | 问答 ID |
| `t` | int | 时间戳，单位毫秒 |

#### `bangumi` 用户追番列表

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/space/bangumi/follow/list` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `vmid` | int | uid |
| `pn` | int | 页码 |
| `ps` | const int | 15 |
| `type` | int | 1 追番，2 追剧 |
| `follow_status` | — | 0 全部 1 想看 2 在看 3 看过 |

#### `followings` 获取用户关注列表（不是自己只能访问前 5 页）

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/relation/followings` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `vmid` | int | uid |
| `ps` | const int | 20 |
| `pn` | int | 页码 |
| `order` | str | desc 倒序, asc 正序 |

#### `all_followings` 获取用户所有关注（需要用户公开信息）

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/web-interface/attentions` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `mid` | int | uid |

#### `all_followings2` 获取用户关注

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/relation/followings` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `vmid` | int | uid |
| `order` | str | desc 倒序, asc 正序 |
| `order_type` | str | 按照关注顺序排列：留空 按照最常访问排列：attention |
| `pn` | int | 页码 |
| `ps` | const int | 100 |

#### `followers` 获取用户粉丝列表（不是自己只能访问前 5 页，是自己也不能获取全部的样子）

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/relation/followers` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `vmid` | int | uid |
| `ps` | const int | 20 |
| `pn` | int | 页码 |
| `order` | str | desc 倒序, asc 正序 |

#### `top_followers` 粉丝排行

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://member.bilibili.com/x/web/data/fan` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `t` | int | since when in timestamp(msec) |
| `csrf,csrf_token` | — | 要给两个 |

#### `overview` 获取用户的简易订阅和投稿信息(主要是这些的数量统计)

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/space/navnum` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `mid` | int | uid |
| `jsonp` | const str | jsonp |

#### `self_subscribe_group` 获取自己的关注分组列表，用于操作关注

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/relation/tags` | 需登录 |

#### `get_user_in_which_subscribe_groups` 获取用户在哪一个分组

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/relation/tag/user` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `fid` | int | uid |

#### `history` 用户浏览历史记录（旧版）

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/v2/history` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `pn` | int | 页码 |
| `ps` | const int | 100 |

#### `history_new` 用户浏览历史记录

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/web-interface/history/cursor` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `type` | — | all：全部类型（默认）archive：稿件 live：直播 article：文章 |
| `view_at` | int | 时间戳，获取此时间戳之前的历史记录 |
| `business` | — | 历史记录截止目标业务类型 默认为空 archive：稿件 pgc：剧集（番剧 / 影视） live：直播 article-list：文集 article：文章 |
| `max` | — | 历史记录截止目标 oid |
| `ps` | const int | 100 |

#### `channel_list` 查看用户合集的列表（新版）

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/polymer/web-space/seasons_series_list` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `mid` | int | uid |
| `page_num` | int | 开始项 |
| `page_size` | int | 开始项后面的项数 |

#### `channel_video_series` 查看列表内视频（旧版）

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/series/archives` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `mid` | int | uid |
| `series_id` | int | series_id |
| `pn` | int | 页码 |
| `ps` | const int | 100 |

#### `channel_video_season` 查看用户合集中的视频（新版）

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/polymer/web-space/seasons_archives_list` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `mid` | int | uid |
| `season_id` | int | season_id |
| `sort_reverse` | bool | 是否升序排序，否则默认排序 |
| `page_num` | int | 页码 |
| `page_size` | int | 每一页的项数 |

#### `pugv` 查看用户的课程

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/pugv/app/web/season/page` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `mid` | int | uid |

#### `get_coins` 获取硬币数量

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://account.bilibili.com/site/getCoin` | 需登录 |

#### `events` 获取事件 [deprecated]

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://member.bilibili.com/x2/creative/h5/calendar/event` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `ts` | int | 时间戳 |

#### `public_notes` 获取用户的公开笔记信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/note/publish/list/user` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `pn` | int | 页码 |
| `ps` | int | 每页项数 |

#### `all_notes` 获取用户的笔记信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/note/list` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `pn` | int | 页码 |
| `ps` | int | 每页项数 |

#### `get_special_followings` 获取自己的特别关注

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/relation/tag/special` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `pn` | int | 页码 |
| `ps` | int | 每页项数 |

#### `get_whisper_followings` 获取自己的悄悄关注

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/relation/whispers` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `pn` | int | 页码 |
| `ps` | int | 每页项数 |

#### `get_friends` 获取与自己互粉的人

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/relation/friends` | 需登录 |

#### `get_black_list` 获取自己的黑名单列表

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/relation/blacks` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `pn` | int | 页码 |
| `ps` | int | 每页项数 |

#### `get_same_followings` 获取指定用户和自己共同关注的 up 主

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/relation/same/followings` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `vmid` | int | uid |
| `pn` | int | 页码 |
| `ps` | int | 每页项数 |

#### `jury` 获取自己风纪委员信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/credit/v2/jury/jury` | 需登录 |

#### `elec_user_monthly` 获取空间充电公示列表

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/ugcpay-rank/elec/month/up` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `up_mid` | int | uid 号 |

#### `uplikeimg` 视频三连特效

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/web-interface/view/uplikeimg` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `aid` | int | av 号 |
| `vmid` | int | up uid 号 |

#### `relation` 获取与某用户的关系

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/space/wbi/acc/relation` | 需登录 + WBI 签名 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `mid` | int | uid |

#### `opus`

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/polymer/web-dynamic/v1/opus/feed/space` | 免登录 + WBI 签名 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `host_mid` | int | uid |
| `page` | int | 页码 非必要，且貌似对结果影响不大 |
| `offset` | int | 动态偏移用，第一页为空 |
| `type` | str | all / article / dynamic |
| `web_location` | — | 333.1387 |
| `w_webid` | str | w_webid |

### 操作 `operate`

#### `modify` 用户关系操作

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/relation/modify` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `fid` | int | UID |
| `act` | int | 1 关注 2 取关 3 悄悄关注 5 拉黑 6 取消拉黑 7 移除粉丝 |
| `re_src` | const int | 11 |

#### `set_space_notice` 修改用户个人空间公告

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/space/notice/set` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `notice` | str | text ,不必要 |
| `csrf` | str | CSRF Token（位于 cookie），必要 |

#### `create_subscribe_group` 添加关注分组

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/relation/tag/create` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `tag` | str | 分组名 |

#### `del_subscribe_group` 删除关注分组

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/relation/tag/del` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `tagid` | int | 分组 id |

#### `rename_subscribe_group` 重命名分组

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/relation/tag/update` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `tagid` | int | 分组 id |
| `name` | str | 新的分组名 |

#### `set_user_subscribe_group` 移动用户到关注分组

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/relation/tags/addUsers` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `fids` | int | UID |
| `tagids` | commaSeparatedList[int] | 分组的 tagids，逗号分隔 |

### `channel_series`

#### `info` 获取简介

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/series/series` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `series_id` | int | series_id |

#### `season_info` 获取简介

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/space/fav/season/list` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `season_id` | int | season_id |

#### `del_channel_aids_series`

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/series/series/delArchives` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `mid` | int | uid |
| `series_id` | int | series_id |
| `aids` | int | aid 列表 |

#### `add_channel_aids_series`

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/series/series/addArchives` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `mid` | int | uid |
| `series_id` | int | series_id |
| `aids` | int | aid 列表 |

#### `del_channel_series`

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/series/series/delete` | 需登录 |

#### `create`

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/series/series/createAndAddArchives` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `mid` | int | uid |
| `aids` | int | aid 列表 |
| `name` | — | str |
| `keywords` | — | str,str |
| `description` | — | str |


---

## 稍后再看

### 查询 `info`

#### `list` 获取稍后再看列表

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/v2/history/toview` | 需登录 |

### 操作 `operate`

#### `add` 添加视频至稍后再看列表

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/v2/history/toview/add` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `aid` | int | aid |
| `csrf` | string | bili_jct |

#### `del` 删除稍后再看列表中的视频

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/v2/history/toview/del` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `aid` | int | aid |
| `viewed` | bool | 是否删除已观看的视频 |

#### `clear` 清空稍后再看列表

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/v2/history/toview/clear` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `csrf` | string | bili_jct |


---

