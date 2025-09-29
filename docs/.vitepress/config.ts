import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Supreme Visual Effects',
  description: '高性能 Vue3 特效组件库',
  lang: 'zh-CN',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: '组件', link: '/components/VParticleField' },
      { text: '更新日志', link: 'https://github.com/yourname/supreme-visual-effects/releases' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '快速开始',
          items: [
            { text: '安装', link: '/guide/' },
            { text: '全局配置', link: '/guide/config' },
            { text: 'SSR支持', link: '/guide/ssr' },
            { text: '主题定制', link: '/guide/themes' },
          ],
        },
      ],
      '/components/': [
        {
          text: '背景特效',
          items: [
            { text: 'VParticleField 粒子场', link: '/components/VParticleField' },
            { text: 'VGradientBackground 渐变背景', link: '/components/VGradientBackground' },
            { text: 'VStarfield 星空背景', link: '/components/VStarfield' },
          ],
        },
        {
          text: '滚动交互',
          items: [
            { text: 'VParallax 视差滚动', link: '/components/VParallax' },
            { text: 'VScrollReveal 滚动进入动画', link: '/components/VScrollReveal' },
            { text: 'VScrollSnap 滚动快照', link: '/components/VScrollSnap' },
            { text: 'VScrollProgress 滚动进度条', link: '/components/VScrollProgress' },
          ],
        },
        {
          text: '文字动效',
          items: [
            { text: 'VTypingText 打字机效果', link: '/components/VTypingText' },
            { text: 'VTextMask 文字遮罩', link: '/components/VTextMask' },
            { text: 'VNeonText 霓虹文字', link: '/components/VNeonText' },
          ],
        },
        {
          text: '反馈/交互',
          items: [
            { text: 'VHover3D 3D悬停效果', link: '/components/VHover3D' },
            { text: 'VMagneticButton 磁性按钮', link: '/components/VMagneticButton' },
            { text: 'VRipple 水波纹效果', link: '/components/vripple' },
            { text: 'VGlitch 故障效果', link: '/components/VGlitch' },
          ],
        },
        {
          text: '媒体展示',
          items: [
            { text: 'VCarousel3D 3D轮播', link: '/components/VCarousel3D' },
            { text: 'VImageComparison 图像对比', link: '/components/VImageComparison' },
            { text: 'VLightbox 灯箱效果', link: '/components/VLightbox' },
          ],
        },
        {
          text: '装饰组件',
          items: [
            { text: 'VDivider 分割线', link: '/components/VDivider' },
            { text: 'VConfetti 彩纸效果', link: '/components/VConfetti' },
          ],
        },
      ],
    },
    search: {
      provider: 'local',
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/yourname/supreme-visual-effects' }],
  },
  vite: {
    server: {
      fs: {
        allow: ['../..'],
      },
    },
  },
})
