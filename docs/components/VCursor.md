# VCursor 自定义光标

VCursor 是一个自定义光标组件，提供平滑跟踪和拖尾效果。

## 基础用法

```vue
<template>
  <VCursor />
</template>

<script setup>
import { VCursor } from 'supreme-visual-effects'
</script>
```

## Props

| 属性名               | 类型      | 默认值      | 说明                 |
| -------------------- | --------- | ----------- | -------------------- |
| size                 | `number`  | `20`        | 光标大小(px)         |
| color                | `string`  | `'#667eea'` | 光标颜色             |
| opacity              | `number`  | `0.8`       | 不透明度             |
| blendMode            | `string`  | `'normal'`  | 混合模式             |
| showTrailer          | `boolean` | `true`      | 是否显示拖尾         |
| trailerCount         | `number`  | `6`         | 拖尾数量             |
| trailerScale         | `number`  | `0.6`       | 拖尾缩放比例         |
| respectReducedMotion | `boolean` | `true`      | 是否尊重减少动画偏好 |

## Events

| 事件名 | 参数                     | 说明           |
| ------ | ------------------------ | -------------- |
| move   | `(x: number, y: number)` | 光标移动时触发 |
| click  | `()`                     | 点击时触发     |

## Expose Methods

| 方法名  | 参数 | 说明     |
| ------- | ---- | -------- |
| show    | `()` | 显示光标 |
| hide    | `()` | 隐藏光标 |
| destroy | `()` | 销毁光标 |

## 示例

### 自定义大小和颜色

```vue
<template>
  <VCursor :size="30" color="#ff6b6b" />
</template>
```

### 不带拖尾

```vue
<template>
  <VCursor :show-trailer="false" />
</template>
```

### 差值混合模式

```vue
<template>
  <VCursor color="white" blend-mode="difference" />
</template>
```

## 使用场景

1. **创意设计** - 替代默认系统光标
2. **交互反馈** - 光标大小随交互变化
3. **品牌展示** - 使用品牌色作为光标颜色

## 注意事项

1. 组件使用 Teleport 渲染到 body，挂载时会设置 `body { cursor: none }`
2. 启用 `respectReducedMotion` 且用户偏好减少动画时不会渲染自定义光标
3. 组件卸载时会自动恢复原始光标
4. 仅支持桌面端，SSR 环境下不会渲染
