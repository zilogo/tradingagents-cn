# EOS3-Trader 数据模型规范 v1.0

## 概述

本文档定义了 EOS3-Trader 系统的核心数据模型，包括数据库集合设计、字段规范和索引策略。

---

## 1. MongoDB 集合设计

### 1.1 用户相关

#### users (用户表)

```json
{
  "_id": "ObjectId",
  "username": "string",
  "email": "string",
  "password_hash": "string",
  "is_admin": "boolean",
  "is_active": "boolean",
  "preferences": {
    "language": "zh-CN",
    "theme": "light",
    "default_market": "china_a"
  },
  "created_at": "datetime",
  "updated_at": "datetime",
  "last_login": "datetime"
}
```

**索引**:
- `username`: 唯一索引
- `email`: 唯一索引

#### favorites (自选股)

```json
{
  "_id": "ObjectId",
  "user_id": "string",
  "symbol": "string",
  "name": "string",
  "market": "string",
  "group": "string",
  "notes": "string",
  "added_at": "datetime",
  "updated_at": "datetime"
}
```

**索引**:
- `(user_id, symbol)`: 唯一复合索引
- `user_id`: 普通索引

---

### 1.2 股票数据

#### stock_basic_info (股票基础信息)

```json
{
  "_id": "ObjectId",
  "code": "string",
  "name": "string",
  "market": "string",
  "industry": "string",
  "list_date": "string",
  "delist_date": "string",
  "is_hs": "string",
  "source": "string",
  "pe": "number",
  "pb": "number",
  "pe_ttm": "number",
  "total_mv": "number",
  "circ_mv": "number",
  "turnover_rate": "number",
  "trade_date": "string",
  "updated_at": "datetime"
}
```

**索引**:
- `code`: 唯一索引
- `(code, source)`: 复合索引
- `industry`: 普通索引
- `market`: 普通索引

#### market_quotes (实时行情)

```json
{
  "_id": "ObjectId",
  "code": "string",
  "name": "string",
  "open": "number",
  "high": "number",
  "low": "number",
  "close": "number",
  "pre_close": "number",
  "volume": "number",
  "amount": "number",
  "pct_chg": "number",
  "turnover_rate": "number",
  "trade_date": "string",
  "trade_time": "string",
  "source": "string",
  "updated_at": "datetime"
}
```

**索引**:
- `code`: 唯一索引
- `trade_date`: 普通索引
- `updated_at`: TTL索引 (可选)

#### stock_historical_data (历史K线)

```json
{
  "_id": "ObjectId",
  "code": "string",
  "trade_date": "string",
  "period": "string",
  "open": "number",
  "high": "number",
  "low": "number",
  "close": "number",
  "volume": "number",
  "amount": "number",
  "adj_factor": "number",
  "source": "string",
  "updated_at": "datetime"
}
```

**索引**:
- `(code, trade_date, period)`: 唯一复合索引
- `code`: 普通索引
- `trade_date`: 普通索引

#### stock_financial_data (财务数据)

```json
{
  "_id": "ObjectId",
  "symbol": "string",
  "code": "string",
  "report_period": "string",
  "report_type": "string",
  "data_source": "string",
  "revenue": "number",
  "revenue_ttm": "number",
  "net_profit": "number",
  "net_profit_ttm": "number",
  "total_assets": "number",
  "total_liabilities": "number",
  "shareholders_equity": "number",
  "financial_indicators": {
    "roe": "number",
    "roa": "number",
    "debt_to_assets": "number",
    "gross_margin": "number",
    "net_margin": "number",
    "eps": "number",
    "bps": "number"
  },
  "updated_at": "datetime"
}
```

**索引**:
- `(symbol, report_period, data_source)`: 唯一复合索引
- `symbol`: 普通索引
- `report_period`: 普通索引

#### stock_news (股票新闻)

```json
{
  "_id": "ObjectId",
  "symbol": "string",
  "title": "string",
  "content": "string",
  "summary": "string",
  "source": "string",
  "url": "string",
  "publish_time": "datetime",
  "sentiment_score": "number",
  "keywords": ["string"],
  "created_at": "datetime"
}
```

**索引**:
- `(symbol, title, publish_time)`: 唯一复合索引 (去重)
- `symbol`: 普通索引
- `publish_time`: 普通索引

---

### 1.3 分析任务

#### analysis_tasks (分析任务)

```json
{
  "_id": "ObjectId",
  "task_id": "string",
  "user_id": "string",
  "symbol": "string",
  "stock_code": "string",
  "status": "string",
  "progress": "number",
  "current_step": "string",
  "parameters": {
    "analysts": ["string"],
    "research_depth": "string",
    "market_type": "string"
  },
  "result": {
    "analysis_id": "string",
    "summary": "string",
    "recommendation": "string",
    "confidence_score": "number",
    "decision": {}
  },
  "last_error": "string",
  "created_at": "datetime",
  "started_at": "datetime",
  "completed_at": "datetime",
  "updated_at": "datetime"
}
```

**任务状态枚举**:
- `pending`: 待处理
- `processing`: 处理中
- `completed`: 已完成
- `failed`: 失败
- `cancelled`: 已取消

**索引**:
- `task_id`: 唯一索引
- `user_id`: 普通索引
- `status`: 普通索引
- `created_at`: 普通索引

#### analysis_reports (分析报告)

```json
{
  "_id": "ObjectId",
  "analysis_id": "string",
  "task_id": "string",
  "user_id": "string",
  "stock_symbol": "string",
  "stock_name": "string",
  "analysis_date": "string",
  "summary": "string",
  "recommendation": "string",
  "confidence_score": "number",
  "risk_level": "string",
  "key_points": ["string"],
  "decision": {
    "action": "string",
    "target_price": "number",
    "confidence": "number",
    "risk_score": "number",
    "reasoning": "string"
  },
  "reports": {
    "market_report": "string",
    "fundamentals_report": "string",
    "news_report": "string",
    "sentiment_report": "string",
    "investment_plan": "string",
    "final_trade_decision": "string"
  },
  "state": {},
  "analysts": ["string"],
  "research_depth": "string",
  "execution_time": "number",
  "tokens_used": "number",
  "status": "string",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

**索引**:
- `analysis_id`: 唯一索引
- `task_id`: 普通索引
- `user_id`: 普通索引
- `stock_symbol`: 普通索引
- `analysis_date`: 普通索引

---

### 1.4 系统配置

#### system_config (系统配置)

```json
{
  "_id": "ObjectId",
  "config_key": "system_config",
  "llm_configs": [
    {
      "id": "string",
      "provider": "string",
      "model_name": "string",
      "api_key": "string (encrypted)",
      "base_url": "string",
      "enabled": "boolean",
      "is_default": "boolean",
      "priority": "number",
      "max_tokens": "number",
      "temperature": "number"
    }
  ],
  "data_source_configs": [
    {
      "id": "string",
      "type": "string",
      "name": "string",
      "api_key": "string (encrypted)",
      "enabled": "boolean",
      "priority": "number"
    }
  ],
  "analysis_config": {
    "default_analysts": ["string"],
    "default_research_depth": "string",
    "max_concurrent_tasks": "number",
    "task_timeout_seconds": "number"
  },
  "updated_at": "datetime",
  "updated_by": "string"
}
```

#### operation_logs (操作日志)

```json
{
  "_id": "ObjectId",
  "user_id": "string",
  "username": "string",
  "action_type": "string",
  "action": "string",
  "resource_type": "string",
  "resource_id": "string",
  "details": {},
  "success": "boolean",
  "error_message": "string",
  "duration_ms": "number",
  "ip_address": "string",
  "user_agent": "string",
  "request_id": "string",
  "created_at": "datetime"
}
```

**操作类型枚举**:
- `USER_LOGIN`: 用户登录
- `USER_LOGOUT`: 用户登出
- `ANALYSIS_SUBMIT`: 提交分析
- `ANALYSIS_CANCEL`: 取消分析
- `CONFIG_UPDATE`: 配置更新
- `FAVORITE_ADD`: 添加自选
- `FAVORITE_REMOVE`: 移除自选

**索引**:
- `user_id`: 普通索引
- `action_type`: 普通索引
- `created_at`: 普通索引 (建议TTL)

---

## 2. Redis 数据结构

### 2.1 缓存键设计

| 键模式 | 类型 | 说明 | TTL |
|--------|------|------|-----|
| `quote:{code}` | Hash | 实时行情缓存 | 60s |
| `kline:{code}:{period}` | String (JSON) | K线数据缓存 | 5min |
| `task:status:{task_id}` | Hash | 任务状态 | 24h |
| `user:token:{user_id}` | String | 用户Token | 1h |
| `rate_limit:{user_id}:{endpoint}` | String | 频率限制计数 | 60s |

### 2.2 任务队列

| 键名 | 类型 | 说明 |
|------|------|------|
| `analysis:queue:pending` | List | 待处理任务队列 |
| `analysis:queue:processing` | Set | 处理中任务集合 |
| `analysis:pubsub:progress` | PubSub Channel | 任务进度通知 |

---

## 3. 数据验证规则

### 3.1 股票代码验证

```python
# A股: 6位数字
A_STOCK_PATTERN = r'^\d{6}$'

# 港股: 4-5位数字或带.HK后缀
HK_STOCK_PATTERN = r'^(\d{4,5}|[\d]{4,5}\.HK)$'

# 美股: 1-5位字母
US_STOCK_PATTERN = r'^[A-Z]{1,5}$'
```

### 3.2 字段约束

| 字段 | 类型 | 约束 |
|------|------|------|
| username | string | 3-30字符，字母数字下划线 |
| email | string | 有效邮箱格式 |
| password | string | 最少8字符，含字母和数字 |
| symbol | string | 符合市场代码规则 |
| confidence_score | number | 0.0 - 1.0 |
| risk_level | string | 低/中/高 |

---

## 4. 数据迁移注意事项

### 4.1 版本兼容

- `stock_code` 字段已废弃，统一使用 `symbol`
- 旧数据中 `stock_code` 保留兼容性读取
- 新数据写入时同时写入 `symbol` 和 `stock_code`

### 4.2 索引优化

建议定期执行:
```javascript
// 重建碎片化索引
db.collection.reIndex()

// 检查慢查询
db.setProfilingLevel(1, { slowms: 100 })
```

---

*文档版本: 1.0*
*最后更新: 2025-12-11*
