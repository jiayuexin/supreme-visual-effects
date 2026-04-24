<template>
  <canvas ref="canvas" class="v-wave-background" :style="canvasStyle"></canvas>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAnimation } from '../composables/useAnimation'
import { isBrowser } from '../composables/useBrowser'
import { useReducedMotion } from '../composables/useReducedMotion'

interface WaveBackgroundProps {
  waveCount?: number
  waveColor?: string[]
  waveSpeed?: number
  amplitude?: number
  frequency?: number
  respectReducedMotion?: boolean
}

const props = withDefaults(defineProps<WaveBackgroundProps>(), {
  waveCount: 3,
  waveColor: () => ['#667eea20', '#764ba220', '#f093fb20'],
  waveSpeed: 1,
  amplitude: 50,
  frequency: 0.01,
  respectReducedMotion: true,
})

const emit = defineEmits<{
  (e: 'start'): void
  (e: 'stop'): void
}>()

const canvas = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let time = 0

const { prefersReducedMotion } = useReducedMotion()

interface WaveConfig {
  color: string
  speed: number
  amplitude: number
  frequency: number
  yOffset: number
}

const generateWaves = (): WaveConfig[] => {
  const waves: WaveConfig[] = []
  for (let i = 0; i < props.waveCount; i++) {
    waves.push({
      color: props.waveColor[i % props.waveColor.length],
      speed: props.waveSpeed * (0.5 + Math.random() * 0.5),
      amplitude: props.amplitude * (0.5 + Math.random() * 0.5),
      frequency: props.frequency * (0.8 + Math.random() * 0.4),
      yOffset: (i + 1) / (props.waveCount + 1),
    })
  }
  return waves
}

const waves = ref<WaveConfig[]>(generateWaves())

const canvasStyle = computed(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
}))

const resizeCanvas = () => {
  if (!canvas.value || !ctx) return
  const parent = canvas.value.parentElement
  if (!parent) return
  const dpr = window.devicePixelRatio || 1
  canvas.value.width = parent.clientWidth * dpr
  canvas.value.height = parent.clientHeight * dpr
  ctx.scale(dpr, dpr)
}

const drawWave = (wave: WaveConfig, width: number, height: number) => {
  if (!ctx) return

  ctx.beginPath()

  const baseY = height * wave.yOffset

  ctx.moveTo(0, height)

  for (let x = 0; x <= width; x += 2) {
    const y = Math.sin(x * wave.frequency + time * wave.speed * 0.02) * wave.amplitude + baseY
    ctx.lineTo(x, y)
  }

  ctx.lineTo(width, height)
  ctx.closePath()
  ctx.fillStyle = wave.color
  ctx.fill()
}

const { start: startAnimation, stop: stopAnimation } = useAnimation({
  autoStart: false,
  onFrame: () => {
    if (!ctx || !canvas.value) return
    const parent = canvas.value.parentElement
    if (!parent) return
    const width = parent.clientWidth
    const height = parent.clientHeight

    ctx.clearRect(0, 0, width, height)

    time++

    for (const wave of waves.value) {
      drawWave(wave, width, height)
    }
  },
  onStart: () => emit('start'),
  onStop: () => emit('stop'),
})

const start = () => {
  startAnimation()
}

const stop = () => {
  stopAnimation()
}

defineExpose({ start, stop })

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  if (!isBrowser) return
  if (props.respectReducedMotion && prefersReducedMotion.value) return

  const el = canvas.value
  if (!el) return

  ctx = el.getContext('2d')
  if (!ctx) return

  resizeCanvas()

  resizeObserver = new ResizeObserver(() => {
    if (!ctx || !canvas.value) return
    const dpr = window.devicePixelRatio || 1
    const parent = canvas.value.parentElement
    if (!parent) return
    canvas.value.width = parent.clientWidth * dpr
    canvas.value.height = parent.clientHeight * dpr
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.scale(dpr, dpr)
  })

  const parent = el.parentElement
  if (parent) {
    resizeObserver.observe(parent)
  }

  startAnimation()
})

onUnmounted(() => {
  stopAnimation()
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
})
</script>

<style scoped>
.v-wave-background {
  display: block;
  pointer-events: none;
}
</style>
