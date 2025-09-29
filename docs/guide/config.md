# 全局配置

Supreme Visual Effects 支持全局配置选项，用于自定义组件的行为和外观。

## 配置选项

### theme
- 类型: `'light' | 'dark' | 'auto'`
- 默认值: `'auto'`
- 描述: 设置组件库的主题模式
- 示例:
```ts
import { createApp } from 'vue'
import App from './App.vue'
import { createSupremeEffects } from 'supreme-visual-effects'

createApp(App)
  .use(createSupremeEffects({
    theme: 'dark' // 或 'light' | 'auto'
  }))
  .mount('#app')
```

### defaultDuration
- 类型: `number`
- 默认值: `0.8`
- 描述: 全局动画时长(秒)
- 示例:
```ts
createApp(App).use(createSupremeEffects({
  defaultDuration: 1.2
}))
```

### defaultEasing
- 类型: `string`
- 默认值: `'cubic-bezier(.7,.2,.3,1)'`
- 描述: 全局缓动曲线
- 示例:
```ts
createApp(App).use(createSupremeEffects({
  defaultEasing: 'ease-in-out'
}))
```

### performanceLevel
- 类型: `'high' | 'medium' | 'low'`
- 默认值: `'high'`
- 描述: 性能等级，影响动画复杂度和粒子数量等
- 示例:
```ts
createApp(App).use(createSupremeEffects({
  performanceLevel: 'medium' // 在性能较低的设备上使用
}))
```

### rtl
- 类型: `boolean`
- 默认值: `false`
- 描述: 是否启用RTL(从右到左)布局支持
- 示例:
```ts
createApp(App).use(createSupremeEffects({
  rtl: true // 用于阿拉伯语等RTL语言
}))
```

### ssr
- 类型: `boolean`
- 默认值: `false`
- 描述: 是否启用服务端渲染模式降级
- 示例:
```ts
createApp(App).use(createSupremeEffects({
  ssr: true // 在SSR环境中使用
}))
```

## 动态更改配置

你也可以在运行时动态更改配置：

```ts
// 更改主题
document.documentElement.setAttribute('data-sve-theme', 'dark')

// 监听系统主题变化
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
mediaQuery.addEventListener('change', (e) => {
  document.documentElement.setAttribute('data-sve-theme', e.matches ? 'dark' : 'light')
})
```

## 自定义CSS变量

组件库使用CSS变量进行主题定制，你可以覆盖这些变量来自定义外观：

```css
:root {
  /* 主题颜色 */
  --sve-primary: #4f46e5;
  --sve-secondary: #0ea5e9;
  
  /* 背景颜色 */
  --sve-bg-light: #ffffff;
  --sve-bg-dark: #1e293b;
  
  /* 文字颜色 */
  --sve-text-light: #334155;
  --sve-text-dark: #f1f5f9;
  
  /* 动画时长 */
  --sve-duration-fast: 0.2s;
  --sve-duration-normal: 0.5s;
  --sve-duration-slow: 1s;
}
```