<template>
  <div ref="container" class="confetti-container" :style="containerStyle" role="presentation" aria-hidden="true">
    <canvas ref="canvas" class="confetti-canvas" :style="canvasStyle"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useReducedMotion } from '../composables/useReducedMotion'
import { useAnimation } from '../composables/useAnimation'
import { useWindowResize } from '../composables/useResizeObserver'
import { isBrowser } from '../composables/useBrowser'

interface ConfettiParticle {
  x: number
  y: number
  vx: number
  vy: number
  rotation: number
  rotationSpeed: number
  color: string
  size: number
  shape: 'circle' | 'square' | 'triangle'
  life: number
  maxLife: number
}

interface ConfettiProps {
  enabled?: boolean
  particleCount?: number
  colors?: string[]
  shapes?: ('circle' | 'square' | 'triangle')[]
  gravity?: number
  wind?: number
  speed?: number
  spread?: number
  size?: number
  duration?: number
  burst?: boolean
  continuous?: boolean
  continuousInterval?: number
  position?: 'top' | 'center' | 'bottom' | 'random'
  direction?: 'up' | 'down' | 'left' | 'right' | 'random'
  respectReducedMotion?: boolean
}

const props = withDefaults(defineProps<ConfettiProps>(), {
  enabled: true,
  particleCount: 100,
  colors: () => ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'],
  shapes: () => ['circle', 'square', 'triangle'],
  gravity: 0.3,
  wind: 0.1,
  speed: 5,
  spread: 45,
  size: 8,
  duration: 3000,
  burst: true,
  continuous: false,
  continuousInterval: 1000,
  position: 'top',
  direction: 'up',
  respectReducedMotion: true,
})

const emit = defineEmits<{
  (e: 'confetti-start'): void
  (e: 'confetti-end'): void
  (e: 'particle-create', particle: ConfettiParticle): void
  (e: 'particle-destroy', particle: ConfettiParticle): void
}>()

const { prefersReducedMotion } = useReducedMotion()

// Check if animations should be disabled
const shouldDisableAnimation = computed(() => {
  return props.respectReducedMotion && prefersReducedMotion.value
})

const container = ref<HTMLElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
const particles = ref<ConfettiParticle[]>([])
const startTime = ref(0)
let continuousTimer: number | null = null
let ctx: CanvasRenderingContext2D | null = null

// Use window resize for full-screen canvas
useWindowResize({
  onResize: resize,
})

// Animation loop
const {
  isRunning,
  start: startAnimation,
  stop: stopAnimation,
} = useAnimation({
  onFrame: animate,
})

const containerStyle = computed(() => ({
  position: 'fixed' as const,
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  pointerEvents: 'none' as const,
  zIndex: 9999,
  overflow: 'hidden' as const,
}))

const canvasStyle = computed(() => ({
  width: '100%',
  height: '100%',
  display: 'block' as const,
}))

const createParticle = (x: number, y: number): ConfettiParticle => {
  const angle = (Math.random() - 0.5) * props.spread * (Math.PI / 180)
  const velocity = Math.random() * props.speed + 1

  let vx = 0
  let vy = 0

  switch (props.direction) {
    case 'up':
      vx = Math.sin(angle) * velocity
      vy = -Math.cos(angle) * velocity
      break
    case 'down':
      vx = Math.sin(angle) * velocity
      vy = Math.cos(angle) * velocity
      break
    case 'left':
      vx = -Math.cos(angle) * velocity
      vy = Math.sin(angle) * velocity
      break
    case 'right':
      vx = Math.cos(angle) * velocity
      vy = Math.sin(angle) * velocity
      break
    case 'random':
      vx = (Math.random() - 0.5) * velocity * 2
      vy = (Math.random() - 0.5) * velocity * 2
      break
  }

  const particle: ConfettiParticle = {
    x,
    y,
    vx,
    vy,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 10,
    color: props.colors[Math.floor(Math.random() * props.colors.length)],
    size: Math.random() * props.size + 2,
    shape: props.shapes[Math.floor(Math.random() * props.shapes.length)],
    life: 1,
    maxLife: 1,
  }

  emit('particle-create', particle)
  return particle
}

const getBurstPosition = () => {
  if (!canvas.value) return { x: 0, y: 0 }

  const width = canvas.value.width
  const height = canvas.value.height

  switch (props.position) {
    case 'top':
      return { x: width / 2, y: 0 }
    case 'center':
      return { x: width / 2, y: height / 2 }
    case 'bottom':
      return { x: width / 2, y: height }
    case 'random':
      return { x: Math.random() * width, y: Math.random() * height }
    default:
      return { x: width / 2, y: 0 }
  }
}

const burst = () => {
  if (!isBrowser || !props.enabled) return

  // Skip animation if reduced motion is preferred
  if (shouldDisableAnimation.value) {
    emit('confetti-start')
    emit('confetti-end')
    return
  }

  emit('confetti-start')
  startTime.value = Date.now()

  const position = getBurstPosition()

  for (let i = 0; i < props.particleCount; i++) {
    const particle = createParticle(position.x, position.y)
    particles.value.push(particle)
  }

  if (!isRunning.value) {
    startAnimation()
  }
}

function animate() {
  if (!canvas.value || !ctx) return

  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

  const currentTime = Date.now()
  const elapsed = currentTime - startTime.value

  // Remove old particles
  particles.value = particles.value.filter(particle => {
    particle.life -= 1 / (props.duration / 16)
    return particle.life > 0 && elapsed < props.duration
  })

  // Update and draw particles
  particles.value.forEach(particle => {
    // Update physics
    particle.vy += props.gravity
    particle.vx += props.wind
    particle.x += particle.vx
    particle.y += particle.vy
    particle.rotation += particle.rotationSpeed

    // Draw particle
    ctx!.save()
    ctx!.translate(particle.x, particle.y)
    ctx!.rotate((particle.rotation * Math.PI) / 180)
    ctx!.globalAlpha = particle.life
    ctx!.fillStyle = particle.color

    switch (particle.shape) {
      case 'circle':
        ctx!.beginPath()
        ctx!.arc(0, 0, particle.size / 2, 0, Math.PI * 2)
        ctx!.fill()
        break
      case 'square':
        ctx!.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size)
        break
      case 'triangle':
        ctx!.beginPath()
        ctx!.moveTo(0, -particle.size / 2)
        ctx!.lineTo(-particle.size / 2, particle.size / 2)
        ctx!.lineTo(particle.size / 2, particle.size / 2)
        ctx!.closePath()
        ctx!.fill()
        break
    }

    ctx!.restore()
  })

  // Stop animation if no particles and not continuous
  if (particles.value.length === 0 && !props.continuous) {
    stopAnimation()
    emit('confetti-end')
  }
}

const startContinuous = () => {
  if (!isBrowser || !props.continuous || !props.enabled) return
  if (shouldDisableAnimation.value) return

  continuousTimer = window.setInterval(() => {
    burst()
  }, props.continuousInterval)
}

const stopContinuous = () => {
  if (continuousTimer !== null) {
    clearInterval(continuousTimer)
    continuousTimer = null
  }
}

const stop = () => {
  particles.value = []
  stopAnimation()
  stopContinuous()
}

function resize() {
  if (!canvas.value || !container.value) return

  const rect = container.value.getBoundingClientRect()
  canvas.value.width = rect.width
  canvas.value.height = rect.height
}

// Expose methods
defineExpose({
  burst,
  stop,
  startContinuous,
  stopContinuous,
})

onMounted(() => {
  if (!isBrowser || !canvas.value) return

  ctx = canvas.value.getContext('2d')
  resize()

  if (props.continuous) {
    startContinuous()
  }
})

onUnmounted(() => {
  stop()
})

watch(
  () => props.enabled,
  (newVal: boolean) => {
    if (!isBrowser) return
    if (newVal && props.continuous) {
      startContinuous()
    } else {
      stopContinuous()
    }
  }
)

watch(
  () => props.continuous,
  (newVal: boolean) => {
    if (!isBrowser) return
    if (newVal && props.enabled) {
      startContinuous()
    } else {
      stopContinuous()
    }
  }
)
</script>

<style scoped>
.confetti-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 9999;
  overflow: hidden;
}

.confetti-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
