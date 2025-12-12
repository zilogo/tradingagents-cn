# EOS3-Trader API 接口规范 v1.0

## 概述

本文档详细描述了 EOS3-Trader 系统的 RESTful API 接口规范，包括认证、股票数据、分析任务、系统配置等模块。

**基础路径**: `/api`
**协议**: HTTPS (生产环境)
**数据格式**: JSON
**字符编码**: UTF-8

---

## 目录

1. [统一响应格式](#1-统一响应格式)
2. [认证模块](#2-认证模块-apiauth)
3. [股票数据模块](#3-股票数据模块-apistocks)
4. [分析任务模块](#4-分析任务模块-apianalysis)
5. [自选股模块](#5-自选股模块-apifavorites)
6. [配置管理模块](#6-配置管理模块-apiconfig)
7. [系统管理模块](#7-系统管理模块-apisystem)
8. [实时数据模块](#8-实时数据模块)
9. [报告导出模块](#9-报告导出模块-apireports)
10. [错误码规范](#10-错误码规范)

---

## 1. 统一响应格式

所有 API 响应均采用统一的 JSON 格式：

```json
{
  "success": true,
  "data": {},
  "message": "操作成功",
  "timestamp": "2025-12-11T10:30:00Z"
}
```

**字段说明**:
- `success`: 布尔值，表示请求是否成功
- `data`: 响应数据对象
- `message`: 响应消息描述
- `timestamp`: 响应时间戳 (可选)

**错误响应格式**:
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "错误描述",
    "request_id": "trace-xxx"
  }
}
```

---

## 2. 认证模块 `/api/auth`

### 2.1 用户登录

**POST** `/api/auth/login`

**请求体**:
```json
{
  "username": "string",
  "password": "string"
}
```

**响应**:
```json
{
  "success": true,
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIs...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
    "expires_in": 3600,
    "user": {
      "id": "user_id",
      "username": "admin",
      "email": "admin@example.com",
      "name": "admin",
      "is_admin": true
    }
  },
  "message": "登录成功"
}
```

### 2.2 刷新令牌

**POST** `/api/auth/refresh`

**请求体**:
```json
{
  "refresh_token": "string"
}
```

**响应**:
```json
{
  "success": true,
  "data": {
    "access_token": "new_token",
    "refresh_token": "new_refresh_token",
    "expires_in": 3600
  },
  "message": "Token刷新成功"
}
```

### 2.3 用户登出

**POST** `/api/auth/logout`

**请求头**: `Authorization: Bearer <token>`

**响应**:
```json
{
  "success": true,
  "data": {},
  "message": "登出成功"
}
```

### 2.4 获取当前用户信息

**GET** `/api/auth/me`

**请求头**: `Authorization: Bearer <token>`

**响应**:
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "username": "admin",
    "email": "admin@example.com",
    "name": "admin",
    "is_admin": true,
    "roles": ["admin"],
    "preferences": {
      "language": "zh-CN",
      "theme": "light"
    }
  },
  "message": "获取用户信息成功"
}
```

### 2.5 更新用户信息

**PUT** `/api/auth/me`

**请求头**: `Authorization: Bearer <token>`

**请求体**:
```json
{
  "email": "new_email@example.com",
  "preferences": {
    "language": "en",
    "theme": "dark"
  }
}
```

### 2.6 修改密码

**POST** `/api/auth/change-password`

**请求头**: `Authorization: Bearer <token>`

**请求体**:
```json
{
  "old_password": "string",
  "new_password": "string"
}
```

### 2.7 创建用户 (管理员)

**POST** `/api/auth/create-user`

**请求头**: `Authorization: Bearer <admin_token>`

**请求体**:
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "is_admin": false
}
```

### 2.8 获取用户列表 (管理员)

**GET** `/api/auth/users`

**查询参数**:
- `skip`: 跳过数量 (默认 0)
- `limit`: 返回数量 (默认 100)

---

## 3. 股票数据模块 `/api/stocks`

### 3.1 获取股票实时行情

**GET** `/api/stocks/{code}/quote`

**路径参数**:
- `code`: 股票代码 (自动识别市场)
  - 6位数字 → A股 (如 000001)
  - 4-5位数字或 .HK 后缀 → 港股 (如 00700)
  - 纯字母 → 美股 (如 AAPL)

**查询参数**:
- `force_refresh`: 是否强制刷新 (默认 false)

**响应**:
```json
{
  "success": true,
  "data": {
    "code": "000001",
    "name": "平安银行",
    "market": "主板",
    "price": 12.50,
    "change_percent": 1.25,
    "amount": 1234567890,
    "volume": 98765432,
    "open": 12.30,
    "high": 12.80,
    "low": 12.20,
    "prev_close": 12.35,
    "turnover_rate": 1.23,
    "amplitude": 4.86,
    "trade_date": "2025-12-11",
    "updated_at": "2025-12-11T10:30:00Z"
  },
  "message": "ok"
}
```

### 3.2 获取股票基本面数据

**GET** `/api/stocks/{code}/fundamentals`

**查询参数**:
- `source`: 数据源 (tushare/akshare/baostock/multi_source)
- `force_refresh`: 是否强制刷新 (默认 false)

**响应**:
```json
{
  "success": true,
  "data": {
    "code": "000001",
    "name": "平安银行",
    "industry": "银行",
    "market": "主板",
    "sector": "主板",
    "pe": 5.23,
    "pb": 0.56,
    "pe_ttm": 5.18,
    "pb_mrq": 0.55,
    "ps": 1.23,
    "ps_ttm": 1.20,
    "pe_source": "realtime",
    "pe_is_realtime": true,
    "pe_updated_at": "2025-12-11T10:30:00Z",
    "roe": 12.5,
    "debt_ratio": 92.3,
    "total_mv": 2500.00,
    "circ_mv": 2100.00,
    "mv_is_realtime": true,
    "turnover_rate": 1.23,
    "updated_at": "2025-12-11T10:30:00Z"
  },
  "message": "ok"
}
```

### 3.3 获取K线数据

**GET** `/api/stocks/{code}/kline`

**查询参数**:
- `period`: 周期 (day/week/month/5m/15m/30m/60m，默认 day)
- `limit`: 数据条数 (默认 120)
- `adj`: 复权类型 (none/qfq/hfq，默认 none)
- `force_refresh`: 是否强制刷新 (默认 false)

**响应**:
```json
{
  "success": true,
  "data": {
    "code": "000001",
    "period": "day",
    "limit": 120,
    "adj": "none",
    "source": "mongodb",
    "items": [
      {
        "time": "2025-12-10",
        "open": 12.30,
        "high": 12.80,
        "low": 12.20,
        "close": 12.50,
        "volume": 98765432,
        "amount": 1234567890
      }
    ]
  },
  "message": "ok"
}
```

### 3.4 获取股票新闻

**GET** `/api/stocks/{code}/news`

**查询参数**:
- `days`: 查询天数 (默认 30)
- `limit`: 返回条数 (默认 50)
- `include_announcements`: 是否包含公告 (默认 true)

**响应**:
```json
{
  "success": true,
  "data": {
    "code": "000001",
    "days": 30,
    "limit": 50,
    "source": "database",
    "items": [
      {
        "title": "新闻标题",
        "source": "新浪财经",
        "time": "2025-12-11T10:00:00Z",
        "url": "https://...",
        "type": "news",
        "content": "新闻内容...",
        "summary": "新闻摘要..."
      }
    ]
  },
  "message": "ok"
}
```

---

## 4. 分析任务模块 `/api/analysis`

### 4.1 提交单股分析任务

**POST** `/api/analysis/single`

**请求头**: `Authorization: Bearer <token>`

**请求体**:
```json
{
  "symbol": "000001",
  "stock_code": "000001",
  "parameters": {
    "analysts": ["market", "fundamentals", "news", "sentiment"],
    "research_depth": "standard",
    "market_type": "china_a"
  }
}
```

**响应**:
```json
{
  "success": true,
  "data": {
    "task_id": "task_uuid",
    "symbol": "000001",
    "status": "pending",
    "created_at": "2025-12-11T10:30:00Z"
  },
  "message": "分析任务已在后台启动"
}
```

### 4.2 提交批量分析任务

**POST** `/api/analysis/batch`

**请求头**: `Authorization: Bearer <token>`

**请求体**:
```json
{
  "symbols": ["000001", "000002", "600000"],
  "stock_codes": ["000001", "000002", "600000"],
  "title": "批量分析",
  "description": "测试批量分析",
  "parameters": {
    "analysts": ["market", "fundamentals"],
    "research_depth": "quick"
  }
}
```

**响应**:
```json
{
  "success": true,
  "data": {
    "batch_id": "batch_uuid",
    "total_tasks": 3,
    "task_ids": ["task_1", "task_2", "task_3"],
    "mapping": [
      {"symbol": "000001", "task_id": "task_1"},
      {"symbol": "000002", "task_id": "task_2"},
      {"symbol": "600000", "task_id": "task_3"}
    ],
    "status": "submitted"
  },
  "message": "批量分析任务已提交，共3个股票，正在并发执行"
}
```

### 4.3 获取任务状态

**GET** `/api/analysis/tasks/{task_id}/status`

**请求头**: `Authorization: Bearer <token>`

**响应**:
```json
{
  "success": true,
  "data": {
    "task_id": "task_uuid",
    "status": "processing",
    "progress": 45,
    "message": "正在进行基本面分析...",
    "current_step": "fundamentals",
    "start_time": "2025-12-11T10:30:00Z",
    "elapsed_time": 30.5,
    "remaining_time": 35.0,
    "estimated_total_time": 65.5,
    "stock_code": "000001",
    "stock_symbol": "000001"
  },
  "message": "任务状态获取成功"
}
```

### 4.4 获取任务结果

**GET** `/api/analysis/tasks/{task_id}/result`

**请求头**: `Authorization: Bearer <token>`

**响应**:
```json
{
  "success": true,
  "data": {
    "analysis_id": "analysis_uuid",
    "stock_symbol": "000001",
    "stock_code": "000001",
    "analysis_date": "2025-12-11",
    "summary": "分析摘要...",
    "recommendation": "投资建议...",
    "confidence_score": 0.75,
    "risk_level": "中等",
    "key_points": ["要点1", "要点2", "要点3"],
    "execution_time": 65.5,
    "tokens_used": 12500,
    "analysts": ["market", "fundamentals", "news", "sentiment"],
    "research_depth": "standard",
    "decision": {
      "action": "买入",
      "target_price": 15.00,
      "confidence": 0.75,
      "risk_score": 0.4,
      "reasoning": "投资理由..."
    },
    "reports": {
      "market_report": "市场分析报告...",
      "fundamentals_report": "基本面分析报告...",
      "news_report": "新闻分析报告...",
      "sentiment_report": "情绪分析报告...",
      "final_trade_decision": "最终交易决策..."
    }
  },
  "message": "分析结果获取成功"
}
```

### 4.5 获取用户任务列表

**GET** `/api/analysis/tasks`

**请求头**: `Authorization: Bearer <token>`

**查询参数**:
- `status`: 任务状态过滤 (pending/processing/completed/failed)
- `limit`: 返回数量 (默认 20，最大 100)
- `offset`: 偏移量 (默认 0)

### 4.6 获取用户分析历史

**GET** `/api/analysis/user/history`

**请求头**: `Authorization: Bearer <token>`

**查询参数**:
- `status`: 任务状态过滤
- `start_date`: 开始日期 (YYYY-MM-DD)
- `end_date`: 结束日期 (YYYY-MM-DD)
- `symbol`: 股票代码
- `market_type`: 市场类型
- `page`: 页码 (默认 1)
- `page_size`: 每页大小 (默认 20)

### 4.7 取消任务

**POST** `/api/analysis/tasks/{task_id}/cancel`

**请求头**: `Authorization: Bearer <token>`

### 4.8 删除任务

**DELETE** `/api/analysis/tasks/{task_id}`

**请求头**: `Authorization: Bearer <token>`

---

## 5. 自选股模块 `/api/favorites`

### 5.1 获取自选股列表

**GET** `/api/favorites`

**请求头**: `Authorization: Bearer <token>`

**查询参数**:
- `group`: 分组名称 (可选)
- `market`: 市场类型 (可选)

**响应**:
```json
{
  "success": true,
  "data": {
    "favorites": [
      {
        "id": "fav_id",
        "symbol": "000001",
        "name": "平安银行",
        "market": "china_a",
        "group": "默认分组",
        "notes": "备注信息",
        "added_at": "2025-12-01T10:00:00Z"
      }
    ],
    "total": 10,
    "groups": ["默认分组", "银行股", "科技股"]
  },
  "message": "获取成功"
}
```

### 5.2 添加自选股

**POST** `/api/favorites`

**请求头**: `Authorization: Bearer <token>`

**请求体**:
```json
{
  "symbol": "000001",
  "group": "默认分组",
  "notes": "备注信息"
}
```

### 5.3 移除自选股

**DELETE** `/api/favorites/{symbol}`

**请求头**: `Authorization: Bearer <token>`

### 5.4 批量操作自选股

**POST** `/api/favorites/batch`

**请求头**: `Authorization: Bearer <token>`

**请求体**:
```json
{
  "action": "add",
  "symbols": ["000001", "000002", "600000"],
  "group": "新分组"
}
```

---

## 6. 配置管理模块 `/api/config`

### 6.1 获取系统配置

**GET** `/api/config`

**请求头**: `Authorization: Bearer <token>`

**响应**:
```json
{
  "success": true,
  "data": {
    "llm_configs": [
      {
        "provider": "openai",
        "model_name": "gpt-4",
        "enabled": true,
        "is_default": true
      }
    ],
    "data_source_configs": [
      {
        "type": "tushare",
        "name": "Tushare",
        "enabled": true,
        "priority": 1
      }
    ],
    "analysis_config": {
      "default_analysts": ["market", "fundamentals", "news"],
      "default_research_depth": "standard",
      "max_concurrent_tasks": 5
    }
  },
  "message": "获取成功"
}
```

### 6.2 更新系统配置

**PUT** `/api/config`

**请求头**: `Authorization: Bearer <admin_token>`

**请求体**:
```json
{
  "llm_configs": [...],
  "data_source_configs": [...],
  "analysis_config": {...}
}
```

### 6.3 获取 LLM 配置

**GET** `/api/config/llm`

### 6.4 更新 LLM 配置

**PUT** `/api/config/llm`

### 6.5 测试 LLM 连接

**POST** `/api/config/llm/test`

**请求体**:
```json
{
  "provider": "openai",
  "model_name": "gpt-4",
  "api_key": "sk-xxx",
  "base_url": "https://api.openai.com/v1"
}
```

### 6.6 获取数据源配置

**GET** `/api/config/data-sources`

### 6.7 更新数据源配置

**PUT** `/api/config/data-sources`

---

## 7. 系统管理模块 `/api/system`

### 7.1 数据库状态

**GET** `/api/system/database/status`

**请求头**: `Authorization: Bearer <admin_token>`

**响应**:
```json
{
  "success": true,
  "data": {
    "mongodb": {
      "connected": true,
      "host": "localhost:27017",
      "database": "tradingagents"
    },
    "redis": {
      "connected": true,
      "host": "localhost:6379"
    },
    "collections": {
      "stock_basic_info": 5000,
      "market_quotes": 5000,
      "analysis_reports": 150
    }
  },
  "message": "获取成功"
}
```

### 7.2 操作日志

**GET** `/api/system/operation-logs`

**请求头**: `Authorization: Bearer <admin_token>`

**查询参数**:
- `action_type`: 操作类型
- `user_id`: 用户ID
- `start_date`: 开始日期
- `end_date`: 结束日期
- `page`: 页码
- `page_size`: 每页大小

### 7.3 系统日志

**GET** `/api/system/logs`

**请求头**: `Authorization: Bearer <admin_token>`

**查询参数**:
- `level`: 日志级别 (DEBUG/INFO/WARNING/ERROR)
- `lines`: 返回行数 (默认 100)

### 7.4 缓存管理

**GET** `/api/cache/stats`

**DELETE** `/api/cache/clear`

**查询参数**:
- `pattern`: 缓存键模式 (默认 *)

---

## 8. 实时数据模块

### 8.1 WebSocket 任务进度

**WebSocket** `/api/analysis/ws/task/{task_id}`

**消息格式**:
```json
{
  "type": "progress_update",
  "task_id": "task_uuid",
  "status": "processing",
  "progress": 45,
  "message": "正在进行基本面分析...",
  "current_step": "fundamentals"
}
```

### 8.2 WebSocket 通知

**WebSocket** `/api/ws/notifications`

**消息格式**:
```json
{
  "type": "notification",
  "notification_type": "analysis_complete",
  "data": {
    "task_id": "task_uuid",
    "symbol": "000001",
    "status": "completed"
  },
  "timestamp": "2025-12-11T10:30:00Z"
}
```

### 8.3 SSE 流式更新

**GET** `/api/stream/task/{task_id}`

**响应类型**: `text/event-stream`

---

## 9. 报告导出模块 `/api/reports`

### 9.1 导出分析报告

**GET** `/api/reports/analysis/{analysis_id}/export`

**查询参数**:
- `format`: 导出格式 (pdf/docx/html/markdown)
- `include_charts`: 是否包含图表 (默认 true)

### 9.2 批量导出

**POST** `/api/reports/batch-export`

**请求体**:
```json
{
  "analysis_ids": ["id1", "id2", "id3"],
  "format": "pdf",
  "merge": true
}
```

---

## 10. 错误码规范

| 错误码 | HTTP状态码 | 描述 |
|--------|-----------|------|
| AUTH_001 | 401 | 未提供认证令牌 |
| AUTH_002 | 401 | 认证令牌无效或已过期 |
| AUTH_003 | 403 | 权限不足 |
| DATA_001 | 404 | 股票代码不存在 |
| DATA_002 | 500 | 数据源获取失败 |
| DATA_003 | 504 | 数据源请求超时 |
| TASK_001 | 404 | 任务不存在 |
| TASK_002 | 400 | 任务参数错误 |
| TASK_003 | 429 | 任务队列已满 |
| CONFIG_001 | 400 | 配置参数无效 |
| CONFIG_002 | 500 | 配置保存失败 |
| SYSTEM_001 | 500 | 系统内部错误 |
| SYSTEM_002 | 503 | 服务暂时不可用 |

---

## 附录

### A. 支持的分析师类型

| 分析师 | 代码 | 描述 |
|--------|------|------|
| 市场分析师 | market | 技术面分析、趋势判断 |
| 基本面分析师 | fundamentals | 财务数据、估值分析 |
| 新闻分析师 | news | 新闻事件、公告解读 |
| 情绪分析师 | sentiment | 市场情绪、社交媒体分析 |

### B. 研究深度

| 深度 | 代码 | 预计时间 | 描述 |
|------|------|---------|------|
| 快速 | quick | 30秒 | 仅基础分析 |
| 标准 | standard | 2分钟 | 完整分析流程 |
| 深度 | deep | 5分钟 | 包含辩论和深度研究 |

### C. 支持的市场

| 市场 | 代码 | 股票代码格式 |
|------|------|-------------|
| A股 | china_a | 6位数字 (000001) |
| 港股 | hk | 4-5位数字或 .HK (00700) |
| 美股 | us | 字母代码 (AAPL) |

---

*文档版本: 1.0*
*最后更新: 2025-12-11*
*维护者: EOS3-Trader Team*
