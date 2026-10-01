# 番剧 / 影视 / 漫画

番剧（含影视）、课堂、漫画与综艺纪录片相关接口，覆盖详情、分集、播放地址、追番/追剧、弹幕等。

> 来源声明：本页接口资料整理自开源项目 `bilibili-api-python`（GPL-3.0）随包提供的 API 数据文件，仅作来源标注。使用前请以哔哩哔哩实际返回为准，并遵守其服务条款。

## 番剧 / 影视

### 查询 `info`

#### `timeline`

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/pgc/web/timeline` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `types` | int | 类型, 1. 番剧, 3. 影视, 4. 国创 |
| `before` | — | 几天前开始, 0~7 |
| `after` | — | 几天后结束, 0~7 |

#### `index`

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/pgc/season/index/result` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `order` | int | 排序字段 |
| `sort` | int | 排序方式 |
| `page` | int | 页数 |
| `season_type` | — | 番剧类型 |
| `pagesize` | int | 每页数量 |
| `type` | int | unknown |

#### `meta` 获取番剧信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/pgc/review/user` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `media_id` | int | 番剧的 media_id(URL 中的/mdxxxx) |

#### `episodes_list` 获取番剧剧集列表

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/pgc/web/season/section` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `season_id` | int | 番剧的 season_id |

#### `season_status` 获取番剧播放量，追番等信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/pgc/web/season/stat` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `season_id` | int | 番剧的 season_id |

#### `short_comment` 获取番剧短评

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/pgc/review/short/list` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `media_id` | int | 番剧的 media_id |
| `ps` | const int | 20 |
| `sort` | int | 排序方式 0 默认 1 按时间倒序 |
| `cursor` | int | 循环获取用，第一次调用本 API 返回中的 next 值 |

#### `long_comment` 获取番剧长评

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/pgc/review/long/list` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `media_id` | int | 番剧的 media_id |
| `ps` | const int | 20 |
| `sort` | int | 排序方式 0 默认 1 按时间倒序 |
| `cursor` | int | 循环获取用，第一次调用本 API 返回中的 next 值 |

#### `relate_video` 获取番剧长评

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/web-interface/tag/top?pn=10&ps=24&tid=8583026` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `tid` | int | 频道 ID |
| `ps` | const int | 20 |
| `sort` | int | 排序方式 0 默认 1 按时间倒序 |
| `cursor` | int | 循环获取用，第一次调用本 API 返回中的 next 值 |

#### `collective_info` 获取一个剧集的全面概括信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/pgc/view/web/simple/season` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `season_id` | int | B 站每个剧集会对应一个唯一 ID |

#### `collective_info_oversea` 获取一个剧集的全面概括信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://bangumi.bilibili.com/view/web_api/season` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `season_id` | int | B 站每个剧集会对应一个唯一 ID,适用于港澳台番剧和内陆番剧 |

#### `playurl` 视频下载的信息，下载链接需要提供 headers 伪装浏览器请求（Referer 和 User-Agent）

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/pgc/player/web/v2/playurl` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `avid` | int | av 号 |
| `cid` | int | 分 P 编号 |
| `qn` | int | 视频质量编号，最高 127 |
| `otype` | const str | json |
| `fnval` | const int | 4048 |
| `platform` | int | 平台 |

### 操作 `operate`

#### `follow_add` 追番

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/pgc/web/follow/add` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `season_id` | int | 番剧的 season_id |

#### `follow_del` 取消追番

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/pgc/web/follow/del` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `season_id` | int | 番剧的 season_id |

#### `follow_status` 追番状态

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/pgc/web/follow/status/update` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `season_id` | int | 番剧的 season_id |
| `status` | int | 1 想看 2 在看 3 已看 |


---

## 课堂

### 查询 `info`

#### `meta` 获取课程元数据。

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/pugv/view/web/season` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `season_id` | int | 季度 id，不与 bangumi 互通 |
| `ep_id` | int | 一个视频的 EPID，不与 bangumi 互通 |

#### `list` 获取全部视频

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/pugv/view/web/ep/list` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `season_id` | int | 季度 id，不与 bangumi 互通 |
| `pn` | int | 第几页,defaults to 1 |
| `ps` | int | 每一页的视频数,defaults to 50 |

#### `playurl` 获取下载链接

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/pugv/player/web/playurl` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `avid` | int | aid |
| `ep_id` | int | epid |
| `cid` | int | cid |
| `qn` | — | 127 |
| `fnval` | — | 4048 |
| `fourk` | — | 1 |


---

## 漫画

### 查询 `info`

#### `detail` 获取漫画详情信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://manga.bilibili.com/twirp/comic.v1.Comic/ComicDetail` | 免登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `comic_id` | int | 漫画 id |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `device` | str | 设备 |
| `platform` | str | 平台 |
| `nov` | int | 25 |

#### `episode_info` 获取漫画某一章节/某一话的信息。

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://manga.bilibili.com/twirp/comic.v1.Comic/GetEpisode` | 免登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `id` | int | 章节 id |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `device` | str | 设备 |
| `platform` | str | 平台 |
| `nov` | int | 25 |

#### `episode_images` 获取漫画某一章节/某一话的图片的链接。

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://manga.bilibili.com/twirp/comic.v1.Comic/GetImageIndex` | 免登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `ep_id` | int | 章节 id |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `device` | str | 设备 |
| `platform` | str | 平台 |
| `nov` | int | 25 |

#### `image_token` 获取漫画单张图片的 token

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://manga.bilibili.com/twirp/comic.v1.Comic/ImageToken` | 免登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `urls` | str | 内容如下：["图片链接"] |
| `m1` | str | 由 ECDH P-256 生成的公钥的 base64 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `device` | str | 设备 |
| `platform` | str | 平台 |
| `nov` | int | 25 |

#### `index` 获取漫画索引

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://manga.bilibili.com/twirp/comic.v1.Comic/ClassPage` | 免登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `area_id` | int | 地区 id |
| `style_id` | int | 风格 id |
| `is_finish` | int | 是否完结 |
| `order` | int | 排序方式 |
| `page_num` | int | 页码 |
| `page_size` | int | 每页数量 |
| `is_free` | int | 是否免费 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `device` | str | 设备 |
| `platform` | str | 平台 |
| `nov` | int | 25 |

#### `index_params` 获取漫画索引的参数

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://manga.bilibili.com/twirp/comic.v1.Comic/AllLabel` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `device` | str | 设备 |
| `platform` | str | 平台 |
| `nov` | int | 25 |

#### `update` 获取漫画更新推荐

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://manga.bilibili.com/twirp/comic.v1.Comic/GetDailyPush` | 免登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `date` | str | 日期，格式为 YYYY-MM-DD |
| `page_num` | int | 页码 |
| `page_size` | int | 每页数量 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `device` | str | 设备 |
| `platform` | str | 平台 |
| `nov` | int | 25 |

#### `home_recommend` 获取漫画首页推荐

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://manga.bilibili.com/twirp/comic.v1.Comic/HomeRecommend` | 免登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `seed` | str | unknown param |
| `page_num` | int | 页码 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `device` | str | 设备 |
| `platform` | str | 平台 |
| `nov` | int | 25 |

#### `followed_manga` 获取追漫列表

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://manga.bilibili.com/twirp/bookshelf.v1.Bookshelf/ListFavorite` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `page_num` | int | 页码 |
| `page_size` | int | 每页数量 |
| `order` | int | 1 追漫顺序 2 更新时间 3 最近阅读 |
| `wait_free` | int | 是否为等免 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `device` | str | 设备 |
| `platform` | str | 平台 |
| `nov` | int | 25 |

### 操作 `operate`

#### `add_favorite` 追漫

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://manga.bilibili.com/twirp/bookshelf.v1.Bookshelf/AddFavorite` | 免登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `comic_ids` | int | 漫画 id |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `device` | str | 设备 |
| `platform` | str | 平台 |
| `nov` | int | 25 |

#### `del_favorite` 取消追漫

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://manga.bilibili.com/twirp/bookshelf.v1.Bookshelf/DeleteFavorite` | 免登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `comic_ids` | int | 漫画 id |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `device` | str | 设备 |
| `platform` | str | 平台 |
| `nov` | int | 25 |


---

## 综艺 / 纪录片

### 查询 `info`

#### `get` 展出信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://show.bilibili.com/api/ticket/project/get` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `id` | — | 展出id |

#### `buyer_info` 读取用户所有购买人身份

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://show.bilibili.com/api/ticket/buyer/list` | 需登录 |

#### `token` 获取购票 token

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://show.bilibili.com/api/ticket/order/prepare` | 需登录 + 无需 CSRF |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `project_id` | — | 项目id |
| `screen_id` | — | 展出id |
| `sku_id` | — | 票id |

### 操作 `operate`

#### `order` 创建订单

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://show.bilibili.com/api/ticket/order/createV2` | 需登录 + 无需 CSRF |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `project_id` | — | 展出id |


---

