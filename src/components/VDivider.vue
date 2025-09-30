<template>
  <div ref="container" class="divider-container" :style="containerStyle" :class="dividerClasses">
    <div v-if="type === 'line'" class="divider-line" :style="lineStyle"></div>

    <div v-else-if="type === 'wave'" class="divider-wave" :style="waveStyle">
      <svg :width="width" :height="height" viewBox="0 0 100 20" preserveAspectRatio="none">
        <path :d="wavePath" :stroke="color" :stroke-width="strokeWidth" fill="none" :style="pathStyle" />
      </svg>
    </div>

    <div v-else-if="type === 'dots'" class="divider-dots" :style="dotsStyle">
      <span v-for="(dot, index) in dots" :key="index" class="divider-dot" :style="getDotStyle(index)"></span>
    </div>

    <div v-else-if="type === 'gradient'" class="divider-gradient" :style="gradientStyle"></div>

    <div v-else-if="type === 'animated'" class="divider-animated" :style="animatedStyle">
      <div class="animated-line"></div>
    </div>

    <div v-if="text && type !== 'animated'" class="divider-text" :style="textStyle">
      {{ text }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface DividerProps {
  type: 'line' | 'wave' | 'dots' | 'gradient' | 'animated'
  color: string
  width: string
  height: string
  strokeWidth: number
  text: string
  textColor: string
  textSize: string
  animation: boolean
  animationSpeed: number
  gradientColors: string[]
  dotCount: number
  dotSize: number
  spacing: string
}

const props = withDefaults(defineProps<DividerProps>(), {
  type: 'line',
  color: '#e2e8f0',
  width: '100%',
  height: '1px',
  strokeWidth: 2,
  text: '',
  textColor: '#666',
  textSize: '14px',
  animation: true,
  animationSpeed: 2,
  gradientColors: () => ['#667eea', '#764ba2'],
  dotCount: 5,
  dotSize: 6,
  spacing: '20px',
})

const container = ref<HTMLElement | null>(null)
const time = ref(0)
let animationId: number | null = null

const dividerClasses = computed(() => ({
  'divider-animated': props.animation && props.type === 'animated',
  'divider-with-text': !!props.text,
}))

const containerStyle = computed(() => ({
  width: props.width,
  height: props.height,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const lineStyle = computed(() => ({
  width: '100%',
  height: props.height,
  backgroundColor: props.color,
  borderRadius: '1px',
}))

const waveStyle = computed(() => ({
  width: '100%',
  height: props.height,
  overflow: 'hidden',
}))

const wavePath = computed(() => {
  const amplitude = 8
  const frequency = 0.5
  const phase = time.value * props.animationSpeed

  let path = 'M 0,10 '
  for (let x = 0; x <= 100; x += 2) {
    const y = 10 + amplitude * Math.sin(((x * frequency + phase) * Math.PI) / 180)
    path += `L ${x},${y} `
  }

  return path
})

const pathStyle = computed(() => ({
  strokeDasharray: props.animation ? '5,5' : 'none',
  strokeDashoffset: props.animation ? -time.value * props.animationSpeed : 0,
  transition: props.animation ? 'none' : 'all 0.3s ease',
}))

const dotsStyle = computed(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: props.spacing,
}))

const dots = computed(() => {
  return Array.from({ length: props.dotCount }, (_, i) => i)
})

const getDotStyle = (index: number) => {
  const delay = index * 0.1
  const scale = props.animation ? 1 + 0.3 * Math.sin((time.value + delay) * props.animationSpeed) : 1

  return {
    width: `${props.dotSize}px`,
    height: `${props.dotSize}px`,
    backgroundColor: props.color,
    borderRadius: '50%',
    transform: `scale(${scale})`,
    transition: props.animation ? 'none' : 'all 0.3s ease',
  }
}

const gradientStyle = computed(() => ({
  width: '100%',
  height: props.height,
  background: `linear-gradient(90deg, ${props.gradientColors.join(', ')})`,
  borderRadius: '1px',
  position: 'relative',
  overflow: 'hidden',
}))

const animatedStyle = computed(() => ({
  width: '100%',
  height: props.height,
  position: 'relative',
  overflow: 'hidden',
}))

const textStyle = computed(() => ({
  color: props.textColor,
  fontSize: props.textSize,
  backgroundColor: 'white',
  padding: '0 10px',
  position: 'relative',
  zIndex: 1,
}))

const animate = () => {
  time.value += 0.016 // 约60fps
  animationId = requestAnimationFrame(animate)
}

const startAnimation = () => {
  if (!props.animation) return

  if (animationId) {
    cancelAnimationFrame(animationId)
  }

  animate()
}

const stopAnimation = () => {
  if (animationId) {
    cancelAnimationFrame(animationId)
    animationId = null
  }
}

onMounted(() => {
  if (props.animation) {
    startAnimation()
  }
})

onUnmounted(() => {
  stopAnimation()
})

// 暴露方法给父组件
defineExpose({
  startAnimation,
  stopAnimation,
})
</script>

<style scoped>
.divider-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
}

.divider-line {
  width: 100%;
  height: 1px;
  background-color: #e2e8f0;
}

.divider-wave {
  width: 100%;
  height: 20px;
  overflow: hidden;
}

.divider-dots {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.divider-dot {
  width: 6px;
  height: 6px;
  background-color: #e2e8f0;
  border-radius: 50%;
}

.divider-gradient {
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 1px;
}

.divider-animated {
  width: 100%;
  height: 2px;
  position: relative;
  background-color: #f0f0f0;
  overflow: hidden;
}

.animated-line {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, #667eea, transparent);
  animation: slide 2s infinite;
}

.divider-text {
  background: white;
  padding: 0 10px;
  color: #666;
  font-size: 14px;
  position: relative;
  z-index: 1;
}

.divider-with-text::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background-color: #e2e8f0;
  z-index: 0;
}

@keyframes slide {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}
</style>
