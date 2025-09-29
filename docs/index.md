---
layout: home
hero:
  name: Supreme Visual Effects
  text: 一个面向 Vue3 的高性能特效组件库
  tagline: 粒子、视差、文字动效、3D —— 极致炫酷，一行集成。
  actions:
    - theme: brand
      text: 快速开始 →
      link: /guide/
    - theme: alt
      text: GitHub
      link: https://github.com/yourname/supreme-visual-effects
features:
  - icon: ⚡
    title: 高性能
    details: 使用 GPU 加速、IntersectionObserver 与智能降级，保证流畅体验。
  - icon: 🧩
    title: 组件丰富
    details: 覆盖背景、滚动、文字、交互、媒体 5 大类别 20+ 组件/指令。
  - icon: 🛠️
    title: TypeScript 全面支持
    details: 全量 DTS 与 IDE 智能提示，开发更丝滑。
---

## 组件概览

<div class="component-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin: 2rem 0;">
  <div class="component-category" style="background: #f8f9fa; border-radius: 8px; padding: 1.5rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <h3 style="margin-top: 0; color: #4f46e5;">背景特效</h3>
    <ul style="list-style: none; padding: 0;">
      <li style="margin-bottom: 0.5rem;">✨ VParticleField - 粒子场背景</li>
      <li style="margin-bottom: 0.5rem;">🌈 VGradientBackground - 渐变背景</li>
      <li style="margin-bottom: 0.5rem;">⭐ VStarfield - 星空背景</li>
    </ul>
  </div>
  
  <div class="component-category" style="background: #f8f9fa; border-radius: 8px; padding: 1.5rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <h3 style="margin-top: 0; color: #4f46e5;">滚动交互</h3>
    <ul style="list-style: none; padding: 0;">
      <li style="margin-bottom: 0.5rem;">🏔️ VParallax - 视差滚动</li>
      <li style="margin-bottom: 0.5rem;">👁️ VScrollReveal - 滚动进入动画</li>
      <li style="margin-bottom: 0.5rem;">📸 VScrollSnap - 滚动快照</li>
      <li style="margin-bottom: 0.5rem;">📊 VScrollProgress - 滚动进度条</li>
    </ul>
  </div>
  
  <div class="component-category" style="background: #f8f9fa; border-radius: 8px; padding: 1.5rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <h3 style="margin-top: 0; color: #4f46e5;">文字动效</h3>
    <ul style="list-style: none; padding: 0;">
      <li style="margin-bottom: 0.5rem;">⌨️ VTypingText - 打字机效果</li>
      <li style="margin-bottom: 0.5rem;">🎭 VTextMask - 文字遮罩</li>
      <li style="margin-bottom: 0.5rem;">💡 VNeonText - 霓虹文字</li>
    </ul>
  </div>
  
  <div class="component-category" style="background: #f8f9fa; border-radius: 8px; padding: 1.5rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <h3 style="margin-top: 0; color: #4f46e5;">反馈/交互</h3>
    <ul style="list-style: none; padding: 0;">
      <li style="margin-bottom: 0.5rem;">🖱️ VHover3D - 3D悬停效果</li>
      <li style="margin-bottom: 0.5rem;">🧲 VMagneticButton - 磁性按钮</li>
      <li style="margin-bottom: 0.5rem;">💧 VRipple - 水波纹效果</li>
      <li style="margin-bottom: 0.5rem;">📺 VGlitch - 故障效果</li>
    </ul>
  </div>
  
  <div class="component-category" style="background: #f8f9fa; border-radius: 8px; padding: 1.5rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <h3 style="margin-top: 0; color: #4f46e5;">媒体展示</h3>
    <ul style="list-style: none; padding: 0;">
      <li style="margin-bottom: 0.5rem;">🎠 VCarousel3D - 3D轮播</li>
      <li style="margin-bottom: 0.5rem;">🔍 VImageComparison - 图像对比</li>
      <li style="margin-bottom: 0.5rem;">🖼️ VLightbox - 灯箱效果</li>
    </ul>
  </div>
  
  <div class="component-category" style="background: #f8f9fa; border-radius: 8px; padding: 1.5rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <h3 style="margin-top: 0; color: #4f46e5;">装饰组件</h3>
    <ul style="list-style: none; padding: 0;">
      <li style="margin-bottom: 0.5rem;">✂️ VDivider - 分割线</li>
      <li style="margin-bottom: 0.5rem;">🎊 VConfetti - 彩纸效果</li>
    </ul>
  </div>
</div>

## 使用场景

### 网站首页

为你的网站首页添加炫酷的背景效果和动画，提升用户的第一印象。

### 产品展示

使用 3D 轮播和图像对比组件，更好地展示你的产品特色。

### 登录/注册页面

通过粒子场背景和霓虹文字效果，创建吸引人的登录界面。

### 作品集网站

利用视差滚动和滚动进入动画，打造令人印象深刻的作品展示。

### 数据仪表板

使用滚动进度条和分割线组件，创建清晰的数据可视化界面。

<style>
.component-grid {
  margin: 2rem 0;
}

.component-category {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.component-category h3 {
  margin-top: 0;
  color: #4f46e5;
}
</style>
