# VWaveBackground 波浪背景

VWaveBackground 是一个基于 Canvas 的波浪动画背景组件。

## 基础用法

<div class="demo">
  <div style="position: relative; height: 300px; background: #f8f9fa; border-radius: 8px; overflow: hidden;">
    <VWaveBackground />
  </div>
</div>

```vue
<template>
  <div style="position: relative; height: 400px;">
    <VWaveBackground />
  </div>
</template>

<script setup>
import { VWaveBackground } from 'supreme-visual-effects'
</script>
```

## Props

| 属性名               | 类型       | 默认值                                    | 说明                         |
| -------------------- | ---------- | ----------------------------------------- | ---------------------------- |
| waveCount            | `number`   | `3`                                       | 波浪层数                     |
| waveColor            | `string[]` | `['#667eea20', '#764ba220', '#f093fb20']` | 波浪颜色(8位十六进制带alpha) |
| waveSpeed            | `number`   | `1`                                       | 波浪速度                     |
| amplitude            | `number`   | `50`                                      | 波浪振幅                     |
| frequency            | `number`   | `0.01`                                    | 波浪频率                     |
| respectReducedMotion | `boolean`  | `true`                                    | 是否尊重减少动画偏好         |

## Events

| 事件名 | 参数 | 说明           |
| ------ | ---- | -------------- |
| start  | `()` | 动画开始时触发 |
| stop   | `()` | 动画停止时触发 |

## Expose Methods

| 方法名 | 参数 | 说明     |
| ------ | ---- | -------- |
| start  | `()` | 启动动画 |
| stop   | `()` | 停止动画 |

## 示例

### 多层波浪

<div class="demo">
  <div style="position: relative; height: 300px; background: #f8f9fa; border-radius: 8px; overflow: hidden;">
    <VWaveBackground :wave-count="5" :wave-color="['#667eea30', '#764ba230', '#f093fb30', '#ffecd230', '#fcb69f30']" />
  </div>
</div>

```vue
<template>
  <VWaveBackground :wave-count="5" :wave-color="['#667eea30', '#764ba230', '#f093fb30', '#ffecd230', '#fcb69f30']" />
</template>
```

### 慢速大波浪

<div class="demo">
  <div style="position: relative; height: 300px; background: #f8f9fa; border-radius: 8px; overflow: hidden;">
    <VWaveBackground :wave-speed="0.5" :amplitude="80" />
  </div>
</div>

```vue
<template>
  <VWaveBackground :wave-speed="0.5" :amplitude="80" />
</template>
```

## 使用场景

1. **着陆页** - 作为页面首屏的背景动画
2. **Hero Section** - 增强视觉吸引力的主横幅
3. **登录/注册页** - 提升品牌感的背景

## 注意事项

1. 组件需要父容器设置 `position: relative` 和高度
2. 使用 Canvas 渲染，性能优于 DOM 动画
3. 窗口大小变化时自动适配，支持高 DPI 屏幕
4. 启用 `respectReducedMotion` 且用户偏好减少动画时不会启动动画

<script setup>
import { VWaveBackground } from '../../src/index'
</script>

<style>
.demo {
  margin: 2rem 0;
}
</style>
