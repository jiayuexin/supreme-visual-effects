# VCountUp 数字滚动动画

VCountUp 是一个数字滚动动画组件，支持从起始值到目标值的平滑过渡动画。

## 基础用法

```vue
<template>
  <VCountUp :end="1000" />
</template>

<script setup>
import { VCountUp } from 'supreme-visual-effects'
</script>
```

## Props

| 属性名               | 类型      | 默认值      | 说明                     |
| -------------------- | --------- | ----------- | ------------------------ |
| end                  | `number`  | 必填        | 目标值                   |
| start                | `number`  | `0`         | 起始值                   |
| duration             | `number`  | `2000`      | 动画持续时间(ms)         |
| decimals             | `number`  | `0`         | 小数位数                 |
| prefix               | `string`  | `''`        | 前缀                     |
| suffix               | `string`  | `''`        | 后缀                     |
| separator            | `string`  | `','`       | 千分位分隔符             |
| autoStart            | `boolean` | `true`      | 是否自动启动             |
| easing               | `string`  | `'easeOut'` | 缓动函数名称             |
| respectReducedMotion | `boolean` | `true`      | 是否尊重用户减少动画偏好 |

## Events

| 事件名 | 参数                     | 说明           |
| ------ | ------------------------ | -------------- |
| start  | `()`                     | 动画开始时触发 |
| end    | `()`                     | 动画结束时触发 |
| update | `(currentValue: number)` | 值更新时触发   |

## Expose Methods

| 方法名 | 参数 | 说明         |
| ------ | ---- | ------------ |
| start  | `()` | 启动动画     |
| pause  | `()` | 暂停动画     |
| resume | `()` | 恢复动画     |
| reset  | `()` | 重置为起始值 |

## 示例

### 带前后缀

```vue
<template>
  <VCountUp :end="99" suffix="%" :duration="3000" />
</template>
```

### 千分位分隔

```vue
<template>
  <VCountUp :end="1000000" prefix="$" separator="," />
</template>
```

### 小数精度

```vue
<template>
  <VCountUp :end="3.14159" :decimals="4" />
</template>
```

## 使用场景

1. **数据统计** - 数字增长动画展示用户数、收入等
2. **倒计时/计时器** - 配合 start/pause 方法实现控制
3. **仪表盘** - 带千分位的数字滚动展示

## 注意事项

1. `end` prop 变化时会自动重新播放动画（autoStart 模式下）
2. 启用 `respectReducedMotion` 时，如果用户偏好减少动画会直接跳到终值
3. 使用 `tabular-nums` 字体特性避免数字跳动时宽度抖动
