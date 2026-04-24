# VFlipCard 3D翻转卡片

VFlipCard 是一个3D翻转卡片组件，支持 hover 和 click 两种触发方式。

## 基础用法

<div class="demo">
  <div style="width: 300px; height: 200px;">
    <VFlipCard>
      <template #front>
        <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #667eea; color: white; border-radius: 8px; font-size: 1.2rem;">
          正面内容
        </div>
      </template>
      <template #back>
        <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #764ba2; color: white; border-radius: 8px; font-size: 1.2rem;">
          背面内容
        </div>
      </template>
    </VFlipCard>
  </div>
</div>

```vue
<template>
  <VFlipCard>
    <template #front>
      <div>正面内容</div>
    </template>
    <template #back>
      <div>背面内容</div>
    </template>
  </VFlipCard>
</template>

<script setup>
import { VFlipCard } from 'supreme-visual-effects'
</script>
```

## Props

| 属性名      | 类型                 | 默认值    | 说明             |
| ----------- | -------------------- | --------- | ---------------- |
| trigger     | `'hover' \| 'click'` | `'hover'` | 触发方式         |
| direction   | `'x' \| 'y'`         | `'y'`     | 翻转轴向         |
| duration    | `number`             | `600`     | 翻转动画时间(ms) |
| perspective | `number`             | `1000`    | 透视距离         |
| reverse     | `boolean`            | `false`   | 是否反向翻转     |

## Events

| 事件名 | 参数 | 说明       |
| ------ | ---- | ---------- |
| flip   | `()` | 翻转时触发 |
| unflip | `()` | 翻回时触发 |

## Slots

| 插槽名 | 参数 | 说明         |
| ------ | ---- | ------------ |
| front  | -    | 卡片正面内容 |
| back   | -    | 卡片背面内容 |

## Expose Methods

| 方法名 | 参数 | 说明         |
| ------ | ---- | ------------ |
| flip   | `()` | 翻转到背面   |
| unflip | `()` | 翻回正面     |
| toggle | `()` | 切换翻转状态 |

## 示例

### 点击触发

<div class="demo">
  <div style="width: 300px; height: 200px;">
    <VFlipCard trigger="click">
      <template #front>
        <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #4ecdc4; color: white; border-radius: 8px;">
          点击翻转
        </div>
      </template>
      <template #back>
        <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #ff6b6b; color: white; border-radius: 8px;">
          背面信息
        </div>
      </template>
    </VFlipCard>
  </div>
</div>

```vue
<template>
  <VFlipCard trigger="click">
    <template #front>
      <div>点击翻转</div>
    </template>
    <template #back>
      <div>背面信息</div>
    </template>
  </VFlipCard>
</template>
```

### X轴翻转

<div class="demo">
  <div style="width: 300px; height: 200px;">
    <VFlipCard direction="x">
      <template #front>
        <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f093fb; color: white; border-radius: 8px;">
          X轴翻转
        </div>
      </template>
      <template #back>
        <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #fcb69f; color: white; border-radius: 8px;">
          上下翻转效果
        </div>
      </template>
    </VFlipCard>
  </div>
</div>

```vue
<template>
  <VFlipCard direction="x">
    <template #front>
      <div>X轴翻转</div>
    </template>
    <template #back>
      <div>上下翻转效果</div>
    </template>
  </VFlipCard>
</template>
```

## 使用场景

1. **团队成员** - 正面头像，背面个人信息
2. **产品卡片** - 正面产品图，背面价格和购买按钮
3. **信息卡片** - 点击展开更多信息

## 注意事项

1. `trigger: 'hover'` 模式下使用 CSS hover 动画，`trigger: 'click'` 使用 JS 控制
2. 使用 `perspective` 控制 3D 效果强度，值越小效果越明显
3. 组件使用 `transform-style: preserve-3d` 和 `backface-visibility: hidden` 实现翻转

<script setup>
import { VFlipCard } from '../../src/index'
</script>

<style>
.demo {
  margin: 2rem 0;
}
</style>
