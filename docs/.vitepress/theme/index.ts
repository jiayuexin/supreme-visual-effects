// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { createSupremeEffects } from '../../../src/index'
import type { App } from 'vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    // 在SSR环境中启用SSR模式
    app.use(createSupremeEffects({ ssr: true }))
  },
} satisfies Theme
