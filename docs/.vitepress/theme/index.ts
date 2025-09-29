// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import SupremeVisualEffects from '../../../src/index'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    DefaultTheme.enhanceApp({ app, router: arguments[0].router, siteData: arguments[0].siteData })
    app.use(SupremeVisualEffects)
  }
} satisfies Theme