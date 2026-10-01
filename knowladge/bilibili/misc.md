# 其它接口

小黑屋、一起看等其余接口。

> 来源声明：本页接口资料整理自开源项目 `bilibili-api-python`（GPL-3.0）随包提供的 API 数据文件，仅作来源标注。使用前请以哔哩哔哩实际返回为准，并遵守其服务条款。

## 小黑屋

### `black_room`

#### `info` 获取小黑屋内容

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/credit/blocked/list` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `btype` | int | 违规来源 |
| `otype` | int | 违规类型 |
| `pn` | int | 页码 |

#### `detail` 获取小黑屋详细信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/credit/blocked/info` | 免登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `id` | — | 小黑屋 id |

### `jury`

#### `detail` 获取案件仲裁详细信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/credit/v2/jury/case/info` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `case_id` | — | 案件仲裁 id |

#### `opinion` 获取案件仲裁观点

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/credit/v2/jury/case/opinion` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `case_id` | — | 案件仲裁 id |
| `pn` | int | 页码 |
| `ps` | int | 每页数量 |

#### `next_case` 获取下一个案件仲裁

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/credit/v2/jury/case/next` | 需登录 |

#### `vote` 进行仲裁投票

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/x/credit/v2/jury/vote` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `case_id` | — | 案件仲裁 id |
| `vote` | int | 投票结果 |
| `content` | string | 投票理由 |
| `insiders` | int | 是否观看此类视频 |
| `anonymous` | int | 是否匿名投票 |
| `csrf` | string | csrf |

#### `case_list` 获取案件仲裁列表

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/x/credit/v2/jury/case/list` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `pn` | int | 页码 |
| `ps` | int | 每页数量 |


---

## 一起看

### 查询 `info`

#### `info` 放映室信息

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/pgc/freya/web/room/info` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `room_id` | int | 放映室id |
| `platform` | str | web |

#### `season` 获取正在放映的影片

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| GET | `https://api.bilibili.com/pgc/view/web/freya/season` | 需登录 |

**Query / 表单参数**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `season_id` | int | 番剧的 season_id |
| `ep_id` | int | 剧集的 ep_id |
| `room_id` | int | 放映室id |
| `platform` | str | web |
| `csrf` | str | csrf |

### 操作 `operate`

#### `match` 匹配放映室

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/pgc/freya/web/room/match` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `fail_fast` | — | int |
| `season_id` | int | 番剧的 season_id |
| `from_type` | — | int |
| `season_type` | — | int |
| `platform` | str | web |
| `csrf` | str | csrf |

#### `create` 创建放映室

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/pgc/freya/web/room/create` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `season_id` | int | 番剧的 season_id |
| `episode_id` | int | 剧集id |
| `is_open` | int | 是否公开 0 不公开 1 公开 |
| `platform` | str | web |
| `csrf` | str | csrf |

#### `join` 加入放映室

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/pgc/freya/web/room/join` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `room_id` | int | 放映室id |
| `platform` | str | web |
| `csrf` | str | csrf |
| `token` | str | 分享时的 token |

#### `open` 开启放映室

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/pgc/freya/web/room/modify/info` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `room_id` | int | 放映室id |
| `is_open` | int | 是否公开 0 不公开 1 公开 |
| `platform` | str | web |
| `csrf` | str | csrf |

#### `progress` 修改放映室进度

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/pgc/freya/web/room/modify/progress` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `room_id` | int | 放映室id |
| `status` | — | 状态 1 播放中 0 暂停中 2 已结束 |
| `progress` | int | 进度 s |
| `platform` | str | web |
| `csrf` | str | csrf |

#### `kickout` 踢出放映室

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/pgc/freya/web/room/kickout` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `room_id` | int | 放映室id |
| `mid` | int | 被踢出用户uid |
| `platform` | str | web |
| `csrf` | str | csrf |

#### `season` 修改放映室播放内容

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/pgc/freya/web/room/modify/season` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `room_id` | int | 放映室id |
| `season_id` | int | 番剧的 season_id |
| `episode_id` | int | 剧集id |
| `platform` | str | web |
| `csrf` | str | csrf |

#### `send` 发送弹幕

| 方法 | 地址 | 鉴权 |
| --- | --- | --- |
| POST | `https://api.bilibili.com/pgc/freya/web/im/msg/send` | 需登录 |

**请求体（application/x-www-form-urlencoded）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `room_id` | int | 放映室id |
| `content_type` | int | 0 |
| `content` | str | 发送内容 |
| `req_id` | int | 时间戳 |
| `platform` | str | web |
| `csrf` | str | csrf |


---

