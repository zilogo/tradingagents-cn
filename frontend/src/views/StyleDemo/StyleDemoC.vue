<template>
  <div class="style-demo-c">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="title-section">
          <div class="title-badge">
            <Cpu :size="14" />
            AI Analysis
          </div>
          <h1 class="page-title">
            <TrendingUp class="title-icon" />
            单股分析
          </h1>
          <p class="page-description">
            AI驱动的智能股票分析，多维度评估投资价值与风险
          </p>
        </div>
        <div class="header-stats">
          <div class="stat-item">
            <Activity :size="16" />
            <span class="stat-value">在线</span>
          </div>
          <div class="stat-item">
            <Zap :size="16" />
            <span class="stat-value">GPU 加速</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 主要分析表单 -->
    <div class="analysis-container">
      <div class="main-content">
        <!-- 基础配置卡片 -->
        <div class="glass-card main-card">
          <div class="card-header">
            <div class="header-left">
              <div class="header-icon">
                <Settings :size="18" />
              </div>
              <h3>分析配置</h3>
            </div>
            <div class="header-glow"></div>
          </div>

          <div class="card-body">
            <!-- 股票信息 -->
            <div class="form-section">
              <h4 class="section-title">
                <BarChart3 :size="16" />
                股票信息
              </h4>
              <div class="form-grid">
                <div class="form-group">
                  <label class="form-label">股票代码</label>
                  <div class="input-wrapper">
                    <Search :size="16" class="input-icon" />
                    <input
                      type="text"
                      class="form-input"
                      placeholder="如：000001、AAPL、700"
                      value="000001"
                    />
                    <div class="input-glow"></div>
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label">市场类型</label>
                  <div class="select-wrapper">
                    <Globe :size="16" class="input-icon" />
                    <select class="form-select">
                      <option>A股市场</option>
                      <option>美股市场</option>
                      <option>港股市场</option>
                    </select>
                    <ChevronDown :size="16" class="select-arrow" />
                  </div>
                </div>
              </div>
            </div>

            <!-- 分析深度 -->
            <div class="form-section">
              <h4 class="section-title">
                <Gauge :size="16" />
                分析深度
              </h4>
              <div class="depth-grid">
                <div
                  v-for="(depth, index) in depthOptions"
                  :key="index"
                  class="depth-card"
                  :class="{ active: selectedDepth === index }"
                  @click="selectedDepth = index"
                >
                  <div class="depth-level">L{{ index + 1 }}</div>
                  <div class="depth-content">
                    <div class="depth-name">{{ depth.name }}</div>
                    <div class="depth-desc">{{ depth.description }}</div>
                  </div>
                  <div class="depth-time">
                    <Timer :size="12" />
                    {{ depth.time }}
                  </div>
                  <div class="card-border"></div>
                </div>
              </div>
            </div>

            <!-- 分析师团队 -->
            <div class="form-section">
              <h4 class="section-title">
                <Users :size="16" />
                分析师团队
              </h4>
              <div class="analysts-grid">
                <div
                  v-for="analyst in analysts"
                  :key="analyst.id"
                  class="analyst-card"
                  :class="{ active: selectedAnalysts.includes(analyst.id) }"
                  @click="toggleAnalyst(analyst.id)"
                >
                  <div class="analyst-avatar">
                    <component :is="analyst.icon" :size="20" />
                  </div>
                  <div class="analyst-info">
                    <div class="analyst-name">{{ analyst.name }}</div>
                    <div class="analyst-desc">{{ analyst.description }}</div>
                  </div>
                  <div class="analyst-status">
                    <div class="status-dot" :class="{ active: selectedAnalysts.includes(analyst.id) }"></div>
                  </div>
                  <div class="card-border"></div>
                </div>
              </div>
            </div>

            <!-- 操作按钮 -->
            <div class="action-section">
              <button class="neon-btn">
                <Sparkles :size="18" />
                <span>开始智能分析</span>
                <div class="btn-glow"></div>
              </button>
            </div>
          </div>
        </div>

        <!-- 侧边配置卡片 -->
        <div class="glass-card side-card">
          <div class="card-header">
            <div class="header-left">
              <div class="header-icon">
                <Sliders :size="18" />
              </div>
              <h3>高级配置</h3>
            </div>
          </div>
          <div class="card-body">
            <div class="config-item">
              <div class="config-icon">
                <Calendar :size="16" />
              </div>
              <div class="config-content">
                <div class="config-label">分析基准日期</div>
                <div class="config-value">2024-12-10</div>
              </div>
            </div>
            <div class="config-item">
              <div class="config-icon">
                <Cpu :size="16" />
              </div>
              <div class="config-content">
                <div class="config-label">AI 模型</div>
                <div class="config-value">DeepSeek V3</div>
              </div>
            </div>
            <div class="config-item">
              <div class="config-icon">
                <Languages :size="16" />
              </div>
              <div class="config-content">
                <div class="config-label">报告语言</div>
                <div class="config-value">简体中文</div>
              </div>
            </div>

            <!-- 系统状态 -->
            <div class="system-status">
              <div class="status-header">
                <MonitorDot :size="14" />
                系统状态
              </div>
              <div class="status-list">
                <div class="status-row">
                  <span>API 连接</span>
                  <span class="status-badge online">在线</span>
                </div>
                <div class="status-row">
                  <span>模型状态</span>
                  <span class="status-badge ready">就绪</span>
                </div>
                <div class="status-row">
                  <span>GPU 利用率</span>
                  <span class="status-value">23%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 风格标识 -->
    <div class="style-badge">
      <span class="badge-label">方案 C</span>
      <span class="badge-name">Dark Tech</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  TrendingUp, Cpu, Activity, Zap, Settings, BarChart3, Search,
  Globe, ChevronDown, Gauge, Timer, Users, Sparkles, Sliders,
  Calendar, Languages, MonitorDot, Newspaper, MessageCircle
} from 'lucide-vue-next'

const selectedDepth = ref(2)
const selectedAnalysts = ref(['market', 'fundamentals'])

const depthOptions = [
  { name: '快速', description: '基础概览', time: '2-5m' },
  { name: '基础', description: '常规决策', time: '3-6m' },
  { name: '标准', description: '综合分析', time: '4-8m' },
  { name: '深度', description: '多轮辩论', time: '6-11m' },
  { name: '全面', description: '完整报告', time: '8-16m' }
]

const analysts = [
  { id: 'market', name: '市场分析师', description: '趋势与动态', icon: TrendingUp },
  { id: 'fundamentals', name: '基本面分析师', description: '财务与竞争', icon: BarChart3 },
  { id: 'news', name: '新闻分析师', description: '新闻与事件', icon: Newspaper },
  { id: 'social', name: '社媒分析师', description: '情绪与舆论', icon: MessageCircle }
]

const toggleAnalyst = (id: string) => {
  const index = selectedAnalysts.value.indexOf(id)
  if (index > -1) {
    selectedAnalysts.value.splice(index, 1)
  } else {
    selectedAnalysts.value.push(id)
  }
}
</script>

<style lang="scss" scoped>
// Dark Tech 配色
$bg-page: #0f172a;
$bg-card: rgba(30, 41, 59, 0.8);
$bg-card-hover: rgba(30, 41, 59, 0.95);
$primary: #38bdf8;
$primary-glow: rgba(56, 189, 248, 0.3);
$success: #4ade80;
$danger: #fb7185;
$warning: #fbbf24;
$text-primary: #f1f5f9;
$text-secondary: #94a3b8;
$text-muted: #64748b;
$border-color: rgba(148, 163, 184, 0.2);

.style-demo-c {
  min-height: 100vh;
  background: $bg-page;
  background-image:
    radial-gradient(ellipse at top, rgba(56, 189, 248, 0.08) 0%, transparent 50%),
    radial-gradient(ellipse at bottom right, rgba(139, 92, 246, 0.05) 0%, transparent 50%);
  padding: 32px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

// 页面头部
.page-header {
  margin-bottom: 32px;

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .title-section {
    .title-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      background: rgba($primary, 0.15);
      border: 1px solid rgba($primary, 0.3);
      color: $primary;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 500;
      margin-bottom: 16px;
    }

    .page-title {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 32px;
      font-weight: 700;
      color: $text-primary;
      margin: 0 0 8px 0;

      .title-icon {
        color: $primary;
      }
    }

    .page-description {
      font-size: 15px;
      color: $text-secondary;
      margin: 0;
    }
  }

  .header-stats {
    display: flex;
    gap: 16px;

    .stat-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 16px;
      background: $bg-card;
      border: 1px solid $border-color;
      border-radius: 10px;
      color: $success;
      font-size: 13px;
      font-weight: 500;
    }
  }
}

// 主容器布局
.analysis-container {
  .main-content {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 24px;
  }
}

// 玻璃卡片
.glass-card {
  background: $bg-card;
  backdrop-filter: blur(20px);
  border: 1px solid $border-color;
  border-radius: 16px;
  overflow: hidden;

  .card-header {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px 24px;
    border-bottom: 1px solid $border-color;

    .header-left {
      display: flex;
      align-items: center;
      gap: 12px;

      .header-icon {
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba($primary, 0.15);
        border-radius: 10px;
        color: $primary;
      }

      h3 {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
        color: $text-primary;
      }
    }

    .header-glow {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, $primary, transparent);
      opacity: 0.5;
    }
  }

  .card-body {
    padding: 24px;
  }
}

.side-card {
  height: fit-content;

  .config-item {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 0;
    border-bottom: 1px solid $border-color;

    &:last-of-type {
      border-bottom: none;
    }

    .config-icon {
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba($primary, 0.1);
      border-radius: 8px;
      color: $primary;
    }

    .config-content {
      .config-label {
        font-size: 12px;
        color: $text-muted;
        margin-bottom: 2px;
      }

      .config-value {
        font-size: 14px;
        font-weight: 500;
        color: $text-primary;
      }
    }
  }

  .system-status {
    margin-top: 20px;
    padding: 16px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 12px;
    border: 1px solid $border-color;

    .status-header {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      font-weight: 600;
      color: $text-secondary;
      margin-bottom: 14px;
    }

    .status-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .status-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      color: $text-secondary;

      .status-badge {
        padding: 3px 10px;
        border-radius: 10px;
        font-size: 11px;
        font-weight: 500;

        &.online {
          background: rgba($success, 0.15);
          color: $success;
        }

        &.ready {
          background: rgba($primary, 0.15);
          color: $primary;
        }
      }

      .status-value {
        color: $text-primary;
        font-weight: 500;
      }
    }
  }
}

// 表单分区
.form-section {
  margin-bottom: 28px;

  &:last-of-type {
    margin-bottom: 0;
  }

  .section-title {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    font-weight: 600;
    color: $text-secondary;
    margin: 0 0 16px 0;
    text-transform: uppercase;
    letter-spacing: 0.5px;

    svg {
      color: $primary;
    }
  }
}

// 表单网格
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.form-group {
  .form-label {
    display: block;
    font-size: 12px;
    font-weight: 500;
    color: $text-muted;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
}

// 输入框
.input-wrapper,
.select-wrapper {
  position: relative;

  .input-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: $text-muted;
    z-index: 1;
  }

  .input-glow {
    position: absolute;
    inset: 0;
    border-radius: 10px;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s ease;
  }
}

.form-input,
.form-select {
  width: 100%;
  padding: 14px 14px 14px 42px;
  font-size: 14px;
  border: 1px solid $border-color;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.3);
  color: $text-primary;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: $primary;
    box-shadow: 0 0 0 3px $primary-glow;

    & + .input-glow {
      opacity: 1;
      box-shadow: 0 0 20px $primary-glow;
    }
  }

  &::placeholder {
    color: $text-muted;
  }
}

.select-wrapper {
  .select-arrow {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: $text-muted;
    pointer-events: none;
  }

  .form-select {
    appearance: none;
    padding-right: 42px;
    cursor: pointer;
  }
}

// 深度选择卡片
.depth-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
}

.depth-card {
  position: relative;
  padding: 16px 12px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid $border-color;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.25s ease;
  text-align: center;
  overflow: hidden;

  &:hover {
    background: rgba(0, 0, 0, 0.4);
    border-color: rgba($primary, 0.3);
  }

  &.active {
    border-color: $primary;
    background: rgba($primary, 0.1);

    .depth-level {
      background: $primary;
      color: $bg-page;
    }

    .card-border {
      opacity: 1;
    }
  }

  .depth-level {
    display: inline-block;
    padding: 4px 10px;
    background: rgba($text-muted, 0.2);
    color: $text-muted;
    border-radius: 6px;
    font-size: 11px;
    font-weight: 700;
    margin-bottom: 10px;
    transition: all 0.2s ease;
  }

  .depth-name {
    font-size: 13px;
    font-weight: 600;
    color: $text-primary;
    margin-bottom: 4px;
  }

  .depth-desc {
    font-size: 11px;
    color: $text-muted;
    margin-bottom: 8px;
  }

  .depth-time {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    font-size: 10px;
    color: $text-muted;
  }

  .card-border {
    position: absolute;
    inset: 0;
    border-radius: 12px;
    border: 1px solid $primary;
    box-shadow: 0 0 15px $primary-glow;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s ease;
  }
}

// 分析师卡片
.analysts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.analyst-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid $border-color;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.25s ease;
  overflow: hidden;

  &:hover {
    background: rgba(0, 0, 0, 0.4);
    border-color: rgba($primary, 0.3);
  }

  &.active {
    border-color: $primary;
    background: rgba($primary, 0.1);

    .analyst-avatar {
      background: $primary;
      color: $bg-page;
    }

    .status-dot {
      background: $success;
      box-shadow: 0 0 10px rgba($success, 0.5);
    }

    .card-border {
      opacity: 1;
    }
  }

  .analyst-avatar {
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba($text-muted, 0.15);
    border-radius: 10px;
    color: $text-secondary;
    transition: all 0.2s ease;
    flex-shrink: 0;
  }

  .analyst-info {
    flex: 1;
    min-width: 0;

    .analyst-name {
      font-size: 14px;
      font-weight: 600;
      color: $text-primary;
      margin-bottom: 2px;
    }

    .analyst-desc {
      font-size: 12px;
      color: $text-muted;
    }
  }

  .analyst-status {
    .status-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: $text-muted;
      transition: all 0.2s ease;
    }
  }

  .card-border {
    position: absolute;
    inset: 0;
    border-radius: 12px;
    border: 1px solid $primary;
    box-shadow: 0 0 15px $primary-glow;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s ease;
  }
}

// 操作按钮
.action-section {
  margin-top: 28px;
  display: flex;
  justify-content: center;
}

.neon-btn {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 40px;
  font-size: 16px;
  font-weight: 600;
  color: $bg-page;
  background: $primary;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 30px $primary-glow;

    .btn-glow {
      opacity: 1;
    }
  }

  .btn-glow {
    position: absolute;
    inset: -2px;
    background: linear-gradient(135deg, $primary, #8b5cf6);
    border-radius: 14px;
    z-index: -1;
    opacity: 0;
    filter: blur(10px);
    transition: opacity 0.3s ease;
  }
}

// 风格标识
.style-badge {
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  background: $bg-card;
  backdrop-filter: blur(20px);
  border: 1px solid $border-color;
  color: $text-primary;
  border-radius: 12px;

  .badge-label {
    padding: 4px 10px;
    background: rgba($primary, 0.15);
    color: $primary;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
  }

  .badge-name {
    font-size: 14px;
    font-weight: 600;
  }
}

// 响应式
@media (max-width: 1200px) {
  .analysis-container .main-content {
    grid-template-columns: 1fr;
  }

  .depth-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .depth-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .analysts-grid {
    grid-template-columns: 1fr;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .header-stats {
    display: none;
  }
}
</style>
