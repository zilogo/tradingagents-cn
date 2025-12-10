<template>
  <div class="style-demo-d">
    <!-- 背景装饰 -->
    <div class="bg-shapes">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
    </div>

    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">
          <TrendingUp class="title-icon" />
          单股分析
        </h1>
        <p class="page-description">
          AI驱动的智能股票分析，多维度评估投资价值与风险
        </p>
      </div>
    </div>

    <!-- 主要分析表单 -->
    <div class="analysis-container">
      <div class="main-content">
        <!-- 基础配置卡片 -->
        <div class="glass-card main-card">
          <div class="card-header">
            <h3>
              <Settings :size="20" />
              分析配置
            </h3>
          </div>

          <div class="card-body">
            <!-- 股票信息 -->
            <div class="form-section">
              <h4 class="section-title">股票信息</h4>
              <div class="form-grid">
                <div class="form-group">
                  <label class="form-label">股票代码</label>
                  <div class="glass-input-wrapper">
                    <Search :size="18" class="input-icon" />
                    <input
                      type="text"
                      class="glass-input"
                      placeholder="如：000001、AAPL"
                      value="000001"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label">市场类型</label>
                  <div class="glass-input-wrapper">
                    <Globe :size="18" class="input-icon" />
                    <select class="glass-input">
                      <option>A股市场</option>
                      <option>美股市场</option>
                      <option>港股市场</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <!-- 分析深度 -->
            <div class="form-section">
              <h4 class="section-title">分析深度</h4>
              <div class="depth-grid">
                <div
                  v-for="(depth, index) in depthOptions"
                  :key="index"
                  class="depth-card"
                  :class="{ active: selectedDepth === index }"
                  @click="selectedDepth = index"
                >
                  <component :is="depth.icon" :size="28" class="depth-icon" />
                  <div class="depth-name">{{ depth.name }}</div>
                  <div class="depth-time">{{ depth.time }}</div>
                </div>
              </div>
            </div>

            <!-- 分析师团队 -->
            <div class="form-section">
              <h4 class="section-title">分析师团队</h4>
              <div class="analysts-grid">
                <div
                  v-for="analyst in analysts"
                  :key="analyst.id"
                  class="analyst-chip"
                  :class="{ active: selectedAnalysts.includes(analyst.id) }"
                  @click="toggleAnalyst(analyst.id)"
                >
                  <component :is="analyst.icon" :size="18" />
                  <span>{{ analyst.name }}</span>
                  <Check v-if="selectedAnalysts.includes(analyst.id)" :size="16" class="check" />
                </div>
              </div>
            </div>

            <!-- 操作按钮 -->
            <div class="action-section">
              <button class="glass-btn primary">
                <Sparkles :size="20" />
                开始智能分析
              </button>
            </div>
          </div>
        </div>

        <!-- 侧边卡片 -->
        <div class="glass-card side-card">
          <div class="card-header">
            <h3>
              <Sliders :size="20" />
              高级配置
            </h3>
          </div>
          <div class="card-body">
            <div class="config-row">
              <Calendar :size="18" />
              <span class="config-label">分析日期</span>
              <span class="config-value">2024-12-10</span>
            </div>
            <div class="config-row">
              <Cpu :size="18" />
              <span class="config-label">AI 模型</span>
              <span class="config-value">DeepSeek V3</span>
            </div>
            <div class="config-row">
              <Languages :size="18" />
              <span class="config-label">报告语言</span>
              <span class="config-value">简体中文</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 风格标识 -->
    <div class="style-badge">
      <span class="badge-label">方案 D</span>
      <span class="badge-name">Glassmorphism</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  TrendingUp, Settings, Search, Globe, Sparkles, Check, Sliders,
  Calendar, Cpu, Languages, Zap, Target, BarChart3, Newspaper, MessageCircle
} from 'lucide-vue-next'

const selectedDepth = ref(2)
const selectedAnalysts = ref(['market', 'fundamentals'])

const depthOptions = [
  { icon: Zap, name: '快速', time: '2-5分钟' },
  { icon: BarChart3, name: '基础', time: '3-6分钟' },
  { icon: Target, name: '标准', time: '4-8分钟' },
  { icon: Search, name: '深度', time: '6-11分钟' },
  { icon: Sparkles, name: '全面', time: '8-16分钟' }
]

const analysts = [
  { id: 'market', name: '市场分析师', icon: TrendingUp },
  { id: 'fundamentals', name: '基本面分析师', icon: BarChart3 },
  { id: 'news', name: '新闻分析师', icon: Newspaper },
  { id: 'social', name: '社媒分析师', icon: MessageCircle }
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
// Glassmorphism 配色
$bg-gradient-start: #667eea;
$bg-gradient-end: #764ba2;
$glass-bg: rgba(255, 255, 255, 0.15);
$glass-border: rgba(255, 255, 255, 0.3);
$glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
$text-white: #ffffff;
$text-light: rgba(255, 255, 255, 0.9);
$text-muted: rgba(255, 255, 255, 0.7);

.style-demo-d {
  min-height: 100vh;
  background: linear-gradient(135deg, $bg-gradient-start 0%, $bg-gradient-end 100%);
  padding: 32px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  position: relative;
  overflow: hidden;
}

// 背景装饰
.bg-shapes {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;

  .shape {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);

    &.shape-1 {
      width: 400px;
      height: 400px;
      background: rgba(255, 255, 255, 0.15);
      top: -100px;
      right: -100px;
    }

    &.shape-2 {
      width: 300px;
      height: 300px;
      background: rgba(255, 107, 107, 0.2);
      bottom: 10%;
      left: -50px;
    }

    &.shape-3 {
      width: 250px;
      height: 250px;
      background: rgba(78, 205, 196, 0.2);
      top: 40%;
      right: 20%;
    }
  }
}

// 页面头部
.page-header {
  position: relative;
  margin-bottom: 32px;

  .page-title {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 32px;
    font-weight: 700;
    color: $text-white;
    margin: 0 0 8px 0;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .page-description {
    font-size: 16px;
    color: $text-muted;
    margin: 0;
  }
}

// 主容器布局
.analysis-container {
  position: relative;

  .main-content {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 24px;
  }
}

// 玻璃卡片
.glass-card {
  background: $glass-bg;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid $glass-border;
  border-radius: 24px;
  box-shadow: $glass-shadow;

  .card-header {
    padding: 24px 28px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    h3 {
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: $text-white;
    }
  }

  .card-body {
    padding: 28px;
  }
}

.side-card {
  height: fit-content;

  .config-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    color: $text-light;

    &:last-child {
      border-bottom: none;
    }

    .config-label {
      flex: 1;
      font-size: 14px;
      color: $text-muted;
    }

    .config-value {
      font-size: 14px;
      font-weight: 500;
    }
  }
}

// 表单分区
.form-section {
  margin-bottom: 28px;

  .section-title {
    font-size: 14px;
    font-weight: 600;
    color: $text-light;
    margin: 0 0 16px 0;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.form-group {
  .form-label {
    display: block;
    font-size: 13px;
    color: $text-muted;
    margin-bottom: 8px;
  }
}

// 玻璃输入框
.glass-input-wrapper {
  position: relative;

  .input-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: $text-muted;
  }
}

.glass-input {
  width: 100%;
  padding: 14px 16px 14px 48px;
  font-size: 15px;
  color: $text-white;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 14px;
  backdrop-filter: blur(10px);
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.4);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
  }

  &::placeholder {
    color: $text-muted;
  }

  option {
    background: #667eea;
    color: white;
  }
}

// 深度选择
.depth-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
}

.depth-card {
  padding: 20px 12px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    transform: translateY(-2px);
  }

  &.active {
    background: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.5);
    transform: scale(1.05);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  }

  .depth-icon {
    color: $text-white;
    margin-bottom: 10px;
  }

  .depth-name {
    font-size: 14px;
    font-weight: 600;
    color: $text-white;
    margin-bottom: 4px;
  }

  .depth-time {
    font-size: 11px;
    color: $text-muted;
  }
}

// 分析师选择
.analysts-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.analyst-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 18px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 50px;
  color: $text-light;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  &.active {
    background: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.5);

    .check {
      color: #4ade80;
    }
  }

  span {
    font-size: 14px;
    font-weight: 500;
  }
}

// 操作按钮
.action-section {
  margin-top: 32px;
  display: flex;
  justify-content: center;
}

.glass-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 18px 48px;
  font-size: 17px;
  font-weight: 600;
  color: $text-white;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-3px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
  }

  &.primary {
    background: rgba(255, 255, 255, 0.25);
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
  background: $glass-bg;
  backdrop-filter: blur(20px);
  border: 1px solid $glass-border;
  color: $text-white;
  border-radius: 14px;

  .badge-label {
    padding: 4px 10px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    font-size: 12px;
    font-weight: 600;
  }

  .badge-name {
    font-size: 14px;
    font-weight: 600;
  }
}

@media (max-width: 1200px) {
  .main-content {
    grid-template-columns: 1fr !important;
  }
  .depth-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .depth-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
