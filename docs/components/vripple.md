# VRipple 水波纹指令

VRipple 是一个 Vue 指令，用于为元素添加 Material Design 风格的水波纹点击效果。

## 基础用法

<div class="demo">
  <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
    <button v-ripple style="padding: 1rem 2rem; background: #4f46e5; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 1rem;">
      点击我
    </button>
    <div v-ripple class="ripple-box" style="width: 200px; height: 100px; background: #4f46e5; color: white; display: flex; align-items: center; justify-content: center; border-radius: 8px; cursor: pointer;">
      点击区域
    </div>
  </div>
</div>

```vue
<template>
  <button v-ripple>点击我</button>
  <div v-ripple class="ripple-box">点击区域</div>
</template>

<script setup>
// VRipple 指令会自动注册，无需额外导入
</script>

<style>
.ripple-box {
  width: 200px;
  height: 100px;
  background: #4f46e5;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}
</style>
```

## 自定义颜色

<div class="demo">
  <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
    <button v-ripple="{ color: 'rgba(255, 0, 0, 0.5)' }" style="padding: 1rem 2rem; background: #ff6b6b; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 1rem;">
      红色波纹
    </button>
    <button v-ripple="{ color: '#00ff00' }" style="padding: 1rem 2rem; background: #4ecdc4; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 1rem;">
      绿色波纹
    </button>
  </div>
</div>

```vue
<template>
  <button v-ripple="{ color: 'rgba(255, 0, 0, 0.5)' }">红色波纹</button>
  <button v-ripple="{ color: '#00ff00' }">绿色波纹</button>
</template>
```

## 自定义持续时间

<div class="demo">
  <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
    <button v-ripple="{ duration: 1000 }" style="padding: 1rem 2rem; background: #45b7d1; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 1rem;">
      慢速波纹
    </button>
    <button v-ripple="{ duration: 200 }" style="padding: 1rem 2rem; background: #96ceb4; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 1rem;">
      快速波纹
    </button>
  </div>
</div>

```vue
<template>
  <button v-ripple="{ duration: 1000 }">慢速波纹</button>
  <button v-ripple="{ duration: 200 }">快速波纹</button>
</template>
```

## 禁用效果

<div class="demo">
  <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
    <button v-ripple="{ disabled: true }" style="padding: 1rem 2rem; background: #ddd; color: #666; border: none; border-radius: 4px; cursor: not-allowed; font-size: 1rem;">
      禁用波纹
    </button>
    <button v-ripple="{ disabled: false }" style="padding: 1rem 2rem; background: #4f46e5; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 1rem;">
      启用波纹
    </button>
  </div>
</div>

```vue
<template>
  <button v-ripple="{ disabled: true }">禁用波纹</button>
  <button v-ripple="{ disabled: false }">启用波纹</button>
</template>
```

## API

### 指令参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| color | string | `'rgba(255, 255, 255, 0.7)'` | 波纹颜色 |
| duration | number | `600` | 动画持续时间(毫秒) |
| disabled | boolean | `false` | 是否禁用波纹效果 |

### 使用示例

```ts
// 在 main.ts 中全局注册
import { createApp } from 'vue'
import { createSupremeEffects } from 'supreme-visual-effects'

createApp(App)
  .use(createSupremeEffects())
  .mount('#app')

// 或者局部导入使用
import { VRipple } from 'supreme-visual-effects'

export default {
  directives: {
    ripple: VRipple
  }
}
```

## 注意事项

1. VRipple 指令会自动为元素添加 `position: relative` 和 `overflow: hidden` 样式，如果元素已经有定位样式，则只会添加 `overflow: hidden`。
2. 波纹效果会创建一个 `<span>` 元素作为波纹，动画结束后会自动移除。
3. 如果需要在特定元素上禁用波纹效果，可以使用 `disabled` 参数。

<script setup>
// VRipple 指令已自动注册
</script>

<style>
.demo {
  margin: 2rem 0;
}
</style>