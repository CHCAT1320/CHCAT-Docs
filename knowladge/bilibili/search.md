# 搜索 / 排行 / 热门

站内搜索、排行榜、热门与首页推荐接口。多个搜索接口依赖 WBI 签名。

> 来源声明：本页接口资料整理自开源项目 `bilibili-api-python`（GPL-3.0）随包提供的 API 数据文件，仅作来源标注。使用前请以哔哩哔哩实际返回为准，并遵守其服务条款。

## 搜索

### `search`

#### `web_search` 在首页以关键字搜索，只指定关键字，其他参数不指定

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/web-interface/wbi/search/all/v2` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `keyword` | str | 搜索用的关键字 |
| `page` | int | 页码 |

#### `web_search_by_type` 搜索关键字时限定类型,可以指定排序号

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/web-interface/wbi/search/type` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `keyword` | str | 搜索用的关键字 |
| `search_type` | str | 搜索时限定类型：视频(video)、番剧(media_bangumi)、影视(media_ft)、直播(live)、专栏(article)、话题(topic)、用户(bili_user) |
| `page` | int | 页码 |

#### `default_search_keyword` 获取默认的搜索内容

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/web-interface/wbi/search/default` | 免登录 |

#### `hot_search_keywords` 获取热搜

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://s.search.bilibili.com/main/hotword` | 免登录 |

#### `app_hot_search_keywords` 获取APP接口热搜

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://app.bilibili.com/x/v2/search/trending/ranking?limit=30` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `limit` | int | 热搜数量 |

#### `suggest` 获取搜索建议

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://s.search.bilibili.com/main/suggest` | 免登录 |

#### `game` 搜索游戏

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://line1-h5-pc-api.biligame.com/game/wiki/search` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `keyword` | str | 搜索用的关键字 |

#### `manga` 搜索漫画

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://manga.bilibili.com/twirp/comic.v1.Comic/Search?device=pc&platform=web` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `key_word` | str | 搜索用的关键词 |
| `page_num` | int | 页码 |
| `page_size` | int | 每一页的数据大小 |

#### `cheese` 搜索课程

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/pugv/app/web/seasonSeek?classification_id=-1` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `page` | int | 页码 |
| `page_size` | int | 每一页的数据大小 |
| `word` | str | 搜索关键词 |
| `sort_type` | int | 排序方式. 综合 -1；销量最高 1；最新上架 2；售价最低 3 |

#### `channel` 搜索频道

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/web-interface/web/channel/search` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `page` | int | 页码 |
| `page_size` | int | 每一页的数据大小 |
| `keyword` | str | 搜索关键词 |


---

## 热门

### `buzzwords`

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/v2/dm/buzzword/list` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `type_id` | int | 4 |
| `pn` | int | 页码. Defaults to 1.  |
| `ps` | int | 每页的数据大小. Defaults to 20.  |


---

## 排行榜

### 查询 `info`

#### `hot` 小破站的热门视频排行

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/web-interface/popular` | 免登录 + WBI 签名 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `ps` | int | 每页视频数 |
| `pn` | int | 页码 |
| `web_location` | — | 333.934 |

#### `weekly_series` 小破站每周必看全部信息（简介）

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/web-interface/popular/series/list` | 免登录 + WBI 签名 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `web_location` | — | 333.934 |

#### `weekly_details` 小破站每周必看一期的详细信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/web-interface/popular/series/one` | 免登录 + WBI 签名 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `number` | int | 第几周 |
| `web_location` | — | 333.934 |

#### `history_popular` 获取入站必刷 85 个视频

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/web-interface/popular/precious` | 免登录 + WBI 签名 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `page_size` | int | 就设置 85 好了（每页的大小） |
| `page` | int | 页码 |
| `web_location` | — | 333.934 |

#### `v2_ranking` 获取各个分区的排行榜

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/web-interface/ranking/v2` | 免登录 + WBI 签名 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `rid` | int | 频道的 tid |
| `type` | string | all |
| `web_location` | — | 333.934 |

#### `pgc_ranking` 获取番剧等排行榜

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/pgc/web/rank/list` | 免登录 + WBI 签名 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `day` | int | 天数 3/7 |
| `season_type` | int | 类型 |
| `web_location` | — | 333.934 |

#### `music_weekly_series` 获取全站音乐榜每周信息(不包括具体的音频列表)

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/copyright-music-publicity/toplist/all_period` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `list_type` | const int | 1 |

#### `music_weekly_details` 获取全站音乐榜一周的详细信息(不包括具体的音频列表)

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/copyright-music-publicity/toplist/detail` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `list_id` | int | 第几周 |

#### `music_weekly_content` 获取全站音乐榜一周的音频列表

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/copyright-music-publicity/toplist/music_list` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `list_id` | int | 第几周 |

#### `VIP_rank` 获取大会员中心的新热榜单

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/vip/vip_center/hotlist?=279` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `rank_id` | int | 排行榜 rank_id |

#### `manga_rank_type` 获取漫画排行榜类型，data 字段为空字典

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://manga.bilibili.com/twirp/comic.v1.Comic/ListRank` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `device` | str | 设备 |
| `platform` | str | 平台 |

#### `manga_rank` 获取漫画排行榜

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://manga.bilibili.com/twirp/comic.v1.Comic/GetRankInfo` | 免登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `id` | int | 排行榜 id |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `device` | str | 设备 |
| `platform` | str | 平台 |

#### `live_hot_rank` 获取直播人气排行榜

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.live.bilibili.com/xlive/web-interface/v1/index/getHotRankList` | 免登录 |

#### `live_sailing_rank` 获取直播大航海主播排行榜

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.live.bilibili.com/room/v2/Index/getNewRankTop?type=guard` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `type` | str | guard |

#### `live_energy_user_rank` 获取直播用户能量榜

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.live.bilibili.com/xlive/general-interface/v1/rank/getFeedingMonthlyRankEnergy` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `date` | str | month, pre_month |
| `page` | int | 页码 |
| `page_size` | int | 页大小 |

#### `live_web_top` 获取直播通用排行榜

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.live.bilibili.com/rankdb/v1/Rank2018/getWebTop` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `type` | str | 榜单类型 |
| `page` | int | 页码 |
| `page_size` | int | 页大小 |
| `is_trend` | int | 1 Unknown |

#### `live_medal_level_rank` 获取直播勋章等级排行榜

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.live.bilibili.com/xlive/general-interface/v1/Rank/GetTotalMedalLevelRank` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `page` | int | 页码 |
| `page_size` | int | 页大小 |

#### `playlet_rank_phase` 获取短剧榜期数

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/pgc/activity/rank/ugc/playlet/queryList` | 免登录 |

#### `playlet_rank_info` 获取短剧榜信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/pgc/activity/rank/ugc/playlet/queryInfo` | 免登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `phaseID` | int | 期数 |

### 操作 `operate`

#### `subscribe` 订阅全站音乐榜

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/copyright-music-publicity/toplist/subscribe/update` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `list_id` | int | 1 |
| `state` | int | 1 订阅 2 取消 |


---

## 首页

### 查询 `info`

#### `top_photo` 获取主页最上方的图像

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/web-show/page/header` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `resource_id` | int | 142 |

#### `links` 获取主页左面的链接列表

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/web-show/res/locs` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `pf` | int | 0 |
| `ids` | int | 4694 |

#### `popularize` 获取推广的项目

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/web-show/res/locs` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `pf` | int | 0 |
| `ids` | int | 34 |

#### `videos` 获取主页推荐的视频

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/web-interface/wbi/index/top/feed/rcmd` | 免登录 + WBI 签名 |

### 列表 `list`

#### `folder` 获取主页右上角视频相关列表（收藏夹+稍后再看）

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/v3/fav/folder/list4navigate` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `web_location` | — | 333.1007 |

#### `resource` 获取主页右上角视频相关列表（收藏夹+稍后再看）内容

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/v3/fav/resource/list4navigate` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `web_location` | — | 333.1007 |
| `platform` | — | web |
| `media_id` | int | 收藏夹 id |


---

