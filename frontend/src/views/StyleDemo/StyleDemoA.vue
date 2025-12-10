<template>
  <div class="style-demo-a">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="title-section">
          <h1 class="page-title">
            <TrendingUp class="title-icon" />
            单股分析
          </h1>
          <p class="page-description">
            AI驱动的智能股票分析，多维度评估投资价值与风险
          </p>
        </div>
        <div class="header-badge">
          <Sparkles :size="16" />
          <span>AI 智能分析</span>
        </div>
      </div>
    </div>

    <!-- 主要分析表单 -->
    <div class="analysis-container">
      <div class="main-content">
        <!-- 基础配置卡片 -->
        <div class="form-card main-card">
          <div class="card-header">
            <div class="header-left">
              <Settings :size="20" />
              <h3>分析配置</h3>
            </div>
            <span class="header-tag required">必填信息</span>
          </div>

          <div class="card-body">
            <!-- 股票信息 -->
            <div class="form-section">
              <h4 class="section-title">
                <BarChart3 :size="18" />
                股票信息
              </h4>
              <div class="form-grid">
                <div class="form-group">
                  <label class="form-label">股票代码 <span class="required-star">*</span></label>
                  <div class="input-wrapper">
                    <Search :size="18" class="input-icon" />
                    <input
                      type="text"
                      class="form-input"
                      placeholder="如：000001、AAPL、700"
                      value="000001"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label">市场类型</label>
                  <div class="select-wrapper">
                    <Globe :size="18" class="input-icon" />
                    <select class="form-select">
                      <option>A股市场</option>
                      <option>美股市场</option>
                      <option>港股市场</option>
                    </select>
                    <ChevronDown :size="18" class="select-arrow" />
                  </div>
                </div>
              </div>
            </div>

            <!-- 分析深度 -->
            <div class="form-section">
              <h4 class="section-title">
                <Target :size="18" />
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
                  <div class="depth-icon-wrapper">
                    <component :is="depth.icon" :size="24" />
                  </div>
                  <div class="depth-content">
                    <div class="depth-name">{{ depth.name }}</div>
                    <div class="depth-desc">{{ depth.description }}</div>
                  </div>
                  <div class="depth-time">
                    <Clock :size="14" />
                    {{ depth.time }}
                  </div>
                  <div class="check-indicator" v-if="selectedDepth === index">
                    <Check :size="16" />
                  </div>
                </div>
              </div>
            </div>

            <!-- 分析师团队 -->
            <div class="form-section">
              <h4 class="section-title">
                <Users :size="18" />
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
                    <component :is="analyst.icon" :size="24" />
                  </div>
                  <div class="analyst-info">
                    <div class="analyst-name">{{ analyst.name }}</div>
                    <div class="analyst-desc">{{ analyst.description }}</div>
                  </div>
                  <div class="analyst-check" v-if="selectedAnalysts.includes(analyst.id)">
                    <Check :size="16" />
                  </div>
                </div>
              </div>
            </div>

            <!-- 操作按钮 -->
            <div class="action-section">
              <button class="primary-btn">
                <Sparkles :size="20" />
                开始智能分析
              </button>
            </div>
          </div>
        </div>

        <!-- 侧边配置卡片 -->
        <div class="form-card side-card">
          <div class="card-header">
            <div class="header-left">
              <Sliders :size="20" />
              <h3>高级配置</h3>
            </div>
            <span class="header-tag optional">可选</span>
          </div>
          <div class="card-body">
            <div class="config-item">
              <div class="config-label">
                <Calendar :size="16" />
                分析基准日期
              </div>
              <div class="config-value">2024-12-10</div>
            </div>
            <div class="config-item">
              <div class="config-label">
                <Brain :size="16" />
                AI 模型
              </div>
              <div class="config-value">DeepSeek V3</div>
            </div>
            <div class="config-item">
              <div class="config-label">
                <Languages :size="16" />
                报告语言
              </div>
              <div class="config-value">简体中文</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 风格标识 -->
    <div class="style-badge">
      <span class="badge-label">方案 A</span>
      <span class="badge-name">Indigo Fintech</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  TrendingUp, Sparkles, Settings, BarChart3, Search, Globe,
  ChevronDown, Target, Clock, Check, Users, Sliders, Calendar,
  Brain, Languages, Zap, LineChart, Newspaper, MessageCircle
} from 'lucide-vue-next'

const selectedDepth = ref(2)
const selectedAnalysts = ref(['market', 'fundamentals'])

const depthOptions = [
  { icon: Zap, name: '快速分析', description: '基础数据概览', time: '2-5分钟' },
  { icon: LineChart, name: '基础分析', description: '常规投资决策', time: '3-6分钟' },
  { icon: Target, name: '标准分析', description: '技术+基本面', time: '4-8分钟' },
  { icon: Search, name: '深度分析', description: '多轮辩论研究', time: '6-11分钟' },
  { icon: Sparkles, name: '全面分析', description: '最完整报告', time: '8-16分钟' }
]

const analysts = [
  { id: 'market', name: '市场分析师', description: '分析市场趋势与行业动态', icon: TrendingUp },
  { id: 'fundamentals', name: '基本面分析师', description: '评估财务状况与竞争优势', icon: BarChart3 },
  { id: 'news', name: '新闻分析师', description: '解读新闻公告与市场事件', icon: Newspaper },
  { id: 'social', name: '社媒分析师', description: '分析社交媒体情绪导向', icon: MessageCircle }
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
// Indigo Fintech 配色
$bg-page: #f8fafc;
$bg-card: #ffffff;
$primary-start: #6366f1;
$primary-end: #8b5cf6;
$success: #10b981;
$danger: #f43f5e;
$text-primary: #1e293b;
$text-secondary: #64748b;
$text-muted: #94a3b8;
$border-color: #e2e8f0;

.style-demo-a {
  min-height: 100vh;
  background: $bg-page;
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
    .page-title {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 28px;
      font-weight: 700;
      color: $text-primary;
      margin: 0 0 8px 0;

      .title-icon {
        color: $primary-start;
      }
    }

    .page-description {
      font-size: 16px;
      color: $text-secondary;
      margin: 0;
    }
  }

  .header-badge {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: linear-gradient(135deg, $primary-start, $primary-end);
    color: white;
    border-radius: 24px;
    font-size: 14px;
    font-weight: 500;
  }
}

// 主容器布局
.analysis-container {
  .main-content {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 24px;
  }
}

// 卡片样式
.form-card {
  background: $bg-card;
  border-radius: 20px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  overflow: hidden;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
    background: linear-gradient(135deg, $primary-start, $primary-end);
    color: white;

    .header-left {
      display: flex;
      align-items: center;
      gap: 10px;

      h3 {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
      }
    }

    .header-tag {
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;

      &.required {
        background: rgba(255, 255, 255, 0.2);
      }

      &.optional {
        background: rgba(255, 255, 255, 0.15);
      }
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
    justify-content: space-between;
    align-items: center;
    padding: 16px 0;
    border-bottom: 1px solid $border-color;

    &:last-child {
      border-bottom: none;
    }

    .config-label {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      color: $text-secondary;
    }

    .config-value {
      font-size: 14px;
      font-weight: 500;
      color: $text-primary;
    }
  }
}

// 表单分区
.form-section {
  margin-bottom: 32px;

  &:last-of-type {
    margin-bottom: 0;
  }

  .section-title {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 16px;
    font-weight: 600;
    color: $text-primary;
    margin: 0 0 20px 0;
    padding-bottom: 12px;
    border-bottom: 2px solid $border-color;

    svg {
      color: $primary-start;
    }
  }
}

// 表单网格
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.form-group {
  .form-label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: $text-primary;
    margin-bottom: 8px;

    .required-star {
      color: $danger;
    }
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
  }
}

.form-input,
.form-select {
  width: 100%;
  padding: 14px 14px 14px 44px;
  font-size: 15px;
  border: 2px solid $border-color;
  border-radius: 12px;
  background: $bg-card;
  color: $text-primary;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: $primary-start;
    box-shadow: 0 0 0 4px rgba($primary-start, 0.1);
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
    padding-right: 44px;
    cursor: pointer;
  }
}

// 深度选择卡片
.depth-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
}

.depth-card {
  position: relative;
  padding: 20px 16px;
  background: $bg-card;
  border: 2px solid $border-color;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.25s ease;
  text-align: center;

  &:hover {
    border-color: rgba($primary-start, 0.4);
    transform: translateY(-2px);
  }

  &.active {
    border-color: $primary-start;
    background: linear-gradient(135deg, rgba($primary-start, 0.05), rgba($primary-end, 0.08));
    transform: scale(1.02);
    box-shadow: 0 8px 24px rgba($primary-start, 0.15);
  }

  .depth-icon-wrapper {
    width: 48px;
    height: 48px;
    margin: 0 auto 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, rgba($primary-start, 0.1), rgba($primary-end, 0.1));
    border-radius: 12px;
    color: $primary-start;
  }

  .depth-name {
    font-size: 14px;
    font-weight: 600;
    color: $text-primary;
    margin-bottom: 4px;
  }

  .depth-desc {
    font-size: 12px;
    color: $text-secondary;
    margin-bottom: 8px;
  }

  .depth-time {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    font-size: 11px;
    color: $text-muted;
  }

  .check-indicator {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, $primary-start, $primary-end);
    color: white;
    border-radius: 50%;
  }
}

// 分析师卡片
.analysts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.analyst-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: $bg-card;
  border: 2px solid $border-color;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    border-color: rgba($primary-start, 0.4);
  }

  &.active {
    border-color: $primary-start;
    background: linear-gradient(135deg, rgba($primary-start, 0.05), rgba($primary-end, 0.08));
    box-shadow: 0 4px 16px rgba($primary-start, 0.1);
  }

  .analyst-avatar {
    width: 52px;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, rgba($primary-start, 0.1), rgba($primary-end, 0.15));
    border-radius: 14px;
    color: $primary-start;
    flex-shrink: 0;
  }

  .analyst-info {
    flex: 1;

    .analyst-name {
      font-size: 15px;
      font-weight: 600;
      color: $text-primary;
      margin-bottom: 4px;
    }

    .analyst-desc {
      font-size: 13px;
      color: $text-secondary;
    }
  }

  .analyst-check {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, $primary-start, $primary-end);
    color: white;
    border-radius: 50%;
    flex-shrink: 0;
  }
}

// 操作按钮
.action-section {
  margin-top: 32px;
  display: flex;
  justify-content: center;
}

.primary-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 18px 48px;
  font-size: 18px;
  font-weight: 700;
  color: white;
  background: linear-gradient(135deg, $primary-start, $primary-end);
  border: none;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 24px rgba($primary-start, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba($primary-start, 0.4);
  }

  &:active {
    transform: translateY(-1px);
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
  background: linear-gradient(135deg, $primary-start, $primary-end);
  color: white;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba($primary-start, 0.3);

  .badge-label {
    padding: 4px 10px;
    background: rgba(255, 255, 255, 0.2);
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
}
</style>
