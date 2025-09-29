# VStarfield 星空背景组件

VStarfield 是一个 3D 星空背景组件，可以创建逼真的星空效果和星系旋转动画。

## 基础用法

<div class="demo">
  <div style="position: relative; height: 300px; background: #000; border-radius: 8px; overflow: hidden;">
    <VStarfield />
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
  <div style="position: relative; height: 300px; background: #000;">
    <VStarfield />
    <div style="position: relative; z-index: 1; height: 100%; display: flex; align-items: center; justify-content: center; color: white;">
      <h2>星空背景</h2>
    </div>
  </div>
</template>

<script setup>
import { VStarfield } from 'supreme-visual-effects'
</script>
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| starCount | `number` | `200` | 星星数量 |
| speed | `number` | `0.5` | 星星移动速度 |
| starColor | `string` | `'#ffffff'` | 星星颜色 |
| backgroundColor | `string` | `'transparent'` | 背景颜色 |
| mouseInteraction | `boolean` | `true` | 是否启用鼠标交互 |
| twinkleSpeed | `number` | `2` | 闪烁速度 |
| depth | `number` | `1000` | 星空深度 |
| autoRotation | `boolean` | `false` | 是否自动旋转 |
| rotationSpeed | `number` | `0.1` | 旋转速度 |

## 示例

### 基础星空
<div class="demo">
  <div style="position: relative; height: 400px; background: #000; border-radius: 8px; overflow: hidden;">
    <VStarfield :starCount="300" />
    <div style="position: relative; z-index: 1; height: 100%; display: flex; align-items: center; justify-content: center; color: white; text-align: center; padding: 2rem;">
      <div>
        <h2>星空背景</h2>
        <p>300颗星星的星空效果</p>
      </div>
    </div>
  </div>
</div>

```vue
<template>
  <div style="position: relative; height: 400px; background: #000;">
    <VStarfield :starCount="300" />
    <div style="position: relative; z-index: 1; height: 100%; display: flex; align-items: center; justify-content: center; color: white; text-align: center; padding: 2rem;">
      <div>
        <h2>星空背景</h2>
        <p>300颗星星的星空效果</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { VStarfield } from 'supreme-visual-effects'
</script>
```

### 自定义颜色
<div class="demo">
  <div style="position: relative; height: 400px; background: #0a0a2a; border-radius: 8px; overflow: hidden;">
    <VStarfield 
      :starCount="250" 
      starColor="#4f46e5" 
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
  <div style="position: relative; height: 400px; background: #0a0a2a;">
    <VStarfield 
      :starCount="250" 
      starColor="#4f46e5" 
      backgroundColor="#0a0a2a"
    />
    <div style="position: relative; z-index: 1; height: 100%; display: flex; align-items: center; justify-content: center; color: white; text-align: center; padding: 2rem;">
      <div>
        <h2>紫色星空</h2>
        <p>自定义颜色的星空效果</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { VStarfield } from 'supreme-visual-effects'
</script>
```

### 鼠标交互
<div class="demo">
  <div style="position: relative; height: 400px; background: #000; border-radius: 8px; overflow: hidden;">
    <VStarfield 
      :mouseInteraction="true" 
      :starCount="200"
    />
    <div style="position: relative; z-index: 1; height: 100%; display: flex; align-items: center; justify-content: center; color: white; text-align: center; padding: 2rem;">
      <div>
        <h2>鼠标交互</h2>
        <p>移动鼠标与星星互动</p>
      </div>
    </div>
  </div>
</div>

```vue
<template>
  <div style="position: relative; height: 400px; background: #000;">
    <VStarfield 
      :mouseInteraction="true" 
      :starCount="200"
    />
    <div style="position: relative; z-index: 1; height: 100%; display: flex; align-items: center; justify-content: center; color: white; text-align: center; padding: 2rem;">
      <div>
        <h2>鼠标交互</h2>
        <p>移动鼠标与星星互动</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { VStarfield } from 'supreme-visual-effects'
</script>
```

### 自动旋转
<div class="demo">
  <div style="position: relative; height: 400px; background: #000; border-radius: 8px; overflow: hidden;">
    <VStarfield 
      :autoRotation="true" 
      :rotationSpeed="0.2" 
      :starCount="150"
    />
    <div style="position: relative; z-index: 1; height: 100%; display: flex; align-items: center; justify-content: center; color: white; text-align: center; padding: 2rem;">
      <div>
        <h2>自动旋转</h2>
        <p>星空自动旋转效果</p>
      </div>
    </div>
  </div>
</div>

```vue
<template>
  <div style="position: relative; height: 400px; background: #000;">
    <VStarfield 
      :autoRotation="true" 
      :rotationSpeed="0.2" 
      :starCount="150"
    />
    <div style="position: relative; z-index: 1; height: 100%; display: flex; align-items: center; justify-content: center; color: white; text-align: center; padding: 2rem;">
      <div>
        <h2>自动旋转</h2>
        <p>星空自动旋转效果</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { VStarfield } from 'supreme-visual-effects'
</script>
```

## 方法

可以通过模板引用调用以下方法：

| 方法名 | 参数 | 说明 |
| --- | --- | --- |
| pauseAnimation | `()` | 暂停动画 |
| resumeAnimation | `()` | 恢复动画 |
| reset | `()` | 重置星空 |
| updateStarCount | `(count: number)` | 更新星星数量 |

<div class="demo">
  <div style="position: relative; height: 400px; background: #000; border-radius: 8px; overflow: hidden; margin-bottom: 1rem;">
    <VStarfield ref="starfieldRef" :starCount="100" />
    <div style="position: relative; z-index: 1; height: 100%; display: flex; align-items: center; justify-content: center; color: white; text-align: center; padding: 2rem;">
      <div>
        <h2>控制星空</h2>
        <p>使用方法控制星空效果</p>
      </div>
    </div>
  </div>
  <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
    <button @click="addStars" style="padding: 0.5rem 1rem; background: #4f46e5; color: white; border: none; border-radius: 4px; cursor: pointer;">增加星星</button>
    <button @click="removeStars" style="padding: 0.5rem 1rem; background: #4f46e5; color: white; border: none; border-radius: 4px; cursor: pointer;">减少星星</button>
    <button @click="pause" style="padding: 0.5rem 1rem; background: #4f46e5; color: white; border: none; border-radius: 4px; cursor: pointer;">暂停</button>
    <button @click="resume" style="padding: 0.5rem 1rem; background: #4f46e5; color: white; border: none; border-radius: 4px; cursor: pointer;">恢复</button>
    <button @click="resetStars" style="padding: 0.5rem 1rem; background: #4f46e5; color: white; border: none; border-radius: 4px; cursor: pointer;">重置</button>
  </div>
</div>

```vue
<template>
  <div style="position: relative; height: 400px; background: #000;">
    <VStarfield ref="starfieldRef" :starCount="100" />
  </div>
  <div style="display: flex; gap: 1rem;">
    <button @click="addStars">增加星星</button>
    <button @click="removeStars">减少星星</button>
    <button @click="pause">暂停</button>
    <button @click="resume">恢复</button>
    <button @click="resetStars">重置</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { VStarfield } from 'supreme-visual-effects'

const starfieldRef = ref()

const addStars = () => {
  starfieldRef.value.updateStarCount(200)
}

const removeStars = () => {
  starfieldRef.value.updateStarCount(50)
}

const pause = () => {
  starfieldRef.value.pauseAnimation()
}

const resume = () => {
  starfieldRef.value.resumeAnimation()
}

const resetStars = () => {
  starfieldRef.value.reset()
}
</script>
```

## 使用场景

1. **网站背景** - 为网站添加动态星空背景效果
2. **登录页面** - 创建吸引人的登录界面背景
3. **科幻主题** - 为科幻风格的网站添加星空效果
4. **游戏界面** - 为游戏加载界面或菜单添加背景效果

## 性能优化

1. 星星数量会影响性能，建议根据设备性能调整
2. 在移动设备上可以减少星星数量
3. 可以通过CSS `z-index` 控制层级关系

## 注意事项

1. 星空背景组件使用绝对定位，需要父容器有相对定位
2. 组件会自动适应父容器大小
3. 在窗口大小改变时会自动重新调整画布大小
4. 组件会在卸载时自动清理动画帧
5. 可以通过CSS变量自定义样式

<script setup>
import { ref } from 'vue'
import { VStarfield } from '../../src/index'

const starfieldRef = ref()

const addStars = () => {
  starfieldRef.value?.updateStarCount(200)
}

const removeStars = () => {
  starfieldRef.value?.updateStarCount(50)
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
</style>