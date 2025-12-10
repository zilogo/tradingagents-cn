<template>
  <el-dropdown trigger="click" @command="handleStyleChange" popper-class="style-switcher-popper">
    <el-button type="text" class="style-switcher-btn">
      <el-icon><Brush /></el-icon>
      <span class="current-style-name">{{ currentStyleConfig.name }}</span>
      <el-icon class="arrow-icon"><ArrowDown /></el-icon>
    </el-button>

    <template #dropdown>
      <el-dropdown-menu class="style-dropdown-menu">
        <el-dropdown-item
          v-for="style in styleOptions"
          :key="style.id"
          :command="style.id"
          :class="{ 'is-active': currentStyle === style.id }"
        >
          <div class="style-option">
            <div class="style-preview" :class="`preview-${style.id}`">
              <div class="preview-bar"></div>
              <div class="preview-content">
                <div class="preview-card"></div>
                <div class="preview-btn"></div>
              </div>
            </div>
            <div class="style-info">
              <span class="style-name">{{ style.name }}</span>
              <span class="style-desc">{{ style.description }}</span>
            </div>
            <el-icon v-if="currentStyle === style.id" class="check-icon">
              <Check />
            </el-icon>
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore, STYLE_CONFIGS, type StyleTheme } from '@/stores/app'
import { Brush, ArrowDown, Check } from '@element-plus/icons-vue'

const appStore = useAppStore()

const currentStyle = computed(() => appStore.styleTheme)
const currentStyleConfig = computed(() => appStore.currentStyleConfig)
const styleOptions = computed(() => Object.values(STYLE_CONFIGS))

const handleStyleChange = (style: StyleTheme) => {
  appStore.setStyleTheme(style)
}
</script>

<style lang="scss">
// 全局样式 - 下拉框弹出层
.style-switcher-popper {
  .el-dropdown-menu {
    width: 300px;
    padding: 8px;
    max-height: 480px;
    overflow-y: auto;
  }

  .el-dropdown-menu__item {
    padding: 0;
    border-radius: 8px;
    margin-bottom: 4px;

    &:last-child {
      margin-bottom: 0;
    }

    &:hover {
      background: var(--el-fill-color-light);
    }

    &.is-active {
      background: var(--el-color-primary-light-9);
    }
  }
}
</style>

<style lang="scss" scoped>
.style-switcher-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  height: 36px;
  border-radius: 8px;
  color: var(--el-text-color-regular);
  transition: all 0.2s ease;

  &:hover {
    background: var(--el-fill-color-light);
    color: var(--el-color-primary);
  }

  .current-style-name {
    font-size: 13px;
    font-weight: 500;
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .arrow-icon {
    font-size: 12px;
    margin-left: 2px;
  }
}

.style-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  width: 100%;

  .style-preview {
    width: 52px;
    height: 38px;
    border-radius: 6px;
    overflow: hidden;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;

    .preview-bar {
      height: 8px;
      width: 100%;
    }

    .preview-content {
      flex: 1;
      padding: 4px;
      display: flex;
      flex-direction: column;
      gap: 3px;

      .preview-card {
        flex: 1;
        border-radius: 2px;
      }

      .preview-btn {
        height: 6px;
        width: 50%;
        border-radius: 2px;
      }
    }

    // A - Indigo Fintech
    &.preview-indigo-fintech {
      background: #f8fafc;
      .preview-bar { background: linear-gradient(90deg, #6366f1, #8b5cf6); }
      .preview-card { background: #ffffff; box-shadow: 0 1px 2px rgba(0,0,0,0.1); }
      .preview-btn { background: linear-gradient(90deg, #6366f1, #8b5cf6); }
    }

    // B - Minimal SaaS
    &.preview-minimal-saas {
      background: #fafafa;
      .preview-bar { background: #3b82f6; }
      .preview-card { background: #ffffff; border: 1px solid #e5e7eb; }
      .preview-btn { background: #3b82f6; }
    }

    // C - Dark Tech
    &.preview-dark-tech {
      background: #0f172a;
      .preview-bar { background: #1e293b; }
      .preview-card { background: rgba(30,41,59,0.8); border: 1px solid rgba(148,163,184,0.2); }
      .preview-btn { background: #38bdf8; }
    }

    // D - Glassmorphism
    &.preview-glassmorphism {
      background: linear-gradient(135deg, #667eea, #764ba2);
      .preview-bar { background: rgba(255,255,255,0.2); }
      .preview-card { background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); }
      .preview-btn { background: rgba(255,255,255,0.3); }
    }

    // E - Gradient Mesh
    &.preview-gradient-mesh {
      background: #fafafa;
      .preview-bar { background: linear-gradient(90deg, #ff6b9d, #c44cff); }
      .preview-card { background: rgba(255,255,255,0.85); box-shadow: 0 1px 2px rgba(196,76,255,0.1); }
      .preview-btn { background: linear-gradient(90deg, #ff6b9d, #c44cff); }
    }

    // F - Neumorphism
    &.preview-neumorphism {
      background: #e0e5ec;
      .preview-bar { background: #e0e5ec; box-shadow: 2px 2px 4px #a3b1c6, -2px -2px 4px #ffffff; }
      .preview-card { background: #e0e5ec; box-shadow: inset 2px 2px 4px #a3b1c6, inset -2px -2px 4px #ffffff; }
      .preview-btn { background: #6c5ce7; }
    }

    // G - Brutalist
    &.preview-brutalist {
      background: #f5f5f0;
      .preview-bar { background: #111111; }
      .preview-card { background: #ffffff; border: 2px solid #111111; }
      .preview-btn { background: #111111; }
    }

    // H - Nature
    &.preview-nature {
      background: #f7faf5;
      .preview-bar { background: linear-gradient(90deg, #22c55e, #84cc16); }
      .preview-card { background: #ffffff; border: 1px solid #dcfce7; }
      .preview-btn { background: linear-gradient(90deg, #22c55e, #84cc16); border-radius: 3px; }
    }
  }

  .style-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;

    .style-name {
      font-size: 14px;
      font-weight: 600;
      color: var(--el-text-color-primary);
    }

    .style-desc {
      font-size: 12px;
      color: var(--el-text-color-secondary);
    }
  }

  .check-icon {
    color: var(--el-color-primary);
    font-size: 16px;
    flex-shrink: 0;
  }
}
</style>
