# VTypingText 打字机文字组件

VTypingText 是一个打字机文字组件，可以创建逐字显示的打字机效果。

## 基础用法

<div class="demo">
  <div style="display: flex; justify-content: center; padding: 2rem;">
    <VTypingText text="打字机效果" />
  </div>
</div>

```vue
<template>
  <VTypingText text="打字机效果" />
</template>

<script setup>
import { VTypingText } from 'supreme-visual-effects'
</script>
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| text | `string \| string[]` | `''` | 显示的文字内容（字符串或字符串数组） |
| speed | `number` | `100` | 打字速度(ms) |
| delay | `number` | `0` | 开始延迟时间(ms) |
| pause | `number` | `2000` | 暂停时间(ms) |
| loop | `boolean` | `false` | 是否循环播放 |
| cursor | `boolean` | `true` | 是否显示光标 |
| cursorChar | `string` | `'|'` | 光标字符 |
| cursorSpeed | `number` | `500` | 光标闪烁速度(ms) |
| eraseSpeed | `number` | `50` | 擦除速度(ms) |
| eraseDelay | `number` | `1000` | 擦除延迟时间(ms) |
| autoStart | `boolean` | `true` | 是否自动开始 |
| color | `string` | `'inherit'` | 文字颜色 |
| fontSize | `string` | `'inherit'` | 字体大小 |
| fontFamily | `string` | `'inherit'` | 字体族 |

## Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| typing-start | `()` | 开始打字时触发 |
| typing-complete | `()` | 完成打字时触发 |
| typing-pause | `()` | 暂停打字时触发 |
| typing-resume | `()` | 恢复打字时触发 |

## Expose Methods

| 方法名 | 参数 | 说明 |
| --- | --- | --- |
| start | `()` | 开始打字 |
| pause | `()` | 暂停打字 |
| resume | `()` | 恢复打字 |
| stop | `()` | 停止打字 |
| reset | `()` | 重置打字 |

## 示例

### 多行文本
<div class="demo">
  <div style="display: flex; justify-content: center; padding: 2rem;">
    <VTypingText 
      :text="['第一行文字', '第二行文字', '第三行文字']"
      :loop="true"
    />
  </div>
</div>

```vue
<template>
  <VTypingText 
    :text="['第一行文字', '第二行文字', '第三行文字']"
    :loop="true"
  />
</template>

<script setup>
import { VTypingText } from 'supreme-visual-effects'
</script>
```

### 调整速度
<div class="demo">
  <div style="display: flex; justify-content: center; gap: 1rem; padding: 2rem; flex-wrap: wrap;">
    <VTypingText 
      text="快速打字"
      :speed="50"
    />
    <VTypingText 
      text="慢速打字"
      :speed="200"
    />
  </div>
</div>

```vue
<template>
  <VTypingText 
    text="快速打字"
    :speed="50"
  />
  
  <VTypingText 
    text="慢速打字"
    :speed="200"
  />
</template>

<script setup>
import { VTypingText } from 'supreme-visual-effects'
</script>
```

### 自定义光标
<div class="demo">
  <div style="display: flex; justify-content: center; gap: 1rem; padding: 2rem; flex-wrap: wrap;">
    <VTypingText 
      text="下划线光标"
      cursor-char="_"
    />
    <VTypingText 
      text="方块光标"
      cursor-char="█"
    />
  </div>
</div>

```vue
<template>
  <VTypingText 
    text="下划线光标"
    cursor-char="_"
  />
  
  <VTypingText 
    text="方块光标"
    cursor-char="█"
  />
</template>

<script setup>
import { VTypingText } from 'supreme-visual-effects'
</script>
```

### 循环播放
<div class="demo">
  <div style="display: flex; justify-content: center; padding: 2rem;">
    <VTypingText 
      :text="['循环播放', '第二个文本', '第三个文本']"
      :loop="true"
      :pause="1000"
    />
  </div>
</div>

```vue
<template>
  <VTypingText 
    :text="['循环播放', '第二个文本', '第三个文本']"
    :loop="true"
    :pause="1000"
  />
</template>

<script setup>
import { VTypingText } from 'supreme-visual-effects'
</script>
```

### 控制播放
<div class="demo">
  <div style="display: flex; justify-content: center; gap: 1rem; padding: 2rem; flex-wrap: wrap; flex-direction: column; align-items: center;">
    <VTypingText 
      ref="typingTextRef"
      text="可控制打字"
      :auto-start="false"
    />
    <div style="display: flex; gap: 1rem;">
      <button @click="startTyping" style="padding: 0.5rem 1rem; background: #4f46e5; color: white; border: none; border-radius: 4px; cursor: pointer;">
        开始
      </button>
      <button @click="pauseTyping" style="padding: 0.5rem 1rem; background: #6b7280; color: white; border: none; border-radius: 4px; cursor: pointer;">
        暂停
      </button>
      <button @click="resumeTyping" style="padding: 0.5rem 1rem; background: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer;">
        恢复
      </button>
      <button @click="stopTyping" style="padding: 0.5rem 1rem; background: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer;">
        停止
      </button>
    </div>
  </div>
</div>

```vue
<template>
  <VTypingText 
    ref="typingTextRef"
    text="可控制打字"
    :auto-start="false"
  />
  
  <div style="display: flex; gap: 1rem;">
    <button @click="startTyping">开始</button>
    <button @click="pauseTyping">暂停</button>
    <button @click="resumeTyping">恢复</button>
    <button @click="stopTyping">停止</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { VTypingText } from 'supreme-visual-effects'

const typingTextRef = ref()

const startTyping = () => {
  typingTextRef.value.start()
}

const pauseTyping = () => {
  typingTextRef.value.pause()
}

const resumeTyping = () => {
  typingTextRef.value.resume()
}

const stopTyping = () => {
  typingTextRef.value.stop()
}
</script>
```

### 自定义样式
<div class="demo">
  <div style="display: flex; justify-content: center; padding: 2rem;">
    <VTypingText 
      text="自定义样式"
      color="#ff6b6b"
      font-size="2rem"
      font-family="'Courier New', monospace"
    />
  </div>
</div>

```vue
<template>
  <VTypingText 
    text="自定义样式"
    color="#ff6b6b"
    font-size="2rem"
    font-family="'Courier New', monospace"
  />
</template>

<script setup>
import { VTypingText } from 'supreme-visual-effects'
</script>
```

### 无光标效果
<div class="demo">
  <div style="display: flex; justify-content: center; padding: 2rem;">
    <VTypingText 
      text="无光标"
      :cursor="false"
    />
  </div>
</div>

```vue
<template>
  <VTypingText 
    text="无光标"
    :cursor="false"
  />
</template>

<script setup>
import { VTypingText } from 'supreme-visual-effects'
</script>
```

### 延迟开始
<div class="demo">
  <div style="display: flex; justify-content: center; padding: 2rem;">
    <VTypingText 
      text="延迟开始"
      :delay="2000"
    />
  </div>
</div>

```vue
<template>
  <VTypingText 
    text="延迟开始"
    :delay="2000"
  />
</template>

<script setup>
import { VTypingText } from 'supreme-visual-effects'
</script>
```

## 使用场景

1. **网站标题** - 为网站标题添加打字机效果
2. **介绍页面** - 为产品介绍添加逐字显示效果
3. **聊天界面** - 为聊天消息添加打字效果
4. **演示文稿** - 为演示内容添加动态文字效果

## 注意事项

1. 组件会自动适应文字内容大小
2. 多行文本会自动循环播放
3. 组件会在卸载时自动清理定时器
4. 可以通过CSS自定义字体和样式
5. 光标闪烁动画可以通过cursorSpeed属性调整

<script setup>
import { ref } from 'vue'
import { VTypingText } from '../../src/index'

const typingTextRef = ref()

const startTyping = () => {
  typingTextRef.value.start()
}

const pauseTyping = () => {
  typingTextRef.value.pause()
}

const resumeTyping = () => {
  typingTextRef.value.resume()
}

const stopTyping = () => {
  typingTextRef.value.stop()
}
</script>

<style>
.demo {
  margin: 2rem 0;
}
</style>