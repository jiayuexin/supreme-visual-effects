# Supreme Visual Effects 改进清单

> 更新日期: 2026-01-16

---

## 🔴 P0 - 紧急 (本周完成)

### 无障碍访问基础

- [ ] 添加 `prefers-reduced-motion` 媒体查询支持
  - [ ] 创建 `src/composables/useReducedMotion.ts`
  - [ ] VParticleField - 禁用动画或降低粒子数
  - [ ] VConfetti - 禁用或简化效果
  - [ ] VNeonText - 禁用闪烁动画
  - [ ] VGlitch - 完全禁用
  - [ ] VCarousel3D - 使用简单过渡替代 3D 效果
- [ ] 为 VLightbox 添加完整焦点陷阱 (focus-trap)
- [ ] 为 VCarousel3D 添加 `aria-live` 区域

### 代码质量

- [ ] 补充 VTypingText.test.ts 测试文件
- [ ] 修复现有测试中的 12 个失败用例

---

## 🟡 P1 - 重要 (两周内完成)

### 共享逻辑重构

- [ ] 创建 `src/composables/` 目录结构
  - [ ] `useBrowser.ts` - 浏览器环境检测
  - [ ] `useAnimation.ts` - 动画帧管理
  - [ ] `useIntersectionObserver.ts` - 可见性检测
  - [ ] `useResizeObserver.ts` - 尺寸变化监听
- [ ] 重构组件使用新 composables
  - [ ] VParticleField
  - [ ] VScrollReveal
  - [ ] VConfetti
  - [ ] VStarfield

### 性能优化

- [ ] VParticleField 添加性能等级配置
  - [ ] `performanceLevel: 'high' | 'medium' | 'low'`
  - [ ] low 模式: 减少粒子数、禁用连线
  - [ ] medium 模式: 减少粒子数
- [ ] 添加全局性能检测工具 `src/utils/performance.ts`

### 新组件开发

- [ ] **VCountUp** - 数字滚动动画
  - [ ] 基础计数功能
  - [ ] 支持千分位分隔符
  - [ ] 支持小数
  - [ ] 支持前缀/后缀
  - [ ] 滚动触发选项
- [ ] **VMarquee** - 无限滚动跑马灯
  - [ ] 水平/垂直方向
  - [ ] 悬停暂停
  - [ ] 渐变遮罩
  - [ ] 自定义速度

---

## 🟢 P2 - 一般 (一个月内完成)

### 新组件开发

- [ ] **VCursor** - 自定义光标
  - [ ] 点状/环状/自定义样式
  - [ ] 磁吸效果
  - [ ] 混合模式
  - [ ] 移动端隐藏
- [ ] **VTextReveal** - 文字揭示动画
  - [ ] 逐字符/逐词/逐行模式
  - [ ] 多种动画效果 (fade/slide/blur/clip)
  - [ ] 滚动/悬停/自动触发

### 现有组件增强

- [ ] VScrollReveal 添加动画预设
  - [ ] `preset: 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'zoom' | 'flip'`
- [ ] VCarousel3D 添加过渡效果
  - [ ] `effect: 'rotate' | 'cube' | 'flip' | 'cards'`
- [ ] VConfetti 支持 emoji 粒子
  - [ ] `shapes: ['circle', 'square', 'triangle', 'emoji']`
  - [ ] `emojis: string[]`
- [ ] VNeonText 支持渐变色
  - [ ] `gradient: boolean`
  - [ ] `gradientColors: string[]`

### 文档完善

- [ ] 添加组件 Playground 在线编辑
- [ ] 添加最佳实践示例
- [ ] 添加性能优化指南
- [ ] 添加无障碍使用指南

---

## 🔵 P3 - 低优先级 (季度内完成)

### 高级性能优化

- [ ] VParticleField 使用 OffscreenCanvas
- [ ] VParticleField 使用 Web Worker
- [ ] 实现粒子对象池
- [ ] Canvas 脏矩形渲染优化

### 更多新组件

- [ ] **VMorphText** - 文字变形
- [ ] **VWaveBackground** - 波浪背景
- [ ] **VBlob** - 流体形状
- [ ] **VTilt** - 增强 3D 倾斜 (含陀螺仪)
- [ ] **VFlipCard** - 翻转卡片
- [ ] **VSkeleton** - 骨架屏

### 架构升级

- [ ] 创建全局配置 Provider
- [ ] 支持按需引入 (tree-shaking 优化)
- [ ] 添加 Nuxt 模块支持
- [ ] 添加 unplugin-vue-components resolver

### 无障碍完善

- [ ] 所有组件添加完整 ARIA 支持
- [ ] 键盘导航测试覆盖
- [ ] 屏幕阅读器兼容性测试
- [ ] WCAG 2.1 AA 合规检查

---

## 📋 快速参考

### 文件创建清单

```
src/
├── composables/
│   ├── useBrowser.ts
│   ├── useAnimation.ts
│   ├── useReducedMotion.ts
│   ├── useIntersectionObserver.ts
│   └── useResizeObserver.ts
├── utils/
│   └── performance.ts
└── components/
    ├── VCountUp.vue
    ├── VMarquee.vue
    ├── VCursor.vue
    └── VTextReveal.vue
```

### 测试文件清单

```
src/components/
├── VTypingText.test.ts (新建)
├── VCountUp.test.ts (新建)
├── VMarquee.test.ts (新建)
├── VCursor.test.ts (新建)
└── VTextReveal.test.ts (新建)
```

---

## ✅ 完成标准

每个任务完成需满足:

1. 功能实现并通过测试
2. TypeScript 类型完整
3. 文档更新
4. SSR 兼容
5. 无障碍基础支持

---

## 📊 进度追踪

| 优先级   | 总任务 | 已完成 | 进度   |
| -------- | ------ | ------ | ------ |
| P0       | 10     | 0      | 0%     |
| P1       | 12     | 0      | 0%     |
| P2       | 14     | 0      | 0%     |
| P3       | 16     | 0      | 0%     |
| **总计** | **52** | **0**  | **0%** |
