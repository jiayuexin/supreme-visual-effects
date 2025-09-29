# VDivider 分割线组件

VDivider 是一个多功能的分割线组件，支持多种样式和动画效果。

## 基础用法

<div class="demo">
  <div style="padding: 1rem; background: white; border-radius: 8px;">
    <p>上方内容</p>
    <VDivider />
    <p>下方内容</p>
  </div>
</div>

```vue
<template>
  <VDivider />

  <!-- 带文本的分割线 -->
  <VDivider text="分割线文本" />

  <!-- 波浪样式 -->
  <VDivider type="wave" />

  <!-- 点状样式 -->
  <VDivider type="dots" />
</template>

<script setup>
import { VDivider } from 'supreme-visual-effects'
</script>
```

## Props

| 属性名         | 类型                                                     | 默认值                   | 说明                           |
| -------------- | -------------------------------------------------------- | ------------------------ | ------------------------------ |
| type           | `'line' \| 'wave' \| 'dots' \| 'gradient' \| 'animated'` | `'line'`                 | 分割线类型                     |
| color          | `string`                                                 | `'#e2e8f0'`              | 分割线颜色                     |
| width          | `string`                                                 | `'100%'`                 | 分割线宽度                     |
| height         | `string`                                                 | `'1px'`                  | 分割线高度                     |
| strokeWidth    | `number`                                                 | `2`                      | 线条宽度（适用于波浪样式）     |
| text           | `string`                                                 | `''`                     | 分割线中间显示的文本           |
| textColor      | `string`                                                 | `'#666'`                 | 文本颜色                       |
| textSize       | `string`                                                 | `'14px'`                 | 文本大小                       |
| animation      | `boolean`                                                | `true`                   | 是否启用动画                   |
| animationSpeed | `number`                                                 | `2`                      | 动画速度                       |
| gradientColors | `string[]`                                               | `['#667eea', '#764ba2']` | 渐变颜色（适用于渐变样式）     |
| dotCount       | `number`                                                 | `5`                      | 点的数量（适用于点状样式）     |
| dotSize        | `number`                                                 | `6`                      | 点的大小（适用于点状样式）     |
| spacing        | `string`                                                 | `'20px'`                 | 点之间的间距（适用于点状样式） |

## 类型说明

### Line 类型

简单的直线分割线，可以设置颜色、高度等基本属性。

### Wave 类型

波浪形分割线，具有流动的波浪效果。

### Dots 类型

点状分割线，由多个圆点组成。

### Gradient 类型

渐变分割线，支持自定义渐变颜色。

### Animated 类型

带动画效果的分割线，具有动态的移动效果。

## 示例

### 基础分割线

<div class="demo">
  <div style="padding: 1rem; background: white; border-radius: 8px;">
    <p>上方内容</p>
    <VDivider color="#ff6b6b" height="2px" />
    <p>下方内容</p>
  </div>
</div>

```vue
<template>
  <VDivider color="#ff6b6b" height="2px" />
</template>

<script setup>
import { VDivider } from 'supreme-visual-effects'
</script>
```

### 带文本的分割线

<div class="demo">
  <div style="padding: 1rem; background: white; border-radius: 8px;">
    <p>上方内容</p>
    <VDivider 
      text="章节分隔" 
      textColor="#4f46e5" 
      textSize="16px" 
    />
    <p>下方内容</p>
  </div>
</div>

```vue
<template>
  <VDivider text="章节分隔" textColor="#4f46e5" textSize="16px" />
</template>

<script setup>
import { VDivider } from 'supreme-visual-effects'
</script>
```

### 波浪分割线

<div class="demo">
  <div style="padding: 1rem; background: white; border-radius: 8px;">
    <p>上方内容</p>
    <VDivider 
      type="wave" 
      color="#4ecdc4" 
      height="20px" 
      animation 
    />
    <p>下方内容</p>
  </div>
</div>

```vue
<template>
  <VDivider type="wave" color="#4ecdc4" height="20px" animation />
</template>

<script setup>
import { VDivider } from 'supreme-visual-effects'
</script>
```

### 点状分割线

<div class="demo">
  <div style="padding: 1rem; background: white; border-radius: 8px;">
    <p>上方内容</p>
    <VDivider 
      type="dots" 
      color="#45b7d1" 
      dotCount="8" 
      dotSize="8" 
      spacing="15px" 
    />
    <p>下方内容</p>
  </div>
</div>

```vue
<template>
  <VDivider type="dots" color="#45b7d1" dotCount="8" dotSize="8" spacing="15px" />
</template>

<script setup>
import { VDivider } from 'supreme-visual-effects'
</script>
```

### 渐变分割线

<div class="demo">
  <div style="padding: 1rem; background: white; border-radius: 8px;">
    <p>上方内容</p>
    <VDivider 
      type="gradient" 
      :gradientColors="['#ff6b6b', '#4ecdc4', '#45b7d1']" 
      height="3px" 
    />
    <p>下方内容</p>
  </div>
</div>

```vue
<template>
  <VDivider type="gradient" :gradientColors="['#ff6b6b', '#4ecdc4', '#45b7d1']" height="3px" />
</template>

<script setup>
import { VDivider } from 'supreme-visual-effects'
</script>
```

### 动画分割线

<div class="demo">
  <div style="padding: 1rem; background: white; border-radius: 8px;">
    <p>上方内容</p>
    <VDivider 
      type="animated" 
      color="#96ceb4" 
      height="4px" 
      :animationSpeed="3" 
    />
    <p>下方内容</p>
  </div>
</div>

```vue
<template>
  <VDivider type="animated" color="#96ceb4" height="4px" :animationSpeed="3" />
</template>

<script setup>
import { VDivider } from 'supreme-visual-effects'
</script>
```

## 注意事项

1. 当设置 `text` 属性时，分割线会自动在中间留出空间显示文本
2. 动画效果仅在支持的类型中生效
3. 可以通过CSS变量自定义样式

<script setup>
import { VDivider } from '../../src/index'
</script>

<style>
.demo {
  margin: 2rem 0;
}
</style>
