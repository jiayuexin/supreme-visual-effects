# VGlitch 故障效果组件

VGlitch 是一个故障效果组件，可以为任何内容添加炫酷的数字故障效果。

## 基础用法

<div class="demo">
  <div style="padding: 2rem; background: #000; border-radius: 8px; text-align: center;">
    <VGlitch>
      <h1 style="color: white; margin: 0;">故障文字效果</h1>
    </VGlitch>
  </div>
</div>

```vue
<template>
  <VGlitch>
    <h1>故障文字效果</h1>
  </VGlitch>
</template>

<script setup>
import { VGlitch } from 'supreme-visual-effects'
</script>
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| enabled | `boolean` | `true` | 是否启用故障效果 |
| autoTrigger | `boolean` | `false` | 是否自动触发故障效果 |
| triggerInterval | `number` | `3000` | 自动触发间隔（毫秒） |
| intensity | `number` | `0.5` | 故障效果强度 |
| duration | `number` | `200` | 故障效果持续时间（毫秒） |
| effects | `GlitchEffect[]` | `[{ type: 'shake', intensity: 0.8, duration: 100 }, { type: 'rgb', intensity: 0.6, duration: 150 }, { type: 'noise', intensity: 0.4, duration: 200 }]` | 故障效果配置数组 |
| shakeIntensity | `number` | `10` | 震动效果强度 |
| rgbIntensity | `number` | `5` | RGB分离效果强度 |
| noiseIntensity | `number` | `0.1` | 噪点效果强度 |
| scanIntensity | `number` | `2` | 扫描线效果强度 |
| distortIntensity | `number` | `0.05` | 扭曲效果强度 |
| color | `string` | `'#ff0000'` | 故障颜色 |
| backgroundColor | `string` | `'#000000'` | 背景颜色 |

## Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| glitch-start | `()` | 故障效果开始时触发 |
| glitch-end | `()` | 故障效果结束时触发 |
| glitch-trigger | `()` | 故障效果触发时触发 |

## 类型定义

```ts
interface GlitchEffect {
  type: 'shake' | 'rgb' | 'noise' | 'scan' | 'distort'
  intensity: number
  duration: number
}
```

## 效果类型说明

### Shake 震动效果
元素会产生随机的位移和颜色变化。

### RGB RGB分离效果
创建红、绿、蓝三色分离的视觉效果。

### Noise 噪点效果
添加随机噪点和对比度变化。

### Scan 扫描线效果
模拟老式显示器的扫描线效果。

### Distort 扭曲效果
元素会产生随机的扭曲变形。

## 示例

### 基础故障效果
<div class="demo">
  <div style="padding: 2rem; background: #000; border-radius: 8px; text-align: center;">
    <VGlitch>
      <h1 style="color: white; margin: 0;">基础故障效果</h1>
    </VGlitch>
  </div>
</div>

```vue
<template>
  <VGlitch>
    <h1>基础故障效果</h1>
  </VGlitch>
</template>

<script setup>
import { VGlitch } from 'supreme-visual-effects'
</script>
```

### 自动触发故障效果
<div class="demo">
  <div style="padding: 2rem; background: #000; border-radius: 8px; text-align: center;">
    <VGlitch :autoTrigger="true" :triggerInterval="2000">
      <h2 style="color: white; margin: 0;">自动故障效果</h2>
    </VGlitch>
  </div>
</div>

```vue
<template>
  <VGlitch :autoTrigger="true" :triggerInterval="2000">
    <h2>自动故障效果</h2>
  </VGlitch>
</template>

<script setup>
import { VGlitch } from 'supreme-visual-effects'
</script>
```

### 自定义故障效果
<div class="demo">
  <div style="padding: 2rem; background: #000; border-radius: 8px; text-align: center;">
    <VGlitch 
      :effects="customEffects" 
      :intensity="0.8" 
      :duration="300"
    >
      <h3 style="color: white; margin: 0;">自定义故障效果</h3>
    </VGlitch>
  </div>
</div>

```vue
<template>
  <VGlitch 
    :effects="customEffects" 
    :intensity="0.8" 
    :duration="300"
  >
    <h3>自定义故障效果</h3>
  </VGlitch>
</template>

<script setup>
import { VGlitch } from 'supreme-visual-effects'

const customEffects = [
  { type: 'shake', intensity: 1.0, duration: 150 },
  { type: 'rgb', intensity: 0.9, duration: 200 },
  { type: 'distort', intensity: 0.7, duration: 100 }
]
</script>
```

### 鼠标悬停触发
<div class="demo">
  <div style="padding: 2rem; background: #000; border-radius: 8px; text-align: center;">
    <VGlitch :enabled="true">
      <button style="padding: 1rem 2rem; background: #4f46e5; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 1rem;">
        悬停触发故障效果
      </button>
    </VGlitch>
  </div>
</div>

```vue
<template>
  <VGlitch :enabled="true">
    <button>悬停触发故障效果</button>
  </VGlitch>
</template>

<script setup>
import { VGlitch } from 'supreme-visual-effects'
</script>
```

### 自定义强度
<div class="demo">
  <div style="padding: 2rem; background: #000; border-radius: 8px; text-align: center;">
    <VGlitch 
      :shakeIntensity="15" 
      :rgbIntensity="8" 
      :noiseIntensity="0.3"
    >
      <p style="color: white; margin: 0; font-size: 1.2rem;">高强度故障效果</p>
    </VGlitch>
  </div>
</div>

```vue
<template>
  <VGlitch 
    :shakeIntensity="15" 
    :rgbIntensity="8" 
    :noiseIntensity="0.3"
  >
    <p>高强度故障效果</p>
  </VGlitch>
</template>

<script setup>
import { VGlitch } from 'supreme-visual-effects'
</script>
```

## 方法

可以通过模板引用调用以下方法：

| 方法名 | 参数 | 说明 |
| --- | --- | --- |
| triggerGlitch | `()` | 手动触发一次故障效果 |

<div class="demo">
  <div style="padding: 2rem; background: #000; border-radius: 8px; text-align: center; margin-bottom: 1rem;">
    <VGlitch ref="glitchRef">
      <h1 style="color: white; margin: 0;">手动触发故障效果</h1>
    </VGlitch>
  </div>
  <div style="text-align: center;">
    <button @click="trigger" style="padding: 0.5rem 1rem; background: #4f46e5; color: white; border: none; border-radius: 4px; cursor: pointer;">
      触发故障
    </button>
  </div>
</div>

```vue
<template>
  <VGlitch ref="glitchRef">
    <h1>手动触发故障效果</h1>
  </VGlitch>
  <button @click="trigger">触发故障</button>
</template>

<script setup>
import { VGlitch } from 'supreme-visual-effects'
import { ref } from 'vue'

const glitchRef = ref()

const trigger = () => {
  glitchRef.value.triggerGlitch()
}
</script>
```

## 注意事项

1. 故障效果会为内容创建额外的图层以实现RGB分离效果
2. 在性能较低的设备上建议降低效果强度
3. 可以通过CSS变量自定义样式
4. 故障效果适用于标题、按钮等需要视觉冲击的元素

<script setup>
import { ref } from 'vue'
import { VGlitch } from '../../src/index'

const glitchRef = ref()

const trigger = () => {
  glitchRef.value?.triggerGlitch()
}

const customEffects = [
  { type: 'shake', intensity: 1.0, duration: 150 },
  { type: 'rgb', intensity: 0.9, duration: 200 },
  { type: 'distort', intensity: 0.7, duration: 100 }
]
</script>

<style>
.demo {
  margin: 2rem 0;
}
</style>