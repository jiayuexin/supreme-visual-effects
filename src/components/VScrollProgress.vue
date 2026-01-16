<template>
  <div ref="container" class="scroll-progress-container" :style="containerStyle" :class="progressClasses">
    <div class="scroll-progress-bar" :style="progressBarStyle">
      <div class="scroll-progress-fill" :style="progressFillStyle"></div>

      <div v-if="showPercentage" class="scroll-progress-text" :style="textStyle">{{ Math.round(progress) }}%</div>
    </div>

    <!-- Custom content slot -->
    <div v-if="$slots.default" class="scroll-progress-content">
      <slot :progress="progress" :percentage="Math.round(progress)"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

interface ScrollProgressProps {
  color?: string
  height?: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  width?: string
  showPercentage?: boolean
  textColor?: string
  textSize?: string
  animation?: boolean
  animationDuration?: number
  gradient?: boolean
  gradientColors?: string[]
  glow?: boolean
  glowIntensity?: number
  target?: string
  offset?: number
}

const props = withDefaults(defineProps<ScrollProgressProps>(), {
  color: '#667eea',
  height: '4px',
  position: 'top',
  width: '100%',
  showPercentage: false,
  textColor: '#333',
  textSize: '12px',
  animation: true,
  animationDuration: 200,
  gradient: false,
  gradientColors: () => ['#667eea', '#764ba2'],
  glow: false,
  glowIntensity: 10,
  target: '',
  offset: 0,
})

const emit = defineEmits<{
  (e: 'progress-change', progress: number): void
  (e: 'scroll-start'): void
  (e: 'scroll-end'): void
}>()

const is_browser = typeof window !== 'undefined' && typeof document !== 'undefined'

const container = ref<HTMLElement | null>(null)
const progress = ref(0)
const isScrolling = ref(false)
let scrollTimer: number | null = null

const progressClasses = computed(() => ({
  'scroll-progress-animated': props.animation,
  'scroll-progress-glow': props.glow,
  [`scroll-progress-${props.position}`]: true,
}))

const containerStyle = computed(() => {
  const baseStyle = {
    position: 'fixed',
    zIndex: 9999,
    transition: props.animation ? `all ${props.animationDuration}ms ease` : 'none',
  }

  switch (props.position) {
    case 'top':
      return {
        ...baseStyle,
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: props.height,
      }
    case 'bottom':
      return {
        ...baseStyle,
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: props.height,
      }
    case 'left':
      return {
        ...baseStyle,
        top: 0,
        left: 0,
        bottom: 0,
        width: props.height,
        height: '100%',
      }
    case 'right':
      return {
        ...baseStyle,
        top: 0,
        right: 0,
        bottom: 0,
        width: props.height,
        height: '100%',
      }
    default:
      return baseStyle
  }
})

const progressBarStyle = computed(() => {
  const baseStyle = {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  }

  if (props.position === 'left' || props.position === 'right') {
    return {
      ...baseStyle,
      width: '100%',
      height: '100%',
    }
  }

  return baseStyle
})

const progressFillStyle = computed(() => {
  const fillColor = props.gradient ? `linear-gradient(90deg, ${props.gradientColors.join(', ')})` : props.color

  const baseStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: `${progress.value}%`,
    height: '100%',
    background: fillColor,
    transition: props.animation ? `width ${props.animationDuration}ms ease` : 'none',
  }

  if (props.position === 'left' || props.position === 'right') {
    return {
      ...baseStyle,
      width: '100%',
      height: `${progress.value}%`,
      top: 'auto',
      bottom: 0,
    }
  }

  return baseStyle
})

const textStyle = computed(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: props.textColor,
  fontSize: props.textSize,
  fontWeight: 'bold',
  zIndex: 1,
  textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
}))

const updateProgress = () => {
  const target = props.target ? document.querySelector(props.target) : document.documentElement
  if (!target) return

  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const scrollHeight = target.scrollHeight - window.innerHeight
  const newProgress = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100))

  progress.value = newProgress
  emit('progress-change', newProgress)
}

const handleScroll = () => {
  if (!isScrolling.value) {
    isScrolling.value = true
    emit('scroll-start')
  }

  updateProgress()

  if (scrollTimer) {
    clearTimeout(scrollTimer)
  }

  scrollTimer = window.setTimeout(() => {
    isScrolling.value = false
    emit('scroll-end')
  }, 150)
}

const handleResize = () => {
  updateProgress()
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', handleResize)
  updateProgress()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)

  if (scrollTimer) {
    clearTimeout(scrollTimer)
  }
})

watch(
  () => props.target,
  () => {
    if (is_browser) {
      window.removeEventListener('scroll', handleScroll)
      window.addEventListener('scroll', handleScroll, { passive: true })
    }
  }
)

// 暴露方法给父组件
defineExpose({
  updateProgress,
  getProgress: () => progress.value,
})
</script>

<style scoped>
.scroll-progress-container {
  position: fixed;
  z-index: 9999;
  transition: all 0.2s ease;
}

.scroll-progress-bar {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.scroll-progress-fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  transition: width 0.2s ease;
}

.scroll-progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #333;
  font-size: 12px;
  font-weight: bold;
  z-index: 1;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.scroll-progress-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.scroll-progress-glow .scroll-progress-fill {
  box-shadow: 0 0 10px currentColor;
}

.scroll-progress-top {
  top: 0;
  left: 0;
  right: 0;
}

.scroll-progress-bottom {
  bottom: 0;
  left: 0;
  right: 0;
}

.scroll-progress-left {
  top: 0;
  left: 0;
  bottom: 0;
}

.scroll-progress-right {
  top: 0;
  right: 0;
  bottom: 0;
}
</style>
