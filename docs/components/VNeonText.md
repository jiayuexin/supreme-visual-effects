# VNeonText 霓虹文字组件

VNeonText 是一个霓虹文字组件，可以创建炫酷的发光文字效果。

## 基础用法

<div class="demo">
  <div style="display: flex; justify-content: center; padding: 2rem; background: #000;">
    <VNeonText text="霓虹文字" />
  </div>
</div>

```vue
<template>
  <VNeonText text="霓虹文字" />
</template>

<script setup>
import { VNeonText } from 'supreme-visual-effects'
</script>
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| text | `string` | `''` | 显示的文字内容 |
| color | `string` | `'#00ffff'` | 文字颜色 |
| glowColor | `string` | `'#00ffff'` | 发光颜色 |
| glowIntensity | `number` | `20` | 发光强度 |
| glowSpread | `number` | `5` | 发光扩散程度 |
| animation | `boolean` | `true` | 是否启用动画 |
| animationType | `'flicker' \| 'pulse' \| 'wave' \| 'none'` | `'flicker'` | 动画类型 |
| animationSpeed | `number` | `1` | 动画速度 |
| fontSize | `string` | `'2rem'` | 字体大小 |
| fontFamily | `string` | `'Arial, sans-serif'` | 字体族 |
| fontWeight | `string` | `'bold'` | 字体粗细 |
| hoverEffect | `boolean` | `true` | 是否启用悬停效果 |
| hoverGlowIntensity | `number` | `40` | 悬停时发光强度 |

## Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| mouse-enter | `()` | 鼠标进入时触发 |
| mouse-leave | `()` | 鼠标离开时触发 |

## 示例

### 自定义颜色
<div class="demo">
  <div style="display: flex; justify-content: center; gap: 2rem; padding: 2rem; background: #000; flex-wrap: wrap;">
    <VNeonText text="青色霓虹" color="#00ffff" glow-color="#00ffff" />
    <VNeonText text="粉色霓虹" color="#ff69b4" glow-color="#ff69b4" />
    <VNeonText text="紫色霓虹" color="#9370db" glow-color="#9370db" />
  </div>
</div>

```vue
<template>
  <VNeonText text="青色霓虹" color="#00ffff" glow-color="#00ffff" />
  <VNeonText text="粉色霓虹" color="#ff69b4" glow-color="#ff69b4" />
  <VNeonText text="紫色霓虹" color="#9370db" glow-color="#9370db" />
</template>

<script setup>
import { VNeonText } from 'supreme-visual-effects'
</script>
```

### 调整发光强度
<div class="demo">
  <div style="display: flex; justify-content: center; gap: 2rem; padding: 2rem; background: #000; flex-wrap: wrap;">
    <VNeonText text="弱发光" :glow-intensity="10" />
    <VNeonText text="中等发光" :glow-intensity="20" />
    <VNeonText text="强发光" :glow-intensity="30" />
  </div>
</div>

```vue
<template>
  <VNeonText text="弱发光" :glow-intensity="10" />
  <VNeonText text="中等发光" :glow-intensity="20" />
  <VNeonText text="强发光" :glow-intensity="30" />
</template>

<script setup>
import { VNeonText } from 'supreme-visual-effects'
</script>
```

### 动画效果
<div class="demo">
  <div style="display: flex; justify-content: center; gap: 2rem; padding: 2rem; background: #000; flex-wrap: wrap;">
    <VNeonText text="闪烁" animation-type="flicker" />
    <VNeonText text="脉冲" animation-type="pulse" />
    <VNeonText text="波动" animation-type="wave" />
  </div>
</div>

```vue
<template>
  <VNeonText text="闪烁" animation-type="flicker" />
  <VNeonText text="脉冲" animation-type="pulse" />
  <VNeonText text="波动" animation-type="wave" />
</template>

<script setup>
import { VNeonText } from 'supreme-visual-effects'
</script>
```

### 自定义字体
<div class="demo">
  <div style="display: flex; justify-content: center; gap: 2rem; padding: 2rem; background: #000; flex-wrap: wrap;">
    <VNeonText text="粗体" font-weight="bold" font-size="2.5rem" />
    <VNeonText text="斜体" font-family="'Courier New', monospace" font-size="2.5rem" />
  </div>
</div>

```vue
<template>
  <VNeonText text="粗体" font-weight="bold" font-size="2.5rem" />
  <VNeonText text="斜体" font-family="'Courier New', monospace" font-size="2.5rem" />
</template>

<script setup>
import { VNeonText } from 'supreme-visual-effects'
</script>
```

### 悬停效果
<div class="demo">
  <div style="display: flex; justify-content: center; padding: 2rem; background: #000;">
    <VNeonText 
      text="悬停增强" 
      :hover-glow-intensity="50"
      hover-effect
    />
  </div>
</div>

```vue
<template>
  <VNeonText 
    text="悬停增强" 
    :hover-glow-intensity="50"
    hover-effect
  />
</template>

<script setup>
import { VNeonText } from 'supreme-visual-effects'
</script>
```

### 无动画文字
<div class="demo">
  <div style="display: flex; justify-content: center; padding: 2rem; background: #000;">
    <VNeonText 
      text="静态霓虹" 
      :animation="false"
    />
  </div>
</div>

```vue
<template>
  <VNeonText 
    text="静态霓虹" 
    :animation="false"
  />
</template>

<script setup>
import { VNeonText } from 'supreme-visual-effects'
</script>
```

### 多行文字
<div class="demo">
  <div style="display: flex; justify-content: center; padding: 2rem; background: #000;">
    <div style="text-align: center;">
      <VNeonText text="欢迎来到" font-size="1.5rem" />
      <VNeonText text="霓虹世界" font-size="3rem" color="#ff69b4" glow-color="#ff69b4" />
    </div>
  </div>
</div>

```vue
<template>
  <div style="text-align: center;">
    <VNeonText text="欢迎来到" font-size="1.5rem" />
    <VNeonText text="霓虹世界" font-size="3rem" color="#ff69b4" glow-color="#ff69b4" />
  </div>
</template>

<script setup>
import { VNeonText } from 'supreme-visual-effects'
</script>
```

## 使用场景

1. **网站标题** - 为网站标题添加霓虹效果
2. **游戏界面** - 为游戏标题和UI元素添加霓虹效果
3. **活动宣传** - 为活动标题添加炫酷的发光效果
4. **作品展示** - 为作品标题添加视觉吸引力

## 注意事项

1. 组件需要深色背景才能显示最佳效果
2. 在性能较低的设备上建议降低动画速度
3. 组件会在卸载时自动清理动画帧
4. 可以通过CSS自定义字体和样式

<script setup>
import { VNeonText } from '../../src/index'
</script>

<style>
.demo {
  margin: 2rem 0;
}
</style>