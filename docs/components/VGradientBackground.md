# VGradientBackground 渐变背景组件

VGradientBackground 是一个高性能的渐变背景组件，支持多种渐变类型和动画效果。

## 基础用法

<div class="demo">
  <div style="position: relative; height: 300px; border-radius: 8px; overflow: hidden;">
    <VGradientBackground />
    <div style="position: relative; z-index: 1; height: 100%; display: flex; align-items: center; justify-content: center; color: white; text-align: center; padding: 2rem;">
      <div>
        <h2>渐变背景</h2>
        <p>默认线性渐变背景</p>
      </div>
    </div>
  </div>
</div>

```vue
<template>
  <div style="position: relative; height: 300px;">
    <VGradientBackground />
    <div style="position: relative; z-index: 1; height: 100%; display: flex; align-items: center; justify-content: center; color: white;">
      <h2>内容</h2>
    </div>
  </div>
</template>

<script setup>
import { VGradientBackground } from 'supreme-visual-effects'
</script>
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| layers | `GradientLayer[]` | `[默认图层]` | 渐变图层配置 |
| animation | `boolean` | `true` | 是否启用动画 |
| speed | `number` | `1` | 动画速度 |

### GradientLayer 类型

```ts
interface GradientLayer {
  type: 'linear' | 'radial' | 'conic'
  direction?: string
  stops: GradientStop[]
  animation?: {
    type: 'flow' | 'breathe' | 'twinkle'
    duration: number
    intensity: number
  }
}

interface GradientStop {
  color: string
  position: number
}
```

## 示例

### 线性渐变
<div class="demo">
  <div style="position: relative; height: 300px; border-radius: 8px; overflow: hidden;">
    <VGradientBackground 
      :layers="[
        {
          type: 'linear',
          direction: '135deg',
          stops: [
            { color: '#ff6b6b', position: 0 },
            { color: '#4ecdc4', position: 100 }
          ]
        }
      ]"
    />
    <div style="position: relative; z-index: 1; height: 100%; display: flex; align-items: center; justify-content: center; color: white; text-align: center; padding: 2rem;">
      <div>
        <h2>线性渐变</h2>
        <p>135度方向渐变</p>
      </div>
    </div>
  </div>
</div>

```vue
<template>
  <div style="position: relative; height: 300px;">
    <VGradientBackground 
      :layers="[
        {
          type: 'linear',
          direction: '135deg',
          stops: [
            { color: '#ff6b6b', position: 0 },
            { color: '#4ecdc4', position: 100 }
          ]
        }
      ]"
    />
  </div>
</template>

<script setup>
import { VGradientBackground } from 'supreme-visual-effects'
</script>
```

### 径向渐变
<div class="demo">
  <div style="position: relative; height: 300px; border-radius: 8px; overflow: hidden;">
    <VGradientBackground 
      :layers="[
        {
          type: 'radial',
          stops: [
            { color: '#667eea', position: 0 },
            { color: '#764ba2', position: 100 }
          ]
        }
      ]"
    />
    <div style="position: relative; z-index: 1; height: 100%; display: flex; align-items: center; justify-content: center; color: white; text-align: center; padding: 2rem;">
      <div>
        <h2>径向渐变</h2>
        <p>从中心向外扩散</p>
      </div>
    </div>
  </div>
</div>

```vue
<template>
  <div style="position: relative; height: 300px;">
    <VGradientBackground 
      :layers="[
        {
          type: 'radial',
          stops: [
            { color: '#667eea', position: 0 },
            { color: '#764ba2', position: 100 }
          ]
        }
      ]"
    />
  </div>
</template>

<script setup>
import { VGradientBackground } from 'supreme-visual-effects'
</script>
```

### 多层渐变
<div class="demo">
  <div style="position: relative; height: 300px; border-radius: 8px; overflow: hidden;">
    <VGradientBackground 
      :layers="[
        {
          type: 'linear',
          direction: '45deg',
          stops: [
            { color: 'rgba(102, 126, 234, 0.8)', position: 0 },
            { color: 'rgba(118, 75, 162, 0.8)', position: 100 }
          ]
        },
        {
          type: 'radial',
          stops: [
            { color: 'rgba(255, 107, 107, 0.3)', position: 0 },
            { color: 'rgba(255, 107, 107, 0)', position: 100 }
          ]
        }
      ]"
    />
    <div style="position: relative; z-index: 1; height: 100%; display: flex; align-items: center; justify-content: center; color: white; text-align: center; padding: 2rem;">
      <div>
        <h2>多层渐变</h2>
        <p>线性渐变与径向渐变叠加</p>
      </div>
    </div>
  </div>
</div>

```vue
<template>
  <div style="position: relative; height: 300px;">
    <VGradientBackground 
      :layers="[
        {
          type: 'linear',
          direction: '45deg',
          stops: [
            { color: 'rgba(102, 126, 234, 0.8)', position: 0 },
            { color: 'rgba(118, 75, 162, 0.8)', position: 100 }
          ]
        },
        {
          type: 'radial',
          stops: [
            { color: 'rgba(255, 107, 107, 0.3)', position: 0 },
            { color: 'rgba(255, 107, 107, 0)', position: 100 }
          ]
        }
      ]"
    />
  </div>
</template>

<script setup>
import { VGradientBackground } from 'supreme-visual-effects'
</script>
```

### 动画效果
<div class="demo">
  <div style="position: relative; height: 300px; border-radius: 8px; overflow: hidden;">
    <VGradientBackground 
      :layers="[
        {
          type: 'linear',
          direction: '45deg',
          stops: [
            { color: '#667eea', position: 0 },
            { color: '#764ba2', position: 50 },
            { color: '#f093fb', position: 100 }
          ],
          animation: {
            type: 'flow',
            duration: 8,
            intensity: 0.3
          }
        }
      ]"
    />
    <div style="position: relative; z-index: 1; height: 100%; display: flex; align-items: center; justify-content: center; color: white; text-align: center; padding: 2rem;">
      <div>
        <h2>流动动画</h2>
        <p>颜色流动效果</p>
      </div>
    </div>
  </div>
</div>

```vue
<template>
  <div style="position: relative; height: 300px;">
    <VGradientBackground 
      :layers="[
        {
          type: 'linear',
          direction: '45deg',
          stops: [
            { color: '#667eea', position: 0 },
            { color: '#764ba2', position: 50 },
            { color: '#f093fb', position: 100 }
          ],
          animation: {
            type: 'flow',
            duration: 8,
            intensity: 0.3
          }
        }
      ]"
    />
  </div>
</template>

<script setup>
import { VGradientBackground } from 'supreme-visual-effects'
</script>
```

## 动画类型

| 类型 | 说明 |
| --- | --- |
| flow | 颜色流动效果 |
| breathe | 呼吸效果（透明度变化） |
| twinkle | 闪烁效果（亮度变化） |

## 方法

可以通过模板引用调用以下方法：

| 方法名 | 参数 | 说明 |
| --- | --- | --- |
| pauseAnimation | `()` | 暂停动画 |
| resumeAnimation | `()` | 恢复动画 |
| resetAnimation | `()` | 重置动画时间 |

```vue
<template>
  <div style="position: relative; height: 300px;">
    <VGradientBackground ref="gradientRef" />
  </div>
  <div style="display: flex; gap: 1rem; margin-top: 1rem;">
    <button @click="pause">暂停</button>
    <button @click="resume">恢复</button>
    <button @click="reset">重置</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { VGradientBackground } from 'supreme-visual-effects'

const gradientRef = ref()

const pause = () => {
  gradientRef.value.pauseAnimation()
}

const resume = () => {
  gradientRef.value.resumeAnimation()
}

const reset = () => {
  gradientRef.value.resetAnimation()
}
</script>
```

## 使用场景

1. **页面背景** - 为网站添加动态背景效果
2. **登录页面** - 创建吸引人的登录界面背景
3. **产品展示** - 为产品介绍页面添加视觉效果
4. **仪表板** - 为数据仪表板添加动态背景

## 注意事项

1. 渐变背景组件使用绝对定位，需要父容器有相对定位
2. 组件会自动适应父容器大小
3. 动画会在组件卸载时自动清理
4. 可以通过CSS变量自定义样式

<script setup>
import { ref } from 'vue'
import { VGradientBackground } from '../../src/index'

const gradientRef = ref()

const pause = () => {
  gradientRef.value?.pauseAnimation()
}

const resume = () => {
  gradientRef.value?.resumeAnimation()
}

const reset = () => {
  gradientRef.value?.resetAnimation()
}
</script>

<style>
.demo {
  margin: 2rem 0;
}
</style>