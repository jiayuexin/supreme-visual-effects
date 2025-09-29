# VConfetti 彩纸效果组件

VConfetti 是一个炫酷的彩纸效果组件，可用于庆祝、奖励等场景。

## 基础用法

```vue
<template>
  <VConfetti :enabled="showConfetti" />
  <button @click="triggerConfetti">触发彩纸效果</button>
</template>

<script setup>
import { VConfetti } from 'supreme-visual-effects'
import { ref } from 'vue'

const showConfetti = ref(false)

const triggerConfetti = () => {
  showConfetti.value = true
  // 3秒后停止
  setTimeout(() => {
    showConfetti.value = false
  }, 3000)
}
</script>
```

## Props

| 属性名             | 类型                                              | 默认值                                                               | 说明                 |
| ------------------ | ------------------------------------------------- | -------------------------------------------------------------------- | -------------------- |
| enabled            | `boolean`                                         | `true`                                                               | 是否启用彩纸效果     |
| particleCount      | `number`                                          | `100`                                                                | 粒子数量             |
| colors             | `string[]`                                        | `['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3']` | 粒子颜色数组         |
| shapes             | `('circle' \| 'square' \| 'triangle')[]`          | `['circle', 'square', 'triangle']`                                   | 粒子形状数组         |
| gravity            | `number`                                          | `0.3`                                                                | 重力系数             |
| wind               | `number`                                          | `0.1`                                                                | 风力系数             |
| speed              | `number`                                          | `5`                                                                  | 粒子速度             |
| spread             | `number`                                          | `45`                                                                 | 发散角度             |
| size               | `number`                                          | `8`                                                                  | 粒子大小             |
| duration           | `number`                                          | `3000`                                                               | 持续时间（毫秒）     |
| burst              | `boolean`                                         | `true`                                                               | 是否为爆发模式       |
| continuous         | `boolean`                                         | `false`                                                              | 是否为连续模式       |
| continuousInterval | `number`                                          | `1000`                                                               | 连续模式间隔（毫秒） |
| position           | `'top' \| 'center' \| 'bottom' \| 'random'`       | `'top'`                                                              | 发射位置             |
| direction          | `'up' \| 'down' \| 'left' \| 'right' \| 'random'` | `'up'`                                                               | 发射方向             |

## Events

| 事件名           | 参数                           | 说明               |
| ---------------- | ------------------------------ | ------------------ |
| confetti-start   | `()`                           | 彩纸效果开始时触发 |
| confetti-end     | `()`                           | 彩纸效果结束时触发 |
| particle-create  | `(particle: ConfettiParticle)` | 粒子创建时触发     |
| particle-destroy | `(particle: ConfettiParticle)` | 粒子销毁时触发     |

## 类型定义

```ts
interface ConfettiParticle {
  x: number
  y: number
  vx: number
  vy: number
  rotation: number
  rotationSpeed: number
  color: string
  size: number
  shape: 'circle' | 'square' | 'triangle'
  life: number
  maxLife: number
}
```

## 示例

### 基础彩纸效果

<div class="demo">
  <div style="position: relative; height: 300px; background: #1a1a1a; border-radius: 8px; overflow: hidden; margin-bottom: 1rem;">
    <VConfetti 
      :enabled="showBasicConfetti" 
      :particleCount="150" 
      :colors="['#ff6b6b', '#4ecdc4', '#45b7d1']" 
    />
    <div style="position: relative; z-index: 1; height: 100%; display: flex; align-items: center; justify-content: center; color: white; text-align: center; padding: 2rem;">
      <div>
        <h2>基础彩纸效果</h2>
        <p>点击下方按钮触发彩纸</p>
        <button @click="toggleBasicConfetti" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #4f46e5; color: white; border: none; border-radius: 4px; cursor: pointer;">
          {{ showBasicConfetti ? '停止彩纸' : '触发彩纸' }}
        </button>
      </div>
    </div>
  </div>
</div>

```vue
<template>
  <div style="position: relative; height: 300px; background: #1a1a1a;">
    <VConfetti :enabled="showBasicConfetti" :particleCount="150" :colors="['#ff6b6b', '#4ecdc4', '#45b7d1']" />
    <div
      style="position: relative; z-index: 1; height: 100%; display: flex; align-items: center; justify-content: center; color: white; text-align: center; padding: 2rem;"
    >
      <div>
        <h2>基础彩纸效果</h2>
        <p>点击下方按钮触发彩纸</p>
        <button
          @click="toggleBasicConfetti"
          style="margin-top: 1rem; padding: 0.5rem 1rem; background: #4f46e5; color: white; border: none; border-radius: 4px; cursor: pointer;"
        >
          {{ showBasicConfetti ? '停止彩纸' : '触发彩纸' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { VConfetti } from 'supreme-visual-effects'

const showBasicConfetti = ref(false)
const toggleBasicConfetti = () => {
  showBasicConfetti.value = !showBasicConfetti.value
}
</script>
```

### 爆发模式

<div class="demo">
  <div style="position: relative; height: 300px; background: #1a1a1a; border-radius: 8px; overflow: hidden; margin-bottom: 1rem;">
    <VConfetti 
      ref="burstConfettiRef"
      :burst="true" 
      :position="'center'" 
      :duration="2000" 
      :particleCount="200"
    />
    <div style="position: relative; z-index: 1; height: 100%; display: flex; align-items: center; justify-content: center; color: white; text-align: center; padding: 2rem;">
      <div>
        <h2>爆发模式</h2>
        <p>点击按钮触发一次彩纸爆发</p>
        <button @click="triggerBurst" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #4f46e5; color: white; border: none; border-radius: 4px; cursor: pointer;">
          爆发彩纸
        </button>
      </div>
    </div>
  </div>
</div>

```vue
<template>
  <div style="position: relative; height: 300px; background: #1a1a1a;">
    <VConfetti ref="burstConfettiRef" :burst="true" :position="'center'" :duration="2000" :particleCount="200" />
    <div
      style="position: relative; z-index: 1; height: 100%; display: flex; align-items: center; justify-content: center; color: white; text-align: center; padding: 2rem;"
    >
      <div>
        <h2>爆发模式</h2>
        <p>点击按钮触发一次彩纸爆发</p>
        <button
          @click="triggerBurst"
          style="margin-top: 1rem; padding: 0.5rem 1rem; background: #4f46e5; color: white; border: none; border-radius: 4px; cursor: pointer;"
        ></button>
      </div>
    </div>
  </div>
</template>
```
