# VMarquee 无限滚动

VMarquee 是一个无限水平滚动组件，常用于展示跑马灯效果。

## 基础用法

```vue
<template>
  <VMarquee>
    <span>内容一</span>
    <span>内容二</span>
    <span>内容三</span>
  </VMarquee>
</template>

<script setup>
import { VMarquee } from 'supreme-visual-effects'
</script>
```

## Props

| 属性名        | 类型                | 默认值    | 说明             |
| ------------- | ------------------- | --------- | ---------------- |
| speed         | `number`            | `50`      | 滚动速度(px/s)   |
| direction     | `'left' \| 'right'` | `'left'`  | 滚动方向         |
| pauseOnHover  | `boolean`           | `true`    | 悬停暂停         |
| gap           | `string`            | `'2rem'`  | 内容间距         |
| gradient      | `boolean`           | `false`   | 是否启用渐变遮罩 |
| gradientWidth | `string`            | `'200px'` | 渐变宽度         |

## Events

| 事件名 | 参数 | 说明           |
| ------ | ---- | -------------- |
| enter  | `()` | 鼠标进入时触发 |
| leave  | `()` | 鼠标离开时触发 |

## Expose Methods

| 方法名 | 参数 | 说明     |
| ------ | ---- | -------- |
| pause  | `()` | 暂停滚动 |
| resume | `()` | 恢复滚动 |

## 示例

### 反向滚动

```vue
<template>
  <VMarquee direction="right" :speed="30">
    <span>向左滚动的内容</span>
  </VMarquee>
</template>
```

### 带渐变边缘

```vue
<template>
  <VMarquee :gradient="true" gradient-width="150px">
    <span>渐变边缘效果</span>
  </VMarquee>
</template>
```

## 使用场景

1. **公告栏** - 滚动展示最新消息或通知
2. **品牌展示** - 无限滚动合作伙伴/客户 logo
3. **友情链接** - 展示合作伙伴链接

## 注意事项

1. 内容会被复制 3 份实现无缝循环
2. 组件自动检测系统 `prefers-reduced-motion` 设置，用户偏好减少动画时会暂停动画
3. `pauseOnHover` 为 true 时鼠标悬停会暂停
