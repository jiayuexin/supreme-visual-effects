# VStarfield 星空背景组件

VStarfield 是一个 3D 星空背景组件，可以创建逼真的星空效果，支持闪烁和自动旋转。

## 基础用法

::: tip 使用提示
组件需要放在一个有明确宽高的容器中，推荐使用 `position: absolute` 配合 `inset: 0` 来覆盖父容器。
:::

<div class="demo">
  <div style="position: relative; height: 300px; background: #000; border-radius: 8px; overflow: hidden;">
    <VStarfield style="position: absolute; inset: 0;" />
    <div style="position: relative; z-index: 1; height: 100%; display: flex; align-items: center; justify-content: center; color: white; text-align: center; padding: 2rem;">
      <div>
        <h2>星空背景</h2>
        <p>默认星空效果</p>
      </div>
    </div>
  </div>
</div>

```vue
<template>
  <div style="position: relative; height: 100vh; background: #000;">
    <VStarfield style="position: absolute; inset: 0;" />
    <div style="position: relative; z-index: 1; color: white; padding: 20px;">
      <h1>星空背景</h1>
    </div>
  </div>
</template>

<script setup>
import { VStarfield } from 'supreme-visual-effects'
</script>
```

## Props

| 属性名           | 类型      | 默认值          | 说明             |
| ---------------- | --------- | --------------- | ---------------- |
| starCount        | `number`  | `200`           | 星星数量         |
| speed            | `number`  | `0.5`           | 星星移动速度     |
| starColor        | `string`  | `'#ffffff'`     | 星星颜色         |
| backgroundColor  | `string`  | `'transparent'` | 背景颜色         |
| mouseInteraction | `boolean` | `true`          | 是否启用鼠标交互 |
| twinkleSpeed     | `number`  | `2`             | 闪烁速度         |
| depth            | `number`  | `1000`          | 星空深度         |
| autoRotation     | `boolean` | `false`         | 是否自动旋转     |
| rotationSpeed    | `number`  | `0.1`           | 旋转速度         |

## 示例

### 密集星空

<div class="demo">
  <div style="position: relative; height: 400px; background: #000; border-radius: 8px; overflow: hidden;">
    <VStarfield 
      style="position: absolute; inset: 0;"
      :starCount="400" 
      :twinkleSpeed="3"
    />
    <div style="position: relative; z-index: 1; height: 100%; display: flex; align-items: center; justify-content: center; color: white; text-align: center; padding: 2rem;">
      <div>
        <h2>密集星空</h2>
        <p>400颗闪烁的星星</p>
      </div>
    </div>
  </div>
</div>

```vue
<template>
  <div style="position: relative; height: 400px; background: #000;">
    <VStarfield style="position: absolute; inset: 0;" :starCount="400" :twinkleSpeed="3" />
  </div>
</template>
```

### 自定义颜色

<div class="demo">
  <div style="position: relative; height: 400px; background: #0a0a2a; border-radius: 8px; overflow: hidden;">
    <VStarfield 
      style="position: absolute; inset: 0;"
      :starCount="250" 
      starColor="#a78bfa" 
      backgroundColor="#0a0a2a"
    />
    <div style="position: relative; z-index: 1; height: 100%; display: flex; align-items: center; justify-content: center; color: white; text-align: center; padding: 2rem;">
      <div>
        <h2>紫色星空</h2>
        <p>自定义颜色的星空效果</p>
      </div>
    </div>
  </div>
</div>

```vue
<template>
  <div style="position: relative; height: 400px;">
    <VStarfield style="position: absolute; inset: 0;" :starCount="250" starColor="#a78bfa" backgroundColor="#0a0a2a" />
  </div>
</template>
```

### 自动旋转星空

<div class="demo">
  <div style="position: relative; height: 400px; background: #000; border-radius: 8px; overflow: hidden;">
    <VStarfield 
      style="position: absolute; inset: 0;"
      :autoRotation="true" 
      :rotationSpeed="0.15" 
      :starCount="200"
    />
    <div style="position: relative; z-index: 1; height: 100%; display: flex; align-items: center; justify-content: center; color: white; text-align: center; padding: 2rem;">
      <div>
        <h2>旋转星空</h2>
        <p>星空自动旋转效果</p>
      </div>
    </div>
  </div>
</div>

```vue
<template>
  <div style="position: relative; height: 400px; background: #000;">
    <VStarfield style="position: absolute; inset: 0;" :autoRotation="true" :rotationSpeed="0.15" :starCount="200" />
  </div>
</template>
```

### 快速穿梭效果

<div class="demo">
  <div style="position: relative; height: 400px; background: #000; border-radius: 8px; overflow: hidden;">
    <VStarfield 
      style="position: absolute; inset: 0;"
      :speed="2" 
      :starCount="300"
      :depth="500"
    />
    <div style="position: relative; z-index: 1; height: 100%; display: flex; align-items: center; justify-content: center; color: white; text-align: center; padding: 2rem;">
      <div>
        <h2>星际穿梭</h2>
        <p>快速穿越星空</p>
      </div>
    </div>
  </div>
</div>

```vue
<template>
  <div style="position: relative; height: 400px; background: #000;">
    <VStarfield style="position: absolute; inset: 0;" :speed="2" :starCount="300" :depth="500" />
  </div>
</template>
```

## 方法

可以通过模板引用调用以下方法：

| 方法名          | 参数              | 说明         |
| --------------- | ----------------- | ------------ |
| pauseAnimation  | `()`              | 暂停动画     |
| resumeAnimation | `()`              | 恢复动画     |
| reset           | `()`              | 重置星空     |
| updateStarCount | `(count: number)` | 更新星星数量 |

<div class="demo">
  <div style="position: relative; height: 400px; background: #000; border-radius: 8px; overflow: hidden; margin-bottom: 1rem;">
    <VStarfield ref="starfieldRef" style="position: absolute; inset: 0;" :starCount="150" />
    <div style="position: relative; z-index: 1; height: 100%; display: flex; align-items: center; justify-content: center; color: white; text-align: center; padding: 2rem;">
      <div>
        <h2>控制星空</h2>
        <p>使用下方按钮控制星空效果</p>
      </div>
    </div>
  </div>
  <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
    <button @click="addStars" class="demo-btn">增加星星</button>
    <button @click="removeStars" class="demo-btn">减少星星</button>
    <button @click="pause" class="demo-btn">暂停</button>
    <button @click="resume" class="demo-btn">恢复</button>
    <button @click="resetStars" class="demo-btn">重置</button>
  </div>
</div>

```vue
<template>
  <div style="position: relative; height: 400px; background: #000;">
    <VStarfield ref="starfieldRef" style="position: absolute; inset: 0;" />
  </div>
  <button @click="starfieldRef.updateStarCount(300)">增加星星</button>
  <button @click="starfieldRef.pauseAnimation()">暂停</button>
  <button @click="starfieldRef.resumeAnimation()">恢复</button>
  <button @click="starfieldRef.reset()">重置</button>
</template>

<script setup>
import { ref } from 'vue'
import { VStarfield } from 'supreme-visual-effects'

const starfieldRef = ref()
</script>
```

## 使用场景

1. **网站背景** - 为网站添加动态星空背景效果
2. **登录页面** - 创建吸引人的登录界面背景
3. **科幻主题** - 为科幻风格的网站添加星空效果
4. **游戏界面** - 为游戏加载界面或菜单添加背景效果

## 注意事项

1. 组件需要放在有明确尺寸的容器中
2. 推荐使用 `position: absolute; inset: 0;` 样式覆盖父容器
3. 星星数量会影响性能，移动设备建议减少数量
4. 组件会在卸载时自动清理动画帧
5. 背景色默认透明，可以通过 `backgroundColor` 设置

<script setup>
import { ref } from 'vue'
import { VStarfield } from '../../src/index'

const starfieldRef = ref()

const addStars = () => {
  starfieldRef.value?.updateStarCount(300)
}

const removeStars = () => {
  starfieldRef.value?.updateStarCount(80)
}

const pause = () => {
  starfieldRef.value?.pauseAnimation()
}

const resume = () => {
  starfieldRef.value?.resumeAnimation()
}

const resetStars = () => {
  starfieldRef.value?.reset()
}
</script>

<style>
.demo {
  margin: 2rem 0;
}
.demo-btn {
  padding: 0.5rem 1rem;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}
.demo-btn:hover {
  background: #4338ca;
}
</style>
