# VHover3D 3D悬停效果组件

VHover3D 是一个3D悬停效果组件，当鼠标悬停时会产生立体倾斜效果。

## 基础用法

<div class="demo">
  <div style="display: flex; justify-content: center; padding: 2rem;">
    <VHover3D>
      <div style="padding: 2rem; background: linear-gradient(45deg, #667eea, #764ba2); color: white; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
        <h3>3D悬停效果</h3>
        <p>将鼠标悬停在此卡片上</p>
      </div>
    </VHover3D>
  </div>
</div>

```vue
<template>
  <VHover3D>
    <div>
      <h3>标题</h3>
      <p>内容</p>
    </div>
  </VHover3D>
</template>

<script setup>
import { VHover3D } from 'supreme-visual-effects'
</script>
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| intensity | `number` | `20` | 倾斜强度 |
| perspective | `number` | `1000` | 透视距离 |
| transition | `string` | `'all 0.3s ease'` | 过渡动画 |
| resetOnLeave | `boolean` | `true` | 离开时是否重置 |
| axis | `'x' \| 'y' \| 'both'` | `'both'` | 倾斜轴向 |
| reverse | `boolean` | `false` | 是否反向倾斜 |
| scale | `number` | `1` | 默认缩放比例 |
| scaleOnHover | `number` | `1.05` | 悬停时缩放比例 |

## Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| mouse-enter | `()` | 鼠标进入时触发 |
| mouse-leave | `()` | 鼠标离开时触发 |
| mouse-move | `(event: MouseEvent)` | 鼠标移动时触发 |

## 示例

### 自定义强度
<div class="demo">
  <div style="display: flex; justify-content: center; padding: 2rem;">
    <VHover3D :intensity="40">
      <div style="padding: 2rem; background: linear-gradient(45deg, #ff6b6b, #feca57); color: white; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
        <h3>高强度倾斜</h3>
        <p>40度倾斜强度</p>
      </div>
    </VHover3D>
  </div>
</div>

```vue
<template>
  <VHover3D :intensity="40">
    <div>
      <h3>标题</h3>
      <p>内容</p>
    </div>
  </VHover3D>
</template>

<script setup>
import { VHover3D } from 'supreme-visual-effects'
</script>
```

### 单轴倾斜
<div class="demo">
  <div style="display: flex; justify-content: center; padding: 2rem; gap: 2rem;">
    <VHover3D axis="x">
      <div style="padding: 2rem; background: linear-gradient(45deg, #4ecdc4, #44a08d); color: white; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
        <h3>X轴倾斜</h3>
        <p>仅X轴倾斜效果</p>
      </div>
    </VHover3D>
    <VHover3D axis="y">
      <div style="padding: 2rem; background: linear-gradient(45deg, #a8edea, #fed6e3); color: #333; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
        <h3>Y轴倾斜</h3>
        <p>仅Y轴倾斜效果</p>
      </div>
    </VHover3D>
  </div>
</div>

```vue
<template>
  <VHover3D axis="x">
    <div>
      <h3>X轴倾斜</h3>
      <p>内容</p>
    </div>
  </VHover3D>
  
  <VHover3D axis="y">
    <div>
      <h3>Y轴倾斜</h3>
      <p>内容</p>
    </div>
  </VHover3D>
</template>

<script setup>
import { VHover3D } from 'supreme-visual-effects'
</script>
```

### 反向倾斜
<div class="demo">
  <div style="display: flex; justify-content: center; padding: 2rem;">
    <VHover3D :reverse="true">
      <div style="padding: 2rem; background: linear-gradient(45deg, #667eea, #764ba2); color: white; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
        <h3>反向倾斜</h3>
        <p>反向倾斜效果</p>
      </div>
    </VHover3D>
  </div>
</div>

```vue
<template>
  <VHover3D :reverse="true">
    <div>
      <h3>标题</h3>
      <p>内容</p>
    </div>
  </VHover3D>
</template>

<script setup>
import { VHover3D } from 'supreme-visual-effects'
</script>
```

### 自定义缩放
<div class="demo">
  <div style="display: flex; justify-content: center; padding: 2rem;">
    <VHover3D :scale="1" :scaleOnHover="1.2">
      <div style="padding: 2rem; background: linear-gradient(45deg, #ff9a9e, #fecfef); color: #333; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
        <h3>自定义缩放</h3>
        <p>悬停时放大1.2倍</p>
      </div>
    </VHover3D>
  </div>
</div>

```vue
<template>
  <VHover3D :scale="1" :scaleOnHover="1.2">
    <div>
      <h3>标题</h3>
      <p>内容</p>
    </div>
  </VHover3D>
</template>

<script setup>
import { VHover3D } from 'supreme-visual-effects'
</script>
```

### 卡片网格
<div class="demo">
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; padding: 2rem;">
    <VHover3D v-for="i in 4" :key="i">
      <div style="padding: 1.5rem; background: linear-gradient(45deg, #a8edea, #fed6e3); color: #333; border-radius: 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); text-align: center;">
        <h4>卡片 {{ i }}</h4>
        <p>悬停效果</p>
      </div>
    </VHover3D>
  </div>
</div>

```vue
<template>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
    <VHover3D v-for="i in 4" :key="i">
      <div>
        <h4>卡片 {{ i }}</h4>
        <p>内容</p>
      </div>
    </VHover3D>
  </div>
</template>

<script setup>
import { VHover3D } from 'supreme-visual-effects'
</script>
```

## 使用场景

1. **产品卡片** - 为产品卡片添加3D悬停效果
2. **导航菜单** - 为导航项添加交互效果
3. **作品集** - 为作品项添加立体效果
4. **按钮** - 为按钮添加悬停动画

## 注意事项

1. 组件会自动适应内容大小
2. 在窗口大小改变时会自动更新中心点
3. 组件会在卸载时自动清理事件监听器
4. 可以通过CSS自定义样式和阴影效果

<script setup>
import { VHover3D } from '../../src/index'
</script>

<style>
.demo {
  margin: 2rem 0;
}
</style>