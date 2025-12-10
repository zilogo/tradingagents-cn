<template>
  <div class="app-footer">
    <div class="footer-content">
      <div class="copyright">
        <span>© 2025 EOS3-Trader All rights <a href="#" class="reserved-link" @click.prevent="toggleAdvancedMenu">reserved</a>.</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

// 点击 reserved 切换高级菜单显示
const toggleAdvancedMenu = () => {
  appStore.toggleAdvancedMenu()
}
</script>

<style lang="scss" scoped>
.app-footer {
  .footer-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 6px;
    color: var(--el-text-color-regular);
    font-size: 14px;
    padding: 12px 16px;
    text-align: center;
  }

  .rights {
    margin-left: 4px;
  }

  // reserved 隐藏链接样式 - 看起来像普通文字
  .reserved-link {
    color: inherit;
    text-decoration: none;
    cursor: text;

    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }

  .disclaimer-text {
    color: var(--el-text-color-secondary);
    font-size: 12px;
    line-height: 1.6;
    max-width: 1100px;
  }
}
</style>

