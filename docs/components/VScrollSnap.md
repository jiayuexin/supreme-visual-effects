# VScrollSnap 整屏滚动分页组件

VScrollSnap 是一个整屏滚动分页组件，可以创建全屏滚动的分页效果。

## 基础用法

<div class="demo">
  <div style="height: 300px; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
    <VScrollSnap 
      :sections="[
        { content: '第一屏', backgroundColor: '#667eea', color: '#ffffff' },
        { content: '第二屏', backgroundColor: '#764ba2', color: '#ffffff' },
        { content: '第三屏', backgroundColor: '#f093fb', color: '#ffffff' }
      ]"
      :duration="500"
    />
  </div>
</div>

```vue
<template>
  <VScrollSnap
    :sections="[
      { content: '第一屏', backgroundColor: '#667eea' },
      { content: '第二屏', backgroundColor: '#764ba2' },
      { content: '第三屏', backgroundColor: '#f093fb' },
    ]"
  />
</template>

<script setup>
import { VScrollSnap } from 'supreme-visual-effects'
</script>
```

## Props

| 属性名             | 类型              | 默认值                                   | 说明                 |
| ------------------ | ----------------- | ---------------------------------------- | -------------------- |
| sections           | `ScrollSection[]` | `[默认配置]`                             | 滚动分页配置         |
| duration           | `number`          | `800`                                    | 滚动动画持续时间(ms) |
| easing             | `string`          | `'cubic-bezier(0.25, 0.46, 0.45, 0.94)'` | 动画缓动函数         |
| showIndicators     | `boolean`         | `true`                                   | 是否显示指示器       |
| showArrows         | `boolean`         | `true`                                   | 是否显示箭头         |
| keyboardNavigation | `boolean`         | `true`                                   | 是否启用键盘导航     |
| wheelSensitivity   | `number`          | `1`                                      | 鼠标滚轮灵敏度       |
| touchSensitivity   | `number`          | `50`                                     | 触摸灵敏度           |

### ScrollSection 类型

```ts
interface ScrollSection {
  content?: string
  style?: Record<string, unknown>
  backgroundColor?: string
  color?: string
}
```

## Events

| 事件名         | 参数                                      | 说明           |
| -------------- | ----------------------------------------- | -------------- |
| section-change | `(index: number, section: ScrollSection)` | 分页切换时触发 |
| section-enter  | `(index: number, section: ScrollSection)` | 进入分页时触发 |
| section-leave  | `(index: number, section: ScrollSection)` | 离开分页时触发 |

## Slots

| 插槽名          | 参数                                        | 说明           |
| --------------- | ------------------------------------------- | -------------- |
| section-{index} | `{ section: ScrollSection, index: number }` | 自定义分页内容 |

## 示例

### 自定义分页内容

<div class="demo">
  <div style="height: 300px; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
    <VScrollSnap 
      :sections="[
        { backgroundColor: '#ff6b6b', color: '#ffffff' },
        { backgroundColor: '#4ecdc4', color: '#ffffff' },
        { backgroundColor: '#45b7d1', color: '#ffffff' }
      ]"
    >
      <template #section-0>
        <div style="text-align: center;">
          <h2>首页</h2>
          <p>欢迎来到首页</p>
        </div>
      </template>
      
      <template #section-1>
        <div style="text-align: center;">
          <h2>产品</h2>
          <p>查看我们的产品</p>
        </div>
      </template>
      
      <template #section-2>
        <div style="text-align: center;">
          <h2>联系</h2>
          <p>联系我们</p>
        </div>
      </template>
    </VScrollSnap>
  </div>
</div>

```vue
<template>
  <VScrollSnap
    :sections="[{ backgroundColor: '#ff6b6b' }, { backgroundColor: '#4ecdc4' }, { backgroundColor: '#45b7d1' }]"
  >
    <template #section-0>
      <div>
        <h2>首页</h2>
        <p>欢迎来到首页</p>
      </div>
    </template>

    <template #section-1>
      <div>
        <h2>产品</h2>
        <p>查看我们的产品</p>
      </div>
    </template>

    <template #section-2>
      <div>
        <h2>联系</h2>
        <p>联系我们</p>
      </div>
    </template>
  </VScrollSnap>
</template>

<script setup>
import { VScrollSnap } from 'supreme-visual-effects'
</script>
```

### 隐藏指示器和箭头

<div class="demo">
  <div style="height: 300px; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
    <VScrollSnap 
      :sections="[
        { content: '无指示器', backgroundColor: '#667eea', color: '#ffffff' },
        { content: '无箭头', backgroundColor: '#764ba2', color: '#ffffff' }
      ]"
      :show-indicators="false"
      :show-arrows="false"
    />
  </div>
</div>

```vue
<template>
  <VScrollSnap
    :sections="[{ content: '无指示器' }, { content: '无箭头' }]"
    :show-indicators="false"
    :show-arrows="false"
  />
</template>

<script setup>
import { VScrollSnap } from 'supreme-visual-effects'
</script>
```

### 自定义动画

<div class="demo">
  <div style="height: 300px; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
    <VScrollSnap 
      :sections="[
        { content: '快速滚动', backgroundColor: '#ff6b6b', color: '#ffffff' },
        { content: '慢速滚动', backgroundColor: '#4ecdc4', color: '#ffffff' }
      ]"
      :duration="300"
      easing="ease-in-out"
    />
  </div>
</div>

```vue
<template>
  <VScrollSnap :sections="[{ content: '快速滚动' }, { content: '慢速滚动' }]" :duration="300" easing="ease-in-out" />
</template>

<script setup>
import { VScrollSnap } from 'supreme-visual-effects'
</script>
```

### 键盘导航

<div class="demo">
  <div style="height: 300px; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
    <VScrollSnap 
      :sections="[
        { content: '按↑↓键导航', backgroundColor: '#667eea', color: '#ffffff' },
        { content: '按PageUp/PageDown导航', backgroundColor: '#764ba2', color: '#ffffff' },
        { content: '按Home/End键导航', backgroundColor: '#f093fb', color: '#ffffff' }
      ]"
      :keyboard-navigation="true"
    />
  </div>
</div>

```vue
<template>
  <VScrollSnap
    :sections="[{ content: '按↑↓键导航' }, { content: '按PageUp/PageDown导航' }, { content: '按Home/End键导航' }]"
    :keyboard-navigation="true"
  />
</template>

<script setup>
import { VScrollSnap } from 'supreme-visual-effects'
</script>
```

### 调整灵敏度

<div class="demo">
  <div style="height: 300px; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
    <VScrollSnap 
      :sections="[
        { content: '低灵敏度', backgroundColor: '#ff6b6b', color: '#ffffff' },
        { content: '高灵敏度', backgroundColor: '#4ecdc4', color: '#ffffff' }
      ]"
      :wheel-sensitivity="0.5"
      :touch-sensitivity="100"
    />
  </div>
</div>

```vue
<template>
  <VScrollSnap
    :sections="[{ content: '低灵敏度' }, { content: '高灵敏度' }]"
    :wheel-sensitivity="0.5"
    :touch-sensitivity="100"
  />
</template>

<script setup>
import { VScrollSnap } from 'supreme-visual-effects'
</script>
```

### 大量分页

<div class="demo">
  <div style="height: 300px; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
    <VScrollSnap 
      :sections="[
        { content: '第1页', backgroundColor: '#667eea', color: '#ffffff' },
        { content: '第2页', backgroundColor: '#764ba2', color: '#ffffff' },
        { content: '第3页', backgroundColor: '#f093fb', color: '#ffffff' },
        { content: '第4页', backgroundColor: '#4ecdc4', color: '#ffffff' },
        { content: '第5页', backgroundColor: '#feca57', color: '#ffffff' }
      ]"
    />
  </div>
</div>

```vue
<template>
  <VScrollSnap
    :sections="[
      { content: '第1页' },
      { content: '第2页' },
      { content: '第3页' },
      { content: '第4页' },
      { content: '第5页' },
    ]"
  />
</template>

<script setup>
import { VScrollSnap } from 'supreme-visual-effects'
</script>
```

### 自定义样式

<div class="demo">
  <div style="height: 300px; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
    <VScrollSnap 
      :sections="[
        { 
          content: '自定义样式', 
          backgroundColor: '#000', 
          color: '#fff',
          style: { 
            backgroundImage: 'linear-gradient(45deg, #667eea, #764ba2)',
            fontSize: '2rem'
          }
        }
      ]"
    />
  </div>
</div>

```vue
<template>
  <VScrollSnap
    :sections="[
      {
        content: '自定义样式',
        style: {
          backgroundImage: 'linear-gradient(45deg, #667eea, #764ba2)',
          fontSize: '2rem',
        },
      },
    ]"
  />
</template>

<script setup>
import { VScrollSnap } from 'supreme-visual-effects'
</script>
```

## 使用场景

1. **首页展示** - 为网站首页添加全屏滚动展示
2. **产品介绍** - 为产品介绍页面添加分页展示
3. **作品集** - 为作品集页面添加整屏展示
4. **演示文稿** - 为在线演示添加分页效果

## 注意事项

1. 组件默认占满整个视口高度
2. 可以通过sections属性自定义每一页的内容和样式
3. 支持鼠标滚轮、触摸和键盘导航
4. 可以通过插槽自定义每一页的内容
5. 组件会自动处理动画和过渡效果

<script setup>
import { VScrollSnap } from '../../src/index'
</script>

<style>
.demo {
  margin: 2rem 0;
}
</style>
