<template>
  <div class="style-demo-e">
    <!-- 渐变背景 -->
    <div class="gradient-bg">
      <div class="gradient-orb orb-1"></div>
      <div class="gradient-orb orb-2"></div>
      <div class="gradient-orb orb-3"></div>
      <div class="gradient-orb orb-4"></div>
    </div>

    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-badge">
        <Sparkles :size="14" />
        AI Powered
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
        <div class="mesh-card main-card">
          <div class="card-body">
            <!-- 股票信息 -->
            <div class="form-section">
              <div class="section-header">
                <BarChart3 :size="20" />
                <h4>股票信息</h4>
              </div>
              <div class="form-grid">
                <div class="form-group">
                  <label>股票代码</label>
                  <div class="input-group">
                    <Search :size="18" />
                    <input type="text" placeholder="000001" value="000001" />
                  </div>
                </div>
                <div class="form-group">
                  <label>市场类型</label>
                  <div class="input-group">
                    <Globe :size="18" />
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
              <div class="section-header">
                <Gauge :size="20" />
                <h4>分析深度</h4>
              </div>
              <div class="depth-slider">
                <div class="slider-track">
                  <div
                    v-for="(depth, index) in depthOptions"
                    :key="index"
                    class="slider-point"
                    :class="{ active: selectedDepth >= index, current: selectedDepth === index }"
                    @click="selectedDepth = index"
                  >
                    <div class="point-dot"></div>
                    <div class="point-label">{{ depth.name }}</div>
                    <div class="point-time">{{ depth.time }}</div>
                  </div>
                </div>
                <div class="slider-fill" :style="{ width: (selectedDepth / 4) * 100 + '%' }"></div>
              </div>
            </div>

            <!-- 分析师团队 -->
            <div class="form-section">
              <div class="section-header">
                <Users :size="20" />
                <h4>分析师团队</h4>
              </div>
              <div class="analysts-tags">
                <div
                  v-for="analyst in analysts"
                  :key="analyst.id"
                  class="analyst-tag"
                  :class="{ active: selectedAnalysts.includes(analyst.id) }"
                  @click="toggleAnalyst(analyst.id)"
                >
                  <div class="tag-icon">
                    <component :is="analyst.icon" :size="20" />
                  </div>
                  <div class="tag-content">
                    <div class="tag-name">{{ analyst.name }}</div>
                    <div class="tag-desc">{{ analyst.description }}</div>
                  </div>
                  <div class="tag-check" v-if="selectedAnalysts.includes(analyst.id)">
                    <Check :size="18" />
                  </div>
                </div>
              </div>
            </div>

            <!-- 操作按钮 -->
            <div class="action-section">
              <button class="gradient-btn">
                <Rocket :size="20" />
                开始智能分析
              </button>
            </div>
          </div>
        </div>

        <!-- 侧边卡片 -->
        <div class="mesh-card side-card">
          <div class="card-body">
            <div class="side-title">
              <Settings :size="18" />
              高级配置
            </div>
            <div class="config-list">
              <div class="config-item">
                <span class="config-key">分析日期</span>
                <span class="config-val">2024-12-10</span>
              </div>
              <div class="config-item">
                <span class="config-key">AI 模型</span>
                <span class="config-val highlight">DeepSeek V3</span>
              </div>
              <div class="config-item">
                <span class="config-key">报告语言</span>
                <span class="config-val">简体中文</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 风格标识 -->
    <div class="style-badge">
      <span class="badge-label">方案 E</span>
      <span class="badge-name">Gradient Mesh</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  Sparkles, BarChart3, Search, Globe, Gauge, Users, Check,
  Rocket, Settings, TrendingUp, Newspaper, MessageCircle
} from 'lucide-vue-next'

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
  { id: 'market', name: '市场分析师', description: '趋势与动态分析', icon: TrendingUp },
  { id: 'fundamentals', name: '基本面分析师', description: '财务与竞争分析', icon: BarChart3 },
  { id: 'news', name: '新闻分析师', description: '新闻与事件解读', icon: Newspaper },
  { id: 'social', name: '社媒分析师', description: '情绪与舆论分析', icon: MessageCircle }
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
// Gradient Mesh 配色
$mesh-pink: #ff6b9d;
$mesh-purple: #c44cff;
$mesh-blue: #4cc9ff;
$mesh-green: #4cffa1;
$text-dark: #1a1a2e;
$text-gray: #4a4a6a;
$text-light: #8888aa;

.style-demo-e {
  min-height: 100vh;
  background: #fafafe;
  padding: 40px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  position: relative;
  overflow: hidden;
}

// 渐变背景
.gradient-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;

  .gradient-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.6;

    &.orb-1 {
      width: 500px;
      height: 500px;
      background: $mesh-pink;
      top: -150px;
      left: -100px;
    }

    &.orb-2 {
      width: 400px;
      height: 400px;
      background: $mesh-purple;
      top: 20%;
      right: -50px;
    }

    &.orb-3 {
      width: 350px;
      height: 350px;
      background: $mesh-blue;
      bottom: -100px;
      left: 30%;
    }

    &.orb-4 {
      width: 300px;
      height: 300px;
      background: $mesh-green;
      bottom: 20%;
      right: 20%;
    }
  }
}

// 页面头部
.page-header {
  position: relative;
  text-align: center;
  margin-bottom: 40px;

  .header-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    background: linear-gradient(135deg, $mesh-pink, $mesh-purple);
    color: white;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 16px;
  }

  .page-title {
    font-size: 40px;
    font-weight: 800;
    background: linear-gradient(135deg, $mesh-pink, $mesh-purple, $mesh-blue);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0 0 12px 0;
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
    grid-template-columns: 1fr 300px;
    gap: 24px;
  }
}

// 卡片
.mesh-card {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);

  .card-body {
    padding: 32px;
  }
}

.side-card {
  height: fit-content;

  .side-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    font-weight: 600;
    color: $text-dark;
    margin-bottom: 20px;
  }

  .config-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .config-item {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);

    &:last-child {
      border-bottom: none;
    }

    .config-key {
      font-size: 14px;
      color: $text-light;
    }

    .config-val {
      font-size: 14px;
      font-weight: 500;
      color: $text-dark;

      &.highlight {
        background: linear-gradient(135deg, $mesh-pink, $mesh-purple);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
    }
  }
}

// 表单分区
.form-section {
  margin-bottom: 32px;

  .section-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;

    svg {
      color: $mesh-purple;
    }

    h4 {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      color: $text-dark;
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
    font-weight: 500;
    color: $text-light;
    margin-bottom: 8px;
  }

  .input-group {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 18px;
    background: white;
    border: 2px solid transparent;
    border-radius: 14px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
    transition: all 0.3s ease;

    &:focus-within {
      border-color: $mesh-purple;
      box-shadow: 0 4px 20px rgba($mesh-purple, 0.15);
    }

    svg {
      color: $text-light;
    }

    input, select {
      flex: 1;
      border: none;
      outline: none;
      font-size: 15px;
      color: $text-dark;
      background: transparent;

      &::placeholder {
        color: $text-light;
      }
    }
  }
}

// 深度滑块
.depth-slider {
  position: relative;
  padding: 20px 0 40px;

  .slider-track {
    display: flex;
    justify-content: space-between;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 8px;
      left: 0;
      right: 0;
      height: 4px;
      background: #e0e0e8;
      border-radius: 2px;
    }
  }

  .slider-fill {
    position: absolute;
    top: 28px;
    left: 0;
    height: 4px;
    background: linear-gradient(90deg, $mesh-pink, $mesh-purple);
    border-radius: 2px;
    transition: width 0.3s ease;
  }

  .slider-point {
    position: relative;
    text-align: center;
    cursor: pointer;
    z-index: 1;

    .point-dot {
      width: 20px;
      height: 20px;
      background: white;
      border: 3px solid #e0e0e8;
      border-radius: 50%;
      margin: 0 auto 8px;
      transition: all 0.3s ease;
    }

    &.active .point-dot {
      border-color: $mesh-purple;
    }

    &.current .point-dot {
      background: linear-gradient(135deg, $mesh-pink, $mesh-purple);
      border-color: $mesh-purple;
      transform: scale(1.2);
      box-shadow: 0 4px 15px rgba($mesh-purple, 0.4);
    }

    .point-label {
      font-size: 13px;
      font-weight: 600;
      color: $text-dark;
    }

    .point-time {
      font-size: 11px;
      color: $text-light;
    }
  }
}

// 分析师标签
.analysts-tags {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.analyst-tag {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px;
  background: white;
  border: 2px solid transparent;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  }

  &.active {
    border-color: $mesh-purple;
    background: linear-gradient(135deg, rgba($mesh-pink, 0.05), rgba($mesh-purple, 0.05));

    .tag-icon {
      background: linear-gradient(135deg, $mesh-pink, $mesh-purple);
      color: white;
    }

    .tag-check {
      color: $mesh-purple;
    }
  }

  .tag-icon {
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f0f0f8;
    border-radius: 12px;
    color: $text-gray;
    transition: all 0.3s ease;
  }

  .tag-content {
    flex: 1;

    .tag-name {
      font-size: 14px;
      font-weight: 600;
      color: $text-dark;
      margin-bottom: 2px;
    }

    .tag-desc {
      font-size: 12px;
      color: $text-light;
    }
  }
}

// 操作按钮
.action-section {
  margin-top: 36px;
  display: flex;
  justify-content: center;
}

.gradient-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 18px 48px;
  font-size: 17px;
  font-weight: 700;
  color: white;
  background: linear-gradient(135deg, $mesh-pink, $mesh-purple);
  border: none;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 30px rgba($mesh-purple, 0.35);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 40px rgba($mesh-purple, 0.45);
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
  background: white;
  border-radius: 14px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);

  .badge-label {
    padding: 4px 10px;
    background: linear-gradient(135deg, $mesh-pink, $mesh-purple);
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

@media (max-width: 1000px) {
  .main-content {
    grid-template-columns: 1fr !important;
  }
}

@media (max-width: 640px) {
  .form-grid, .analysts-tags {
    grid-template-columns: 1fr;
  }
}
</style>
