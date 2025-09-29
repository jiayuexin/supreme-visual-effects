# VScrollReveal 滚动进入动画组件

VScrollReveal 是一个滚动进入动画组件，当元素进入视口时触发动画效果。

## 基础用法

<div class="demo">
  <div style="height: 100px;"></div>
  <VScrollReveal>
    <div style="padding: 2rem; background: #f0f0f0; border-radius: 8px; text-align: center;">
      <h3>滚动进入动画</h3>
      <p>当这个元素进入视口时会自动播放动画</p>
    </div>
  </VScrollReveal>
</div>

```vue
<template>
  <VScrollReveal>
    <div>
      <h3>标题</h3>
      <p>内容</p>
    </div>
  </VScrollReveal>
</template>

<script setup>
import { VScrollReveal } from 'supreme-visual-effects'
</script>
```

## Props

| 属性名    | 类型      | 默认值 | 说明                 |
| --------- | --------- | ------ | -------------------- |
| threshold | `number`  | `0.1`  | 触发动画的阈值 (0-1) |
| once      | `boolean` | `true` | 是否只触发一次动画   |

## 示例

### 自定义阈值

<div class="demo">
  <div style="height: 100px;"></div>
  <VScrollReveal :threshold="0.5">
    <div style="padding: 2rem; background: #e0f2fe; border-radius: 8px; text-align: center;">
      <h3>50%阈值</h3>
      <p>当元素50%进入视口时触发动画</p>
    </div>
  </VScrollReveal>
</div>

```vue
<template>
  <VScrollReveal :threshold="0.5">
    <div>
      <h3>标题</h3>
      <p>内容</p>
    </div>
  </VScrollReveal>
</template>

<script setup>
import { VScrollReveal } from 'supreme-visual-effects'
</script>
```

### 重复触发动画

<div class="demo">
  <div style="height: 100px;"></div>
  <VScrollReveal :once="false">
    <div style="padding: 2rem; background: #dcfce7; border-radius: 8px; text-align: center;">
      <h3>重复动画</h3>
      <p>每次进入视口都会触发动画</p>
    </div>
  </VScrollReveal>
</div>

```vue
<template>
  <VScrollReveal :once="false">
    <div>
      <h3>标题</h3>
      <p>内容</p>
    </div>
  </VScrollReveal>
</template>

<script setup>
import { VScrollReveal } from 'supreme-visual-effects'
</script>
```

### 多个元素动画

<div class="demo">
  <div style="height: 100px;"></div>
  <VScrollReveal>
    <div style="padding: 2rem; background: #fef3c7; border-radius: 8px; text-align: center; margin-bottom: 1rem;">
      <h3>第一个元素</h3>
      <p>第一个动画元素</p>
    </div>
  </VScrollReveal>
  <div style="height: 200px;"></div>
  <VScrollReveal>
    <div style="padding: 2rem; background: #ffe4e6; border-radius: 8px; text-align: center;">
      <h3>第二个元素</h3>
      <p>第二个动画元素</p>
    </div>
  </VScrollReveal>
</div>

```vue
<template>
  <VScrollReveal>
    <div>
      <h3>第一个元素</h3>
      <p>内容</p>
    </div>
  </VScrollReveal>

  <VScrollReveal>
    <div>
      <h3>第二个元素</h3>
      <p>内容</p>
    </div>
  </VScrollReveal>
</template>

<script setup>
import { VScrollReveal } from 'supreme-visual-effects'
</script>
```

### 卡片列表动画

<div class="demo">
  <div style="height: 100px;"></div>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
    <VScrollReveal v-for="i in 3" :key="i">
      <div style="padding: 2rem; background: #f3e8ff; border-radius: 8px; text-align: center;">
        <h3>卡片 {{ i }}</h3>
        <p>这是第 {{ i }} 个卡片</p>
      </div>
    </VScrollReveal>
  </div>
</div>

```vue
<template>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
    <VScrollReveal v-for="i in 3" :key="i">
      <div>
        <h3>卡片 {{ i }}</h3>
        <p>这是第 {{ i }} 个卡片</p>
      </div>
    </VScrollReveal>
  </div>
</template>

<script setup>
import { VScrollReveal } from 'supreme-visual-effects'
</script>
```

## 使用场景

1. **页面内容展示** - 为页面内容添加进入动画效果
2. **产品列表** - 为产品列表项添加滚动动画
3. **博客文章** - 为博客文章段落添加滚动动画
4. **作品集** - 为作品集项目添加进入动画

## 注意事项

1. 组件默认使用淡入和上移动画效果
2. 可以通过CSS自定义动画效果
3. 组件会在卸载时自动清理IntersectionObserver
4. 在SSR环境中会正确处理浏览器API检测

<script setup>
import { VScrollReveal } from '../../src/index'
</script>

<style>
.demo {
  margin: 2rem 0;
}
</style>
