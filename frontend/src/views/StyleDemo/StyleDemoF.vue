<template>
  <div class="style-demo-f">
    <!-- 页面头部 -->
    <div class="page-header">
      <h1 class="page-title">单股分析</h1>
      <p class="page-description">AI驱动的智能股票分析</p>
    </div>

    <!-- 主要内容 -->
    <div class="analysis-container">
      <div class="main-content">
        <!-- 主卡片 -->
        <div class="neu-card main-card">
          <!-- 股票信息 -->
          <div class="form-section">
            <h4 class="section-title">
              <BarChart3 :size="18" />
              股票信息
            </h4>
            <div class="form-grid">
              <div class="form-group">
                <label>股票代码</label>
                <div class="neu-input-wrapper">
                  <input type="text" placeholder="000001" value="000001" />
                </div>
              </div>
              <div class="form-group">
                <label>市场类型</label>
                <div class="neu-input-wrapper">
                  <select>
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
            <h4 class="section-title">
              <Gauge :size="18" />
              分析深度
            </h4>
            <div class="depth-buttons">
              <button
                v-for="(depth, index) in depthOptions"
                :key="index"
                class="neu-btn-toggle"
                :class="{ active: selectedDepth === index }"
                @click="selectedDepth = index"
              >
                <component :is="depth.icon" :size="20" />
                <span class="btn-label">{{ depth.name }}</span>
                <span class="btn-time">{{ depth.time }}</span>
              </button>
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
                class="neu-checkbox"
                :class="{ checked: selectedAnalysts.includes(analyst.id) }"
                @click="toggleAnalyst(analyst.id)"
              >
                <div class="checkbox-indicator">
                  <Check v-if="selectedAnalysts.includes(analyst.id)" :size="16" />
                </div>
                <div class="checkbox-content">
                  <component :is="analyst.icon" :size="22" class="analyst-icon" />
                  <div class="analyst-info">
                    <span class="analyst-name">{{ analyst.name }}</span>
                    <span class="analyst-desc">{{ analyst.description }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="action-section">
            <button class="neu-btn primary">
              <Sparkles :size="20" />
              开始智能分析
            </button>
          </div>
        </div>

        <!-- 侧边卡片 -->
        <div class="neu-card side-card">
          <h4 class="card-title">
            <Settings :size="18" />
            高级配置
          </h4>
          <div class="config-list">
            <div class="config-item">
              <div class="config-icon neu-icon">
                <Calendar :size="16" />
              </div>
              <div class="config-text">
                <span class="config-label">分析日期</span>
                <span class="config-value">2024-12-10</span>
              </div>
            </div>
            <div class="config-item">
              <div class="config-icon neu-icon">
                <Cpu :size="16" />
              </div>
              <div class="config-text">
                <span class="config-label">AI 模型</span>
                <span class="config-value">DeepSeek V3</span>
              </div>
            </div>
            <div class="config-item">
              <div class="config-icon neu-icon">
                <Languages :size="16" />
              </div>
              <div class="config-text">
                <span class="config-label">报告语言</span>
                <span class="config-value">简体中文</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 风格标识 -->
    <div class="style-badge">
      <span class="badge-label">方案 F</span>
      <span class="badge-name">Neumorphism</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  BarChart3, Gauge, Users, Check, Sparkles, Settings, Calendar,
  Cpu, Languages, Zap, Target, Search, TrendingUp, Newspaper, MessageCircle
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
// Neumorphism 配色
$neu-bg: #e0e5ec;
$neu-shadow-light: #ffffff;
$neu-shadow-dark: #a3b1c6;
$neu-primary: #6c5ce7;
$text-dark: #2d3436;
$text-gray: #636e72;
$text-light: #b2bec3;

// 新拟态阴影
@mixin neu-shadow-convex {
  box-shadow:
    8px 8px 16px $neu-shadow-dark,
    -8px -8px 16px $neu-shadow-light;
}

@mixin neu-shadow-concave {
  box-shadow:
    inset 4px 4px 8px $neu-shadow-dark,
    inset -4px -4px 8px $neu-shadow-light;
}

@mixin neu-shadow-pressed {
  box-shadow:
    inset 6px 6px 12px $neu-shadow-dark,
    inset -6px -6px 12px $neu-shadow-light;
}

.style-demo-f {
  min-height: 100vh;
  background: $neu-bg;
  padding: 40px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

// 页面头部
.page-header {
  text-align: center;
  margin-bottom: 40px;

  .page-title {
    font-size: 36px;
    font-weight: 700;
    color: $text-dark;
    margin: 0 0 8px 0;
    text-shadow: 2px 2px 4px $neu-shadow-dark, -2px -2px 4px $neu-shadow-light;
  }

  .page-description {
    font-size: 16px;
    color: $text-gray;
    margin: 0;
  }
}

// 主容器
.analysis-container {
  max-width: 1200px;
  margin: 0 auto;

  .main-content {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 32px;
  }
}

// 新拟态卡片
.neu-card {
  background: $neu-bg;
  border-radius: 24px;
  padding: 32px;
  @include neu-shadow-convex;
}

.side-card {
  height: fit-content;

  .card-title {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 16px;
    font-weight: 600;
    color: $text-dark;
    margin: 0 0 24px 0;
  }

  .config-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .config-item {
    display: flex;
    align-items: center;
    gap: 16px;

    .config-icon {
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 12px;
      color: $neu-primary;
      @include neu-shadow-convex;
    }

    .config-text {
      display: flex;
      flex-direction: column;
      gap: 2px;

      .config-label {
        font-size: 12px;
        color: $text-light;
      }

      .config-value {
        font-size: 14px;
        font-weight: 600;
        color: $text-dark;
      }
    }
  }
}

// 表单分区
.form-section {
  margin-bottom: 32px;

  .section-title {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 15px;
    font-weight: 600;
    color: $text-dark;
    margin: 0 0 20px 0;

    svg {
      color: $neu-primary;
    }
  }
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.form-group {
  label {
    display: block;
    font-size: 13px;
    font-weight: 500;
    color: $text-gray;
    margin-bottom: 12px;
  }
}

// 新拟态输入框
.neu-input-wrapper {
  @include neu-shadow-concave;
  border-radius: 14px;
  padding: 4px;

  input, select {
    width: 100%;
    padding: 14px 18px;
    font-size: 15px;
    color: $text-dark;
    background: transparent;
    border: none;
    outline: none;
    border-radius: 10px;

    &::placeholder {
      color: $text-light;
    }
  }
}

// 深度按钮
.depth-buttons {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
}

.neu-btn-toggle {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 20px 12px;
  background: $neu-bg;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  @include neu-shadow-convex;

  &:hover {
    transform: translateY(-2px);
  }

  &.active {
    @include neu-shadow-pressed;
    color: $neu-primary;

    svg {
      color: $neu-primary;
    }
  }

  svg {
    color: $text-gray;
    transition: color 0.2s ease;
  }

  .btn-label {
    font-size: 13px;
    font-weight: 600;
    color: $text-dark;
  }

  .btn-time {
    font-size: 11px;
    color: $text-light;
  }
}

// 分析师选择
.analysts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.neu-checkbox {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px;
  background: $neu-bg;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  @include neu-shadow-convex;

  &:hover {
    transform: translateY(-2px);
  }

  &.checked {
    @include neu-shadow-pressed;

    .checkbox-indicator {
      background: $neu-primary;
      color: white;
      @include neu-shadow-pressed;
    }

    .analyst-icon {
      color: $neu-primary;
    }
  }

  .checkbox-indicator {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    @include neu-shadow-concave;
    transition: all 0.2s ease;
  }

  .checkbox-content {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;

    .analyst-icon {
      color: $text-gray;
      transition: color 0.2s ease;
    }

    .analyst-info {
      display: flex;
      flex-direction: column;
      gap: 2px;

      .analyst-name {
        font-size: 14px;
        font-weight: 600;
        color: $text-dark;
      }

      .analyst-desc {
        font-size: 12px;
        color: $text-light;
      }
    }
  }
}

// 操作按钮
.action-section {
  margin-top: 36px;
  display: flex;
  justify-content: center;
}

.neu-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 18px 48px;
  font-size: 17px;
  font-weight: 700;
  color: $text-dark;
  background: $neu-bg;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  @include neu-shadow-convex;

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    @include neu-shadow-pressed;
  }

  &.primary {
    color: $neu-primary;

    svg {
      color: $neu-primary;
    }
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
  padding: 14px 22px;
  background: $neu-bg;
  border-radius: 14px;
  @include neu-shadow-convex;

  .badge-label {
    padding: 5px 12px;
    background: $neu-primary;
    color: white;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 600;
  }

  .badge-name {
    font-size: 14px;
    font-weight: 600;
    color: $text-dark;
  }
}

@media (max-width: 1100px) {
  .main-content {
    grid-template-columns: 1fr !important;
  }
  .depth-buttons {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 640px) {
  .form-grid, .analysts-grid {
    grid-template-columns: 1fr;
  }
  .depth-buttons {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
