# VLightbox 弹窗组件

VLightbox 是一个弹窗组件，可以创建美观的图片和内容弹窗效果。

## 基础用法

<div class="demo">
  <div style="display: flex; justify-content: center; gap: 1rem; padding: 2rem; flex-wrap: wrap;">
    <button @click="openLightbox1" style="padding: 0.5rem 1rem; background: #4f46e5; color: white; border: none; border-radius: 4px; cursor: pointer;">
      打开弹窗
    </button>
  </div>
  
  <VLightbox 
    v-model:is-open="isOpen1"
    v-model:current-index="currentIndex1"
    :items="[
      { 
        image: 'https://picsum.photos/800/600?random=1', 
        title: '美丽风景', 
        description: '这是一张美丽的风景照片' 
      }
    ]"
  />
</div>

```vue
<template>
  <button @click="isOpen = true">打开弹窗</button>
  
  <VLightbox 
    v-model:is-open="isOpen"
    v-model:current-index="currentIndex"
    :items="[
      { 
        image: 'https://picsum.photos/800/600?random=1', 
        title: '美丽风景', 
        description: '这是一张美丽的风景照片' 
      }
    ]"
  />
</template>

<script setup>
import { ref } from 'vue'
import { VLightbox } from 'supreme-visual-effects'

const isOpen = ref(false)
const currentIndex = ref(0)
</script>
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| isOpen | `boolean` | `false` | 弹窗是否打开 |
| items | `LightboxItem[]` | `[]` | 弹窗项目列表 |
| currentIndex | `number` | `0` | 当前项目索引 |
| showCloseButton | `boolean` | `true` | 是否显示关闭按钮 |
| showNavigation | `boolean` | `true` | 是否显示导航箭头 |
| showCounter | `boolean` | `true` | 是否显示计数器 |
| closeOnOverlay | `boolean` | `true` | 点击遮罩是否关闭 |
| closeOnEscape | `boolean` | `true` | 按ESC键是否关闭 |
| keyboardNavigation | `boolean` | `true` | 是否启用键盘导航 |
| animationType | `'fade' \| 'scale' \| 'slide'` | `'fade'` | 动画类型 |
| animationDuration | `number` | `300` | 动画持续时间(ms) |
| backgroundColor | `string` | `'rgba(0, 0, 0, 0.9)'` | 背景颜色 |
| maxWidth | `string` | `'90vw'` | 最大宽度 |
| maxHeight | `string` | `'90vh'` | 最大高度 |

### LightboxItem 类型

```ts
interface LightboxItem {
  id?: string | number
  image?: string
  title?: string
  description?: string
  alt?: string
  [key: string]: unknown
}
```

## Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| update:isOpen | `(isOpen: boolean)` | 弹窗状态更新时触发 |
| update:currentIndex | `(index: number)` | 当前索引更新时触发 |
| close | `()` | 弹窗关闭时触发 |
| open | `()` | 弹窗打开时触发 |
| item-change | `(index: number, item: LightboxItem)` | 项目切换时触发 |

## Expose Methods

| 方法名 | 参数 | 说明 |
| --- | --- | --- |
| open | `()` | 打开弹窗 |
| close | `()` | 关闭弹窗 |
| goToIndex | `(index: number)` | 跳转到指定索引 |
| goToPrev | `()` | 跳转到上一个项目 |
| goToNext | `()` | 跳转到下一个项目 |

## Slots

| 插槽名 | 参数 | 说明 |
| --- | --- | --- |
| default | `{ item: LightboxItem, index: number, close: Function }` | 自定义内容插槽 |

## 示例

### 多张图片
<div class="demo">
  <div style="display: flex; justify-content: center; gap: 1rem; padding: 2rem; flex-wrap: wrap;">
    <div v-for="(image, index) in images" :key="index" style="cursor: pointer;" @click="openLightbox2(index)">
      <img :src="image.thumb" :alt="`图片 ${index + 1}`" style="width: 100px; height: 100px; object-fit: cover; border-radius: 8px;">
    </div>
  </div>
  
  <VLightbox 
    v-model:is-open="isOpen2"
    v-model:current-index="currentIndex2"
    :items="images"
  />
</div>

```vue
<template>
  <div style="display: flex; gap: 1rem;">
    <div v-for="(image, index) in images" :key="index" @click="currentIndex = index; isOpen = true">
      <img :src="image.thumb" :alt="`图片 ${index + 1}`" style="width: 100px; height: 100px;">
    </div>
  </div>
  
  <VLightbox 
    v-model:is-open="isOpen"
    v-model:current-index="currentIndex"
    :items="images"
  />
</template>

<script setup>
import { ref } from 'vue'
import { VLightbox } from 'supreme-visual-effects'

const isOpen = ref(false)
const currentIndex = ref(0)

const images = [
  { 
    image: 'https://picsum.photos/800/600?random=1', 
    thumb: 'https://picsum.photos/200/200?random=1',
    title: '图片1', 
    description: '第一张图片的描述' 
  },
  { 
    image: 'https://picsum.photos/800/600?random=2', 
    thumb: 'https://picsum.photos/200/200?random=2',
    title: '图片2', 
    description: '第二张图片的描述' 
  },
  { 
    image: 'https://picsum.photos/800/600?random=3', 
    thumb: 'https://picsum.photos/200/200?random=3',
    title: '图片3', 
    description: '第三张图片的描述' 
  }
]
</script>
```

### 自定义内容
<div class="demo">
  <div style="display: flex; justify-content: center; gap: 1rem; padding: 2rem;">
    <button @click="openLightbox3" style="padding: 0.5rem 1rem; background: #4f46e5; color: white; border: none; border-radius: 4px; cursor: pointer;">
      自定义内容弹窗
    </button>
  </div>
  
  <VLightbox 
    v-model:is-open="isOpen3"
    :items="[{ id: 1 }]"
  >
    <template #default="{ close }">
      <div style="padding: 2rem; text-align: center;">
        <h2>自定义内容</h2>
        <p>这是自定义的弹窗内容</p>
        <button @click="close" style="padding: 0.5rem 1rem; background: #6b7280; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 1rem;">
          关闭
        </button>
      </div>
    </template>
  </VLightbox>
</div>

```vue
<template>
  <button @click="isOpen = true">自定义内容弹窗</button>
  
  <VLightbox 
    v-model:is-open="isOpen"
    :items="[{ id: 1 }]"
  >
    <template #default="{ close }">
      <div style="padding: 2rem;">
        <h2>自定义内容</h2>
        <p>这是自定义的弹窗内容</p>
        <button @click="close">关闭</button>
      </div>
    </template>
  </VLightbox>
</template>

<script setup>
import { ref } from 'vue'
import { VLightbox } from 'supreme-visual-effects'

const isOpen = ref(false)
</script>
```

### 隐藏导航元素
<div class="demo">
  <div style="display: flex; justify-content: center; gap: 1rem; padding: 2rem;">
    <button @click="openLightbox4" style="padding: 0.5rem 1rem; background: #4f46e5; color: white; border: none; border-radius: 4px; cursor: pointer;">
      简洁弹窗
    </button>
  </div>
  
  <VLightbox 
    v-model:is-open="isOpen4"
    v-model:current-index="currentIndex4"
    :items="[
      { image: 'https://picsum.photos/800/600?random=4', title: '无导航元素' }
    ]"
    :show-close-button="false"
    :show-navigation="false"
    :show-counter="false"
  />
</div>

```vue
<template>
  <button @click="isOpen = true">简洁弹窗</button>
  
  <VLightbox 
    v-model:is-open="isOpen"
    :items="[{ image: 'https://picsum.photos/800/600?random=4' }]"
    :show-close-button="false"
    :show-navigation="false"
    :show-counter="false"
  />
</template>

<script setup>
import { ref } from 'vue'
import { VLightbox } from 'supreme-visual-effects'

const isOpen = ref(false)
</script>
```

### 自定义样式
<div class="demo">
  <div style="display: flex; justify-content: center; gap: 1rem; padding: 2rem;">
    <button @click="openLightbox5" style="padding: 0.5rem 1rem; background: #4f46e5; color: white; border: none; border-radius: 4px; cursor: pointer;">
      自定义样式弹窗
    </button>
  </div>
  
  <VLightbox 
    v-model:is-open="isOpen5"
    :items="[
      { image: 'https://picsum.photos/800/600?random=5', title: '自定义样式' }
    ]"
    background-color="rgba(255, 107, 107, 0.9)"
    max-width="70vw"
    max-height="70vh"
  />
</div>

```vue
<template>
  <button @click="isOpen = true">自定义样式弹窗</button>
  
  <VLightbox 
    v-model:is-open="isOpen"
    :items="[{ image: 'https://picsum.photos/800/600?random=5' }]"
    background-color="rgba(255, 107, 107, 0.9)"
    max-width="70vw"
    max-height="70vh"
  />
</template>

<script setup>
import { ref } from 'vue'
import { VLightbox } from 'supreme-visual-effects'

const isOpen = ref(false)
</script>
```

### 键盘控制
<div class="demo">
  <div style="display: flex; justify-content: center; gap: 1rem; padding: 2rem;">
    <button @click="openLightbox6" style="padding: 0.5rem 1rem; background: #4f46e5; color: white; border: none; border-radius: 4px; cursor: pointer;">
      键盘控制弹窗
    </button>
  </div>
  
  <VLightbox 
    v-model:is-open="isOpen6"
    v-model:current-index="currentIndex6"
    :items="[
      { image: 'https://picsum.photos/800/600?random=6', title: '按←→键切换' },
      { image: 'https://picsum.photos/800/600?random=7', title: '按ESC键关闭' },
      { image: 'https://picsum.photos/800/600?random=8', title: '按Home/End键跳转' }
    ]"
    :keyboard-navigation="true"
  />
</div>

```vue
<template>
  <button @click="isOpen = true">键盘控制弹窗</button>
  
  <VLightbox 
    v-model:is-open="isOpen"
    :items="[
      { image: 'https://picsum.photos/800/600?random=6' },
      { image: 'https://picsum.photos/800/600?random=7' },
      { image: 'https://picsum.photos/800/600?random=8' }
    ]"
    :keyboard-navigation="true"
  />
</template>

<script setup>
import { ref } from 'vue'
import { VLightbox } from 'supreme-visual-effects'

const isOpen = ref(false)
</script>
```

### 控制方法
<div class="demo">
  <div style="display: flex; justify-content: center; gap: 1rem; padding: 2rem; flex-wrap: wrap;">
    <button @click="openLightbox7" style="padding: 0.5rem 1rem; background: #4f46e5; color: white; border: none; border-radius: 4px; cursor: pointer;">
      控制方法弹窗
    </button>
    <div style="display: flex; gap: 0.5rem;">
      <button @click="goToPrev" style="padding: 0.5rem 1rem; background: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer;">
        上一个
      </button>
      <button @click="goToNext" style="padding: 0.5rem 1rem; background: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer;">
        下一个
      </button>
      <button @click="closeLightbox7" style="padding: 0.5rem 1rem; background: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer;">
        关闭
      </button>
    </div>
  </div>
  
  <VLightbox 
    ref="lightboxRef"
    v-model:is-open="isOpen7"
    v-model:current-index="currentIndex7"
    :items="[
      { image: 'https://picsum.photos/800/600?random=9', title: '第一张' },
      { image: 'https://picsum.photos/800/600?random=10', title: '第二张' },
      { image: 'https://picsum.photos/800/600?random=11', title: '第三张' }
    ]"
  />
</div>

```vue
<template>
  <button @click="lightboxRef.open()">控制方法弹窗</button>
  
  <div style="display: flex; gap: 1rem;">
    <button @click="lightboxRef.goToPrev()">上一个</button>
    <button @click="lightboxRef.goToNext()">下一个</button>
    <button @click="lightboxRef.close()">关闭</button>
  </div>
  
  <VLightbox 
    ref="lightboxRef"
    v-model:is-open="isOpen"
    :items="[
      { image: 'https://picsum.photos/800/600?random=9' },
      { image: 'https://picsum.photos/800/600?random=10' },
      { image: 'https://picsum.photos/800/600?random=11' }
    ]"
  />
</template>

<script setup>
import { ref } from 'vue'
import { VLightbox } from 'supreme-visual-effects'

const lightboxRef = ref()
const isOpen = ref(false)
</script>
```

## 使用场景

1. **图片画廊** - 展示图片集合
2. **产品展示** - 展示产品细节
3. **内容预览** - 预览文档或内容
4. **媒体播放** - 播放视频或音频

## 注意事项

1. 组件使用Teleport挂载到body元素
2. 支持键盘导航和ESC键关闭
3. 可以通过插槽自定义弹窗内容
4. 组件会在打开时阻止页面滚动
5. 可以通过CSS自定义样式和动画效果

<script setup>
import { ref } from 'vue'
import { VLightbox } from '../../src/index'

// 示例1
const isOpen1 = ref(false)
const currentIndex1 = ref(0)

const openLightbox1 = () => {
  isOpen1.value = true
}

// 示例2
const isOpen2 = ref(false)
const currentIndex2 = ref(0)

const images = [
  { 
    image: 'https://picsum.photos/800/600?random=1', 
    thumb: 'https://picsum.photos/200/200?random=1',
    title: '图片1', 
    description: '第一张图片的描述' 
  },
  { 
    image: 'https://picsum.photos/800/600?random=2', 
    thumb: 'https://picsum.photos/200/200?random=2',
    title: '图片2', 
    description: '第二张图片的描述' 
  },
  { 
    image: 'https://picsum.photos/800/600?random=3', 
    thumb: 'https://picsum.photos/200/200?random=3',
    title: '图片3', 
    description: '第三张图片的描述' 
  }
]

const openLightbox2 = (index) => {
  currentIndex2.value = index
  isOpen2.value = true
}

// 示例3
const isOpen3 = ref(false)

const openLightbox3 = () => {
  isOpen3.value = true
}

// 示例4
const isOpen4 = ref(false)
const currentIndex4 = ref(0)

const openLightbox4 = () => {
  isOpen4.value = true
}

// 示例5
const isOpen5 = ref(false)

const openLightbox5 = () => {
  isOpen5.value = true
}

// 示例6
const isOpen6 = ref(false)
const currentIndex6 = ref(0)

const openLightbox6 = () => {
  isOpen6.value = true
}

// 示例7
const isOpen7 = ref(false)
const currentIndex7 = ref(0)
const lightboxRef = ref()

const closeLightbox7 = () => {
  isOpen7.value = false
}

const goToPrev = () => {
  lightboxRef.value.goToPrev()
}

const goToNext = () => {
  lightboxRef.value.goToNext()
}
</script>

<style>
.demo {
  margin: 2rem 0;
}
</style>