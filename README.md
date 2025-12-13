# EOS3-Trader v1.0 设计文档

## 概述

EOS3-Trader 是一个基于多智能体 (Multi-Agent) 架构的股票分析系统,支持 A股、港股、美股市场的智能分析和投资决策辅助。

## 文档目录

| 文档 | 描述 |
|------|------|
| [API_SPECIFICATION.md](./docs/design/EOS3_trader-v1.0/API_SPECIFICATION.md) | API 接口规范 |
| [DATA_MODELS.md](./docs/design/EOS3_trader-v1.0/DATA_MODELS.md) | 数据模型规范 |
| [ARCHITECTURE_OVERVIEW.md](./docs/design/EOS3_trader-v1.0/ARCHITECTURE_OVERVIEW.md) | 系统架构概述 |

## 版本信息

- **版本**: 1.0
- **发布日期**: 2025-12-11
- **兼容性**: 从 TradingAgents-CN 1.0.x 迁移

## 主要特性

### 核心功能

1. **多市场支持**
   - A股 (沪深两市)
   - 港股 (联交所)
   - 美股 (NYSE/NASDAQ)

2. **智能分析引擎**
   - 市场分析师 (技术面)
   - 基本面分析师 (财务数据)
   - 新闻分析师 (事件驱动)
   - 情绪分析师 (市场情绪)

3. **研究团队辩论**
   - 多头研究员
   - 空头研究员
   - 研究经理仲裁

4. **多数据源支持**
   - Tushare
   - AKShare
   - BaoStock
   - Yahoo Finance
   - 自动故障转移

5. **多 LLM 支持**
   - OpenAI (GPT-4)
   - Anthropic (Claude)
   - DeepSeek
   - 通义千问
   - 本地模型 (Ollama)

### 技术特性

- RESTful API + WebSocket
- 异步任务处理
- 实时进度推送
- 报告导出 (PDF/Word/HTML)
- 多语言支持 (中/英)
- 主题切换 (8种主题)

## 快速开始

### 环境要求

- Python 3.10+
- Node.js 18+
- MongoDB 6.0+
- Redis 7.0+

### 安装步骤

```bash
# 克隆仓库
git clone https://github.com/your-repo/tradingagents-cn.git
cd tradingagents-cn

# 后端安装
pip install -r requirements.txt

# 前端安装
cd frontend && npm install

# 启动服务
# 后端
uvicorn app.main:app --reload

# 前端
npm run dev
```

### 配置说明

复制 `.env.example` 为 `.env`,配置必要的环境变量:

```env
# MongoDB
MONGODB_HOST=localhost
MONGODB_PORT=27017
MONGODB_DATABASE=tradingagents

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# LLM (通过Web界面配置)
# 数据源 (通过Web界面配置)
```

## 变更记录

### v1.0 (2025-12-11)

- 品牌重命名: TradingAgents-CN → EOS3-Trader
- 新增 8 种主题样式
- 简化界面 (隐藏帮助图标、学习中心等)
- API 规范文档更新
- 数据模型规范文档
- 系统架构文档

## 贡献指南

请参阅 [CONTRIBUTING.md](./CONTRIBUTING.md)

## 许可证

本软件为专有软件,未经授权不得使用、复制或分发。

---

*EOS3-Trader Team*
