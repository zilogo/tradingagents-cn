<template>
  <div class="style-demo-h">
    <!-- 装饰元素 -->
    <div class="nature-decor">
      <div class="leaf leaf-1">🍃</div>
      <div class="leaf leaf-2">🌿</div>
      <div class="leaf leaf-3">🍀</div>
    </div>

    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-icon">
        <Leaf :size="32" />
      </div>
      <h1 class="page-title">单股分析</h1>
      <p class="page-description">
        AI驱动的智能股票分析，多维度评估投资价值与风险
      </p>
    </div>

    <!-- 主要内容 -->
    <div class="analysis-container">
      <div class="main-content">
        <!-- 主卡片 -->
        <div class="nature-card main-card">
          <div class="card-header">
            <Sprout :size="22" />
            <h3>分析配置</h3>
          </div>

          <div class="card-body">
            <!-- 股票信息 -->
            <div class="form-section">
              <h4 class="section-title">
                <Flower2 :size="18" />
                股票信息
              </h4>
              <div class="form-grid">
                <div class="form-group">
                  <label>股票代码</label>
                  <div class="organic-input">
                    <input type="text" placeholder="000001" value="000001" />
                  </div>
                </div>
                <div class="form-group">
                  <label>市场类型</label>
                  <div class="organic-input">
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
                <TreePine :size="18" />
                分析深度
              </h4>
              <div class="depth-pills">
                <div
                  v-for="(depth, index) in depthOptions"
                  :key="index"
                  class="depth-pill"
                  :class="{ active: selectedDepth === index }"
                  @click="selectedDepth = index"
                >
                  <span class="pill-emoji">{{ depth.emoji }}</span>
                  <span class="pill-name">{{ depth.name }}</span>
                  <span class="pill-time">{{ depth.time }}</span>
                </div>
              </div>
            </div>

            <!-- 分析师团队 -->
            <div class="form-section">
              <h4 class="section-title">
                <Users :size="18" />
                分析师团队
              </h4>
              <div class="analysts-bubbles">
                <div
                  v-for="analyst in analysts"
                  :key="analyst.id"
                  class="analyst-bubble"
                  :class="{ active: selectedAnalysts.includes(analyst.id) }"
                  @click="toggleAnalyst(analyst.id)"
                >
                  <div class="bubble-emoji">{{ analyst.emoji }}</div>
                  <div class="bubble-info">
                    <div class="bubble-name">{{ analyst.name }}</div>
                    <div class="bubble-desc">{{ analyst.description }}</div>
                  </div>
                  <div class="bubble-check" v-if="selectedAnalysts.includes(analyst.id)">
                    <Check :size="18" />
                  </div>
                </div>
              </div>
            </div>

            <!-- 操作按钮 -->
            <div class="action-section">
              <button class="organic-btn">
                <Sparkles :size="20" />
                开始智能分析
              </button>
            </div>
          </div>
        </div>

        <!-- 侧边卡片 -->
        <div class="nature-card side-card">
          <div class="card-header small">
            <Settings :size="18" />
            <h3>高级配置</h3>
          </div>
          <div class="card-body">
            <div class="config-organic">
              <div class="config-row">
                <div class="row-icon">📅</div>
                <div class="row-content">
                  <span class="row-label">分析日期</span>
                  <span class="row-value">2024-12-10</span>
                </div>
              </div>
              <div class="config-row">
                <div class="row-icon">🤖</div>
                <div class="row-content">
                  <span class="row-label">AI 模型</span>
                  <span class="row-value">DeepSeek V3</span>
                </div>
              </div>
              <div class="config-row">
                <div class="row-icon">🌐</div>
                <div class="row-content">
                  <span class="row-label">报告语言</span>
                  <span class="row-value">简体中文</span>
                </div>
              </div>
            </div>

            <!-- 小提示 -->
            <div class="tip-box">
              <div class="tip-icon">💡</div>
              <div class="tip-text">选择更高的分析深度可获得更全面的投资建议</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 风格标识 -->
    <div class="style-badge">
      <span class="badge-emoji">🌱</span>
      <span class="badge-label">方案 H</span>
      <span class="badge-name">Nature</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  Leaf, Sprout, Flower2, TreePine, Users, Check, Sparkles, Settings
} from 'lucide-vue-next'

const selectedDepth = ref(2)
const selectedAnalysts = ref(['market', 'fundamentals'])

const depthOptions = [
  { emoji: '🌱', name: '快速', time: '2-5分钟' },
  { emoji: '🌿', name: '基础', time: '3-6分钟' },
  { emoji: '🌳', name: '标准', time: '4-8分钟' },
  { emoji: '🏔️', name: '深度', time: '6-11分钟' },
  { emoji: '🌍', name: '全面', time: '8-16分钟' }
]

const analysts = [
  { id: 'market', name: '市场分析师', description: '趋势与动态分析', emoji: '📈' },
  { id: 'fundamentals', name: '基本面分析师', description: '财务与竞争分析', emoji: '📊' },
  { id: 'news', name: '新闻分析师', description: '新闻与事件解读', emoji: '📰' },
  { id: 'social', name: '社媒分析师', description: '情绪与舆论分析', emoji: '💬' }
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
// Nature 配色
$nature-bg: #f7faf5;
$nature-green: #22c55e;
$nature-green-dark: #16a34a;
$nature-green-light: #dcfce7;
$nature-brown: #a16207;
$nature-cream: #fefce8;
$text-dark: #14532d;
$text-gray: #4d7c0f;
$text-light: #84cc16;

.style-demo-h {
  min-height: 100vh;
  background: linear-gradient(180deg, $nature-bg 0%, #ecfdf5 100%);
  padding: 40px;
  font-family: 'Nunito', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  position: relative;
  overflow: hidden;
}

// 装饰元素
.nature-decor {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;

  .leaf {
    position: absolute;
    font-size: 48px;
    opacity: 0.15;

    &.leaf-1 {
      top: 10%;
      right: 5%;
      transform: rotate(15deg);
    }

    &.leaf-2 {
      bottom: 20%;
      left: 3%;
      transform: rotate(-20deg);
    }

    &.leaf-3 {
      top: 50%;
      right: 15%;
      transform: rotate(30deg);
    }
  }
}

// 页面头部
.page-header {
  position: relative;
  text-align: center;
  margin-bottom: 40px;

  .header-icon {
    width: 64px;
    height: 64px;
    margin: 0 auto 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $nature-green-light;
    border-radius: 50%;
    color: $nature-green;
  }

  .page-title {
    font-size: 36px;
    font-weight: 800;
    color: $text-dark;
    margin: 0 0 8px 0;
  }

  .page-description {
    font-size: 16px;
    color: $text-gray;
    margin: 0;
  }
}

// 主容器
.analysis-container {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;

  .main-content {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 28px;
  }
}

// 自然卡片
.nature-card {
  background: white;
  border-radius: 28px;
  border: 2px solid $nature-green-light;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(34, 197, 94, 0.1);

  .card-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 22px 28px;
    background: linear-gradient(135deg, $nature-green-light, #bbf7d0);
    border-bottom: 2px solid $nature-green-light;

    &.small {
      padding: 18px 24px;
    }

    svg {
      color: $nature-green;
    }

    h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 700;
      color: $text-dark;
    }
  }

  .card-body {
    padding: 28px;
  }
}

.side-card {
  height: fit-content;

  .config-organic {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 24px;
  }

  .config-row {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 16px;
    background: $nature-bg;
    border-radius: 16px;

    .row-icon {
      font-size: 24px;
    }

    .row-content {
      display: flex;
      flex-direction: column;
      gap: 2px;

      .row-label {
        font-size: 12px;
        color: $text-gray;
      }

      .row-value {
        font-size: 14px;
        font-weight: 600;
        color: $text-dark;
      }
    }
  }

  .tip-box {
    display: flex;
    gap: 12px;
    padding: 16px;
    background: $nature-cream;
    border-radius: 16px;
    border: 2px dashed #fde047;

    .tip-icon {
      font-size: 20px;
    }

    .tip-text {
      font-size: 13px;
      color: $nature-brown;
      line-height: 1.5;
    }
  }
}

// 表单分区
.form-section {
  margin-bottom: 28px;

  .section-title {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 15px;
    font-weight: 700;
    color: $text-dark;
    margin: 0 0 18px 0;

    svg {
      color: $nature-green;
    }
  }
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.form-group {
  label {
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: $text-gray;
    margin-bottom: 10px;
  }
}

// 有机输入框
.organic-input {
  input, select {
    width: 100%;
    padding: 16px 20px;
    font-size: 15px;
    color: $text-dark;
    background: $nature-bg;
    border: 2px solid $nature-green-light;
    border-radius: 16px;
    outline: none;
    transition: all 0.3s ease;

    &:focus {
      border-color: $nature-green;
      background: white;
      box-shadow: 0 0 0 4px rgba($nature-green, 0.1);
    }

    &::placeholder {
      color: $text-light;
    }
  }
}

// 深度选择
.depth-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.depth-pill {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 20px;
  background: $nature-bg;
  border: 2px solid $nature-green-light;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: $nature-green-light;
    transform: translateY(-2px);
  }

  &.active {
    background: $nature-green;
    border-color: $nature-green;
    color: white;
    transform: scale(1.05);
    box-shadow: 0 8px 24px rgba($nature-green, 0.3);

    .pill-name, .pill-time {
      color: white;
    }
  }

  .pill-emoji {
    font-size: 20px;
  }

  .pill-name {
    font-size: 14px;
    font-weight: 600;
    color: $text-dark;
  }

  .pill-time {
    font-size: 12px;
    color: $text-gray;
  }
}

// 分析师气泡
.analysts-bubbles {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.analyst-bubble {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px;
  background: $nature-bg;
  border: 2px solid $nature-green-light;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: $nature-green-light;
    transform: translateY(-2px);
  }

  &.active {
    background: $nature-green-light;
    border-color: $nature-green;
    box-shadow: 0 4px 16px rgba($nature-green, 0.2);

    .bubble-emoji {
      transform: scale(1.2);
    }

    .bubble-check {
      color: $nature-green;
    }
  }

  .bubble-emoji {
    font-size: 32px;
    transition: transform 0.3s ease;
  }

  .bubble-info {
    flex: 1;

    .bubble-name {
      font-size: 14px;
      font-weight: 700;
      color: $text-dark;
      margin-bottom: 2px;
    }

    .bubble-desc {
      font-size: 12px;
      color: $text-gray;
    }
  }

  .bubble-check {
    color: transparent;
    transition: color 0.3s ease;
  }
}

// 操作按钮
.action-section {
  margin-top: 32px;
  display: flex;
  justify-content: center;
}

.organic-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 18px 48px;
  font-size: 17px;
  font-weight: 700;
  color: white;
  background: linear-gradient(135deg, $nature-green, $nature-green-dark);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 24px rgba($nature-green, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba($nature-green, 0.4);
  }
}

// 风格标识
.style-badge {
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  background: white;
  border: 2px solid $nature-green-light;
  border-radius: 50px;
  box-shadow: 0 4px 16px rgba($nature-green, 0.15);

  .badge-emoji {
    font-size: 20px;
  }

  .badge-label {
    padding: 4px 10px;
    background: $nature-green;
    color: white;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 600;
  }

  .badge-name {
    font-size: 14px;
    font-weight: 600;
    color: $text-dark;
  }
}

@media (max-width: 1000px) {
  .main-content {
    grid-template-columns: 1fr !important;
  }
}

@media (max-width: 640px) {
  .form-grid, .analysts-bubbles {
    grid-template-columns: 1fr;
  }
  .depth-pills {
    flex-direction: column;
  }
}
</style>
