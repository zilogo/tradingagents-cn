<template>
  <div class="style-demo-b">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="title-section">
        <h1 class="page-title">单股分析</h1>
        <p class="page-description">
          AI驱动的智能股票分析，多维度评估投资价值与风险
        </p>
      </div>
    </div>

    <!-- 主要分析表单 -->
    <div class="analysis-container">
      <div class="main-content">
        <!-- 基础配置卡片 -->
        <div class="form-card">
          <div class="card-header">
            <h3>分析配置</h3>
            <span class="header-tag">必填</span>
          </div>

          <div class="card-body">
            <!-- 股票信息 -->
            <div class="form-section">
              <h4 class="section-title">股票信息</h4>
              <div class="form-grid">
                <div class="form-group">
                  <label class="form-label">股票代码</label>
                  <div class="input-wrapper">
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
                  <select class="form-select">
                    <option>A股市场</option>
                    <option>美股市场</option>
                    <option>港股市场</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- 分析深度 -->
            <div class="form-section">
              <h4 class="section-title">分析深度</h4>
              <div class="depth-list">
                <div
                  v-for="(depth, index) in depthOptions"
                  :key="index"
                  class="depth-item"
                  :class="{ active: selectedDepth === index }"
                  @click="selectedDepth = index"
                >
                  <div class="depth-indicator"></div>
                  <div class="depth-content">
                    <div class="depth-header">
                      <span class="depth-name">{{ depth.name }}</span>
                      <span class="depth-time">{{ depth.time }}</span>
                    </div>
                    <div class="depth-desc">{{ depth.description }}</div>
                  </div>
                  <div class="depth-check" v-if="selectedDepth === index">
                    <Check :size="16" />
                  </div>
                </div>
              </div>
            </div>

            <!-- 分析师团队 -->
            <div class="form-section">
              <h4 class="section-title">分析师团队</h4>
              <div class="analysts-list">
                <div
                  v-for="analyst in analysts"
                  :key="analyst.id"
                  class="analyst-item"
                  :class="{ active: selectedAnalysts.includes(analyst.id) }"
                  @click="toggleAnalyst(analyst.id)"
                >
                  <div class="analyst-checkbox">
                    <Check v-if="selectedAnalysts.includes(analyst.id)" :size="14" />
                  </div>
                  <div class="analyst-info">
                    <span class="analyst-name">{{ analyst.name }}</span>
                    <span class="analyst-desc">{{ analyst.description }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 操作按钮 -->
            <div class="action-section">
              <button class="secondary-btn">
                重置
              </button>
              <button class="primary-btn">
                开始分析
              </button>
            </div>
          </div>
        </div>

        <!-- 侧边配置卡片 -->
        <div class="form-card side-card">
          <div class="card-header">
            <h3>高级配置</h3>
            <span class="header-tag optional">可选</span>
          </div>
          <div class="card-body">
            <div class="config-group">
              <label class="config-label">分析基准日期</label>
              <input type="date" class="config-input" value="2024-12-10" />
            </div>
            <div class="config-group">
              <label class="config-label">AI 模型</label>
              <select class="config-input">
                <option>DeepSeek V3</option>
                <option>GPT-4</option>
                <option>Claude 3</option>
              </select>
            </div>
            <div class="config-group">
              <label class="config-label">报告语言</label>
              <select class="config-input">
                <option>简体中文</option>
                <option>English</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 风格标识 -->
    <div class="style-badge">
      <span class="badge-label">方案 B</span>
      <span class="badge-name">Minimal SaaS</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Check } from 'lucide-vue-next'

const selectedDepth = ref(2)
const selectedAnalysts = ref(['market', 'fundamentals'])

const depthOptions = [
  { name: '快速分析', description: '基础数据概览，快速决策', time: '2-5分钟' },
  { name: '基础分析', description: '常规投资决策参考', time: '3-6分钟' },
  { name: '标准分析', description: '技术面+基本面综合分析', time: '4-8分钟' },
  { name: '深度分析', description: '多轮辩论，深度研究', time: '6-11分钟' },
  { name: '全面分析', description: '最完整的分析报告', time: '8-16分钟' }
]

const analysts = [
  { id: 'market', name: '市场分析师', description: '分析市场趋势与行业动态' },
  { id: 'fundamentals', name: '基本面分析师', description: '评估财务状况与竞争优势' },
  { id: 'news', name: '新闻分析师', description: '解读新闻公告与市场事件' },
  { id: 'social', name: '社媒分析师', description: '分析社交媒体情绪导向' }
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
// Minimal SaaS 配色
$bg-page: #fafafa;
$bg-card: #ffffff;
$primary: #3b82f6;
$success: #22c55e;
$warning: #eab308;
$danger: #ef4444;
$text-primary: #111827;
$text-secondary: #6b7280;
$text-muted: #9ca3af;
$border-color: #e5e7eb;

.style-demo-b {
  min-height: 100vh;
  background: $bg-page;
  padding: 48px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

// 页面头部
.page-header {
  margin-bottom: 48px;

  .page-title {
    font-size: 32px;
    font-weight: 600;
    color: $text-primary;
    margin: 0 0 8px 0;
    letter-spacing: -0.5px;
  }

  .page-description {
    font-size: 16px;
    color: $text-secondary;
    margin: 0;
  }
}

// 主容器布局
.analysis-container {
  max-width: 1200px;

  .main-content {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 32px;
  }
}

// 卡片样式
.form-card {
  background: $bg-card;
  border: 1px solid $border-color;
  border-radius: 12px;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
    border-bottom: 1px solid $border-color;

    h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      color: $text-primary;
    }

    .header-tag {
      padding: 4px 10px;
      font-size: 12px;
      font-weight: 500;
      color: $text-secondary;
      background: #f3f4f6;
      border-radius: 4px;

      &.optional {
        color: $text-muted;
      }
    }
  }

  .card-body {
    padding: 24px;
  }
}

.side-card {
  height: fit-content;

  .config-group {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }

    .config-label {
      display: block;
      font-size: 13px;
      font-weight: 500;
      color: $text-secondary;
      margin-bottom: 8px;
    }

    .config-input {
      width: 100%;
      padding: 10px 12px;
      font-size: 14px;
      border: 1px solid $border-color;
      border-radius: 6px;
      background: $bg-card;
      color: $text-primary;

      &:focus {
        outline: none;
        border-color: $primary;
      }
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
    font-size: 14px;
    font-weight: 600;
    color: $text-primary;
    margin: 0 0 16px 0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
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
    font-size: 13px;
    font-weight: 500;
    color: $text-secondary;
    margin-bottom: 8px;
  }
}

// 输入框
.form-input,
.form-select {
  width: 100%;
  padding: 12px 14px;
  font-size: 14px;
  border: 1px solid $border-color;
  border-radius: 8px;
  background: $bg-card;
  color: $text-primary;
  transition: all 0.15s ease;

  &:focus {
    outline: none;
    border-color: $primary;
    box-shadow: 0 0 0 3px rgba($primary, 0.1);
  }

  &::placeholder {
    color: $text-muted;
  }
}

// 深度选择列表
.depth-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.depth-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: $bg-card;
  border: 1px solid $border-color;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: #f9fafb;
  }

  &.active {
    border-color: $primary;
    background: #f0f9ff;

    .depth-indicator {
      background: $primary;
    }
  }

  .depth-indicator {
    width: 4px;
    height: 40px;
    background: $border-color;
    border-radius: 2px;
    transition: background 0.15s ease;
  }

  .depth-content {
    flex: 1;

    .depth-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4px;

      .depth-name {
        font-size: 14px;
        font-weight: 500;
        color: $text-primary;
      }

      .depth-time {
        font-size: 12px;
        color: $text-muted;
      }
    }

    .depth-desc {
      font-size: 13px;
      color: $text-secondary;
    }
  }

  .depth-check {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $primary;
    color: white;
    border-radius: 50%;
  }
}

// 分析师列表
.analysts-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.analyst-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background: $bg-card;
  border: 1px solid $border-color;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: #f9fafb;
  }

  &.active {
    border-color: $primary;
    background: #f0f9ff;

    .analyst-checkbox {
      background: $primary;
      border-color: $primary;
    }
  }

  .analyst-checkbox {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid $border-color;
    border-radius: 4px;
    color: white;
    flex-shrink: 0;
    margin-top: 2px;
    transition: all 0.15s ease;
  }

  .analyst-info {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .analyst-name {
      font-size: 14px;
      font-weight: 500;
      color: $text-primary;
    }

    .analyst-desc {
      font-size: 13px;
      color: $text-secondary;
    }
  }
}

// 操作按钮
.action-section {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid $border-color;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.primary-btn {
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 500;
  color: white;
  background: $primary;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: darken($primary, 8%);
  }
}

.secondary-btn {
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 500;
  color: $text-secondary;
  background: $bg-card;
  border: 1px solid $border-color;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: #f9fafb;
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
  background: $text-primary;
  color: white;
  border-radius: 8px;

  .badge-label {
    padding: 4px 10px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
  }

  .badge-name {
    font-size: 14px;
    font-weight: 500;
  }
}

// 响应式
@media (max-width: 1000px) {
  .analysis-container .main-content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .style-demo-b {
    padding: 24px;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .analysts-list {
    grid-template-columns: 1fr;
  }
}
</style>
