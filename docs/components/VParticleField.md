# VParticleField 粒子场组件

VParticleField 是一个高性能的粒子场背景组件，可以创建动态的粒子效果和连接线。

## 基础用法

::: tip 使用提示
组件需要放在一个有明确宽高的容器中，推荐使用 `position: absolute` 配合 `inset: 0` 来覆盖父容器。
:::

<div class="demo">
  <div style="position: relative; height: 300px; background: #1a1a1a; border-radius: 8px; overflow: hidden;">
    <VParticleField style="position: absolute; inset: 0;" />
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
  <div style="position: relative; height: 100vh; background: #1a1a1a;">
    <VParticleField style="position: absolute; inset: 0;" />
    <div style="position: relative; z-index: 1; padding: 20px; color: white;">
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

| 属性名                     | 类型      | 默认值                       | 说明                   |
| -------------------------- | --------- | ---------------------------- | ---------------------- |
| particleCount              | `number`  | `100`                        | 粒子数量               |
| particleColor              | `string`  | `'#ffffff'`                  | 粒子颜色               |
| lineColor                  | `string`  | `'rgba(255, 255, 255, 0.2)'` | 连接线颜色             |
| speed                      | `number`  | `0.5`                        | 粒子移动速度           |
| maxDistance                | `number`  | `120`                        | 粒子间连线的最大距离   |
| mouseInteraction           | `boolean` | `true`                       | 是否启用鼠标交互       |
| mouseRadius                | `number`  | `100`                        | 鼠标影响半径           |
| connectParticles           | `boolean` | `true`                       | 是否连接粒子           |
| respectReducedMotion       | `boolean` | `true`                       | 是否尊重减少动画偏好   |
| reducedMotionParticleCount | `number`  | `20`                         | 减少动画模式下的粒子数 |

## 示例

### 自定义粒子数量和颜色

<div class="demo">
  <div style="position: relative; height: 400px; background: #1a1a1a; border-radius: 8px; overflow: hidden;">
    <VParticleField 
      style="position: absolute; inset: 0;"
      :particleCount="150" 
      particleColor="#4f46e5" 
      lineColor="rgba(79, 70, 229, 0.3)" 
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
      style="position: absolute; inset: 0;"
      :particleCount="150"
      particleColor="#4f46e5"
      lineColor="rgba(79, 70, 229, 0.3)"
    />
    <div style="position: relative; z-index: 1; color: white;">
      <h2>自定义粒子场</h2>
    </div>
  </div>
</template>
```

### 快速移动的粒子

<div class="demo">
  <div style="position: relative; height: 400px; background: #0f172a; border-radius: 8px; overflow: hidden;">
    <VParticleField 
      style="position: absolute; inset: 0;"
      :speed="1.5" 
      :maxDistance="150"
      particleColor="#38bdf8"
      lineColor="rgba(56, 189, 248, 0.2)"
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
  <div style="position: relative; height: 400px; background: #0f172a;">
    <VParticleField
      style="position: absolute; inset: 0;"
      :speed="1.5"
      :maxDistance="150"
      particleColor="#38bdf8"
      lineColor="rgba(56, 189, 248, 0.2)"
    />
  </div>
</template>
```

### 无连线模式

<div class="demo">
  <div style="position: relative; height: 400px; background: #18181b; border-radius: 8px; overflow: hidden;">
    <VParticleField 
      style="position: absolute; inset: 0;"
      :particleCount="200"
      :connectParticles="false"
      particleColor="#fbbf24"
    />
    <div style="position: relative; z-index: 1; height: 100%; display: flex; align-items: center; justify-content: center; color: white; text-align: center; padding: 2rem;">
      <div>
        <h2>无连线粒子</h2>
        <p>只显示粒子，不显示连线</p>
      </div>
    </div>
  </div>
</div>

```vue
<template>
  <div style="position: relative; height: 400px; background: #18181b;">
    <VParticleField
      style="position: absolute; inset: 0;"
      :particleCount="200"
      :connectParticles="false"
      particleColor="#fbbf24"
    />
  </div>
</template>
```

## 方法

可以通过模板引用调用以下方法：

| 方法名              | 参数              | 说明         |
| ------------------- | ----------------- | ------------ |
| updateParticleCount | `(count: number)` | 更新粒子数量 |
| pauseAnimation      | `()`              | 暂停动画     |
| resumeAnimation     | `()`              | 恢复动画     |

<div class="demo">
  <div style="position: relative; height: 400px; background: #1a1a1a; border-radius: 8px; overflow: hidden; margin-bottom: 1rem;">
    <VParticleField ref="particleRef" style="position: absolute; inset: 0;" />
    <div style="position: relative; z-index: 1; height: 100%; display: flex; align-items: center; justify-content: center; color: white; text-align: center; padding: 2rem;">
      <div>
        <h2>控制粒子场</h2>
        <p>使用下方按钮控制粒子效果</p>
      </div>
    </div>
  </div>
  <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
    <button @click="addParticles" class="demo-btn">增加粒子</button>
    <button @click="removeParticles" class="demo-btn">减少粒子</button>
    <button @click="pause" class="demo-btn">暂停</button>
    <button @click="resume" class="demo-btn">恢复</button>
  </div>
</div>

```vue
<template>
  <div style="position: relative; height: 400px; background: #1a1a1a;">
    <VParticleField ref="particleRef" style="position: absolute; inset: 0;" />
  </div>
  <button @click="particleRef.updateParticleCount(150)">增加粒子</button>
  <button @click="particleRef.pauseAnimation()">暂停</button>
  <button @click="particleRef.resumeAnimation()">恢复</button>
</template>

<script setup>
import { ref } from 'vue'
import { VParticleField } from 'supreme-visual-effects'

const particleRef = ref()
</script>
```

## 无障碍支持

组件支持 `prefers-reduced-motion` 媒体查询。当用户系统设置了减少动画时：

- 粒子数量会自动减少到 `reducedMotionParticleCount`
- 粒子会静止不动，只显示静态画面

可以通过 `respectReducedMotion` 属性禁用此行为。

## 注意事项

1. 组件需要放在有明确尺寸的容器中
2. 推荐使用 `position: absolute; inset: 0;` 样式覆盖父容器
3. 粒子数量会影响性能，移动设备建议减少粒子数
4. 组件会在卸载时自动清理动画帧

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
.demo-btn {
  padding: 0.5rem 1rem;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}
.demo-btn:hover {
  background: #4338ca;
}
</style>
