# VTextMask 文字遮罩组件

VTextMask 是一个文字遮罩组件，可以创建沿路径运动的文字遮罩效果。

## 基础用法

<div class="demo">
  <div style="display: flex; justify-content: center; padding: 2rem;">
    <VTextMask text="文字遮罩效果" />
  </div>
</div>

```vue
<template>
  <VTextMask text="文字遮罩效果" />
</template>

<script setup>
import { VTextMask } from 'supreme-visual-effects'
</script>
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| text | `string` | `''` | 显示的文字内容 |
| path | `string \| Array` | `'M 0,50 Q 50,0 100,50 T 200,50'` | 遮罩路径 |
| animation | `boolean` | `true` | 是否启用动画 |
| duration | `number` | `2000` | 动画持续时间(ms) |
| delay | `number` | `0` | 动画延迟时间(ms) |
| strokeWidth | `number` | `4` | 路径描边宽度 |
| strokeColor | `string` | `'#ffffff'` | 路径描边颜色 |
| fillColor | `string` | `'transparent'` | 路径填充颜色 |
| backgroundColor | `string` | `'#000000'` | 背景颜色 |
| textColor | `string` | `'#ffffff'` | 文字颜色 |
| fontSize | `string` | `'24px'` | 字体大小 |
| fontFamily | `string` | `'Arial, sans-serif'` | 字体族 |
| width | `number` | `400` | 容器宽度 |
| height | `number` | `100` | 容器高度 |

## Expose Methods

| 方法名 | 参数 | 说明 |
| --- | --- | --- |
| start | `()` | 开始动画 |
| stop | `()` | 停止动画 |
| reset | `()` | 重置动画 |

## 示例

### 自定义路径
<div class="demo">
  <div style="display: flex; justify-content: center; gap: 1rem; padding: 2rem; flex-wrap: wrap;">
    <VTextMask 
      text="波浪路径" 
      path="M 0,50 Q 50,0 100,50 T 200,50 T 300,50 T 400,50"
    />
    <VTextMask 
      text="圆形路径" 
      path="M 200,100 m -75,0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
      :width="300"
      :height="200"
    />
  </div>
</div>

```vue
<template>
  <VTextMask 
    text="波浪路径" 
    path="M 0,50 Q 50,0 100,50 T 200,50 T 300,50 T 400,50"
  />
  
  <VTextMask 
    text="圆形路径" 
    path="M 200,100 m -75,0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
    :width="300"
    :height="200"
  />
</template>

<script setup>
import { VTextMask } from 'supreme-visual-effects'
</script>
```

### 调整动画速度
<div class="demo">
  <div style="display: flex; justify-content: center; gap: 1rem; padding: 2rem; flex-wrap: wrap;">
    <VTextMask 
      text="快速动画" 
      :duration="1000"
    />
    <VTextMask 
      text="慢速动画" 
      :duration="4000"
    />
  </div>
</div>

```vue
<template>
  <VTextMask 
    text="快速动画" 
    :duration="1000"
  />
  
  <VTextMask 
    text="慢速动画" 
    :duration="4000"
  />
</template>

<script setup>
import { VTextMask } from 'supreme-visual-effects'
</script>
```

### 自定义样式
<div class="demo">
  <div style="display: flex; justify-content: center; gap: 1rem; padding: 2rem; flex-wrap: wrap;">
    <VTextMask 
      text="红色遮罩" 
      stroke-color="#ff6b6b"
      text-color="#ff6b6b"
      background-color="#000"
    />
    <VTextMask 
      text="绿色遮罩" 
      stroke-color="#4ecdc4"
      text-color="#4ecdc4"
      background-color="#000"
    />
  </div>
</div>

```vue
<template>
  <VTextMask 
    text="红色遮罩" 
    stroke-color="#ff6b6b"
    text-color="#ff6b6b"
    background-color="#000"
  />
  
  <VTextMask 
    text="绿色遮罩" 
    stroke-color="#4ecdc4"
    text-color="#4ecdc4"
    background-color="#000"
  />
</template>

<script setup>
import { VTextMask } from 'supreme-visual-effects'
</script>
```

### 无动画效果
<div class="demo">
  <div style="display: flex; justify-content: center; padding: 2rem;">
    <VTextMask 
      text="静态遮罩" 
      :animation="false"
    />
  </div>
</div>

```vue
<template>
  <VTextMask 
    text="静态遮罩" 
    :animation="false"
  />
</template>

<script setup>
import { VTextMask } from 'supreme-visual-effects'
</script>
```

### 延迟动画
<div class="demo">
  <div style="display: flex; justify-content: center; gap: 1rem; padding: 2rem; flex-wrap: wrap;">
    <VTextMask 
      text="延迟动画" 
      :delay="1000"
    />
  </div>
</div>

```vue
<template>
  <VTextMask 
    text="延迟动画" 
    :delay="1000"
  />
</template>

<script setup>
import { VTextMask } from 'supreme-visual-effects'
</script>
```

### 控制动画
<div class="demo">
  <div style="display: flex; justify-content: center; gap: 1rem; padding: 2rem; flex-wrap: wrap; flex-direction: column; align-items: center;">
    <VTextMask 
      ref="textMaskRef"
      text="可控制动画" 
      :duration="3000"
    />
    <div style="display: flex; gap: 1rem;">
      <button @click="startAnimation" style="padding: 0.5rem 1rem; background: #4f46e5; color: white; border: none; border-radius: 4px; cursor: pointer;">
        开始
      </button>
      <button @click="stopAnimation" style="padding: 0.5rem 1rem; background: #6b7280; color: white; border: none; border-radius: 4px; cursor: pointer;">
        停止
      </button>
      <button @click="resetAnimation" style="padding: 0.5rem 1rem; background: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer;">
        重置
      </button>
    </div>
  </div>
</div>

```vue
<template>
  <VTextMask 
    ref="textMaskRef"
    text="可控制动画" 
    :duration="3000"
  />
  
  <div style="display: flex; gap: 1rem;">
    <button @click="startAnimation">开始</button>
    <button @click="stopAnimation">停止</button>
    <button @click="resetAnimation">重置</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { VTextMask } from 'supreme-visual-effects'

const textMaskRef = ref()

const startAnimation = () => {
  textMaskRef.value.start()
}

const stopAnimation = () => {
  textMaskRef.value.stop()
}

const resetAnimation = () => {
  textMaskRef.value.reset()
}
</script>
```

### 多行文字
<div class="demo">
  <div style="display: flex; justify-content: center; gap: 1rem; padding: 2rem; flex-wrap: wrap;">
    <VTextMask 
      text="第一行文字" 
      path="M 0,30 Q 100,0 200,30 T 400,30"
      :width="400"
      :height="60"
    />
    <VTextMask 
      text="第二行文字" 
      path="M 0,30 Q 100,60 200,30 T 400,30"
      :width="400"
      :height="60"
    />
  </div>
</div>

```vue
<template>
  <VTextMask 
    text="第一行文字" 
    path="M 0,30 Q 100,0 200,30 T 400,30"
    :width="400"
    :height="60"
  />
  
  <VTextMask 
    text="第二行文字" 
    path="M 0,30 Q 100,60 200,30 T 400,30"
    :width="400"
    :height="60"
  />
</template>

<script setup>
import { VTextMask } from 'supreme-visual-effects'
</script>
```

## 使用场景

1. **标题动画** - 为页面标题添加路径动画效果
2. **品牌展示** - 为品牌名称添加独特的遮罩动画
3. **开场动画** - 为网站开场添加炫酷的文字动画
4. **作品展示** - 为作品标题添加视觉吸引力

## 注意事项

1. 组件需要明确设置宽度和高度
2. 路径坐标需要根据容器尺寸进行调整
3. 在性能较低的设备上建议降低动画复杂度
4. 组件会在卸载时自动清理动画帧
5. 可以通过CSS自定义字体和样式

<script setup>
import { ref } from 'vue'
import { VTextMask } from '../../src/index'

const textMaskRef = ref()

const startAnimation = () => {
  textMaskRef.value.start()
}

const stopAnimation = () => {
  textMaskRef.value.stop()
}

const resetAnimation = () => {
  textMaskRef.value.reset()
}
</script>

<style>
.demo {
  margin: 2rem 0;
}
</style>