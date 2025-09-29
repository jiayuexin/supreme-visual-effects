# VImageComparison 图像对比组件

VImageComparison 是一个图像对比组件，可以创建前后图像对比效果。

## 基础用法

<div class="demo">
  <div style="height: 300px; border-radius: 8px; overflow: hidden;">
    <VImageComparison 
      before-image="https://picsum.photos/600/300?random=1"
      after-image="https://picsum.photos/600/300?random=2"
      before-label="修改前"
      after-label="修改后"
    />
  </div>
</div>

```vue
<template>
  <VImageComparison
    before-image="https://picsum.photos/600/300?random=1"
    after-image="https://picsum.photos/600/300?random=2"
    before-label="修改前"
    after-label="修改后"
  />
</template>

<script setup>
import { VImageComparison } from 'supreme-visual-effects'
</script>
```

## Props

| 属性名            | 类型      | 默认值           | 说明                |
| ----------------- | --------- | ---------------- | ------------------- |
| beforeImage       | `string`  | `''`             | 前图像URL（必填）   |
| afterImage        | `string`  | `''`             | 后图像URL（必填）   |
| beforeAlt         | `string`  | `'Before image'` | 前图像alt属性       |
| afterAlt          | `string`  | `'After image'`  | 后图像alt属性       |
| beforeLabel       | `string`  | `'Before'`       | 前图像标签          |
| afterLabel        | `string`  | `'After'`        | 后图像标签          |
| initialPosition   | `number`  | `50`             | 初始滑块位置(0-100) |
| sliderColor       | `string`  | `'#ffffff'`      | 滑块颜色            |
| sliderSize        | `number`  | `4`              | 滑块宽度(px)        |
| handleSize        | `number`  | `40`             | 滑块手柄大小(px)    |
| showLabels        | `boolean` | `true`           | 是否显示标签        |
| keyboardControl   | `boolean` | `true`           | 是否启用键盘控制    |
| animationDuration | `number`  | `300`            | 动画持续时间(ms)    |

## Events

| 事件名          | 参数                 | 说明           |
| --------------- | -------------------- | -------------- |
| position-change | `(position: number)` | 位置变化时触发 |
| slider-start    | `()`                 | 开始拖拽时触发 |
| slider-end      | `()`                 | 结束拖拽时触发 |

## Expose Methods

| 方法名      | 参数                 | 说明         |
| ----------- | -------------------- | ------------ |
| reset       | `()`                 | 重置滑块位置 |
| setPosition | `(position: number)` | 设置滑块位置 |

## 示例

### 自定义初始位置

<div class="demo">
  <div style="height: 300px; border-radius: 8px; overflow: hidden;">
    <VImageComparison 
      before-image="https://picsum.photos/600/300?random=3"
      after-image="https://picsum.photos/600/300?random=4"
      :initial-position="25"
    />
  </div>
</div>

```vue
<template>
  <VImageComparison
    before-image="https://picsum.photos/600/300?random=3"
    after-image="https://picsum.photos/600/300?random=4"
    :initial-position="25"
  />
</template>

<script setup>
import { VImageComparison } from 'supreme-visual-effects'
</script>
```

### 自定义滑块样式

<div class="demo">
  <div style="height: 300px; border-radius: 8px; overflow: hidden;">
    <VImageComparison 
      before-image="https://picsum.photos/600/300?random=5"
      after-image="https://picsum.photos/600/300?random=6"
      slider-color="#ff6b6b"
      :slider-size="8"
      :handle-size="50"
    />
  </div>
</div>

```vue
<template>
  <VImageComparison
    before-image="https://picsum.photos/600/300?random=5"
    after-image="https://picsum.photos/600/300?random=6"
    slider-color="#ff6b6b"
    :slider-size="8"
    :handle-size="50"
  />
</template>

<script setup>
import { VImageComparison } from 'supreme-visual-effects'
</script>
```

### 隐藏标签

<div class="demo">
  <div style="height: 300px; border-radius: 8px; overflow: hidden;">
    <VImageComparison 
      before-image="https://picsum.photos/600/300?random=7"
      after-image="https://picsum.photos/600/300?random=8"
      :show-labels="false"
    />
  </div>
</div>

```vue
<template>
  <VImageComparison
    before-image="https://picsum.photos/600/300?random=7"
    after-image="https://picsum.photos/600/300?random=8"
    :show-labels="false"
  />
</template>

<script setup>
import { VImageComparison } from 'supreme-visual-effects'
</script>
```

### 键盘控制

<div class="demo">
  <div style="height: 300px; border-radius: 8px; overflow: hidden;">
    <VImageComparison 
      before-image="https://picsum.photos/600/300?random=9"
      after-image="https://picsum.photos/600/300?random=10"
      :keyboard-control="true"
    />
  </div>
</div>

```vue
<template>
  <VImageComparison
    before-image="https://picsum.photos/600/300?random=9"
    after-image="https://picsum.photos/600/300?random=10"
    :keyboard-control="true"
  />
</template>

<script setup>
import { VImageComparison } from 'supreme-visual-effects'
</script>
```

### 控制滑块位置

<div class="demo">
  <div style="height: 300px; border-radius: 8px; overflow: hidden; margin-bottom: 1rem;">
    <VImageComparison 
      ref="imageComparisonRef"
      before-image="https://picsum.photos/600/300?random=11"
      after-image="https://picsum.photos/600/300?random=12"
    />
  </div>
  
  <div style="display: flex; gap: 1rem; justify-content: center;">
    <button @click="setPosition(0)" style="padding: 0.5rem 1rem; background: #4f46e5; color: white; border: none; border-radius: 4px; cursor: pointer;">
      0%
    </button>
    <button @click="setPosition(25)" style="padding: 0.5rem 1rem; background: #4f46e5; color: white; border: none; border-radius: 4px; cursor: pointer;">
      25%
    </button>
    <button @click="setPosition(50)" style="padding: 0.5rem 1rem; background: #4f46e5; color: white; border: none; border-radius: 4px; cursor: pointer;">
      50%
    </button>
    <button @click="setPosition(75)" style="padding: 0.5rem 1rem; background: #4f46e5; color: white; border: none; border-radius: 4px; cursor: pointer;">
      75%
    </button>
    <button @click="setPosition(100)" style="padding: 0.5rem 1rem; background: #4f46e5; color: white; border: none; border-radius: 4px; cursor: pointer;">
      100%
    </button>
    <button @click="resetPosition" style="padding: 0.5rem 1rem; background: #6b7280; color: white; border: none; border-radius: 4px; cursor: pointer;">
      重置
    </button>
  </div>
</div>

```vue
<template>
  <VImageComparison
    ref="imageComparisonRef"
    before-image="https://picsum.photos/600/300?random=11"
    after-image="https://picsum.photos/600/300?random=12"
  />

  <div style="display: flex; gap: 1rem;">
    <button @click="setPosition(0)">0%</button>
    <button @click="setPosition(25)">25%</button>
    <button @click="setPosition(50)">50%</button>
    <button @click="setPosition(75)">75%</button>
    <button @click="setPosition(100)">100%</button>
    <button @click="resetPosition">重置</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { VImageComparison } from 'supreme-visual-effects'

const imageComparisonRef = ref()

const setPosition = position => {
  imageComparisonRef.value.setPosition(position)
}

const resetPosition = () => {
  imageComparisonRef.value.reset()
}
</script>
```

### 自定义标签

<div class="demo">
  <div style="height: 300px; border-radius: 8px; overflow: hidden;">
    <VImageComparison 
      before-image="https://picsum.photos/600/300?random=13"
      after-image="https://picsum.photos/600/300?random=14"
      before-label="原始设计"
      after-label="最终效果"
    />
  </div>
</div>

```vue
<template>
  <VImageComparison
    before-image="https://picsum.photos/600/300?random=13"
    after-image="https://picsum.photos/600/300?random=14"
    before-label="原始设计"
    after-label="最终效果"
  />
</template>

<script setup>
import { VImageComparison } from 'supreme-visual-effects'
</script>
```

### 不同尺寸

<div class="demo">
  <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
    <div style="width: 300px; height: 200px; border-radius: 8px; overflow: hidden;">
      <VImageComparison 
        before-image="https://picsum.photos/300/200?random=15"
        after-image="https://picsum.photos/300/200?random=16"
      />
    </div>
    <div style="width: 200px; height: 300px; border-radius: 8px; overflow: hidden;">
      <VImageComparison 
        before-image="https://picsum.photos/200/300?random=17"
        after-image="https://picsum.photos/200/300?random=18"
      />
    </div>
  </div>
</div>

```vue
<template>
  <div style="display: flex; gap: 1rem;">
    <div style="width: 300px; height: 200px;">
      <VImageComparison
        before-image="https://picsum.photos/300/200?random=15"
        after-image="https://picsum.photos/300/200?random=16"
      />
    </div>

    <div style="width: 200px; height: 300px;">
      <VImageComparison
        before-image="https://picsum.photos/200/300?random=17"
        after-image="https://picsum.photos/200/300?random=18"
      />
    </div>
  </div>
</template>

<script setup>
import { VImageComparison } from 'supreme-visual-effects'
</script>
```

## 使用场景

1. **设计对比** - 对比设计稿和最终效果
2. **照片编辑** - 对比编辑前后的照片
3. **产品展示** - 对比产品的不同版本
4. **医学影像** - 对比治疗前后的医学影像

## 注意事项

1. 需要提供beforeImage和afterImage两个图像URL
2. 组件会自动适应容器大小
3. 支持鼠标、触摸和键盘控制
4. 可以通过CSS自定义样式和动画效果
5. 组件会在卸载时自动清理事件监听器

<script setup>
import { ref } from 'vue'
import { VImageComparison } from '../../src/index'

const imageComparisonRef = ref()

const setPosition = (position) => {
  imageComparisonRef.value.setPosition(position)
}

const resetPosition = () => {
  imageComparisonRef.value.reset()
}
</script>

<style>
.demo {
  margin: 2rem 0;
}
</style>
