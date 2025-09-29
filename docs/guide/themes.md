# 主题系统

Supreme Visual Effects 提供了强大的主题系统，支持多种预设主题和完全自定义的主题配置。

## 预设主题

### 1. Light 主题 (默认)

```ts
import { createApp } from 'vue'
import App from './App.vue'
import { createSupremeEffects } from 'supreme-visual-effects'

createApp(App)
  .use(
    createSupremeEffects({
      theme: 'light',
    })
  )
  .mount('#app')
```

### 2. Dark 主题

```ts
createApp(App)
  .use(
    createSupremeEffects({
      theme: 'dark',
    })
  )
  .mount('#app')
```

### 3. Auto 主题 (自动跟随系统)

```ts
createApp(App)
  .use(
    createSupremeEffects({
      theme: 'auto', // 默认值
    })
  )
  .mount('#app')
```

### 4. High Contrast 主题 (高对比度)

```ts
createApp(App)
  .use(
    createSupremeEffects({
      theme: 'high-contrast',
    })
  )
  .mount('#app')
```

### 5. Purple 主题 (紫色主题)

```ts
createApp(App)
  .use(
    createSupremeEffects({
      theme: 'purple',
    })
  )
  .mount('#app')
```

## CSS 变量自定义

你可以通过覆盖 CSS 变量来自定义主题：

```css
:root {
  /* 基础颜色 */
  --sve-background: #ffffff;
  --sve-text-color: #213547;
  --sve-primary-color: #4f46e5;
  --sve-secondary-color: #0ea5e9;
  --sve-success-color: #10b981;
  --sve-warning-color: #f59e0b;
  --sve-error-color: #ef4444;

  /* 边框和阴影 */
  --sve-border-color: #e2e8f0;
  --sve-border-radius: 8px;
  --sve-box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --sve-box-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);

  /* 动画 */
  --sve-transition-duration: 0.2s;
  --sve-transition-easing: cubic-bezier(0.4, 0, 0.2, 1);

  /* 组件特定变量 */
  --sve-carousel-bg: #f8fafc;
  --sve-divider-color: #e2e8f0;
  --sve-particle-color: rgba(79, 70, 229, 0.8);
  --sve-confetti-bg: transparent;
}
```

## 动态主题切换

你可以在运行时动态切换主题：

```vue
<template>
  <div>
    <button @click="switchTheme('light')">Light Theme</button>
    <button @click="switchTheme('dark')">Dark Theme</button>
    <button @click="switchTheme('high-contrast')">High Contrast</button>
    <button @click="switchTheme('purple')">Purple Theme</button>

    <!-- 你的组件 -->
    <VCarousel3D :items="items" />
  </div>
</template>

<script setup>
import { VCarousel3D } from 'supreme-visual-effects'

const switchTheme = theme => {
  document.documentElement.setAttribute('data-sve-theme', theme)
}

const items = [
  // 你的轮播项
]
</script>
```

## 创建自定义主题

你可以创建完全自定义的主题：

```css
/* 自定义主题 */
[data-sve-theme='custom'] {
  /* 基础颜色 */
  --sve-background: #f0f9ff;
  --sve-text-color: #0c4a6e;
  --sve-primary-color: #0ea5e9;
  --sve-secondary-color: #8b5cf6;
  --sve-success-color: #10b981;
  --sve-warning-color: #f59e0b;
  --sve-error-color: #ef4444;

  /* 边框和阴影 */
  --sve-border-color: #bae6fd;
  --sve-border-radius: 10px;
  --sve-box-shadow: 0 4px 6px -1px rgba(14, 165, 233, 0.1), 0 2px 4px -1px rgba(14, 165, 233, 0.06);
  --sve-box-shadow-lg: 0 10px 15px -3px rgba(14, 165, 233, 0.1), 0 4px 6px -2px rgba(14, 165, 233, 0.06);

  /* 动画 */
  --sve-transition-duration: 0.25s;
  --sve-transition-easing: cubic-bezier(0.34, 1.56, 0.64, 1);

  /* 组件特定变量 */
  --sve-carousel-bg: #e0f2fe;
  --sve-divider-color: #7dd3fc;
  --sve-particle-color: rgba(14, 165, 233, 0.8);
  --sve-confetti-bg: #f0f9ff;
}
```

然后在 JavaScript 中使用：

```ts
createApp(App)
  .use(
    createSupremeEffects({
      theme: 'custom',
    })
  )
  .mount('#app')
```

## 主题变量参考

### 基础颜色变量

| 变量名                  | 用途         |
| ----------------------- | ------------ |
| `--sve-background`      | 背景颜色     |
| `--sve-text-color`      | 文本颜色     |
| `--sve-primary-color`   | 主要颜色     |
| `--sve-secondary-color` | 次要颜色     |
| `--sve-success-color`   | 成功状态颜色 |
| `--sve-warning-color`   | 警告状态颜色 |
| `--sve-error-color`     | 错误状态颜色 |

### 布局变量

| 变量名                | 用途     |
| --------------------- | -------- |
| `--sve-border-color`  | 边框颜色 |
| `--sve-border-radius` | 圆角大小 |
| `--sve-box-shadow`    | 基础阴影 |
| `--sve-box-shadow-lg` | 大阴影   |

### 动画变量

| 变量名                      | 用途             |
| --------------------------- | ---------------- |
| `--sve-transition-duration` | 过渡动画时长     |
| `--sve-transition-easing`   | 过渡动画缓动函数 |

### 组件特定变量

| 变量名                 | 用途       |
| ---------------------- | ---------- |
| `--sve-carousel-bg`    | 轮播背景色 |
| `--sve-divider-color`  | 分割线颜色 |
| `--sve-particle-color` | 粒子颜色   |
| `--sve-confetti-bg`    | 彩纸背景色 |

## 响应式主题

主题系统也支持媒体查询，你可以为不同设备设置不同的主题：

```css
@media (max-width: 768px) {
  [data-sve-theme='light'] {
    --sve-border-radius: 4px;
  }
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --sve-transition-duration: 0s;
  }
}
```

通过这些主题系统，你可以轻松地为你的应用创建一致且美观的视觉体验。
