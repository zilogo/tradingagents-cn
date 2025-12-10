import { defineStore } from 'pinia'
import type { RouteLocationNormalized } from 'vue-router'
import { useStorage } from '@vueuse/core'

// 风格主题类型定义
export type StyleTheme =
  | 'indigo-fintech'
  | 'minimal-saas'
  | 'dark-tech'
  | 'glassmorphism'
  | 'gradient-mesh'
  | 'neumorphism'
  | 'brutalist'
  | 'nature'

// 风格配置接口
export interface StyleConfig {
  id: StyleTheme
  name: string
  description: string
  isDark: boolean
  primaryColor: string
}

// 8 种风格配置
export const STYLE_CONFIGS: Record<StyleTheme, StyleConfig> = {
  'indigo-fintech': {
    id: 'indigo-fintech',
    name: 'Indigo Fintech',
    description: '专业金融科技感',
    isDark: false,
    primaryColor: '#6366f1'
  },
  'minimal-saas': {
    id: 'minimal-saas',
    name: 'Minimal SaaS',
    description: '极简主义企业级',
    isDark: false,
    primaryColor: '#3b82f6'
  },
  'dark-tech': {
    id: 'dark-tech',
    name: 'Dark Tech',
    description: '交易终端风格',
    isDark: true,
    primaryColor: '#38bdf8'
  },
  'glassmorphism': {
    id: 'glassmorphism',
    name: 'Glassmorphism',
    description: '玻璃拟态现代感',
    isDark: false,
    primaryColor: '#667eea'
  },
  'gradient-mesh': {
    id: 'gradient-mesh',
    name: 'Gradient Mesh',
    description: '多彩渐变创意风',
    isDark: false,
    primaryColor: '#c44cff'
  },
  'neumorphism': {
    id: 'neumorphism',
    name: 'Neumorphism',
    description: '新拟态柔和风',
    isDark: false,
    primaryColor: '#6c5ce7'
  },
  'brutalist': {
    id: 'brutalist',
    name: 'Brutalist',
    description: '粗野主义个性风',
    isDark: false,
    primaryColor: '#111111'
  },
  'nature': {
    id: 'nature',
    name: 'Nature',
    description: '自然有机绿色风',
    isDark: false,
    primaryColor: '#22c55e'
  }
}

export interface AppState {
  // 应用基础状态
  loading: boolean
  loadingProgress: number
  theme: 'light' | 'dark' | 'auto'
  styleTheme: StyleTheme
  language: 'zh-CN' | 'en-US'

  // 高级菜单显示状态（学习中心、设置等）
  showAdvancedMenu: boolean

  // 网络状态
  isOnline: boolean
  apiConnected: boolean
  lastApiCheck: number

  // 布局状态
  sidebarCollapsed: boolean
  sidebarWidth: number

  // 当前路由信息
  currentRoute: RouteLocationNormalized | null

  // 用户偏好
  preferences: {
    defaultMarket: 'A股' | '美股' | '港股'
    defaultDepth: '1' | '2' | '3' | '4' | '5'  // 1-5级分析深度
    autoRefresh: boolean
    refreshInterval: number
    showWelcome: boolean
  }

  // 系统信息
  version: string
  buildTime: string
  apiVersion: string
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    loading: false,
    loadingProgress: 0,
    theme: (useStorage('app-theme', 'auto').value || 'auto') as 'light' | 'dark' | 'auto',
    styleTheme: (useStorage('app-style-theme', 'indigo-fintech').value || 'indigo-fintech') as StyleTheme,
    language: (useStorage('app-language', 'zh-CN').value || 'zh-CN') as 'zh-CN' | 'en-US',

    // 高级菜单默认隐藏
    showAdvancedMenu: useStorage('show-advanced-menu', false).value || false,

    isOnline: navigator.onLine,
    apiConnected: false,
    lastApiCheck: 0,

    // 侧边栏默认折叠（更改 key 名称强制使用新默认值）
    sidebarCollapsed: useStorage('sidebar-collapsed-v2', true).value ?? true,
    sidebarWidth: useStorage('sidebar-width', 240).value || 240,

    currentRoute: null,

    preferences: useStorage('user-preferences', {
      defaultMarket: 'A股',
      defaultDepth: '3',  // 3级为标准分析（推荐）
      autoRefresh: true,
      refreshInterval: 30,
      showWelcome: true
    }).value || {
      defaultMarket: 'A股',
      defaultDepth: '3',  // 3级为标准分析（推荐）
      autoRefresh: true,
      refreshInterval: 30,
      showWelcome: true
    },

    version: '0.1.16',
    buildTime: new Date().toISOString(),
    apiVersion: ''
  }),

  getters: {
    // 是否为暗色主题
    isDarkTheme(): boolean {
      if (this.theme === 'auto') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
      }
      return this.theme === 'dark'
    },
    
    // 侧边栏实际宽度
    actualSidebarWidth(): number {
      return this.sidebarCollapsed ? 64 : this.sidebarWidth
    },
    
    // 当前页面标题
    currentPageTitle(): string {
      return this.currentRoute?.meta?.title as string || 'EOS3-Trader'
    },
    
    // 应用信息
    appInfo(): Record<string, any> {
      return {
        version: this.version,
        buildTime: this.buildTime,
        apiVersion: this.apiVersion,
        theme: this.theme,
        styleTheme: this.styleTheme,
        language: this.language
      }
    },

    // 当前风格配置
    currentStyleConfig(): StyleConfig {
      return STYLE_CONFIGS[this.styleTheme]
    },

    // 当前风格是否为暗色
    isStyleDark(): boolean {
      return STYLE_CONFIGS[this.styleTheme].isDark
    }
  },

  actions: {
    // 设置加载状态
    setLoading(loading: boolean, progress = 0) {
      this.loading = loading
      this.loadingProgress = progress
    },
    
    // 设置加载进度
    setLoadingProgress(progress: number) {
      this.loadingProgress = Math.max(0, Math.min(100, progress))
    },
    
    // 切换主题
    toggleTheme() {
      const themes: Array<'light' | 'dark' | 'auto'> = ['light', 'dark', 'auto']
      const currentIndex = themes.indexOf(this.theme)
      this.theme = themes[(currentIndex + 1) % themes.length]
      this.applyTheme()
    },
    
    // 设置主题
    setTheme(theme: 'light' | 'dark' | 'auto') {
      this.theme = theme
      this.applyTheme()
      // 同步到 localStorage
      localStorage.setItem('app-theme', theme)
    },
    
    // 应用主题（保留兼容旧逻辑）
    applyTheme() {
      // 新风格系统接管明暗模式
      this.applyStyleTheme()
    },

    // 设置风格主题
    setStyleTheme(style: StyleTheme) {
      this.styleTheme = style
      this.applyStyleTheme()
      // 持久化到 localStorage
      localStorage.setItem('app-style-theme', style)
    },

    // 应用风格主题
    applyStyleTheme() {
      const config = STYLE_CONFIGS[this.styleTheme]

      // 设置 data-style 属性
      document.documentElement.setAttribute('data-style', this.styleTheme)

      // 根据风格的明暗属性设置 dark class
      if (config.isDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }

      // 更新 meta theme-color 标签
      const themeColorMeta = document.querySelector('meta[name="theme-color"]')
      if (themeColorMeta) {
        themeColorMeta.setAttribute('content', config.primaryColor)
      }

      console.log('🎨 风格已切换:', config.name)
    },
    
    // 切换语言
    setLanguage(language: 'zh-CN' | 'en-US') {
      this.language = language
      document.documentElement.lang = language
      // 同步到 localStorage
      localStorage.setItem('app-language', language)
    },
    
    // 切换侧边栏
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed
      localStorage.setItem('sidebar-collapsed-v2', String(this.sidebarCollapsed))
    },
    
    // 设置侧边栏状态
    setSidebarCollapsed(collapsed: boolean) {
      this.sidebarCollapsed = collapsed
      // 同步到 localStorage
      localStorage.setItem('sidebar-collapsed-v2', String(collapsed))
    },

    // 设置侧边栏宽度
    setSidebarWidth(width: number) {
      this.sidebarWidth = Math.max(200, Math.min(400, width))
      // 同步到 localStorage
      localStorage.setItem('sidebar-width', String(this.sidebarWidth))
    },
    
    // 设置当前路由
    setCurrentRoute(route: RouteLocationNormalized) {
      this.currentRoute = route
    },
    
    // 更新用户偏好
    updatePreferences(preferences: Partial<AppState['preferences']>) {
      this.preferences = { ...this.preferences, ...preferences }
      // 同步到 localStorage
      localStorage.setItem('user-preferences', JSON.stringify(this.preferences))
    },
    
    // 重置偏好设置
    resetPreferences() {
      this.preferences = {
        defaultMarket: 'A股',
        defaultDepth: '标准',
        autoRefresh: true,
        refreshInterval: 30,
        showWelcome: true
      }
    },
    
    // 设置网络状态
    setOnlineStatus(isOnline: boolean) {
      this.isOnline = isOnline
    },

    // 设置API连接状态
    setApiConnected(connected: boolean) {
      this.apiConnected = connected
      this.lastApiCheck = Date.now()
    },

    // 检查API连接状态
    async checkApiConnection() {
      try {
        // 使用 AbortController 实现超时
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 3000) // 3秒超时

        const response = await fetch('/api/health', {
          method: 'GET',
          signal: controller.signal
        })

        clearTimeout(timeoutId)
        const connected = response.ok
        this.setApiConnected(connected)
        return connected
      } catch (error) {
        if (error.name === 'AbortError') {
          console.warn('API连接检查超时')
        } else {
          console.warn('API连接检查失败:', error)
        }
        this.setApiConnected(false)
        return false
      }
    },

    // 获取API版本信息
    async fetchApiVersion() {
      try {
        // 使用 AbortController 实现超时
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 3000) // 3秒超时

        const response = await fetch('/api/health', {
          signal: controller.signal
        })

        clearTimeout(timeoutId)

        if (response.ok) {
          const data = await response.json()
          this.apiVersion = data.version || 'unknown'
          this.setApiConnected(true)
        } else {
          this.setApiConnected(false)
        }
      } catch (error) {
        if (error.name === 'AbortError') {
          console.warn('获取API版本超时')
        } else {
          console.warn('获取API版本失败:', error)
        }
        this.apiVersion = 'unknown'
        this.setApiConnected(false)
      }
    },
    
    // 重置应用状态
    resetAppState() {
      this.loading = false
      this.loadingProgress = 0
      this.currentRoute = null
    },

    // 切换高级菜单显示状态
    toggleAdvancedMenu() {
      this.showAdvancedMenu = !this.showAdvancedMenu
      localStorage.setItem('show-advanced-menu', String(this.showAdvancedMenu))
    }
  }
})
