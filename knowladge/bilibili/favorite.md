# 收藏夹

收藏夹的创建、查询、内容管理与收藏操作。写操作需登录并携带 CSRF。

> 来源声明：本页接口资料整理自开源项目 `bilibili-api-python`（GPL-3.0）随包提供的 API 数据文件，仅作来源标注。使用前请以哔哩哔哩实际返回为准，并遵守其服务条款。

## 收藏夹接口

### 查询 `info`

#### `list_list` 获取收藏夹列表。提供 type 和 rid 时会同时提供对该资源收藏情况。

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/v3/fav/folder/created/list-all` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `up_mid` | int | 用户 UID |
| `type` | int? | 资源类型，2 视频。 |
| `rid` | int? | 资源 ID |
| `web_location` | — | 333.1387 |

#### `info` 获取收藏夹信息。

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/v3/fav/folder/info` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `media_id` | int | 收藏夹 ID |

#### `list_content` 获取收藏夹列表内容。

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/v3/fav/resource/list` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `media_id` | int | 收藏夹 ID |
| `pn` | int | 页码。 |
| `ps` | int | 每页数量，固定 20。 |
| `keyword` | str? | 关键词搜索。 |
| `order` | str | 排序方式。mtime 最近收藏，view 最多播放，pubtime 最新投稿。 |
| `type` | int | 收藏夹类型。目前固定 0。 |
| `tid` | int | 分区 ID。0 为全部分区。 |
| `platform` | — | web |
| `web_location` | — | 333.1387 |

#### `list_content_id_list` 获取收藏夹所有内容的 ID。

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/v3/fav/resource/ids` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `media_id` | int | 收藏夹 ID |
| `platform` | — | web |

#### `list_topics` 获取自己的话题收藏夹内容。

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://app.bilibili.com/x/topic/web/fav/list` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `page_num` | int | 页码。 |
| `page_size` | int | 每页数量，固定 16。 |

#### `list_articles` 获取自己的专栏收藏夹内容。

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/article/favorites/list/all` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `pn` | int | 页码。 |
| `ps` | int | 每页数量，固定 16。 |

#### `list_courses` 获取自己的课程收藏夹内容。

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/pugv/app/web/favorite/page` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `pn` | int | 页码。 |
| `ps` | int | 每页数量，固定 10。 |
| `mid` | int | 自己的 UID。 |

#### `list_notes` 获取自己的笔记收藏夹内容。

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/note/list` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `pn` | int | 页码。 |
| `ps` | int | 每页数量，固定 10。 |

#### `collected` 获取自己的收藏/订阅的收藏夹/合集

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/v3/fav/folder/collected/list` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `pn` | int | 页码。 |
| `ps` | int | 每页数量 |
| `up_mid` | int | 用户 UID |

### 操作 `operate`

#### `new` 新建收藏夹。

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/v3/fav/folder/add` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `title` | str | 收藏夹标题。 |
| `intro` | str | 收藏夹简介。 |
| `privacy` | int bool | 是否为私有。 |
| `cover` | str | 暂时为空 |

#### `modify` 修改收藏夹信息。

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/v3/fav/folder/edit` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `title` | str | 收藏夹标题。 |
| `intro` | str | 收藏夹简介。 |
| `privacy` | int bool | 是否为私有。 |
| `cover` | str | 暂时为空 |
| `media_id` | int | 收藏夹 ID。 |

#### `delete` 删除收藏夹。

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/v3/fav/folder/del` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `media_ids` | commaSeparatedList[int] | 收藏夹 ID。 |

#### `content_copy` 复制资源到另一收藏夹。

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/v3/fav/resource/copy` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `src_media_id` | int | 源收藏夹 ID。 |
| `tar_media_id` | int | 目标收藏夹 ID。 |
| `mid` | int | 自己的 UID。 |
| `resources` | commaSeparatedList[str] | 要操作的资源，格式：'资源 ID:资源类型'。视频类型为 2。如：'83051349:2' |

#### `content_move` 移动资源到另一收藏夹。

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/v3/fav/resource/move` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `src_media_id` | int | 源收藏夹 ID。 |
| `tar_media_id` | int | 目标收藏夹 ID。 |
| `resources` | commaSeparatedList[str] | 要操作的资源，格式：'资源 ID:资源类型'。视频类型为 2。如：'83051349:2' |

#### `content_rm` 删除收藏夹中的资源。

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/v3/fav/resource/batch-del` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `media_id` | int | 收藏夹 ID。 |
| `resources` | commaSeparatedList[str] | 要操作的资源，格式：'资源 ID:资源类型'。视频类型为 2。如：'83051349:2' |

#### `content_clean` 清理失效内容。

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/v3/fav/resource/clean` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `media_id` | int | 收藏夹 ID。 |


---

