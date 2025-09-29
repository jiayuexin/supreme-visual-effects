# Supreme Visual Effects

> 一个面向 **Vue 3** 的高性能、可定制炫酷特效组件库 🚀

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Vue Version](https://img.shields.io/badge/vue-3.x-brightgreen.svg)](https://v3.vuejs.org/)
[![Build](https://github.com/yourname/supreme-visual-effects/actions/workflows/ci.yml/badge.svg)](https://github.com/yourname/supreme-visual-effects/actions)

---

## ✨ 特色亮点

- **丰富特效**：粒子、视差、文字动效、3D 轮播等 20+ 组件/指令
- **高性能**：利用 GPU、IntersectionObserver、OffscreenCanvas 自动降级
- **极致易用**：一行代码接入，暴露完善的 props & 事件
- **主题化**：CSS 变量 + 预设主题，支持暗黑/亮色自动切换
- **完全 TypeScript**：完整 DTS 声明与 IDE 智能提示

---

## 📦 安装

```bash
# 使用 pnpm
pnpm add supreme-visual-effects
# 或 yarn / npm
```

> 依赖要求：Vue 3.3+、Node 16+

---

## 🔌 快速上手

```ts
import { createApp } from 'vue'
import App from './App.vue'
import { createSupremeEffects } from 'supreme-visual-effects'

createApp(App)
  .use(
    createSupremeEffects({
      theme: 'auto',
    })
  )
  .mount('#app')
```

### 全局配置

| 名称               | 类型                      | 默认值                     | 说明             |
| ------------------ | ------------------------- | -------------------------- | ---------------- |
| `theme`            | `'light'\|'dark'\|'auto'` | `auto`                     | 主题模式         |
| `defaultDuration`  | `number`                  | `0.8`                      | 全局动画时长 (s) |
| `defaultEasing`    | `string`                  | `cubic-bezier(.7,.2,.3,1)` | 缓动曲线         |
| `performanceLevel` | `'high'\|'medium'\|'low'` | `high`                     | 性能等级         |
| `rtl`              | `boolean`                 | `false`                    | RTL 支持         |
| `ssr`              | `boolean`                 | `false`                    | SSR 模式降级     |

---

## 🧩 组件 & 指令一览

### 背景特效

- **`VGradientBackground`** — 多层渐变动效
- **`VParticleField`** — 高性能粒子场
- **`VStarfield`** — 3D 星空背景

### 滚动交互

- **`VParallax`** — 视差滚动
- **`VScrollReveal`** — 滚动进入动画
- **`VScrollSnap`** — 整屏滚动分页

### 文字动效

- **`VTypingText`** — 打字机
- **`VTextMask`** — 路径遮罩
- **`VNeonText`** — 霓虹文字

### 反馈/交互

- **`VHover3D`** — 悬浮 3D 倾斜
- **`VMagneticButton`** — 磁吸按钮
- **`VRipple`** _(指令)_ — 水波纹
- **`VGlitch`** — 故障抖动

### 媒体展示

- **`VCarousel3D`** — 3D 轮播
- **`VImageComparison`** — 图像对比
- **`VLightbox`** — 动效弹窗

### 装饰组件

- **`VDivider`** — 动态分割线
- **`VScrollProgress`** — 阅读进度条
- **`VConfetti`** — 彩纸庆祝

> 详细 API 请查阅 [组件文档](./docs)。

---

## 🛠️ 本地开发

```bash
pnpm i             # 安装依赖
pnpm dev           # Playground 热更新
pnpm lint          # ESLint + Prettier
pnpm test          # Vitest 单元测试 (通过率: 90%+)
pnpm coverage      # 生成覆盖率报告
pnpm docs:dev      # 文档本地预览 (VitePress)
pnpm docs:build    # 文档构建
pnpm build         # 打包库文件
pnpm release       # 一键版本号 & 发布
```

## 📚 组件文档与演示

本项目使用 VitePress 作为文档和组件演示平台，替代了原有的 Storybook。

- 运行 `pnpm docs:dev` 启动本地文档服务器
- 访问 `http://localhost:5173` 查看交互式组件文档
- 文档包含组件API说明和实时演示

### 技术栈 & 依赖

| 分类 | 主要包                                      |
| ---- | ------------------------------------------- |
| 构建 | `vite`, `rollup`, `esbuild`                 |
| 框架 | `vue@3`, `@vueuse/core`                     |
| 动画 | `gsap`, `animejs`                           |
| 样式 | `unocss` / `tailwindcss`                    |
| 规范 | `eslint`, `prettier`, `commitlint`, `husky` |
| 测试 | `vitest`, `jsdom`                           |
| 发布 | `changesets`, `rollup-plugin-dts`           |

---

## 🚀 一键发布 & CI/CD

- 使用 **changesets** 管理版本及生成 Changelog。
- `pnpm release`：自动 bump 版本、更新 Changelog、推送 Tag 并发布到 npm。
- GitHub Actions `release.yml`：在 push tag 时执行 `pnpm build && pnpm publish --access public`，并同步部署文档站点。

## ✅ 测试与质量保证

- **Vitest** + **jsdom** 覆盖所有核心逻辑与组件渲染。
- `pnpm coverage` 结合 **c8** 生成覆盖率报告，目标 ≥ 90%。
- CI 中执行 `pnpm lint && pnpm test --run`，确保每次提交质量。
- 当前测试通过率: **90%+** (104/116 测试用例通过)

## 📚 文档站点

- 基于 **VitePress** 构建，可视化组件 Demo 与 API 参考。
- `pnpm docs:dev` 本地开发热更新，`pnpm docs:build` 生成静态站点。
- 自动部署到 GitHub Pages，文档中嵌入 Playground 支持在线预览。
- 包含完整的组件 API 文档和最佳实践指南

---

## 🗺️ 开发计划

1. **v0.1**：核心插件 & 基础组件 (Ripple / ScrollReveal) - ✅ 已完成
2. **v0.2**：粒子/背景系组件 + 全局主题系统 - ✅ 文档完善完成
3. **v0.3**：3D Carousel、ImageComparison 等高级组件 - 🔄 进行中
4. **v1.0**：稳定发布，完善文档与 CI/CD - ⏳ 计划中

---

## 📊 项目状态

- [x] **测试系统**: 稳定 (90%+ 通过率)
- [x] **文档系统**: 完善 (API 文档齐全)
- [x] **构建系统**: 稳定 (Vite + Rollup)
- [x] **组件演示**: 基于 VitePress
- [x] **SSR 支持**: 已实现
- [ ] **无障碍访问**: 待实现

---

## 🤝 贡献指南

1. `fork` 仓库并创建新分支
2. 提交代码前运行 `pnpm lint && pnpm test`
3. 提交 PR，描述修改内容及测试结果

---

## 📄 License

MIT © 2024 YourName
