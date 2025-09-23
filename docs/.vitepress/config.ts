import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Supreme Visual Effects',
  description: '高性能 Vue3 特效组件库',
  lang: 'zh-CN',
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/' },
      { text: '组件', link: '/components/' },
      { text: '更新日志', link: 'https://github.com/yourname/supreme-visual-effects/releases' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '快速开始',
          items: [
            { text: '安装', link: '/guide/' },
            { text: '全局配置', link: '/guide/config' }
          ]
        }
      ],
      '/components/': [
        {
          text: '基础效果',
          items: [
            { text: 'VRipple', link: '/components/vripple' },
            { text: 'VScrollReveal', link: '/components/vscrollreveal' }
          ]
        }
      ]
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/yourname/supreme-visual-effects' }]
  }
})