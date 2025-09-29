# VParallax 视差滚动组件

VParallax 是一个高性能的视差滚动组件，可以创建多层次的滚动视差效果。

## 基础用法

<div class="demo">
  <div style="height: 400px; overflow: hidden; border-radius: 8px;">
    <VParallax 
      :layers="[
        { speed: 0.2, content: '<div style=&quot;background: linear-gradient(45deg, #667eea, #764ba2); height: 100%;&quot;></div>' },
        { speed: 0.5, content: '<div style=&quot;display: flex; align-items: center; justify-content: center; height: 100%; color: white; font-size: 2rem;&quot;>视差滚动</div>' }
      ]"
      style="height: 400px;"
    />
  </div>
</div>

```vue
<template>
  <VParallax 
    :layers="[
      { speed: 0.2, content: '<div style=\"background: linear-gradient(45deg, #667eea, #764ba2); height: 100%;\"></div>' },
      { speed: 0.5, content: '<div style=\"display: flex; align-items: center; justify-content: center; height: 100%; color: white; font-size: 2rem;\">视差滚动</div>' }
    ]"
    style="height: 100vh;"
  />
</template>

<script setup>
import { VParallax } from 'supreme-visual-effects'
</script>
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| layers | `ParallaxLayer[]` | `[默认图层]` | 视差图层配置 |
| enabled | `boolean` | `true` | 是否启用视差效果 |
| throttle | `number` | `16` | 滚动事件节流时间(ms) |
| offset | `number` | `0` | 滚动偏移量 |

### ParallaxLayer 类型

```ts
interface ParallaxLayer {
  speed: number // 0-1, 0 = 静止, 1 = 正常滚动
  direction?: 'up' | 'down' | 'left' | 'right'
  content?: string
  style?: Record<string, unknown>
  offset?: number
}
```

## 示例

### 多层视差效果
<div class="demo">
  <div style="height: 400px; overflow: hidden; border-radius: 8px;">
    <VParallax 
      :layers="[
        { speed: 0.1, content: '<div style=&quot;background: linear-gradient(135deg, #667eea, #764ba2); height: 120%;&quot;></div>' },
        { speed: 0.3, content: '<div style=&quot;background: url(https://picsum.photos/800/600?random=1); height: 110%; background-size: cover;&quot;></div>' },
        { speed: 0.7, content: '<div style=&quot;display: flex; align-items: center; justify-content: center; height: 100%; color: white; font-size: 2rem; text-shadow: 0 2px 4px rgba(0,0,0,0.5);&quot;>多层次视差</div>' }
      ]"
      style="height: 400px;"
    />
  </div>
</div>

```vue
<template>
  <VParallax 
    :layers="[
      { speed: 0.1, content: '<div style=\"background: linear-gradient(135deg, #667eea, #764ba2); height: 120%;\"></div>' },
      { speed: 0.3, content: '<div style=\"background: url(https://picsum.photos/800/600?random=1); height: 110%; background-size: cover;\"></div>' },
      { speed: 0.7, content: '<div style=\"display: flex; align-items: center; justify-content: center; height: 100%; color: white; font-size: 2rem; text-shadow: 0 2px 4px rgba(0,0,0,0.5);\">多层次视差</div>' }
    ]"
    style="height: 100vh;"
  />
</template>

<script setup>
import { VParallax } from 'supreme-visual-effects'
</script>
```

### 方向控制
<div class="demo">
  <div style="height: 400px; overflow: hidden; border-radius: 8px;">
    <VParallax 
      :layers="[
        { speed: 0.5, direction: 'up', content: '<div style=&quot;background: linear-gradient(45deg, #ff6b6b, #feca57); height: 100%;&quot;></div>' },
        { speed: 0.8, direction: 'down', content: '<div style=&quot;display: flex; align-items: center; justify-content: center; height: 100%; color: white; font-size: 2rem;&quot;>上下视差</div>' }
      ]"
      style="height: 400px;"
    />
  </div>
</div>

```vue
<template>
  <VParallax 
    :layers="[
      { speed: 0.5, direction: 'up', content: '<div style=\"background: linear-gradient(45deg, #ff6b6b, #feca57); height: 100%;\"></div>' },
      { speed: 0.8, direction: 'down', content: '<div style=\"display: flex; align-items: center; justify-content: center; height: 100%; color: white; font-size: 2rem;\">上下视差</div>' }
    ]"
    style="height: 100vh;"
  />
</template>

<script setup>
import { VParallax } from 'supreme-visual-effects'
</script>
```

### 自定义样式
<div class="demo">
  <div style="height: 400px; overflow: hidden; border-radius: 8px;">
    <VParallax 
      :layers="[
        { 
          speed: 0.3, 
          content: '<div style=&quot;display: flex; align-items: center; justify-content: center; height: 100%;&quot;><div style=&quot;width: 200px; height: 200px; border-radius: 50%; background: radial-gradient(circle, #667eea, #764ba2);&quot;></div></div>',
          style: { borderRadius: '20px' }
        },
        { 
          speed: 0.7, 
          content: '<div style=&quot;display: flex; align-items: center; justify-content: center; height: 100%; color: #333; font-size: 2rem; font-weight: bold;&quot;>自定义样式</div>' 
        }
      ]"
      style="height: 400px;"
    />
  </div>
</div>

```vue
<template>
  <VParallax 
    :layers="[
      { 
        speed: 0.3, 
        content: '<div style=\"display: flex; align-items: center; justify-content: center; height: 100%;\"><div style=\"width: 200px; height: 200px; border-radius: 50%; background: radial-gradient(circle, #667eea, #764ba2);\"></div></div>',
        style: { borderRadius: '20px' }
      },
      { 
        speed: 0.7, 
        content: '<div style=\"display: flex; align-items: center; justify-content: center; height: 100%; color: #333; font-size: 2rem; font-weight: bold;\">自定义样式</div>' 
      }
    ]"
    style="height: 100vh;"
  />
</template>

<script setup>
import { VParallax } from 'supreme-visual-effects'
</script>
```

### 禁用视差效果
<div class="demo">
  <div style="height: 400px; overflow: hidden; border-radius: 8px;">
    <VParallax 
      :layers="[
        { speed: 0.5, content: '<div style=&quot;background: linear-gradient(45deg, #4ecdc4, #44a08d); height: 100%;&quot;></div>' },
        { speed: 0.8, content: '<div style=&quot;display: flex; align-items: center; justify-content: center; height: 100%; color: white; font-size: 2rem;&quot;>静态内容</div>' }
      ]"
      :enabled="false"
      style="height: 400px;"
    />
  </div>
</div>

```vue
<template>
  <VParallax 
    :layers="[
      { speed: 0.5, content: '<div style=\"background: linear-gradient(45deg, #4ecdc4, #44a08d); height: 100%;\"></div>' },
      { speed: 0.8, content: '<div style=\"display: flex; align-items: center; justify-content: center; height: 100%; color: white; font-size: 2rem;\">静态内容</div>' }
    ]"
    :enabled="false"
    style="height: 100vh;"
  />
</template>

<script setup>
import { VParallax } from 'supreme-visual-effects'
</script>
```

## 使用场景

1. **网站首屏** - 创建吸引人的首屏视差效果
2. **产品介绍** - 通过视差效果展示产品特性
3. **故事叙述** - 通过滚动视差讲述故事
4. **作品集** - 为作品集页面添加视觉效果

## 注意事项

1. 视差组件需要设置明确的高度
2. 内容较多时建议设置节流时间以提升性能
3. 在移动端使用时要注意性能影响
4. 组件会在卸载时自动清理滚动事件监听器

<script setup>
import { VParallax } from '../../src/index'
</script>

<style>
.demo {
  margin: 2rem 0;
}
</style>