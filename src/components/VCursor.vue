<template>
  <Teleport to="body">
    <div v-if="isVisible && isBrowser" class="v-cursor" :style="cursorStyle" @click="handleClick">
      <!-- Main cursor dot -->
      <div class="v-cursor-dot" :style="dotStyle"></div>

      <!-- Trailers -->
      <div
        v-for="i in showTrailer ? trailerCount : 0"
        :key="i"
        class="v-cursor-trailer"
        :style="getTrailerStyle(i)"
      ></div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { isBrowser } from '../composables/useBrowser'
import { useReducedMotion } from '../composables/useReducedMotion'

interface CursorProps {
  size?: number
  color?: string
  opacity?: number
  blendMode?: string
  showTrailer?: boolean
  trailerCount?: number
  trailerScale?: number
  respectReducedMotion?: boolean
}

const props = withDefaults(defineProps<CursorProps>(), {
  size: 20,
  color: '#667eea',
  opacity: 0.8,
  blendMode: 'normal',
  showTrailer: true,
  trailerCount: 6,
  trailerScale: 0.6,
  respectReducedMotion: true,
})

const emit = defineEmits<{
  (e: 'move', x: number, y: number): void
  (e: 'click'): void
}>()

const isVisible = ref(false)
const mouseX = ref(0)
const mouseY = ref(0)
const cursorX = ref(0)
const cursorY = ref(0)
const isMouseDown = ref(false)
const isInitialized = ref(false)
const { prefersReducedMotion } = useReducedMotion()

interface Point {
  x: number
  y: number
}

const history: Point[] = []

const smoothing = 0.15

const cursorStyle = computed(() => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  pointerEvents: 'none' as const,
  zIndex: 99999,
}))

const dotStyle = computed(() => {
  const size = isMouseDown.value ? props.size * 0.7 : props.size
  return {
    position: 'fixed' as const,
    left: `${cursorX.value - size / 2}px`,
    top: `${cursorY.value - size / 2}px`,
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    backgroundColor: props.color,
    opacity: props.opacity,
    mixBlendMode: props.blendMode,
    pointerEvents: 'none' as const,
    transition: isMouseDown.value ? 'transform 0.1s ease, width 0.1s ease, height 0.1s ease' : 'none',
    transform: isMouseDown.value ? 'scale(0.7)' : 'scale(1)',
  }
})

const getTrailerStyle = (index: number) => {
  if (history.length <= index) {
    return { display: 'none' }
  }
  const pos = history[index]
  const scale = Math.pow(props.trailerScale, index + 1)
  const size = props.size * scale
  const opacity = props.opacity * (1 - (index + 1) / (props.trailerCount + 1))
  return {
    position: 'fixed' as const,
    left: `${pos.x - size / 2}px`,
    top: `${pos.y - size / 2}px`,
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    backgroundColor: props.color,
    opacity,
    mixBlendMode: props.blendMode,
    pointerEvents: 'none' as const,
  }
}

const handleMouseMove = (e: MouseEvent) => {
  mouseX.value = e.clientX
  mouseY.value = e.clientY
  emit('move', e.clientX, e.clientY)
}

const handleMouseDown = () => {
  isMouseDown.value = true
}

const handleMouseUp = () => {
  isMouseDown.value = false
}

const handleClick = () => {
  emit('click')
}

let animationId: number | null = null

const animate = () => {
  const dx = mouseX.value - cursorX.value
  const dy = mouseY.value - cursorY.value

  cursorX.value += dx * smoothing
  cursorY.value += dy * smoothing

  history.unshift({ x: cursorX.value, y: cursorY.value })
  while (history.length > props.trailerCount) {
    history.pop()
  }

  animationId = requestAnimationFrame(animate)
}

const show = () => {
  if (!isInitialized.value) return
  isVisible.value = true
  if (isBrowser) {
    document.body.style.cursor = 'none'
  }
}

const hide = () => {
  isVisible.value = false
  if (isBrowser) {
    document.body.style.cursor = ''
  }
}

const destroy = () => {
  if (animationId !== null) {
    cancelAnimationFrame(animationId)
    animationId = null
  }
  if (isBrowser) {
    document.body.style.cursor = ''
  }
  isVisible.value = false
  isInitialized.value = false
}

defineExpose({ show, hide, destroy })

let originalCursor = ''

onMounted(() => {
  if (!isBrowser || (props.respectReducedMotion && prefersReducedMotion.value)) return

  originalCursor = document.body.style.cursor
  document.body.style.cursor = 'none'
  isInitialized.value = true
  isVisible.value = true

  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('mousedown', handleMouseDown)
  window.addEventListener('mouseup', handleMouseUp)

  cursorX.value = mouseX.value
  cursorY.value = mouseY.value

  animationId = requestAnimationFrame(animate)
})

onUnmounted(() => {
  if (!isBrowser) return

  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('mousedown', handleMouseDown)
  window.removeEventListener('mouseup', handleMouseUp)

  if (animationId !== null) {
    cancelAnimationFrame(animationId)
  }

  document.body.style.cursor = originalCursor
})
</script>

<style scoped>
.v-cursor {
  cursor: none;
}

.v-cursor-dot,
.v-cursor-trailer {
  pointer-events: none;
}
</style>
