# 投稿与创作中心

视频 / 音频投稿、稿件管理、合集系列等创作侧接口。投稿流程涉及分片上传、UPOS 等，需登录 Cookie。

> 来源声明：本页接口资料整理自开源项目 `bilibili-api-python`（GPL-3.0）随包提供的 API 数据文件，仅作来源标注。使用前请以哔哩哔哩实际返回为准，并遵守其服务条款。

## 创作中心

### `overview`

#### `compare` 获取对比数据

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://member.bilibili.com/x/web/data/v2/overview/compare` | 需登录 |

#### `graph` 获取统计图表数据

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://member.bilibili.com/x/web/data/v2/overview/stat/graph` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `period` | int | 统计周期 |
| `s_locale` | str | zh_CN |
| `type` | str | 统计类型 |

#### `num` 获取统计数据

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://member.bilibili.com/x/web/data/v2/overview/stat/num` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `period` | int | 统计周期 |
| `s_locale` | str | zh_CN |
| `tab` | int | Unknown |

### `data-up`

#### `survey` 获取各分区中占比排行

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://member.bilibili.com/x/web/data/survey` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `type` | int | 统计类型 |

#### `playanalysis` 获取稿件播放完成率对比数据

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://member.bilibili.com/x/web/data/playanalysis?copyright=0&t=1676161628464` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `copyright` | int | 版权 |

#### `source` 获取稿件播放来源分布数据

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://member.bilibili.com/x/web/data/v2/overview/source` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `s_locale` | str | zh_CN |

#### `overview` 获取粉丝数据

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://member.bilibili.com/x/web/data/v2/fans/stat/num` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `period` | int | 统计周期 |

#### `graph` 获取粉丝数据图表

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://member.bilibili.com/x/web/data/v2/fans/stat/graph?type=all_fans&period=2` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `period` | int | 统计周期 |
| `type` | str | 统计类型 |

#### `overview` 获取文章概览信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://member.bilibili.com/x/web/data/article` | 需登录 |

#### `graph` 获取文章数据图表

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://member.bilibili.com/x/web/data/article/thirty` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `type` | int | 图表类型 |

#### `rank` 获取来源稿件数据

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://member.bilibili.com/x/web/data/article/rank` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `type` | int | 图表类型 |

#### `source` 获取文章阅读终端数据

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://member.bilibili.com/x/web/data/article/source` | 需登录 |

### `upload-manager`

#### `video_draft` 获取内容管理视频草稿信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://member.bilibili.com/x/vupre/web/draft/list` | 需登录 |

#### `video` 获取内容管理视频信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://member.bilibili.com/x/web/archives` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `pn` | int | 页码 |
| `ps` | int | 每页项数 |
| `coop` | int | unknown |
| `status` | str | is_pubing,pubed,not_pubed |
| `order` | str | click, stow, senddate, dm_count, scores |
| `interactive` | int | 1 为视频 2 为 互动视频 |
| `tid` | int | 分区id |

#### `article` 获取内容管理文章信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/article/creative/article/list?` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `group` | int | 0 全部 1 进行中 2 已通过 3 未通过 |
| `sort` | int | 1 创建时间 2 点赞 3 评论 5 收藏 6 投币 |
| `pn` | int | 页码 |
| `mobi_app` | str | pc |

#### `article_list` 获取内容管理文集信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/article/creative/article/list?` | 需登录 |

### `comment-manager`

#### `fulllist` 获取评论管理评论信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/v2/reply/up/fulllist` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `oid` | int | 稿件 oid |
| `order` | int | 排序 |
| `pn` | int | 页码 |
| `ps` | int | 每页项数 |
| `type` | int | 稿件类型 |
| `filter` | int | -1 |
| `charge_plus_filter` | bool | false |
| `keyword` | str | 关键词 |

#### `del` 评论管理删除评论

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/v2/reply/del` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `oid` | str | 稿件 oid，用逗号分隔 |
| `type` | int | 稿件类型 |
| `rpid` | str | 评论 rpid，用逗号分隔 |
| `csrf` | str | csrf |

### `danmaku-manager`

#### `search` 弹幕搜索

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/v2/dm/search` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `oid` | str | 稿件oid，用逗号分隔 |
| `type` | int | 稿件类型 |
| `mids` | str | 用户mids，用逗号分隔 |
| `keyword` | str | 关键词 |
| `progress_from` | int | 进度开始 |
| `progress_to` | int | 进度结束 |
| `ctime_from` | str | 创建时间起始 |
| `ctime_to` | str | 创建时间结束 |
| `modes` | int | 弹幕模式 |
| `pool` | int | 弹幕池 |
| `attrs` | str | 弹幕属性 |
| `order` | str | 排序字段 |
| `sort` | str | 排序方式 |
| `pn` | int | 页码 |
| `ps` | int | 每页项数 |
| `cp_filter` | bool | 是否过滤CP弹幕 |

#### `recent` 最近弹幕

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/v2/dm/recent` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `pn` | int | 页码 |
| `ps` | int | 每页项数 |

#### `state` 操作弹幕

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/v2/dm/edit/state` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `oid` | int | 稿件 oid |
| `type` | int | 稿件类型 1 |
| `dmids` | str | 弹幕id，用逗号分隔 |
| `state` | int | 1 删除 2 保护 3 取消保护 |

#### `pool` 操作弹幕池

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/v2/dm/edit/pool` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `oid` | int | 稿件 oid |
| `type` | int | 稿件类型 1 |
| `dmids` | str | 弹幕id，用逗号分隔 |
| `pool` | int | 弹幕池 0 普通 1 字幕 |

### `archive`

#### `edits` 获取自己的稿件编辑记录

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://member.bilibili.com/x/web/archive/history/list` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `bvid` | str | BVID |

#### `pages` 获取稿件分 P 详细

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://member.bilibili.com/x/web/archive/parts` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `aid` | str | AID |


---

## 视频投稿

### `pre` 获取视频上传基本前置信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://member.bilibili.com/x/vupre/web/archive/pre` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `lang` | — | const: cn |

### `check_tag_name` 检查 tag_name 是否合法

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://member.bilibili.com/x/vupre/web/topic/tag/check` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `t` | str | tag_name |

### `available_topics` 根据分区获取可用话题，最多200个可获取

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://member.bilibili.com/x/vupre/web/topic/type` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `type_id` | int | 分区 ID |
| `pn` | int | 分页 |
| `ps` | int | 每页项数 |

### `preupload` 获取上传配置

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://member.bilibili.com/preupload` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `profile` | — | ugcfr/pc3 |
| `name` | str | 视频文件名（带后缀） |
| `size` | int | 视频大小 |
| `r` | const str | upos |
| `ssl` | const int | 0 |
| `version` | const str | 2.10.4 |
| `build` | const str | 2100400 |
| `upcdn` | const str | bda2 |
| `probe_version` | const str | 20211012 |

### `cover_up` 上传封面

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://member.bilibili.com/x/vu/web/cover/up` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `cover` | str | 封面 dataURI.  |

> 注：当 **** 时，cover 字段格式为: data:image/jpeg;base64,${图片 base64 信息}

### `probe` 获取线路

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://member.bilibili.com/preupload` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `r` | const str | probe |

### `submit`

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://member.bilibili.com/x/vu/web/add/v3` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `act_reserve_create` | const int | 0 |
| `copyright` | — | int, 投稿类型。1 自制，2 转载。 |
| `source` | str | 视频来源。投稿类型为转载时注明来源，为原创时为空。 |
| `cover` | str | 封面 URL |
| `desc` | str | 视频简介。 |
| `desc_format_id` | const int | 0 |
| `dynamic` | str | 动态信息。 |
| `interactive` | const int | 0 |
| `no_reprint` | int | 显示未经作者授权禁止转载，仅当为原创视频时有效。1 为启用，0 为关闭。 |
| `open_elec` | int | 是否展示充电信息。1 为是，0 为否。 |
| `origin_state` | const int | 0 |
| `subtitles # 字幕设置.lan` | str | 字幕投稿语言，不清楚作用请将该项设置为空 |
| `subtitles # 字幕设置.open` | int | 是否启用字幕投稿，1 or 0 |
| `tag` | str | 视频标签。使用英文半角逗号分隔的标签组。示例：标签 1,标签 1,标签 1 |
| `tid` | int | 分区 ID。可以使用 channel 模块进行查询。 |
| `title` | str | 视频标题 |
| `up_close_danmaku` | bool | 是否关闭弹幕。 |
| `up_close_reply` | bool | 是否关闭评论。 |
| `up_selection_reply` | bool | 是否开启评论精选 |
| `videos # 分 P 列表[].title` | str | 标题 |
| `videos # 分 P 列表[].desc` | str | 简介 |
| `videos # 分 P 列表[].filename` | str | preupload 时返回的 filename |
| `dtime` | int? | 可选，定时发布时间戳（秒） |

### `missions` 获取活动列表

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://member.bilibili.com/x/vupre/app/h5/mission/type/all` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `tid` | int | 分区 ID |

### `upload_args` 获取已上传视频的配置

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://member.bilibili.com/x/vupre/web/archive/view?topic_grey=1` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `bvid` | str | BVID |

### `edit`

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://member.bilibili.com/x/vu/web/edit` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `act_reserve_create` | const int | 0 |
| `copyright` | — | int, 投稿类型。1 自制，2 转载。 |
| `source` | str | 视频来源。投稿类型为转载时注明来源，为原创时为空。 |
| `cover` | str | 封面 URL |
| `desc` | str | 视频简介。 |
| `desc_format_id` | const int | 0 |
| `dynamic` | str | 动态信息。 |
| `interactive` | const int | 0 |
| `no_reprint` | int | 显示未经作者授权禁止转载，仅当为原创视频时有效。1 为启用，0 为关闭。 |
| `open_elec` | int | 是否展示充电信息。1 为是，0 为否。 |
| `origin_state` | const int | 0 |
| `subtitles # 字幕设置.lan` | str | 字幕投稿语言，不清楚作用请将该项设置为空 |
| `subtitles # 字幕设置.open` | int | 是否启用字幕投稿，1 or 0 |
| `tag` | str | 视频标签。使用英文半角逗号分隔的标签组。示例：标签 1,标签 1,标签 1 |
| `tid` | int | 分区 ID。可以使用 channel 模块进行查询。 |
| `title` | str | 视频标题 |
| `up_close_danmaku` | bool | 是否关闭弹幕。 |
| `up_close_reply` | bool | 是否关闭评论。 |
| `up_selection_reply` | bool | 是否开启评论精选 |
| `videos # 分 P 列表[].title` | str | 标题 |
| `videos # 分 P 列表[].desc` | str | 简介 |
| `videos # 分 P 列表[].filename` | str | preupload 时返回的 filename |


---

## 音频投稿

### `preupload` 获取上传配置

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://member.bilibili.com/preupload` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `profile` | — | uga/bup |
| `name` | str | 音频文件名（带后缀） |
| `size` | int | 音频大小 |
| `r` | const str | upos |
| `ssl` | const int | 0 |
| `version` | const str | 2.6.4 |
| `build` | const str | 2060400 |

### `lrc` lrc 字幕上传

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://www.bilibili.com/audio/music-service/songs/lrc` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `song_id` | str | song_id |
| `lrc` | str | lcr 字幕 |

### `submit_songs` 提交音频

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://www.bilibili.com/audio/music-service/compilation/commit_songs` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `lyric_url` | str | lrc 字幕链接 |
| `song_id` | int | song_id |
| `avid` | str | 关联 av号 |
| `tid` | int | 关联 tid |
| `cid` | int | 关联 cid |
| `title` | str | 标题 |
| `member_with_type` | — | list: 歌曲信息 |
| `song_tags` | — | list: tags |
| `mid` | int | up_uid |

### `submit_compilation` 提交音频合集

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://www.bilibili.com/audio/music-service/compilation/commit_compilation` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `cover_url` | str | cover url |
| `intro` | str | 介绍 |
| `is_synch` | — | const: unknown |
| `song_counts` | int | 歌曲总数 |
| `song_ids` | — | list: song_ids |
| `dict_items` | — | list: 分类 {'type_id': 125,'type_name': '电子',} |
| `title` | str | 标题 |

### `submit_single_song` 单音频提交

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://www.bilibili.com/audio/music-service/songs` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `lyric_url` | str | lrc 字幕链接 |
| `cover_url` | str | cover url |
| `song_id` | int | song_id |
| `mid` | int | up_uid |
| `cr_type` | — | const: unknown |
| `music_type_id` | int | ? |
| `avid` | str | 关联 av号 |
| `tid` | int | 关联 tid |
| `cid` | int | 关联 cid |
| `title` | str | 标题 |
| `intro` | str | 介绍 |
| `member_with_type[].m_type` | — | 127 |
| `member_with_type[].members[].name` | str | up_name |
| `member_with_type[].members[].mid` | int | up_uid |
| `song_tags[].tagName` | str | 标签 |
| `create_time` | float | 时间戳 %.3f |
| `activity_id` | int | activity_id |
| `is_bgm` | int | 是否为 bgm |
| `source` | int | ? |

### `image` 提交封面

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://www.bilibili.com/audio/music-service/songs/image` | 免登录 + 无需 CSRF |

### `compilation_categories` 歌单分类

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://www.bilibili.com/audio/music-service/compilation/compilation_categories` | 免登录 |

### `get_video_by_title` 获取关联视频

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://www.bilibili.com/audio/music-service/users/getvideoinfo/bytitle` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `title` | str | 标题 |
| `pagesize` | int | pagesize |

### `get_upinfo` 根据 UID / id 获取信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://www.bilibili.com/audio/music-service/users/get_upinfo` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `param` | str | up |


---

## 合集 / 系列

### 操作 `operate`

#### `fav` 订阅合集

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/v3/fav/season/fav` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `season` | int | 合集 id |

#### `unfav`

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/v3/fav/season/unfav` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `season` | int | 合集 id |


---

