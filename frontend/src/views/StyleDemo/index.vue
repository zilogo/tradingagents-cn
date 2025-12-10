<template>
  <div class="style-selector">
    <div class="selector-header">
      <h1 class="selector-title">前端风格方案评审</h1>
      <p class="selector-description">
        8 种不同风格的 UI 方案，点击卡片查看详细效果
      </p>
    </div>

    <div class="style-grid">
      <!-- 方案 A -->
      <div class="style-card" @click="goToDemo('a')">
        <div class="card-preview preview-a">
          <div class="preview-mock">
            <div class="mock-header"></div>
            <div class="mock-card"></div>
            <div class="mock-btn indigo"></div>
          </div>
        </div>
        <div class="card-info">
          <div class="card-badge">A</div>
          <h3>Indigo Fintech</h3>
          <p>专业金融感，Indigo→Violet 渐变</p>
          <div class="color-dots">
            <span style="background: #6366f1"></span>
            <span style="background: #8b5cf6"></span>
            <span style="background: #10b981"></span>
            <span style="background: #f43f5e"></span>
          </div>
        </div>
      </div>

      <!-- 方案 B -->
      <div class="style-card" @click="goToDemo('b')">
        <div class="card-preview preview-b">
          <div class="preview-mock">
            <div class="mock-header plain"></div>
            <div class="mock-card bordered"></div>
            <div class="mock-btn blue"></div>
          </div>
        </div>
        <div class="card-info">
          <div class="card-badge">B</div>
          <h3>Minimal SaaS</h3>
          <p>极简扁平，大量留白</p>
          <div class="color-dots">
            <span style="background: #3b82f6"></span>
            <span style="background: #22c55e"></span>
            <span style="background: #eab308"></span>
            <span style="background: #ef4444"></span>
          </div>
        </div>
      </div>

      <!-- 方案 C -->
      <div class="style-card" @click="goToDemo('c')">
        <div class="card-preview preview-c">
          <div class="preview-mock">
            <div class="mock-header dark"></div>
            <div class="mock-card glass"></div>
            <div class="mock-btn neon"></div>
          </div>
        </div>
        <div class="card-info">
          <div class="card-badge">C</div>
          <h3>Dark Tech</h3>
          <p>暗色背景，霓虹发光效果</p>
          <div class="color-dots">
            <span style="background: #0f172a"></span>
            <span style="background: #38bdf8"></span>
            <span style="background: #4ade80"></span>
            <span style="background: #fb7185"></span>
          </div>
        </div>
      </div>

      <!-- 方案 D -->
      <div class="style-card" @click="goToDemo('d')">
        <div class="card-preview preview-d">
          <div class="preview-mock">
            <div class="mock-header gradient"></div>
            <div class="mock-card frosted"></div>
            <div class="mock-btn glass-btn"></div>
          </div>
        </div>
        <div class="card-info">
          <div class="card-badge">D</div>
          <h3>Glassmorphism</h3>
          <p>玻璃拟态，半透明模糊效果</p>
          <div class="color-dots">
            <span style="background: #667eea"></span>
            <span style="background: #764ba2"></span>
            <span style="background: rgba(255,255,255,0.3)"></span>
            <span style="background: #4ade80"></span>
          </div>
        </div>
      </div>

      <!-- 方案 E -->
      <div class="style-card" @click="goToDemo('e')">
        <div class="card-preview preview-e">
          <div class="preview-mock">
            <div class="mock-header mesh"></div>
            <div class="mock-card white"></div>
            <div class="mock-btn gradient-btn"></div>
          </div>
        </div>
        <div class="card-info">
          <div class="card-badge">E</div>
          <h3>Gradient Mesh</h3>
          <p>多彩渐变背景，现代感</p>
          <div class="color-dots">
            <span style="background: #ff6b9d"></span>
            <span style="background: #c44cff"></span>
            <span style="background: #4cc9ff"></span>
            <span style="background: #4cffa1"></span>
          </div>
        </div>
      </div>

      <!-- 方案 F -->
      <div class="style-card" @click="goToDemo('f')">
        <div class="card-preview preview-f">
          <div class="preview-mock">
            <div class="mock-header neu"></div>
            <div class="mock-card neu-card"></div>
            <div class="mock-btn neu-btn"></div>
          </div>
        </div>
        <div class="card-info">
          <div class="card-badge">F</div>
          <h3>Neumorphism</h3>
          <p>新拟态，柔和凸起凹陷效果</p>
          <div class="color-dots">
            <span style="background: #e0e5ec"></span>
            <span style="background: #6c5ce7"></span>
            <span style="background: #ffffff"></span>
            <span style="background: #a3b1c6"></span>
          </div>
        </div>
      </div>

      <!-- 方案 G -->
      <div class="style-card" @click="goToDemo('g')">
        <div class="card-preview preview-g">
          <div class="preview-mock">
            <div class="mock-header brutal"></div>
            <div class="mock-card brutal-card"></div>
            <div class="mock-btn brutal-btn"></div>
          </div>
        </div>
        <div class="card-info">
          <div class="card-badge">G</div>
          <h3>Brutalist</h3>
          <p>粗野主义，大胆色块粗边框</p>
          <div class="color-dots">
            <span style="background: #111111"></span>
            <span style="background: #ffdd00"></span>
            <span style="background: #ff3333"></span>
            <span style="background: #f5f5f0"></span>
          </div>
        </div>
      </div>

      <!-- 方案 H -->
      <div class="style-card" @click="goToDemo('h')">
        <div class="card-preview preview-h">
          <div class="preview-mock">
            <div class="mock-header nature"></div>
            <div class="mock-card nature-card"></div>
            <div class="mock-btn nature-btn"></div>
          </div>
        </div>
        <div class="card-info">
          <div class="card-badge">H</div>
          <h3>Nature</h3>
          <p>自然有机，柔和绿色圆润形状</p>
          <div class="color-dots">
            <span style="background: #22c55e"></span>
            <span style="background: #dcfce7"></span>
            <span style="background: #fefce8"></span>
            <span style="background: #14532d"></span>
          </div>
        </div>
      </div>
    </div>

    <div class="selector-footer">
      <p>点击任意卡片查看完整演示 · 评审后选择喜欢的风格或混合元素</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goToDemo = (style: string) => {
  router.push(`/style-demo/${style}`)
}
</script>

<style lang="scss" scoped>
.style-selector {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 48px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.selector-header {
  text-align: center;
  margin-bottom: 48px;

  .selector-title {
    font-size: 36px;
    font-weight: 700;
    color: #1e293b;
    margin: 0 0 12px 0;
  }

  .selector-description {
    font-size: 16px;
    color: #64748b;
    margin: 0;
  }
}

.style-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

.style-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
  }

  .card-preview {
    height: 160px;
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: center;

    &.preview-a {
      background: #f8fafc;
    }
    &.preview-b {
      background: #fafafa;
    }
    &.preview-c {
      background: #0f172a;
    }
    &.preview-d {
      background: linear-gradient(135deg, #667eea, #764ba2);
    }
    &.preview-e {
      background: #fafafe;
      position: relative;
      &::before {
        content: '';
        position: absolute;
        top: -20px;
        left: -20px;
        width: 80px;
        height: 80px;
        background: #ff6b9d;
        border-radius: 50%;
        filter: blur(40px);
        opacity: 0.5;
      }
      &::after {
        content: '';
        position: absolute;
        bottom: -20px;
        right: -20px;
        width: 80px;
        height: 80px;
        background: #4cc9ff;
        border-radius: 50%;
        filter: blur(40px);
        opacity: 0.5;
      }
    }
    &.preview-f {
      background: #e0e5ec;
    }
    &.preview-g {
      background: #f5f5f0;
    }
    &.preview-h {
      background: linear-gradient(180deg, #f7faf5, #ecfdf5);
    }

    .preview-mock {
      width: 100%;
      max-width: 160px;
      display: flex;
      flex-direction: column;
      gap: 10px;

      .mock-header {
        height: 14px;
        border-radius: 4px;
        background: linear-gradient(90deg, #6366f1, #8b5cf6);
        &.plain { background: #e5e7eb; }
        &.dark { background: #1e293b; }
        &.gradient { background: rgba(255,255,255,0.2); }
        &.mesh { background: linear-gradient(90deg, #ff6b9d, #c44cff); }
        &.neu { background: #e0e5ec; box-shadow: 2px 2px 4px #a3b1c6, -2px -2px 4px #fff; }
        &.brutal { background: #ffdd00; border: 2px solid #111; }
        &.nature { background: #dcfce7; }
      }

      .mock-card {
        height: 60px;
        border-radius: 8px;
        background: white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        &.bordered { box-shadow: none; border: 1px solid #e5e7eb; }
        &.glass { background: rgba(30,41,59,0.6); border: 1px solid rgba(148,163,184,0.2); }
        &.frosted { background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); }
        &.white { background: rgba(255,255,255,0.85); }
        &.neu-card { background: #e0e5ec; box-shadow: 4px 4px 8px #a3b1c6, -4px -4px 8px #fff; }
        &.brutal-card { background: white; border: 3px solid #111; box-shadow: 4px 4px 0 #111; }
        &.nature-card { background: white; border: 2px solid #dcfce7; }
      }

      .mock-btn {
        height: 24px;
        border-radius: 6px;
        margin: 0 auto;
        width: 80%;
        &.indigo { background: linear-gradient(135deg, #6366f1, #8b5cf6); }
        &.blue { background: #3b82f6; }
        &.neon { background: #38bdf8; box-shadow: 0 0 10px rgba(56,189,248,0.5); }
        &.glass-btn { background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3); }
        &.gradient-btn { background: linear-gradient(135deg, #ff6b9d, #c44cff); }
        &.neu-btn { background: #e0e5ec; box-shadow: 2px 2px 4px #a3b1c6, -2px -2px 4px #fff; }
        &.brutal-btn { background: #ffdd00; border: 2px solid #111; box-shadow: 3px 3px 0 #111; }
        &.nature-btn { background: #22c55e; border-radius: 20px; }
      }
    }
  }

  .card-info {
    padding: 20px;

    .card-badge {
      display: inline-block;
      width: 28px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      background: #f1f5f9;
      color: #475569;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 10px;
    }

    h3 {
      font-size: 16px;
      font-weight: 700;
      color: #1e293b;
      margin: 0 0 6px 0;
    }

    p {
      font-size: 13px;
      color: #64748b;
      margin: 0 0 12px 0;
      line-height: 1.4;
    }

    .color-dots {
      display: flex;
      gap: 6px;

      span {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.1);
      }
    }
  }
}

.selector-footer {
  text-align: center;
  margin-top: 48px;

  p {
    font-size: 14px;
    color: #94a3b8;
  }
}

@media (max-width: 1200px) {
  .style-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .style-selector {
    padding: 24px;
  }
  .style-grid {
    grid-template-columns: 1fr;
  }
}
</style>
