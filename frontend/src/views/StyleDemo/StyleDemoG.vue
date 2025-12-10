<template>
  <div class="style-demo-g">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-box">
        <h1 class="page-title">单股分析</h1>
        <div class="header-accent"></div>
      </div>
      <p class="page-description">AI · 股票 · 分析</p>
    </div>

    <!-- 主要内容 -->
    <div class="analysis-container">
      <div class="main-content">
        <!-- 主卡片 -->
        <div class="brutal-card main-card">
          <div class="card-header">
            <span class="header-tag">01</span>
            <h3>配置</h3>
          </div>

          <!-- 股票信息 -->
          <div class="form-section">
            <div class="section-label">股票信息</div>
            <div class="form-row">
              <div class="brutal-input-group">
                <label>代码</label>
                <input type="text" value="000001" />
              </div>
              <div class="brutal-input-group">
                <label>市场</label>
                <select>
                  <option>A股</option>
                  <option>美股</option>
                  <option>港股</option>
                </select>
              </div>
            </div>
          </div>

          <!-- 分析深度 -->
          <div class="form-section">
            <div class="section-label">分析深度</div>
            <div class="depth-boxes">
              <div
                v-for="(depth, index) in depthOptions"
                :key="index"
                class="depth-box"
                :class="{ active: selectedDepth === index }"
                @click="selectedDepth = index"
              >
                <div class="box-number">{{ String(index + 1).padStart(2, '0') }}</div>
                <div class="box-name">{{ depth.name }}</div>
                <div class="box-time">{{ depth.time }}</div>
              </div>
            </div>
          </div>

          <!-- 分析师团队 -->
          <div class="form-section">
            <div class="section-label">分析师</div>
            <div class="analysts-list">
              <div
                v-for="analyst in analysts"
                :key="analyst.id"
                class="analyst-row"
                :class="{ active: selectedAnalysts.includes(analyst.id) }"
                @click="toggleAnalyst(analyst.id)"
              >
                <div class="row-check">
                  <span v-if="selectedAnalysts.includes(analyst.id)">✓</span>
                </div>
                <div class="row-name">{{ analyst.name }}</div>
                <div class="row-desc">{{ analyst.description }}</div>
              </div>
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="action-section">
            <button class="brutal-btn">
              开始分析 →
            </button>
          </div>
        </div>

        <!-- 侧边卡片 -->
        <div class="brutal-card side-card">
          <div class="card-header">
            <span class="header-tag">02</span>
            <h3>高级</h3>
          </div>
          <div class="config-stack">
            <div class="config-block">
              <div class="block-label">日期</div>
              <div class="block-value">2024-12-10</div>
            </div>
            <div class="config-block">
              <div class="block-label">模型</div>
              <div class="block-value">DeepSeek V3</div>
            </div>
            <div class="config-block">
              <div class="block-label">语言</div>
              <div class="block-value">中文</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 风格标识 -->
    <div class="style-badge">
      <span class="badge-label">G</span>
      <span class="badge-name">Brutalist</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedDepth = ref(2)
const selectedAnalysts = ref(['market', 'fundamentals'])

const depthOptions = [
  { name: '快速', time: '2-5m' },
  { name: '基础', time: '3-6m' },
  { name: '标准', time: '4-8m' },
  { name: '深度', time: '6-11m' },
  { name: '全面', time: '8-16m' }
]

const analysts = [
  { id: 'market', name: '市场分析师', description: '趋势动态' },
  { id: 'fundamentals', name: '基本面分析师', description: '财务竞争' },
  { id: 'news', name: '新闻分析师', description: '新闻事件' },
  { id: 'social', name: '社媒分析师', description: '情绪舆论' }
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
// Brutalist 配色
$brutal-bg: #f5f5f0;
$brutal-black: #111111;
$brutal-white: #ffffff;
$brutal-yellow: #ffdd00;
$brutal-red: #ff3333;
$brutal-blue: #0066ff;
$text-dark: #111111;
$text-gray: #666666;

.style-demo-g {
  min-height: 100vh;
  background: $brutal-bg;
  padding: 40px;
  font-family: 'Space Mono', 'Courier New', monospace;
}

// 页面头部
.page-header {
  margin-bottom: 48px;

  .header-box {
    display: inline-block;
    position: relative;

    .page-title {
      font-size: 56px;
      font-weight: 700;
      color: $brutal-black;
      margin: 0;
      text-transform: uppercase;
      letter-spacing: -2px;
    }

    .header-accent {
      position: absolute;
      bottom: 8px;
      left: 0;
      width: 100%;
      height: 16px;
      background: $brutal-yellow;
      z-index: -1;
    }
  }

  .page-description {
    font-size: 14px;
    color: $text-gray;
    margin: 16px 0 0;
    letter-spacing: 4px;
    text-transform: uppercase;
  }
}

// 主容器
.analysis-container {
  max-width: 1200px;

  .main-content {
    display: grid;
    grid-template-columns: 1fr 280px;
    gap: 32px;
  }
}

// 粗野卡片
.brutal-card {
  background: $brutal-white;
  border: 4px solid $brutal-black;
  box-shadow: 8px 8px 0 $brutal-black;

  .card-header {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px 24px;
    border-bottom: 4px solid $brutal-black;
    background: $brutal-yellow;

    .header-tag {
      font-size: 14px;
      font-weight: 700;
      color: $brutal-black;
      padding: 4px 10px;
      border: 2px solid $brutal-black;
      background: $brutal-white;
    }

    h3 {
      margin: 0;
      font-size: 20px;
      font-weight: 700;
      color: $brutal-black;
      text-transform: uppercase;
    }
  }
}

.main-card {
  padding-bottom: 24px;
}

.side-card {
  height: fit-content;

  .config-stack {
    padding: 24px;
  }

  .config-block {
    padding: 16px 0;
    border-bottom: 2px dashed $brutal-black;

    &:last-child {
      border-bottom: none;
    }

    .block-label {
      font-size: 11px;
      font-weight: 700;
      color: $text-gray;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 6px;
    }

    .block-value {
      font-size: 16px;
      font-weight: 700;
      color: $brutal-black;
    }
  }
}

// 表单分区
.form-section {
  padding: 24px;
  border-bottom: 2px solid $brutal-black;

  &:last-of-type {
    border-bottom: none;
  }

  .section-label {
    font-size: 12px;
    font-weight: 700;
    color: $text-gray;
    text-transform: uppercase;
    letter-spacing: 3px;
    margin-bottom: 16px;
  }
}

.form-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

// 粗野输入框
.brutal-input-group {
  label {
    display: block;
    font-size: 12px;
    font-weight: 700;
    color: $brutal-black;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  input, select {
    width: 100%;
    padding: 14px 16px;
    font-size: 16px;
    font-weight: 700;
    font-family: inherit;
    color: $brutal-black;
    background: $brutal-white;
    border: 3px solid $brutal-black;
    outline: none;
    transition: all 0.15s ease;

    &:focus {
      background: $brutal-yellow;
      box-shadow: 4px 4px 0 $brutal-black;
    }
  }
}

// 深度选择
.depth-boxes {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
}

.depth-box {
  padding: 16px 12px;
  background: $brutal-white;
  border: 3px solid $brutal-black;
  cursor: pointer;
  transition: all 0.15s ease;
  text-align: center;

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 4px 4px 0 $brutal-black;
  }

  &.active {
    background: $brutal-black;
    color: $brutal-white;
    transform: translate(-4px, -4px);
    box-shadow: 8px 8px 0 $brutal-yellow;

    .box-number {
      color: $brutal-yellow;
    }

    .box-name, .box-time {
      color: $brutal-white;
    }
  }

  .box-number {
    font-size: 24px;
    font-weight: 700;
    color: $brutal-black;
    margin-bottom: 8px;
  }

  .box-name {
    font-size: 13px;
    font-weight: 700;
    color: $brutal-black;
    text-transform: uppercase;
  }

  .box-time {
    font-size: 11px;
    color: $text-gray;
    margin-top: 4px;
  }
}

// 分析师列表
.analysts-list {
  display: flex;
  flex-direction: column;
}

.analyst-row {
  display: grid;
  grid-template-columns: 40px 1fr 1fr;
  align-items: center;
  padding: 16px;
  border: 3px solid $brutal-black;
  margin-bottom: -3px;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: rgba($brutal-yellow, 0.3);
  }

  &.active {
    background: $brutal-black;
    color: $brutal-white;
    transform: translateX(-4px);
    box-shadow: 4px 0 0 $brutal-yellow;

    .row-check {
      color: $brutal-yellow;
    }

    .row-name, .row-desc {
      color: $brutal-white;
    }
  }

  .row-check {
    font-size: 18px;
    font-weight: 700;
    color: $brutal-black;
  }

  .row-name {
    font-size: 14px;
    font-weight: 700;
    color: $brutal-black;
    text-transform: uppercase;
  }

  .row-desc {
    font-size: 12px;
    color: $text-gray;
    text-align: right;
  }
}

// 操作按钮
.action-section {
  padding: 24px;
  display: flex;
  justify-content: center;
}

.brutal-btn {
  padding: 20px 60px;
  font-size: 18px;
  font-weight: 700;
  font-family: inherit;
  color: $brutal-black;
  background: $brutal-yellow;
  border: 4px solid $brutal-black;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: all 0.15s ease;
  box-shadow: 6px 6px 0 $brutal-black;

  &:hover {
    transform: translate(-4px, -4px);
    box-shadow: 10px 10px 0 $brutal-black;
  }

  &:active {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0 $brutal-black;
  }
}

// 风格标识
.style-badge {
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: flex;
  align-items: center;
  gap: 0;
  background: $brutal-white;
  border: 3px solid $brutal-black;
  box-shadow: 4px 4px 0 $brutal-black;

  .badge-label {
    padding: 12px 16px;
    background: $brutal-black;
    color: $brutal-yellow;
    font-size: 16px;
    font-weight: 700;
  }

  .badge-name {
    padding: 12px 16px;
    font-size: 14px;
    font-weight: 700;
    color: $brutal-black;
    text-transform: uppercase;
  }
}

@media (max-width: 1000px) {
  .main-content {
    grid-template-columns: 1fr !important;
  }
  .depth-boxes {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 600px) {
  .page-header .header-box .page-title {
    font-size: 36px;
  }
  .form-row {
    grid-template-columns: 1fr;
  }
  .depth-boxes {
    grid-template-columns: repeat(2, 1fr);
  }
  .analyst-row {
    grid-template-columns: 30px 1fr;
    .row-desc {
      display: none;
    }
  }
}
</style>
