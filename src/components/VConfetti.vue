<template>
  <div ref="container" class="confetti-container" :style="containerStyle">
    <canvas ref="canvas" class="confetti-canvas" :style="canvasStyle"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

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

const props = defineProps({
  enabled: {
    type: Boolean,
    default: true,
  },
  particleCount: {
    type: Number,
    default: 100,
  },
  colors: {
    type: Array as () => string[],
    default: () => ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'],
  },
  shapes: {
    type: Array as () => ('circle' | 'square' | 'triangle')[],
    default: () => ['circle', 'square', 'triangle'],
  },
  gravity: {
    type: Number,
    default: 0.3,
  },
  wind: {
    type: Number,
    default: 0.1,
  },
  speed: {
    type: Number,
    default: 5,
  },
  spread: {
    type: Number,
    default: 45,
  },
  size: {
    type: Number,
    default: 8,
  },
  duration: {
    type: Number,
    default: 3000,
  },
  burst: {
    type: Boolean,
    default: true,
  },
  continuous: {
    type: Boolean,
    default: false,
  },
  continuousInterval: {
    type: Number,
    default: 1000,
  },
  position: {
    type: String as () => 'top' | 'center' | 'bottom' | 'random',
    default: 'top',
  },
  direction: {
    type: String as () => 'up' | 'down' | 'left' | 'right' | 'random',
    default: 'up',
  },
})

const emit = defineEmits<{
  'confetti-start': []
  'confetti-end': []
  'particle-create': [particle: ConfettiParticle]
  'particle-destroy': [particle: ConfettiParticle]
}>()

const is_browser = typeof window !== 'undefined' && typeof document !== 'undefined'

const container = ref<HTMLElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
const particles = ref<ConfettiParticle[]>([])
const animationId = ref<number | null>(null)
const continuousTimer = ref<number | null>(null)
const startTime = ref(0)

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
  if (!is_browser || !canvas.value) return { x: 0, y: 0 }

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
  if (!is_browser || !props.enabled) return

  emit('confetti-start')
  startTime.value = Date.now()

  const position = getBurstPosition()

  for (let i = 0; i < props.particleCount; i++) {
    const particle = createParticle(position.x, position.y)
    particles.value.push(particle)
  }

  if (!animationId.value) {
    animate()
  }
}

const animate = () => {
  if (!is_browser || !canvas.value) return

  const ctx = canvas.value.getContext('2d')
  if (!ctx) return

  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

  const currentTime = Date.now()
  const elapsed = currentTime - startTime.value

  // Remove particles that are too old or have no life left
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
    ctx.save()
    ctx.translate(particle.x, particle.y)
    ctx.rotate((particle.rotation * Math.PI) / 180)
    ctx.globalAlpha = particle.life
    ctx.fillStyle = particle.color

    switch (particle.shape) {
      case 'circle':
        ctx.beginPath()
        ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2)
        ctx.fill()
        break
      case 'square':
        ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size)
        break
      case 'triangle':
        ctx.beginPath()
        ctx.moveTo(0, -particle.size / 2)
        ctx.lineTo(-particle.size / 2, particle.size / 2)
        ctx.lineTo(particle.size / 2, particle.size / 2)
        ctx.closePath()
        ctx.fill()
        break
    }

    ctx.restore()
  })

  // Continue animation if there are particles or continuous mode
  if (particles.value.length > 0 || (props.continuous && props.enabled)) {
    animationId.value = requestAnimationFrame(animate)
  } else {
    animationId.value = null
    emit('confetti-end')
  }
}

const startContinuous = () => {
  if (!is_browser || !props.continuous || !props.enabled) return

  continuousTimer.value = window.setInterval(() => {
    burst()
  }, props.continuousInterval)
}

const stopContinuous = () => {
  if (!is_browser || !continuousTimer.value) return
  clearInterval(continuousTimer.value)
  continuousTimer.value = null
}

const stop = () => {
  if (!is_browser) return
  particles.value = []
  if (animationId.value) {
    cancelAnimationFrame(animationId.value)
    animationId.value = null
  }
  stopContinuous()
}

const resize = () => {
  if (!is_browser || !canvas.value || !container.value) return

  const rect = container.value.getBoundingClientRect()
  canvas.value.width = rect.width
  canvas.value.height = rect.height
}

onMounted(() => {
  if (!is_browser) return
  resize()
  window.addEventListener('resize', resize)

  if (props.continuous) {
    startContinuous()
  }
})

onUnmounted(() => {
  if (!is_browser) return
  stop()
  window.removeEventListener('resize', resize)
})

watch(
  () => props.enabled,
  newVal => {
    if (!is_browser) return
    if (newVal && props.continuous) {
      startContinuous()
    } else {
      stopContinuous()
    }
  }
)

watch(
  () => props.continuous,
  newVal => {
    if (!is_browser) return
    if (newVal && props.enabled) {
      startContinuous()
    } else {
      stopContinuous()
    }
  }
)

// 暴露方法给父组件
defineExpose({
  burst,
  stop,
  startContinuous,
  stopContinuous,
})
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