# VParticleField 粒子场组件

VParticleField 是一个高性能的粒子场背景组件，可以创建动态的粒子效果和连接线。

## 基础用法

<div class="demo">
  <div style="position: relative; height: 300px; background: #1a1a1a; border-radius: 8px; overflow: hidden;">
    <VParticleField />
    <div style="position: relative; z-index: 1; height: 100%; display: flex; align-items: center; justify-content: center; color: white; text-align: center; padding: 2rem;">
      <div>
        <h2>页面内容</h2>
        <p>粒子场作为背景效果</p>
      </div>
    </div>
  </div>
</div>

```vue
<template>
  <div style="position: relative; height: 100vh;">
    <VParticleField />
    <div style="position: relative; z-index: 1; padding: 20px;">
      <h1>页面内容</h1>
      <p>粒子场作为背景效果</p>
    </div>
  </div>
</template>

<script setup>
import { VParticleField } from 'supreme-visual-effects'
</script>
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| particleCount | `number` | `100` | 粒子数量 |
| particleColor | `string` | `'rgba(255, 255, 255, 0.8)'` | 粒子颜色 |
| lineColor | `string` | `'rgba(255, 255, 255, 0.2)'` | 连接线颜色 |
| speed | `number` | `0.5` | 粒子移动速度 |
| maxDistance | `number` | `120` | 粒子间连线的最大距离 |
| mouseInteraction | `boolean` | `true` | 是否启用鼠标交互 |
| mouseRadius | `number` | `100` | 鼠标影响半径 |
| connectParticles | `boolean` | `true` | 是否连接粒子 |

## 示例

### 基础粒子场
<div class="demo">
  <div style="position: relative; height: 400px; background: #1a1a1a; border-radius: 8px; overflow: hidden;">
    <VParticleField />
    <div style="position: relative; z-index: 1; height: 100%; display: flex; align-items: center; justify-content: center; color: white; text-align: center; padding: 2rem;">
      <div>
        <h2>粒子场背景</h2>
        <p>基础粒子场效果</p>
      </div>
    </div>
  </div>
</div>

```vue
<template>
  <div style="position: relative; height: 400px; background: #1a1a1a;">
    <VParticleField />
    <div style="position: relative; z-index: 1; height: 100%; display: flex; align-items: center; justify-content: center; color: white; text-align: center; padding: 2rem;">
      <div>
        <h2>粒子场背景</h2>
        <p>基础粒子场效果</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { VParticleField } from 'supreme-visual-effects'
</script>
```

### 自定义粒子数量和颜色
<div class="demo">
  <div style="position: relative; height: 400px; background: #1a1a1a; border-radius: 8px; overflow: hidden;">
    <VParticleField 
      :particleCount="200" 
      particleColor="#4f46e5" 
      lineColor="#c7d2fe" 
    />
    <div style="position: relative; z-index: 1; height: 100%; display: flex; align-items: center; justify-content: center; color: white; text-align: center; padding: 2rem;">
      <div>
        <h2>自定义粒子场</h2>
        <p>紫色粒子场效果</p>
      </div>
    </div>
  </div>
</div>

```vue
<template>
  <div style="position: relative; height: 400px; background: #1a1a1a;">
    <VParticleField 
      :particleCount="200" 
      particleColor="#4f46e5" 
      lineColor="#c7d2fe" 
    />
    <div style="position: relative; z-index: 1; height: 100%; display: flex; align-items: center; justify-content: center; color: white; text-align: center; padding: 2rem;">
      <div>
        <h2>自定义粒子场</h2>
        <p>紫色粒子场效果</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { VParticleField } from 'supreme-visual-effects'
</script>
```

### 调整动画速度
<div class="demo">
  <div style="position: relative; height: 400px; background: #1a1a1a; border-radius: 8px; overflow: hidden;">
    <VParticleField 
      :speed="1.0" 
      :maxDistance="150" 
    />
    <div style="position: relative; z-index: 1; height: 100%; display: flex; align-items: center; justify-content: center; color: white; text-align: center; padding: 2rem;">
      <div>
        <h2>快速粒子场</h2>
        <p>高速移动的粒子</p>
      </div>
    </div>
  </div>
</div>

```vue
<template>
  <div style="position: relative; height: 400px; background: #1a1a1a;">
    <VParticleField 
      :speed="1.0" 
      :maxDistance="150" 
    />
    <div style="position: relative; z-index: 1; height: 100%; display: flex; align-items: center; justify-content: center; color: white; text-align: center; padding: 2rem;">
      <div>
        <h2>快速粒子场</h2>
        <p>高速移动的粒子</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { VParticleField } from 'supreme-visual-effects'
</script>
```

### 深色主题粒子场
<div class="demo">
  <div style="position: relative; height: 400px; background: #1e293b; border-radius: 8px; overflow: hidden;">
    <VParticleField 
      particleColor="rgba(148, 163, 184, 0.8)" 
      lineColor="rgba(148, 163, 184, 0.2)" 
    />
    <div style="position: relative; z-index: 1; height: 100%; display: flex; align-items: center; justify-content: center; color: white; text-align: center; padding: 2rem;">
      <div>
        <h2>深色主题</h2>
        <p>适配深色背景的粒子场</p>
      </div>
    </div>
  </div>
</div>

```vue
<template>
  <div style="position: relative; height: 400px; background: #1e293b;">
    <VParticleField 
      particleColor="rgba(148, 163, 184, 0.8)" 
      lineColor="rgba(148, 163, 184, 0.2)" 
    />
    <div style="position: relative; z-index: 1; height: 100%; display: flex; align-items: center; justify-content: center; color: white; text-align: center; padding: 2rem;">
      <div>
        <h2>深色主题</h2>
        <p>适配深色背景的粒子场</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { VParticleField } from 'supreme-visual-effects'
</script>
```

### 鼠标交互效果
<div class="demo">
  <div style="position: relative; height: 400px; background: #1a1a1a; border-radius: 8px; overflow: hidden;">
    <VParticleField 
      :mouseInteraction="true"
      :mouseRadius="150"
    />
    <div style="position: relative; z-index: 1; height: 100%; display: flex; align-items: center; justify-content: center; color: white; text-align: center; padding: 2rem;">
      <div>
        <h2>鼠标交互</h2>
        <p>移动鼠标与粒子互动</p>
      </div>
    </div>
  </div>
</div>

```vue
<template>
  <div style="position: relative; height: 400px; background: #1a1a1a;">
    <VParticleField 
      :mouseInteraction="true"
      :mouseRadius="150"
    />
    <div style="position: relative; z-index: 1; height: 100%; display: flex; align-items: center; justify-content: center; color: white; text-align: center; padding: 2rem;">
      <div>
        <h2>鼠标交互</h2>
        <p>移动鼠标与粒子互动</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { VParticleField } from 'supreme-visual-effects'
</script>
```

## 方法

可以通过模板引用调用以下方法：

| 方法名 | 参数 | 说明 |
| --- | --- | --- |
| updateParticleCount | `(count: number)` | 更新粒子数量 |
| pauseAnimation | `()` | 暂停动画 |
| resumeAnimation | `()` | 恢复动画 |

<div class="demo">
  <div style="position: relative; height: 400px; background: #1a1a1a; border-radius: 8px; overflow: hidden; margin-bottom: 1rem;">
    <VParticleField ref="particleRef" />
    <div style="position: relative; z-index: 1; height: 100%; display: flex; align-items: center; justify-content: center; color: white; text-align: center; padding: 2rem;">
      <div>
        <h2>控制粒子场</h2>
        <p>使用方法控制粒子效果</p>
      </div>
    </div>
  </div>
  <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
    <button @click="addParticles" style="padding: 0.5rem 1rem; background: #4f46e5; color: white; border: none; border-radius: 4px; cursor: pointer;">增加粒子</button>
    <button @click="removeParticles" style="padding: 0.5rem 1rem; background: #4f46e5; color: white; border: none; border-radius: 4px; cursor: pointer;">减少粒子</button>
    <button @click="pause" style="padding: 0.5rem 1rem; background: #4f46e5; color: white; border: none; border-radius: 4px; cursor: pointer;">暂停</button>
    <button @click="resume" style="padding: 0.5rem 1rem; background: #4f46e5; color: white; border: none; border-radius: 4px; cursor: pointer;">恢复</button>
  </div>
</div>

```vue
<template>
  <div style="position: relative; height: 400px; background: #1a1a1a;">
    <VParticleField ref="particleRef" />
  </div>
  <div style="display: flex; gap: 1rem;">
    <button @click="addParticles">增加粒子</button>
    <button @click="removeParticles">减少粒子</button>
    <button @click="pause">暂停</button>
    <button @click="resume">恢复</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { VParticleField } from 'supreme-visual-effects'

const particleRef = ref()

const addParticles = () => {
  particleRef.value.updateParticleCount(150)
}

const removeParticles = () => {
  particleRef.value.updateParticleCount(50)
}

const pause = () => {
  particleRef.value.pauseAnimation()
}

const resume = () => {
  particleRef.value.resumeAnimation()
}
</script>
```

## 使用场景

1. **网站背景** - 为网站添加动态背景效果
2. **登录页面** - 创建吸引人的登录界面背景
3. **产品展示** - 为产品介绍页面添加视觉效果
4. **仪表板** - 为数据仪表板添加动态背景

## 性能优化

1. 粒子数量会影响性能，建议根据设备性能调整
2. 在移动设备上可以减少粒子数量
3. 可以通过CSS `z-index` 控制层级关系

## 注意事项

1. 粒子场组件使用绝对定位，需要父容器有相对定位
2. 组件会自动适应父容器大小
3. 在窗口大小改变时会自动重新调整画布大小
4. 组件会在卸载时自动清理动画帧
5. 可以通过CSS变量自定义样式

<script setup>
import { ref } from 'vue'
import { VParticleField } from '../../src/index'

const particleRef = ref()

const addParticles = () => {
  particleRef.value?.updateParticleCount(150)
}

const removeParticles = () => {
  particleRef.value?.updateParticleCount(50)
}

const pause = () => {
  particleRef.value?.pauseAnimation()
}

const resume = () => {
  particleRef.value?.resumeAnimation()
}
</script>

<style>
.demo {
  margin: 2rem 0;
}
</style>