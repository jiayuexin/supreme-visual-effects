# VTextReveal 滚动文字出现

VTextReveal 是一个滚动触发文字逐字出现动画组件，支持多种动画模式和拆分方式。

## 基础用法

<div class="demo">
  <VTextReveal text="这是一段滚动时会出现的文字" />
</div>

```vue
<template>
  <VTextReveal text="这是一段滚动时会出现的文字" />
</template>

<script setup>
import { VTextReveal } from 'supreme-visual-effects'
</script>
```

## Props

| 属性名               | 类型                                     | 默认值   | 说明                 |
| -------------------- | ---------------------------------------- | -------- | -------------------- |
| text                 | `string`                                 | 必填     | 要显示的文字         |
| animation            | `'word' \| 'char' \| 'line'`             | `'word'` | 拆分模式             |
| animationType        | `'fade' \| 'slide' \| 'scale' \| 'blur'` | `'fade'` | 动画类型             |
| duration             | `number`                                 | `600`    | 动画持续时间(ms)     |
| stagger              | `number`                                 | `50`     | 每个项目的延迟(ms)   |
| threshold            | `number`                                 | `0.1`    | 触发阈值             |
| once                 | `boolean`                                | `true`   | 是否只触发一次       |
| delay                | `number`                                 | `0`      | 首次触发延迟(ms)     |
| respectReducedMotion | `boolean`                                | `true`   | 是否尊重减少动画偏好 |

## Events

| 事件名   | 参数 | 说明                 |
| -------- | ---- | -------------------- |
| start    | `()` | 动画开始时触发       |
| visible  | `()` | 第一个文字出现时触发 |
| complete | `()` | 动画完成时触发       |

## Expose Methods

| 方法名 | 参数 | 说明             |
| ------ | ---- | ---------------- |
| reveal | `()` | 开始文字出现动画 |
| reset  | `()` | 重置为隐藏状态   |

## 示例

### 逐字淡入

<div class="demo">
  <VTextReveal text="逐字淡入效果" animation="char" animation-type="fade" />
</div>

```vue
<template>
  <VTextReveal text="逐字淡入效果" animation="char" animation-type="fade" />
</template>
```

### 文字上滑出现

<div class="demo">
  <VTextReveal text="上滑效果" animation-type="slide" />
</div>

```vue
<template>
  <VTextReveal text="上滑效果" animation-type="slide" />
</template>
```

### 缩放效果

<div class="demo">
  <VTextReveal text="缩放效果" animation-type="scale" />
</div>

```vue
<template>
  <VTextReveal text="缩放效果" animation-type="scale" />
</template>
```

## 使用场景

1. **页面标题** - 滚动到视口时标题逐字出现
2. **产品展示** - 产品介绍文字滚动触发
3. **文章引言** - 引言文字淡入增强阅读体验

## 注意事项

1. `once` 为 true 时只触发一次，离开视口再进入不会重新播放
2. `animation: 'line'` 模式按换行符拆分文字
3. 组件使用 IntersectionObserver 实现，注意性能

<script setup>
import { VTextReveal } from '../../src/index'
</script>

<style>
.demo {
  margin: 2rem 0;
}
</style>
