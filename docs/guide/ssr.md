# 服务端渲染(SSR)支持

Supreme Visual Effects 完全支持服务端渲染环境，包括 Nuxt.js、Next.js 等框架。

## 启用SSR模式

在创建插件时，传入 `ssr: true` 选项：

```ts
import { createApp } from 'vue'
import { createSupremeEffects } from 'supreme-visual-effects'

const app = createApp(App)

// 启用SSR模式
app.use(createSupremeEffects({
  ssr: true,
  theme: 'light' // SSR模式下主题将在客户端激活时设置
}))
```

## Nuxt.js 集成

在 Nuxt.js 中使用 Supreme Visual Effects：

```ts
// plugins/supreme-visual-effects.ts
import { defineNuxtPlugin } from '#app'
import { createSupremeEffects } from 'supreme-visual-effects'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(createSupremeEffects({
    ssr: true
  }))
})
```

## Next.js 集成

在 Next.js 中使用 Supreme Visual Effects：

```tsx
// pages/_app.tsx
import type { AppProps } from 'next/app'
import { createSupremeEffects } from 'supreme-visual-effects'
import 'supreme-visual-effects/dist/style.css'

function MyApp({ Component, pageProps }: AppProps) {
  // 在客户端激活时初始化
  if (typeof window !== 'undefined') {
    const app = createApp(Component)
    app.use(createSupremeEffects())
    app.mount('#__next')
  }

  return <Component {...pageProps} />
}

export default MyApp
```

## 工作原理

SSR支持通过以下方式实现：

1. **环境检测**：所有组件都会检测是否在浏览器环境中运行
2. **API兼容**：避免在服务端使用浏览器特定API（如window、document等）
3. **延迟初始化**：主题设置和事件监听器在客户端激活时才初始化

## 注意事项

1. **客户端激活**：某些功能（如动画、交互）仅在客户端激活后工作
2. **主题设置**：SSR模式下主题将在客户端激活时设置
3. **事件监听**：事件监听器在客户端激活时才添加

## 故障排除

如果遇到SSR相关问题：

1. 确保正确设置了 `ssr: true` 选项
2. 检查是否有组件直接使用了浏览器API而未进行环境检测
3. 在客户端激活后初始化需要浏览器API的功能