# Supreme Visual Effects 开发计划

> 制定日期: 2026-01-16
> 版本目标: v0.3.0 → v1.0.0

---

## 📅 总体时间线

```
2026-01
├── Week 3 (01/13-01/19): Sprint 1 - 无障碍基础 + 测试修复
└── Week 4 (01/20-01/26): Sprint 2 - Composables 重构

2026-02
├── Week 1 (01/27-02/02): Sprint 3 - VCountUp + VMarquee
├── Week 2 (02/02-02/08): Sprint 4 - 性能优化 + 组件增强
├── Week 3 (02/09-02/15): Sprint 5 - VCursor + VTextReveal
└── Week 4 (02/16-02/22): Sprint 6 - 文档完善 + v0.4.0 发布

2026-03
├── Week 1-2: Sprint 7-8 - 高级性能优化
├── Week 3-4: Sprint 9-10 - 更多新组件
└── 月底: v0.5.0 发布

2026-04
├── Week 1-2: Sprint 11-12 - 架构升级
├── Week 3: Sprint 13 - 无障碍完善
└── Week 4: v1.0.0 正式发布
```

---

## 🏃 Sprint 1: 无障碍基础 + 测试修复

**时间**: 2026/01/13 - 01/19 (本周)
**目标**: 建立无障碍基础设施，修复测试问题

### 任务列表

| #   | 任务                                    | 预估 | 负责人 | 状态 |
| --- | --------------------------------------- | ---- | ------ | ---- |
| 1.1 | 创建 `useReducedMotion.ts` composable   | 2h   | -      | ⬜   |
| 1.2 | VParticleField 添加 reduced-motion 支持 | 2h   | -      | ⬜   |
| 1.3 | VConfetti 添加 reduced-motion 支持      | 2h   | -      | ⬜   |
| 1.4 | VNeonText 添加 reduced-motion 支持      | 1h   | -      | ⬜   |
| 1.5 | VGlitch 添加 reduced-motion 支持        | 1h   | -      | ⬜   |
| 1.6 | VCarousel3D 添加 reduced-motion 支持    | 2h   | -      | ⬜   |
| 1.7 | VLightbox 添加焦点陷阱                  | 3h   | -      | ⬜   |
| 1.8 | 创建 VTypingText.test.ts                | 2h   | -      | ⬜   |
| 1.9 | 修复 12 个失败测试用例                  | 4h   | -      | ⬜   |

**交付物**:

- `src/composables/useReducedMotion.ts`
- `src/components/VTypingText.test.ts`
- 所有测试通过

---

## 🏃 Sprint 2: Composables 重构

**时间**: 2026/01/20 - 01/26
**目标**: 抽取共享逻辑，提升代码质量

### 任务列表

| #   | 任务                                 | 预估 | 负责人 | 状态 |
| --- | ------------------------------------ | ---- | ------ | ---- |
| 2.1 | 创建 `useBrowser.ts`                 | 1h   | -      | ✅   |
| 2.2 | 创建 `useAnimation.ts`               | 2h   | -      | ✅   |
| 2.3 | 创建 `useIntersectionObserver.ts`    | 2h   | -      | ✅   |
| 2.4 | 创建 `useResizeObserver.ts`          | 1h   | -      | ✅   |
| 2.5 | 重构 VParticleField 使用 composables | 3h   | -      | ✅   |
| 2.6 | 重构 VScrollReveal 使用 composables  | 2h   | -      | ✅   |
| 2.7 | 重构 VConfetti 使用 composables      | 2h   | -      | ✅   |
| 2.8 | 重构 VStarfield 使用 composables     | 2h   | -      | ✅   |
| 2.9 | 为 composables 编写单元测试          | 3h   | -      | ✅   |

**交付物**:

- `src/composables/` 目录完整 ✅
- 4 个组件重构完成 ✅
- Composables 测试覆盖 ✅

---

## 🏃 Sprint 3: VCountUp + VMarquee

**时间**: 2026/01/27 - 02/02
**目标**: 开发两个高需求新组件

### 任务列表

| #   | 任务                  | 预估 | 负责人 | 状态 |
| --- | --------------------- | ---- | ------ | ---- |
| 3.1 | VCountUp 组件开发     | 4h   | -      | ⬜   |
| 3.2 | VCountUp 测试编写     | 2h   | -      | ⬜   |
| 3.3 | VCountUp 文档编写     | 1h   | -      | ⬜   |
| 3.4 | VMarquee 组件开发     | 4h   | -      | ⬜   |
| 3.5 | VMarquee 测试编写     | 2h   | -      | ⬜   |
| 3.6 | VMarquee 文档编写     | 1h   | -      | ⬜   |
| 3.7 | 导出新组件到 index.ts | 0.5h | -      | ⬜   |
| 3.8 | 更新 README 组件列表  | 0.5h | -      | ⬜   |

**交付物**:

- `src/components/VCountUp.vue`
- `src/components/VMarquee.vue`
- 对应测试和文档

### VCountUp 规格

```typescript
interface VCountUpProps {
  endValue: number
  startValue?: number // 默认 0
  duration?: number // 默认 2000ms
  separator?: string // 默认 ','
  decimal?: string // 默认 '.'
  decimals?: number // 默认 0
  prefix?: string // 默认 ''
  suffix?: string // 默认 ''
  easing?: 'linear' | 'easeOut' | 'easeInOut'
  autoStart?: boolean // 默认 true
  scrollTrigger?: boolean // 默认 false
}
```

### VMarquee 规格

```typescript
interface VMarqueeProps {
  speed?: number // 默认 50 (px/s)
  direction?: 'left' | 'right' | 'up' | 'down'
  pauseOnHover?: boolean // 默认 true
  gradient?: boolean // 默认 true
  gradientColor?: string // 默认 'white'
  gradientWidth?: string // 默认 '100px'
  gap?: string // 默认 '1rem'
}
```

---

## 🏃 Sprint 4: 性能优化 + 组件增强

**时间**: 2026/02/02 - 02/08
**目标**: 优化性能，增强现有组件

### 任务列表

| #   | 任务                            | 预估 | 负责人 | 状态 |
| --- | ------------------------------- | ---- | ------ | ---- |
| 4.1 | 创建 `src/utils/performance.ts` | 2h   | -      | ⬜   |
| 4.2 | VParticleField 添加性能等级     | 3h   | -      | ⬜   |
| 4.3 | VScrollReveal 添加动画预设      | 3h   | -      | ⬜   |
| 4.4 | VCarousel3D 添加过渡效果        | 4h   | -      | ⬜   |
| 4.5 | VConfetti 支持 emoji            | 2h   | -      | ⬜   |
| 4.6 | VNeonText 支持渐变色            | 2h   | -      | ⬜   |
| 4.7 | 更新相关组件文档                | 2h   | -      | ⬜   |

**交付物**:

- 性能检测工具
- 5 个组件功能增强

---

## 🏃 Sprint 5: VCursor + VTextReveal

**时间**: 2026/02/09 - 02/15
**目标**: 开发两个交互型新组件

### 任务列表

| #   | 任务                 | 预估 | 负责人 | 状态 |
| --- | -------------------- | ---- | ------ | ---- |
| 5.1 | VCursor 组件开发     | 6h   | -      | ⬜   |
| 5.2 | VCursor 测试编写     | 2h   | -      | ⬜   |
| 5.3 | VCursor 文档编写     | 1h   | -      | ⬜   |
| 5.4 | VTextReveal 组件开发 | 6h   | -      | ⬜   |
| 5.5 | VTextReveal 测试编写 | 2h   | -      | ⬜   |
| 5.6 | VTextReveal 文档编写 | 1h   | -      | ⬜   |

**交付物**:

- `src/components/VCursor.vue`
- `src/components/VTextReveal.vue`

### VCursor 规格

```typescript
interface VCursorProps {
  type?: 'dot' | 'ring' | 'dot-ring' | 'custom'
  size?: number // 默认 20
  color?: string // 默认 '#000'
  ringSize?: number // 默认 40
  ringColor?: string // 默认 'rgba(0,0,0,0.2)'
  mixBlendMode?: string // 默认 'difference'
  magneticSelector?: string // CSS 选择器
  magneticStrength?: number // 默认 0.3
  hideOnLeave?: boolean // 默认 true
  hideOnMobile?: boolean // 默认 true
  transitionDuration?: number
}
```

### VTextReveal 规格

```typescript
interface VTextRevealProps {
  text?: string // 或使用 slot
  mode?: 'char' | 'word' | 'line'
  animation?: 'fade' | 'slide-up' | 'slide-down' | 'blur' | 'clip'
  stagger?: number // 默认 50ms
  duration?: number // 默认 500ms
  trigger?: 'scroll' | 'hover' | 'auto' | 'manual'
  threshold?: number // scroll 触发阈值
  delay?: number // 初始延迟
  easing?: string
}
```

---

## 🏃 Sprint 6: 文档完善 + v0.4.0 发布

**时间**: 2026/02/16 - 02/22
**目标**: 完善文档，发布新版本

### 任务列表

| #   | 任务                     | 预估 | 负责人 | 状态 |
| --- | ------------------------ | ---- | ------ | ---- |
| 6.1 | 添加组件 Playground 页面 | 4h   | -      | ⬜   |
| 6.2 | 编写最佳实践指南         | 2h   | -      | ⬜   |
| 6.3 | 编写性能优化指南         | 2h   | -      | ⬜   |
| 6.4 | 编写无障碍使用指南       | 2h   | -      | ⬜   |
| 6.5 | 更新 CHANGELOG           | 1h   | -      | ⬜   |
| 6.6 | 版本号更新到 0.4.0       | 0.5h | -      | ⬜   |
| 6.7 | 构建测试                 | 1h   | -      | ⬜   |
| 6.8 | 发布 npm 包              | 0.5h | -      | ⬜   |
| 6.9 | 部署文档站点             | 1h   | -      | ⬜   |

**交付物**:

- v0.4.0 发布
- 完整文档站点

---

## 🏃 Sprint 7-8: 高级性能优化

**时间**: 2026/03/01 - 03/14
**目标**: Canvas 性能深度优化

### 任务列表

| #   | 任务                                | 预估 | 状态 |
| --- | ----------------------------------- | ---- | ---- |
| 7.1 | 研究 OffscreenCanvas API            | 2h   | ⬜   |
| 7.2 | VParticleField OffscreenCanvas 实现 | 6h   | ⬜   |
| 7.3 | 研究 Web Worker 粒子计算            | 2h   | ⬜   |
| 7.4 | 实现粒子计算 Worker                 | 8h   | ⬜   |
| 7.5 | 实现粒子对象池                      | 4h   | ⬜   |
| 7.6 | Canvas 脏矩形渲染                   | 6h   | ⬜   |
| 7.7 | 性能基准测试                        | 4h   | ⬜   |

---

## 🏃 Sprint 9-10: 更多新组件

**时间**: 2026/03/15 - 03/28
**目标**: 扩展组件库

### 任务列表

| #   | 任务                  | 预估 | 状态 |
| --- | --------------------- | ---- | ---- |
| 9.1 | VMorphText 组件       | 8h   | ⬜   |
| 9.2 | VWaveBackground 组件  | 6h   | ⬜   |
| 9.3 | VBlob 组件            | 6h   | ⬜   |
| 9.4 | VTilt 组件 (含陀螺仪) | 6h   | ⬜   |
| 9.5 | VFlipCard 组件        | 4h   | ⬜   |
| 9.6 | VSkeleton 组件        | 4h   | ⬜   |
| 9.7 | 所有新组件测试        | 8h   | ⬜   |
| 9.8 | 所有新组件文档        | 4h   | ⬜   |

**交付物**: v0.5.0 发布

---

## 🏃 Sprint 11-12: 架构升级

**时间**: 2026/04/01 - 04/14
**目标**: 提升架构质量

### 任务列表

| #    | 任务                   | 预估 | 状态 |
| ---- | ---------------------- | ---- | ---- |
| 11.1 | 全局配置 Provider 设计 | 2h   | ⬜   |
| 11.2 | 全局配置 Provider 实现 | 4h   | ⬜   |
| 11.3 | Tree-shaking 优化      | 4h   | ⬜   |
| 11.4 | Nuxt 模块开发          | 6h   | ⬜   |
| 11.5 | unplugin resolver 开发 | 4h   | ⬜   |
| 11.6 | 构建产物优化           | 4h   | ⬜   |

---

## 🏃 Sprint 13: 无障碍完善 + v1.0.0

**时间**: 2026/04/15 - 04/28
**目标**: 完善无障碍，正式发布

### 任务列表

| #    | 任务               | 预估 | 状态 |
| ---- | ------------------ | ---- | ---- |
| 13.1 | 所有组件 ARIA 审查 | 4h   | ⬜   |
| 13.2 | 键盘导航完善       | 6h   | ⬜   |
| 13.3 | 屏幕阅读器测试     | 4h   | ⬜   |
| 13.4 | WCAG 2.1 AA 检查   | 4h   | ⬜   |
| 13.5 | 最终测试回归       | 4h   | ⬜   |
| 13.6 | v1.0.0 发布准备    | 2h   | ⬜   |
| 13.7 | 发布公告编写       | 2h   | ⬜   |
| 13.8 | v1.0.0 正式发布    | 1h   | ⬜   |

**交付物**: v1.0.0 正式版

---

## 📊 里程碑

| 版本   | 日期       | 主要内容                 |
| ------ | ---------- | ------------------------ |
| v0.3.1 | 2026/01/26 | 无障碍基础 + Composables |
| v0.4.0 | 2026/02/22 | 4 个新组件 + 组件增强    |
| v0.5.0 | 2026/03/31 | 性能优化 + 6 个新组件    |
| v1.0.0 | 2026/04/28 | 架构升级 + 无障碍完善    |

---

## 📈 资源估算

### 工时统计

| Sprint       | 预估工时 |
| ------------ | -------- |
| Sprint 1     | 19h      |
| Sprint 2     | 18h      |
| Sprint 3     | 15h      |
| Sprint 4     | 18h      |
| Sprint 5     | 18h      |
| Sprint 6     | 14h      |
| Sprint 7-8   | 32h      |
| Sprint 9-10  | 46h      |
| Sprint 11-12 | 24h      |
| Sprint 13    | 27h      |
| **总计**     | **231h** |

### 按周分配 (假设每周 20h)

- 1月: 40h (Sprint 1-2)
- 2月: 65h (Sprint 3-6)
- 3月: 78h (Sprint 7-10)
- 4月: 51h (Sprint 11-13)

---

## ⚠️ 风险与应对

| 风险                  | 可能性 | 影响 | 应对措施                 |
| --------------------- | ------ | ---- | ------------------------ |
| Web Worker 兼容性问题 | 中     | 中   | 提供降级方案             |
| 陀螺仪 API 权限问题   | 高     | 低   | 可选功能，优雅降级       |
| 测试覆盖不足          | 中     | 高   | 每个 Sprint 包含测试任务 |
| 文档滞后              | 高     | 中   | 组件开发与文档同步       |

---

## 🎯 成功标准

### v1.0.0 发布标准

- [ ] 24+ 组件 (当前 18 + 新增 6)
- [ ] 测试覆盖率 ≥ 90%
- [ ] 所有组件支持 SSR
- [ ] 所有组件支持 reduced-motion
- [ ] WCAG 2.1 AA 合规
- [ ] 完整 TypeScript 类型
- [ ] 完整 API 文档
- [ ] npm 周下载量 > 1000
