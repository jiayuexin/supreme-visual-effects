# VMagneticButton 磁吸按钮组件

VMagneticButton 是一个磁吸按钮组件，当鼠标靠近时会产生磁吸效果，并带有涟漪动画。

## 基础用法

<div class="demo">
  <div style="display: flex; justify-content: center; padding: 2rem;">
    <VMagneticButton>
      磁吸按钮
    </VMagneticButton>
  </div>
</div>

```vue
<template>
  <VMagneticButton>磁吸按钮</VMagneticButton>
</template>

<script setup>
import { VMagneticButton } from 'supreme-visual-effects'
</script>
```

## Props

| 属性名            | 类型      | 默认值                       | 说明             |
| ----------------- | --------- | ---------------------------- | ---------------- |
| magneticStrength  | `number`  | `0.3`                        | 磁吸强度         |
| magneticRange     | `number`  | `100`                        | 磁吸范围         |
| animationDuration | `number`  | `300`                        | 动画持续时间(ms) |
| disabled          | `boolean` | `false`                      | 是否禁用         |
| ripple            | `boolean` | `true`                       | 是否启用涟漪效果 |
| rippleColor       | `string`  | `'rgba(255, 255, 255, 0.3)'` | 涟漪颜色         |
| scale             | `number`  | `1.1`                        | 悬停时缩放比例   |
| backgroundColor   | `string`  | `'#4f46e5'`                  | 背景颜色         |
| textColor         | `string`  | `'#ffffff'`                  | 文字颜色         |
| borderRadius      | `string`  | `'8px'`                      | 边框圆角         |
| padding           | `string`  | `'12px 24px'`                | 内边距           |
| fontSize          | `string`  | `'16px'`                     | 字体大小         |
| fontWeight        | `string`  | `'500'`                      | 字体粗细         |

## Events

| 事件名      | 参数                  | 说明           |
| ----------- | --------------------- | -------------- |
| click       | `(event: MouseEvent)` | 点击时触发     |
| mouse-enter | `()`                  | 鼠标进入时触发 |
| mouse-leave | `()`                  | 鼠标离开时触发 |
| mouse-move  | `(event: MouseEvent)` | 鼠标移动时触发 |

## 示例

### 自定义样式

<div class="demo">
  <div style="display: flex; justify-content: center; gap: 1rem; padding: 2rem; flex-wrap: wrap;">
    <VMagneticButton 
      background-color="#ff6b6b" 
      text-color="#ffffff"
      border-radius="24px"
    >
      圆角按钮
    </VMagneticButton>
    <VMagneticButton 
      background-color="#4ecdc4" 
      text-color="#ffffff"
      border-radius="4px"
    >
      方角按钮
    </VMagneticButton>
  </div>
</div>

```vue
<template>
  <VMagneticButton background-color="#ff6b6b" text-color="#ffffff" border-radius="24px">圆角按钮</VMagneticButton>

  <VMagneticButton background-color="#4ecdc4" text-color="#ffffff" border-radius="4px">方角按钮</VMagneticButton>
</template>

<script setup>
import { VMagneticButton } from 'supreme-visual-effects'
</script>
```

### 调整磁吸强度

<div class="demo">
  <div style="display: flex; justify-content: center; gap: 1rem; padding: 2rem; flex-wrap: wrap;">
    <VMagneticButton :magnetic-strength="0.1">
      弱磁吸
    </VMagneticButton>
    <VMagneticButton :magnetic-strength="0.5">
      强磁吸
    </VMagneticButton>
  </div>
</div>

```vue
<template>
  <VMagneticButton :magnetic-strength="0.1">弱磁吸</VMagneticButton>

  <VMagneticButton :magnetic-strength="0.5">强磁吸</VMagneticButton>
</template>

<script setup>
import { VMagneticButton } from 'supreme-visual-effects'
</script>
```

### 自定义涟漪效果

<div class="demo">
  <div style="display: flex; justify-content: center; gap: 1rem; padding: 2rem; flex-wrap: wrap;">
    <VMagneticButton 
      :ripple="true" 
      ripple-color="rgba(255, 107, 107, 0.5)"
    >
      红色涟漪
    </VMagneticButton>
    <VMagneticButton 
      :ripple="true" 
      ripple-color="rgba(78, 205, 196, 0.5)"
    >
      绿色涟漪
    </VMagneticButton>
  </div>
</div>

```vue
<template>
  <VMagneticButton :ripple="true" ripple-color="rgba(255, 107, 107, 0.5)">红色涟漪</VMagneticButton>

  <VMagneticButton :ripple="true" ripple-color="rgba(78, 205, 196, 0.5)">绿色涟漪</VMagneticButton>
</template>

<script setup>
import { VMagneticButton } from 'supreme-visual-effects'
</script>
```

### 禁用状态

<div class="demo">
  <div style="display: flex; justify-content: center; gap: 1rem; padding: 2rem; flex-wrap: wrap;">
    <VMagneticButton :disabled="true">
      禁用按钮
    </VMagneticButton>
  </div>
</div>

```vue
<template>
  <VMagneticButton :disabled="true">禁用按钮</VMagneticButton>
</template>

<script setup>
import { VMagneticButton } from 'supreme-visual-effects'
</script>
```

### 按钮组

<div class="demo">
  <div style="display: flex; justify-content: center; gap: 1rem; padding: 2rem; flex-wrap: wrap;">
    <VMagneticButton 
      v-for="i in 3" 
      :key="i"
      :background-color="`hsl(${i * 120}, 70%, 60%)`"
      text-color="#ffffff"
    >
      按钮 {{ i }}
    </VMagneticButton>
  </div>
</div>

```vue
<template>
  <div style="display: flex; gap: 1rem;">
    <VMagneticButton v-for="i in 3" :key="i" :background-color="`hsl(${i * 120}, 70%, 60%)`" text-color="#ffffff">
      按钮 {{ i }}
    </VMagneticButton>
  </div>
</template>

<script setup>
import { VMagneticButton } from 'supreme-visual-effects'
</script>
```

### 不同尺寸

<div class="demo">
  <div style="display: flex; justify-content: center; gap: 1rem; padding: 2rem; flex-wrap: wrap;">
    <VMagneticButton 
      padding="8px 16px"
      font-size="14px"
    >
      小按钮
    </VMagneticButton>
    <VMagneticButton 
      padding="12px 24px"
      font-size="16px"
    >
      默认按钮
    </VMagneticButton>
    <VMagneticButton 
      padding="16px 32px"
      font-size="18px"
    >
      大按钮
    </VMagneticButton>
  </div>
</div>

```vue
<template>
  <VMagneticButton padding="8px 16px" font-size="14px">小按钮</VMagneticButton>

  <VMagneticButton padding="12px 24px" font-size="16px">默认按钮</VMagneticButton>

  <VMagneticButton padding="16px 32px" font-size="18px">大按钮</VMagneticButton>
</template>

<script setup>
import { VMagneticButton } from 'supreme-visual-effects'
</script>
```

## 使用场景

1. **表单提交** - 为表单提交按钮添加磁吸效果
2. **导航按钮** - 为导航菜单项添加交互效果
3. **操作按钮** - 为各种操作按钮添加视觉反馈
4. **卡片操作** - 为卡片上的操作按钮添加磁吸效果

## 注意事项

1. 组件会自动适应内容大小
2. 在窗口大小改变时会自动更新中心点
3. 组件会在卸载时自动清理事件监听器
4. 可以通过CSS自定义样式和阴影效果
5. 涟漪动画会在点击时自动触发

<script setup>
import { VMagneticButton } from '../../src/index'
</script>

<style>
.demo {
  margin: 2rem 0;
}
</style>
