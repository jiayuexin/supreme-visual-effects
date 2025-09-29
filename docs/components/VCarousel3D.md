# VCarousel3D 3D轮播组件

VCarousel3D 是一个具有3D效果的轮播组件，支持自动播放、手势操作和自定义样式。

## 基础用法

<div class="demo">
  <div style="position: relative; height: 400px; background: #f0f0f0; border-radius: 8px; overflow: hidden;">
    <VCarousel3D :items="carouselItems" />
  </div>
</div>

```vue
<template>
  <VCarousel3D :items="carouselItems" />
</template>

<script setup>
import { VCarousel3D } from 'supreme-visual-effects'
import { ref } from 'vue'

const carouselItems = ref([
  {
    title: '项目 1',
    description: '这是第一个项目的描述',
    image: '/images/item1.jpg',
  },
  {
    title: '项目 2',
    description: '这是第二个项目的描述',
    image: '/images/item2.jpg',
  },
  {
    title: '项目 3',
    description: '这是第三个项目的描述',
    image: '/images/item3.jpg',
  },
])
</script>
```

## Props

| 属性名             | 类型             | 默认值     | 说明                 |
| ------------------ | ---------------- | ---------- | -------------------- |
| items              | `CarouselItem[]` | `required` | 轮播项目数组         |
| currentIndex       | `number`         | `0`        | 当前显示的项目索引   |
| autoPlay           | `boolean`        | `false`    | 是否自动播放         |
| autoPlayInterval   | `number`         | `3000`     | 自动播放间隔（毫秒） |
| showArrows         | `boolean`        | `true`     | 是否显示导航箭头     |
| showIndicators     | `boolean`        | `true`     | 是否显示指示器       |
| perspective        | `number`         | `1000`     | 3D透视效果强度       |
| itemSpacing        | `number`         | `200`      | 项目间距             |
| rotationY          | `number`         | `45`       | Y轴旋转角度          |
| scale              | `number`         | `0.8`      | 非激活项目的缩放比例 |
| transitionDuration | `number`         | `500`      | 动画过渡时间（毫秒） |
| loop               | `boolean`        | `true`     | 是否循环播放         |
| touchSensitivity   | `number`         | `50`       | 触摸灵敏度           |

## Events

| 事件名              | 参数                                  | 说明               |
| ------------------- | ------------------------------------- | ------------------ |
| update:currentIndex | `(index: number)`                     | 当前索引改变时触发 |
| item-change         | `(index: number, item: CarouselItem)` | 项目切换时触发     |
| item-click          | `(index: number, item: CarouselItem)` | 点击项目时触发     |

## Slots

| 插槽名         | 参数                                    | 说明                     |
| -------------- | --------------------------------------- | ------------------------ |
| `item-{index}` | `{ item: CarouselItem, index: number }` | 自定义每个项目的显示内容 |

## 类型定义

```ts
interface CarouselItem {
  id?: string | number
  title?: string
  description?: string
  image?: string
  [key: string]: unknown
}
```

## 示例

### 基础轮播

<div class="demo">
  <div style="position: relative; height: 400px; background: #f0f0f0; border-radius: 8px; overflow: hidden;">
    <VCarousel3D 
      :items="items" 
      :autoPlay="true" 
      :autoPlayInterval="2000" 
    />
  </div>
</div>

```vue
<template>
  <VCarousel3D :items="items" :autoPlay="true" :autoPlayInterval="2000" />
</template>

<script setup>
import { VCarousel3D } from 'supreme-visual-effects'
import { ref } from 'vue'

const items = ref([
  { title: '项目 1', image: '/images/1.jpg' },
  { title: '项目 2', image: '/images/2.jpg' },
  { title: '项目 3', image: '/images/3.jpg' },
])
</script>
```

### 自定义项目内容

<div class="demo">
  <div style="position: relative; height: 400px; background: #f0f0f0; border-radius: 8px; overflow: hidden;">
    <VCarousel3D :items="items">
      <template #item-0="{ item, index }">
        <div class="custom-item" style="width: 100%; height: 100%; background: linear-gradient(45deg, #ff6b6b, #4ecdc4); border-radius: 12px; display: flex; flex-direction: column; justify-content: center; align-items: center; color: white; padding: 1rem; box-sizing: border-box;">
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
          <button @click="handleClick(index)" style="margin-top: 1rem; padding: 0.5rem 1rem; background: white; color: #ff6b6b; border: none; border-radius: 4px; cursor: pointer;">
            了解更多
          </button>
        </div>
      </template>
    </VCarousel3D>
  </div>
</div>

```vue
<template>
  <VCarousel3D :items="items">
    <template #item-0="{ item, index }">
      <div class="custom-item">
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
        <button @click="handleClick(index)">了解更多</button>
      </div>
    </template>
  </VCarousel3D>
</template>

<script setup>
import { VCarousel3D } from 'supreme-visual-effects'
import { ref } from 'vue'

const items = ref([
  {
    title: '特色项目',
    description: '这是一个特色项目的描述',
    image: '/images/special.jpg',
  },
])

const handleClick = index => {
  console.log('点击了项目:', index)
}
</script>
```

### 禁用自动播放

<div class="demo">
  <div style="position: relative; height: 400px; background: #f0f0f0; border-radius: 8px; overflow: hidden;">
    <VCarousel3D 
      :items="items" 
      :autoPlay="false" 
      :showArrows="true" 
      :showIndicators="true" 
    />
  </div>
</div>

```vue
<template>
  <VCarousel3D :items="items" :autoPlay="false" :showArrows="true" :showIndicators="true" />
</template>

<script setup>
import { VCarousel3D } from 'supreme-visual-effects'
import { ref } from 'vue'

const items = ref([
  { title: '项目 1', description: '第一个项目' },
  { title: '项目 2', description: '第二个项目' },
  { title: '项目 3', description: '第三个项目' },
])
</script>
```

### 自定义样式

<div class="demo">
  <div style="position: relative; height: 400px; background: #f0f0f0; border-radius: 8px; overflow: hidden;">
    <VCarousel3D 
      :items="items" 
      :perspective="800" 
      :rotationY="60" 
      :scale="0.7" 
    />
  </div>
</div>

```vue
<template>
  <VCarousel3D :items="items" :perspective="800" :rotationY="60" :scale="0.7" />
</template>

<script setup>
import { VCarousel3D } from 'supreme-visual-effects'
import { ref } from 'vue'

const items = ref([{ title: '项目 1' }, { title: '项目 2' }, { title: '项目 3' }])
</script>
```

## 方法

可以通过模板引用调用以下方法：

| 方法名        | 参数              | 说明                 |
| ------------- | ----------------- | -------------------- |
| goToNext      | `()`              | 切换到下一个项目     |
| goToPrev      | `()`              | 切换到上一个项目     |
| goToIndex     | `(index: number)` | 切换到指定索引的项目 |
| startAutoPlay | `()`              | 开始自动播放         |
| stopAutoPlay  | `()`              | 停止自动播放         |

<div class="demo">
  <div style="position: relative; height: 400px; background: #f0f0f0; border-radius: 8px; overflow: hidden; margin-bottom: 1rem;">
    <VCarousel3D ref="carouselRef" :items="items" />
  </div>
  <div style="display: flex; gap: 1rem; justify-content: center;">
    <button @click="prev" style="padding: 0.5rem 1rem; background: #4f46e5; color: white; border: none; border-radius: 4px; cursor: pointer;">上一个</button>
    <button @click="next" style="padding: 0.5rem 1rem; background: #4f46e5; color: white; border: none; border-radius: 4px; cursor: pointer;">下一个</button>
  </div>
</div>

```vue
<template>
  <VCarousel3D ref="carouselRef" :items="items" />
  <button @click="next">下一个</button>
  <button @click="prev">上一个</button>
</template>

<script setup>
import { VCarousel3D } from 'supreme-visual-effects'
import { ref } from 'vue'

const carouselRef = ref()
const items = ref([{ title: '项目 1' }, { title: '项目 2' }, { title: '项目 3' }])

const next = () => {
  carouselRef.value.goToNext()
}

const prev = () => {
  carouselRef.value.goToPrev()
}
</script>
```

## 注意事项

1. `items` 属性是必需的，且至少需要包含一个项目
2. 图片路径需要确保正确加载
3. 在移动设备上支持触摸滑动操作
4. 可以通过CSS变量自定义样式

<script setup>
import { ref } from 'vue'
import { VCarousel3D } from '../../src/index'

// 基础用法演示数据
const carouselItems = ref([
  {
    title: '3D轮播',
    description: '具有3D效果的轮播组件',
    image: 'https://picsum.photos/300/200?random=1'
  },
  {
    title: '自动播放',
    description: '支持自动播放功能',
    image: 'https://picsum.photos/300/200?random=2'
  },
  {
    title: '手势操作',
    description: '支持触摸手势操作',
    image: 'https://picsum.photos/300/200?random=3'
  }
])

// 示例数据
const items = ref([
  { title: '项目 1', description: '第一个项目' },
  { title: '项目 2', description: '第二个项目' },
  { title: '项目 3', description: '第三个项目' }
])

// 方法演示引用
const carouselRef = ref()

const next = () => {
  carouselRef.value?.goToNext()
}

const prev = () => {
  carouselRef.value?.goToPrev()
}

const handleClick = (index) => {
  alert(`点击了项目: ${index}`)
}
</script>

<style>
.demo {
  margin: 2rem 0;
}
</style>
