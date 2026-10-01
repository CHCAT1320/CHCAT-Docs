# 活动 / 游戏 / 装扮 / 投票

活动、游戏、装扮、投票、话题等运营侧接口。

> 来源声明：本页接口资料整理自开源项目 `bilibili-api-python`（GPL-3.0）随包提供的 API 数据文件，仅作来源标注。使用前请以哔哩哔哩实际返回为准，并遵守其服务条款。

## 活动

### 查询 `info`

#### `list` 获取活动列表

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/activity/page/list` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `plat` | str | 1,3 |
| `mold` | int | 0 |
| `http` | int | 3 |
| `pn` | int | 页数 |
| `ps` | int | 每页大小 |


---

## 游戏

### 查询 `info`

#### `info` 获取游戏简介

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://line1-h5-pc-api.biligame.com/game/detail/gameinfo` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `game_base_id` | — | 游戏 id |

#### `UP` 获取游戏官方账户

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://line1-h5-pc-api.biligame.com/game/detail/account` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `game_base_id` | — | 游戏 id |

#### `detail` 获取游戏详情

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://line1-h5-pc-api.biligame.com/game/detail/content` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `game_base_id` | — | 游戏 id |

#### `wiki` 获取游戏教程

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://line1-h5-pc-api.biligame.com/game/detail/wiki` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `game_base_id` | — | 游戏 id |

#### `videos` 获取游戏视频

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://line1-h5-pc-api.biligame.com/game/detail/get_video_v2` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `game_base_id` | — | 游戏 id |

#### `score` 获取游戏分数

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://line1-h5-pc-api.biligame.com/game/comment/summary` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `game_base_id` | — | 游戏 id |

#### `comment` 获取游戏的评论

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://line1-h5-pc-api.biligame.com/game/comment/recommend` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `game_base_id` | — | 游戏 id |

#### `rank` 游戏榜单

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://le3-api.game.bilibili.com/pc/game/ranking/page_ranking_list` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `ranking_type` | int | 1 热度榜 5 预约榜 6 新游榜 2 口碑榜 7 B指榜 11 端游榜  |
| `page_num` | int | page num |
| `page_size` | int | page size |

#### `start_test`

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://le3-api.game.bilibili.com/pc/game/ranking/page_start_test_list` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `x-fix-page-num` | const int | 1 |
| `page_num` | int | page num |
| `page_size` | int | page size |


---

## 装扮

### `common`

#### `search` 搜索装扮/收藏集

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/garb/v2/mall/home/search` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `key_word` | str | 关键词 |
| `pn` | int | 当前页数 |
| `ps` | int | 每页返回数据的最大值 |
| `csrf` | str | bili_jct |

#### `list` 获取收藏集/装扮列表

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/garb/v2/mall/partition/item/list` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `group_id` | int | 0 装扮 22 头像挂件 5 动态卡片 |
| `part_id` | int | 6 装扮 1 头像挂件 2 动态卡片 |
| `sort_type` | int | 0 默认排序 1 按销量排序 2 按最新上架时间排序 |
| `pn` | int | 当前页数 |
| `ps` | int | 每页返回数据的最大值 |
| `csrf` | str | bili_jct |

### `dlc`

#### `basic` 获取收藏集基本信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/vas/dlc_act/act/basic` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `act_id` | int | 收藏集活动 id |
| `csrf` | str | bili_jct |

#### `detail` 获取收藏集详细

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/vas/dlc_act/lottery_home_detail` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `act_id` | int | 收藏集活动 id |
| `lottery_id` | int | 收藏集抽奖 id |
| `csrf` | str | bili_jct |

#### `list` 获取收藏集列表

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/vas/dlc_act/act/list` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `scene` | int | 1 |
| `site` | int | 类似于列表，接口将返回 [site:site + 20] |
| `csrf` | str | bili_jct |

### `garb`

#### `detail`

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/garb/v2/mall/suit/detail` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `item_id` | int | 装扮 id |
| `csrf` | str | bili_jct |


---

## 投票

### 查询 `info`

#### `vote_info` 获取投票信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.vc.bilibili.com/vote_svr/v1/vote_svr/vote_info` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `vote_id` | int | 投票 ID |

### 操作 `operate`

#### `create` 创建投票

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.vc.bilibili.com/vote_svr/v1/vote_svr/create_vote` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `info[title]` | string | 投票标题 |
| `info[desc]` | string | 投票描述 |
| `info[type]` | int | 投票类型 0:文字投票 1:图片投票 |
| `info[choice_cnt]` | int | 最多选几项 |
| `info[duration]` | int | 投票持续时间 |
| `info[options][n][desc]` | string | 选项n描述 |
| `info[options][n][img_url]` | string | 选项n图片 |

#### `update` 更新投票内容

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.vc.bilibili.com/vote_svr/v1/vote_svr/update_vote` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `info[title]` | string | 投票标题 |
| `info[desc]` | string | 投票描述 |
| `info[type]` | int | 投票类型 0:文字投票 1:图片投票 |
| `info[choice_cnt]` | int | 最多选几项 |
| `info[duration]` | int | 投票持续时间 |
| `info[options][n][desc]` | string | 选项n描述 |
| `info[options][n][img_url]` | string | 选项n图片 |
| `info[vote_id]` | int | vote_id |


---

## 话题

### 查询 `info`

#### `info` 获取话题简介

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://app.bilibili.com/x/topic/web/details/top` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `topic_id` | int | 话题 id |

#### `cards` 获取话题详情

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://app.bilibili.com/x/topic/web/details/cards` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `topic_id` | int | 话题 id |
| `page_size` | int | 数据数量 |
| `sort_by` | int | 排序方式 1推荐 2热门 3最新 |
| `source` | — | Web |
| `offset` | — | str |

#### `dynamic_page_topics` 获取动态页话题

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://app.bilibili.com/x/topic/web/dynamic/rcmd` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `page_size` | int | 数据数量 |

#### `search` 搜索话题

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://app.bilibili.com/x/topic/pub/search` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `keyword` | str | 搜索关键词 |
| `page_num` | int | 页码 |
| `page_size` | int | 数据数量 |
| `content` | — | Unknown |
| `upload_id` | — | Unknown |

### 操作 `operate`

#### `like` 设置点赞话题

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://app.bilibili.com/x/topic/like` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `topic_id` | int | 话题 id |
| `action` | str | like / cancel_like |
| `business` | str | topic |
| `up_mid` | int | 自己的 uid |

#### `add_favorite` 收藏话题

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://app.bilibili.com/x/topic/fav/sub/add` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `topic_id` | int | 话题 id |

#### `cancel_favorite` 取消收藏话题

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://app.bilibili.com/x/topic/fav/sub/cancel` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `topic_id` | int | 话题 id |


---

