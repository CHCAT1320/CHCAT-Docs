# 专栏 / 音频 / 图集

专栏、音频、音乐、相册等 PGC/UGC 内容接口。

> 来源声明：本页接口资料整理自开源项目 `bilibili-api-python`（GPL-3.0）随包提供的 API 数据文件，仅作来源标注。使用前请以哔哩哔哩实际返回为准，并遵守其服务条款。

## 专栏

### 查询 `info`

#### `view` 专栏信息数据

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/article/viewinfo` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `id` | int | cv 号 |

#### `detail` 专栏信息数据

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/article/view` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `id` | int | cv 号 |

#### `list` 获取文集文章列表

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/article/list/web/articles` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `id` | int | id |

#### `rank` 获取全站专栏排行榜

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/article/rank/list` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `cid` | int | 取值时间. 1 一个月, 2 一周, 3 前天, 4 昨天 |

### 操作 `operate`

#### `like` 专栏点赞

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/article/like` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `id` | int | cv 号 |
| `type` | int | 1 点赞 2 取消 |

#### `add_favorite` 专栏收藏

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/article/favorites/add` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `id` | int | cv 号 |

#### `del_favorite` 专栏取消收藏

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/article/favorites/del` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `id` | int | cv 号 |

#### `coin` 专栏投币

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/web-interface/coin/add` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `aid` | int | cv 号 |
| `multiply` | int | 硬币数量，目前只能是 1 个 |
| `upid` | int | up 主的 uid |
| `avtype` | const int | 2 |


---

## 专栏分类

### 查询 `info`

#### `recommends` 获取推荐文章

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/article/recommends` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `cid` | int | 专栏分类 id |
| `sort` | int | 排序方式. 默认 0, 投稿时间 1, 点赞数 2, 评论数 3, 收藏数 4 |
| `pn` | — | 不想解释了 |
| `ps` | — | 翻译下其他的 json 文件就知道这个参数是什么意思了 |


---

## 音频

### `audio_info`

#### `audio_list`

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/mv/list?type=1&genre=&lang=&keyword=2&pn=1&ps=30` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `type` | — | 排序方式. 1 最新, 2 最火 |
| `genre` | — | 类型, 见 https://api.bilibili.com/x/mv/tag |
| `lang` | — | 语言, 见 https://api.bilibili.com/x/mv/tag |
| `keyword` | — | 关键字 |
| `pn` | int | 页码 |
| `ps` | const int | 每页项数 |

#### `homepage_recommend` 获取首页推荐

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/web-show/res/locs?pf=0&ids=3715,3721,3727,3729,3737,3739,3745,3747,3749,3751,3756` | 免登录 |

#### `info` 获取音频信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://www.bilibili.com/audio/music-service-c/web/song/info` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `sid` | int | 音频 au 号 |

#### `tag` 获取音频 tag

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://www.bilibili.com/audio/music-service-c/web/tag/song` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `sid` | int | 音频 au 号 |

#### `user` 获取用户数据（收听数，粉丝数等）

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://www.bilibili.com/audio/music-service-c/web/stat/user` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `uid` | int | 用户 UID |

#### `download_url` 获取音频文件下载链接，目前音质貌似不可控

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://www.bilibili.com/audio/music-service-c/web/url` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `sid` | int | 音频 au 号 |
| `privilege` | const int | 2 |
| `quality` | const int | 2 |

### `audio_operate`

#### `coin` 投币

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://www.bilibili.com/audio/music-service-c/web/coin/add` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `sid` | int | 歌单 ID |
| `multiply` | int | 硬币数量，最大 2 |

### `list_info`

#### `info` 获取歌单信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://www.bilibili.com/audio/music-service-c/web/menu/info` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `sid` | int | 歌单 ID |

#### `tag` 获取歌单 tag

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://www.bilibili.com/audio/music-service-c/web/tag/menu` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `sid` | int | 歌单 ID |

#### `song_list` 获取歌单歌曲列表

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://www.bilibili.com/audio/music-service-c/web/song/of-menu` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `sid` | int | 歌单 ID |
| `pn` | int | 页码 |
| `ps` | const int | 100 |

#### `hot` 获取热门歌曲列表

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://www.bilibili.com/audio/music-service-c/web/menu/hit` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `pn` | int | 页码 |
| `ps` | const int | 100 |

### `list_operate`

#### `set_favorite` 收藏歌单

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://www.bilibili.com/audio/music-service-c/web/collect/menu` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `sid` | int | 歌单 ID |

#### `del_favorite` 取消收藏歌单

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| DELETE | `https://www.bilibili.com/audio/music-service-c/web/collect/menu` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `csrf` | — | csrf |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `sid` | int | 歌单 ID |


---

## 音乐

### 查询 `info`

#### `detail` 获取音乐信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/copyright-music-publicity/bgm/detail` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `music_id` | str | 音乐 id |

#### `video_recommend_list` 获取音乐推荐视频

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/copyright-music-publicity/bgm/recommend_list` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `music_id` | str | 音乐 id |


---

## 相册 / 图集

### 查询 `info`

#### `detail` 获取相簿详细信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.vc.bilibili.com/link_draw/v1/doc/detail` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `doc_id` | int | 相簿 id |

#### `homepage_painter_albums_list` 获取首页画友相簿列表

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.vc.bilibili.com/link_draw/v2/Doc/index` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `type` | str | recommend 推荐，hot 最热，new 最新 |
| `page_num` | int | 页码 |
| `page_size` | int | 每页数据大小 |

#### `homepage_photos_albums_list`

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.vc.bilibili.com/link_draw/v2/Photo/index` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `type` | str | recommend 推荐 |
| `page_num` | int | 页码 |
| `page_size` | int | 每页数据大小 |

#### `homepage_recommended_painters` 获取首页推荐画友

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.vc.bilibili.com/link_draw/v2/Doc/drawer` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `num` | int | 请求数量 |

#### `homepage_recommended_photos_uppers` 获取首页推荐摄影 up

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.vc.bilibili.com/link_draw/v2/Photo/uper` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `num` | int | 请求数量 |

#### `painter_list` 获取画友列表

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.vc.bilibili.com/link_draw/v2/Doc/index` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `type` | str | recommend 推荐，new 最新 |
| `page_num` | int | 页码 |
| `page_size` | int | 每页数据大小 |

#### `photos_list` 获取摄影列表

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.vc.bilibili.com/link_draw/v2/Photo/index` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `type` | str | recommend 推荐 |
| `page_num` | int | 页码 |
| `page_size` | int | 每页数据大小 |

#### `user_albums` 获取指定用户的投稿的相簿

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.vc.bilibili.com/link_draw/v1/doc/others` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `biz` | int | 分区，0 全部，1 画友，2 摄影 |
| `poster_uid` | int | uid |
| `page_num` | int | 页码 |
| `page_size` | int | 每页数据大小 |


---

