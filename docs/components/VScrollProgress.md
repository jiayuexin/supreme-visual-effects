# VScrollProgress 滚动进度条组件

VScrollProgress 是一个滚动进度条组件，可以显示页面滚动进度。

## 基础用法

<div class="demo">
  <div style="height: 200px; overflow: auto; border: 1px solid #ddd; border-radius: 8px; padding: 1rem;">
    <p>向下滚动查看进度条效果</p>
    <div style="height: 800px; display: flex; align-items: flex-end; justify-content: center;">
      <p>滚动到底部</p>
    </div>
  </div>
  <VScrollProgress position="top" />
</div>

```vue
<template>
  <VScrollProgress position="top" />
</template>

<script setup>
import { VScrollProgress } from 'supreme-visual-effects'
</script>
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| position | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | 进度条位置 |
| color | `string` | `'#4f46e5'` | 进度条颜色 |
| height | `string` | `'4px'` | 进度条高度 |
| width | `string` | `'100%'` | 进度条宽度 |
| showPercentage | `boolean` | `false` | 是否显示百分比 |
| textColor | `string` | `'#333'` | 文字颜色 |
| textSize | `string` | `'12px'` | 文字大小 |
| animation | `boolean` | `true` | 是否启用动画 |
| animationDuration | `number` | `200` | 动画持续时间(ms) |
| gradient | `boolean` | `false` | 是否启用渐变 |
| gradientColors | `string[]` | `['#667eea', '#764ba2']` | 渐变颜色 |
| glow | `boolean` | `false` | 是否启用发光效果 |
| glowIntensity | `number` | `10` | 发光强度 |
| target | `string` | `''` | 目标元素选择器 |
| offset | `number` | `0` | 滚动偏移量 |

## Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| progress-change | `(progress: number)` | 进度变化时触发 |
| scroll-start | `()` | 开始滚动时触发 |
| scroll-end | `()` | 停止滚动时触发 |

## Slots

| 插槽名 | 参数 | 说明 |
| --- | --- | --- |
| default | `{ progress: number, percentage: number }` | 自定义内容插槽 |

## Expose Methods

| 方法名 | 参数 | 说明 |
| --- | --- | --- |
| updateProgress | `()` | 更新进度 |
| getProgress | `()` | 获取当前进度 |

## 示例

### 不同位置
<div class="demo">
  <div style="height: 200px; overflow: auto; border: 1px solid #ddd; border-radius: 8px; padding: 1rem; position: relative;">
    <p>查看不同位置的进度条</p>
    <div style="height: 800px; display: flex; flex-direction: column; justify-content: space-around; text-align: center;">
      <p>顶部</p>
      <p>中间</p>
      <p>底部</p>
    </div>
  </div>
  <VScrollProgress position="top" color="#ff6b6b" />
  <VScrollProgress position="bottom" color="#4ecdc4" />
</div>

```vue
<template>
  <VScrollProgress position="top" color="#ff6b6b" />
  <VScrollProgress position="bottom" color="#4ecdc4" />
</template>

<script setup>
import { VScrollProgress } from 'supreme-visual-effects'
</script>
```

### 自定义颜色
<div class="demo">
  <div style="height: 200px; overflow: auto; border: 1px solid #ddd; border-radius: 8px; padding: 1rem;">
    <p>查看不同颜色的进度条</p>
    <div style="height: 800px; display: flex; flex-direction: column; justify-content: space-around; text-align: center;">
      <p>紫色进度条</p>
      <p>绿色进度条</p>
      <p>橙色进度条</p>
    </div>
  </div>
  <VScrollProgress color="#9370db" />
</div>

```vue
<template>
  <VScrollProgress color="#9370db" />
</template>

<script setup>
import { VScrollProgress } from 'supreme-visual-effects'
</script>
```

### 显示百分比
<div class="demo">
  <div style="height: 200px; overflow: auto; border: 1px solid #ddd; border-radius: 8px; padding: 1rem;">
    <p>查看带百分比的进度条</p>
    <div style="height: 800px; display: flex; flex-direction: column; justify-content: space-around; text-align: center;">
      <p>25%</p>
      <p>50%</p>
      <p>75%</p>
      <p>100%</p>
    </div>
  </div>
  <VScrollProgress :show-percentage="true" color="#10b981" />
</div>

```vue
<template>
  <VScrollProgress :show-percentage="true" color="#10b981" />
</template>

<script setup>
import { VScrollProgress } from 'supreme-visual-effects'
</script>
```

### 渐变效果
<div class="demo">
  <div style="height: 200px; overflow: auto; border: 1px solid #ddd; border-radius: 8px; padding: 1rem;">
    <p>查看渐变进度条</p>
    <div style="height: 800px; display: flex; flex-direction: column; justify-content: space-around; text-align: center;">
      <p>渐变开始</p>
      <p>渐变中间</p>
      <p>渐变结束</p>
    </div>
  </div>
  <VScrollProgress 
    :gradient="true" 
    :gradient-colors="['#ff6b6b', '#4ecdc4', '#45b7d1']"
  />
</div>

```vue
<template>
  <VScrollProgress 
    :gradient="true" 
    :gradient-colors="['#ff6b6b', '#4ecdc4', '#45b7d1']"
  />
</template>

<script setup>
import { VScrollProgress } from 'supreme-visual-effects'
</script>
```

### 发光效果
<div class="demo">
  <div style="height: 200px; overflow: auto; border: 1px solid #ddd; border-radius: 8px; padding: 1rem;">
    <p>查看发光进度条</p>
    <div style="height: 800px; display: flex; flex-direction: column; justify-content: space-around; text-align: center;">
      <p>发光效果</p>
      <p>更亮的发光</p>
      <p>最强发光</p>
    </div>
  </div>
  <VScrollProgress 
    :glow="true" 
    :glow-intensity="20"
    color="#f093fb"
  />
</div>

```vue
<template>
  <VScrollProgress 
    :glow="true" 
    :glow-intensity="20"
    color="#f093fb"
  />
</template>

<script setup>
import { VScrollProgress } from 'supreme-visual-effects'
</script>
```

### 自定义内容
<div class="demo">
  <div style="height: 200px; overflow: auto; border: 1px solid #ddd; border-radius: 8px; padding: 1rem;">
    <p>查看自定义内容进度条</p>
    <div style="height: 800px; display: flex; flex-direction: column; justify-content: space-around; text-align: center;">
      <p>自定义内容</p>
      <p>更多内容</p>
      <p>内容结束</p>
    </div>
  </div>
  <VScrollProgress color="#667eea">
    <template #default="{ percentage }">
      <div style="color: white; font-weight: bold;">{{ percentage }}%</div>
    </template>
  </VScrollProgress>
</div>

```vue
<template>
  <VScrollProgress color="#667eea">
    <template #default="{ percentage }">
      <div>{{ percentage }}%</div>
    </template>
  </VScrollProgress>
</template>

<script setup>
import { VScrollProgress } from 'supreme-visual-effects'
</script>
```

### 不同尺寸
<div class="demo">
  <div style="height: 200px; overflow: auto; border: 1px solid #ddd; border-radius: 8px; padding: 1rem;">
    <p>查看不同尺寸的进度条</p>
    <div style="height: 800px; display: flex; flex-direction: column; justify-content: space-around; text-align: center;">
      <p>细进度条</p>
      <p>中等进度条</p>
      <p>粗进度条</p>
    </div>
  </div>
  <VScrollProgress height="8px" color="#f59e0b" />
</div>

```vue
<template>
  <VScrollProgress height="8px" color="#f59e0b" />
</template>

<script setup>
import { VScrollProgress } from 'supreme-visual-effects'
</script>
```

### 垂直进度条
<div class="demo" style="display: flex;">
  <div style="flex: 1; height: 300px; overflow: auto; border: 1px solid #ddd; border-radius: 8px; padding: 1rem; margin-right: 1rem;">
    <p>查看左侧垂直进度条</p>
    <div style="height: 800px; display: flex; flex-direction: column; justify-content: space-around; text-align: center;">
      <p>顶部</p>
      <p>中间</p>
      <p>底部</p>
    </div>
  </div>
  <VScrollProgress position="left" width="8px" color="#ef4444" />
</div>

```vue
<template>
  <VScrollProgress position="left" width="8px" color="#ef4444" />
</template>

<script setup>
import { VScrollProgress } from 'supreme-visual-effects'
</script>
```

## 使用场景

1. **长页面** - 为长页面添加滚动进度指示
2. **博客文章** - 为博客文章添加阅读进度
3. **产品介绍** - 为产品介绍页面添加进度指示
4. **文档页面** - 为技术文档添加阅读进度

## 注意事项

1. 组件默认固定定位，会覆盖在页面上
2. 可以通过position属性调整进度条位置
3. 组件会在卸载时自动清理事件监听器
4. 可以通过CSS自定义样式和动画效果
5. 支持自定义内容插槽，可以显示更多信息

<script setup>
import { VScrollProgress } from '../../src/index'
</script>

<style>
.demo {
  margin: 2rem 0;
}
</style>