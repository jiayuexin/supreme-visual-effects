# 最佳实践

本文档提供了使用 Supreme Visual Effects 组件库的最佳实践建议，帮助您充分发挥组件库的潜力。

## 性能优化

### 1. 合理使用动画组件

```vue
<!-- 在列表中避免为每个项目都添加复杂动画 -->
<template>
  <div v-for="item in visibleItems" :key="item.id">
    <!-- 只为可见项目添加动画 -->
    <VScrollReveal v-if="item.visible">
      <div>{{ item.content }}</div>
    </VScrollReveal>
  </div>
</template>
```

### 2. 控制粒子系统数量

```vue
<!-- 根据设备性能调整粒子数量 -->
<template>
  <VParticleField :particleCount="isMobile ? 50 : 150" />
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isMobile = ref(false)

onMounted(() => {
  isMobile.value = window.innerWidth < 768
})
</script>
```

### 3. 使用性能等级配置

```ts
// 根据设备性能设置全局配置
import { createSupremeEffects } from 'supreme-visual-effects'

const isLowPerformance = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

createApp(App).use(
  createSupremeEffects({
    performanceLevel: isLowPerformance ? 'low' : 'high',
  })
)
```

## 主题定制

### 1. 全局主题配置

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import { createSupremeEffects } from 'supreme-visual-effects'

createApp(App)
  .use(
    createSupremeEffects({
      theme: 'auto', // 自动跟随系统主题
    })
  )
  .mount('#app')
```

### 2. 自定义CSS变量

```css
/* 在全局样式中覆盖默认变量 */
:root {
  --sve-primary: #4f46e5;
  --sve-secondary: #0ea5e9;
  --sve-success: #10b981;
  --sve-warning: #f59e0b;
  --sve-error: #ef4444;

  /* 动画时长 */
  --sve-duration-fast: 0.2s;
  --sve-duration-normal: 0.5s;
  --sve-duration-slow: 1s;
}
```

### 3. 动态主题切换

```vue
<template>
  <button @click="toggleTheme">切换主题</button>
  <VGradientBackground :colors="bgColors" />
</template>

<script setup>
import { ref, watch } from 'vue'
import { VGradientBackground } from 'supreme-visual-effects'

const isDark = ref(false)
const bgColors = ref(['#667eea', '#764ba2'])

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.setAttribute('data-sve-theme', isDark.value ? 'dark' : 'light')
  bgColors.value = isDark.value ? ['#1e3c72', '#2a5298'] : ['#667eea', '#764ba2']
}

// 监听系统主题变化
watch(
  () => window.matchMedia('(prefers-color-scheme: dark)').matches,
  isDarkMode => {
    isDark.value = isDarkMode
  }
)
</script>
```

## 响应式设计

### 1. 移动端优化

```vue
<template>
  <VCarousel3D :items="items" :autoPlay="!isMobile" :showArrows="!isMobile" />
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isMobile = ref(false)

onMounted(() => {
  isMobile.value = window.innerWidth < 768
})
</script>
```

### 2. 自适应粒子系统

```vue
<template>
  <VParticleField :particleCount="particleCount" :maxDistance="maxDistance" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const particleCount = ref(100)
const maxDistance = ref(120)

const handleResize = () => {
  const width = window.innerWidth
  if (width < 768) {
    particleCount.value = 50
    maxDistance.value = 80
  } else if (width < 1024) {
    particleCount.value = 80
    maxDistance.value = 100
  } else {
    particleCount.value = 120
    maxDistance.value = 150
  }
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>
```

## 无障碍访问

### 1. 为动画组件添加减少动画选项

```vue
<template>
  <VConfetti :enabled="showConfetti && !prefersReducedMotion" />
</template>

<script setup>
import { ref, onMounted } from 'vue'

const prefersReducedMotion = ref(false)

onMounted(() => {
  prefersReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
})
</script>
```

### 2. 为视觉效果组件添加语义化标签

```vue
<template>
  <VGlitch aria-label="故障效果标题">
    <h1>标题内容</h1>
  </VGlitch>
</template>
```

## 服务端渲染(SSR)兼容

### 1. 检测浏览器环境

```vue
<template>
  <ClientOnly>
    <VParticleField v-if="isClient" />
  </ClientOnly>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isClient = ref(false)

onMounted(() => {
  isClient.value = true
})
</script>
```

### 2. 使用全局SSR配置

```ts
// 在服务端渲染时启用SSR模式
createApp(App).use(
  createSupremeEffects({
    ssr: process.env.SSR === 'true',
  })
)
```

## 错误处理

### 1. 为动画组件添加错误边界

```vue
<template>
  <div v-if="!hasError">
    <VConfetti @error="handleError" :enabled="showConfetti" />
  </div>
  <div v-else>
    <!-- 降级方案 -->
    <div class="fallback-confetti">🎉</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const hasError = ref(false)
const showConfetti = ref(false)

const handleError = error => {
  console.error('Confetti error:', error)
  hasError.value = true
}
</script>
```

## 代码组织

### 1. 按需导入组件

```ts
// 推荐：只导入需要的组件
import { VCarousel3D, VParticleField } from 'supreme-visual-effects'

// 不推荐：导入整个库
import * as sve from 'supreme-visual-effects'
```

### 2. 组件分组使用

```vue
<template>
  <!-- 背景效果组 -->
  <VParticleField />
  <VGradientBackground />

  <!-- 交互效果组 -->
  <VScrollReveal>
    <VHover3D>
      <VMagneticButton>按钮</VMagneticButton>
    </VHover3D>
  </VScrollReveal>
</template>
```

## 测试建议

### 1. 为使用特效的组件编写测试

```ts
// MyComponent.test.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MyComponent from './MyComponent.vue'

describe('MyComponent', () => {
  it('应该正确渲染特效组件', () => {
    const wrapper = mount(MyComponent)
    expect(wrapper.find('.special-effect').exists()).toBe(true)
  })
})
```

### 2. 模拟动画效果

```ts
// 在测试中禁用动画以提高性能
beforeEach(() => {
  // 模拟requestAnimationFrame
  vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
    return setTimeout(cb, 16)
  })
})
```

## 部署优化

### 1. 生产环境构建

```ts
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      external: ['supreme-visual-effects'], // 如果使用CDN
    },
  },
})
```

### 2. 代码分割

```ts
// 异步导入大型组件
const VCarousel3D = defineAsyncComponent(() => import('supreme-visual-effects').then(m => m.VCarousel3D))
```

遵循这些最佳实践可以帮助您构建高性能、可访问且用户友好的应用程序。
