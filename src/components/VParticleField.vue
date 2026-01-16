<template>
  <canvas ref="canvas" class="particle-field" :aria-label="ariaLabel"></canvas>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useReducedMotion } from '../composables/useReducedMotion'
import { useAnimation } from '../composables/useAnimation'
import { useResizeObserver } from '../composables/useResizeObserver'
import { isBrowser } from '../composables/useBrowser'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

interface ParticleFieldProps {
  particleCount?: number
  particleColor?: string
  lineColor?: string
  speed?: number
  maxDistance?: number
  mouseInteraction?: boolean
  mouseRadius?: number
  connectParticles?: boolean
  respectReducedMotion?: boolean
  reducedMotionParticleCount?: number
  ariaLabel?: string
}

const props = withDefaults(defineProps<ParticleFieldProps>(), {
  particleCount: 100,
  particleColor: '#ffffff',
  lineColor: 'rgba(255, 255, 255, 0.2)',
  speed: 0.5,
  maxDistance: 120,
  mouseInteraction: true,
  mouseRadius: 100,
  connectParticles: true,
  respectReducedMotion: true,
  reducedMotionParticleCount: 20,
  ariaLabel: 'Animated particle field background',
})

const emit = defineEmits<{
  (e: 'initialized'): void
  (e: 'frame', fps: number): void
}>()

const { prefersReducedMotion } = useReducedMotion()

const canvas = ref<HTMLCanvasElement | null>(null)
let particles: Particle[] = []
let mouseX = 0
let mouseY = 0
let ctx: CanvasRenderingContext2D | null = null

// Computed values
const shouldReduceMotion = computed(() => {
  return props.respectReducedMotion && prefersReducedMotion.value
})

const effectiveParticleCount = computed(() => {
  return shouldReduceMotion.value ? props.reducedMotionParticleCount : props.particleCount
})

const effectiveSpeed = computed(() => {
  return shouldReduceMotion.value ? 0 : props.speed
})

// Use resize observer for canvas sizing
useResizeObserver({
  target: canvas,
  onResize: () => {
    resizeCanvas()
  },
})

// Animation loop using useAnimation
const {
  isRunning,
  fps,
  start: startAnimation,
  stop: stopAnimation,
  pause,
  resume,
} = useAnimation({
  onFrame: () => {
    if (!shouldReduceMotion.value) {
      updateAndDraw()
    }
  },
})

// Watch FPS and emit
watch(fps, newFps => {
  emit('frame', newFps)
})

// Initialize particles
const initParticles = () => {
  if (!canvas.value) return

  const count = effectiveParticleCount.value
  const speed = effectiveSpeed.value

  particles = []
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.value.width,
      y: Math.random() * canvas.value.height,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      radius: Math.random() * 1.5 + 1,
    })
  }
}

// Resize canvas to match container
const resizeCanvas = () => {
  if (!canvas.value) return

  const parent = canvas.value.parentElement
  const width = parent?.clientWidth || canvas.value.clientWidth || 800
  const height = parent?.clientHeight || canvas.value.clientHeight || 400

  canvas.value.width = width
  canvas.value.height = height

  // Reinitialize particles on resize
  initParticles()

  // Draw static frame if reduced motion
  if (shouldReduceMotion.value) {
    drawStaticFrame()
  }
}

// Draw a single static frame (for reduced motion)
const drawStaticFrame = () => {
  if (!canvas.value || !ctx) return

  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

  // Draw particles
  particles.forEach(p => {
    ctx!.beginPath()
    ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
    ctx!.fillStyle = props.particleColor
    ctx!.fill()
  })

  // Draw connections
  if (props.connectParticles) {
    drawConnections()
  }
}

// Draw connections between particles
const drawConnections = () => {
  if (!ctx) return

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y)
      if (dist < props.maxDistance) {
        ctx.beginPath()
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[j].x, particles[j].y)
        ctx.strokeStyle = props.lineColor
        ctx.lineWidth = 1 - dist / props.maxDistance
        ctx.stroke()
      }
    }
  }
}

// Update particles and draw
const updateAndDraw = () => {
  if (!canvas.value || !ctx) return

  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

  particles.forEach(p => {
    // Mouse interaction
    if (props.mouseInteraction) {
      const dx = mouseX - p.x
      const dy = mouseY - p.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < props.mouseRadius) {
        const force = (props.mouseRadius - distance) / props.mouseRadius
        p.vx += dx * force * 0.01
        p.vy += dy * force * 0.01
      }
    }

    // Update position
    p.x += p.vx
    p.y += p.vy

    // Boundary checking with bounce
    if (p.x < 0 || p.x > canvas.value!.width) {
      p.vx *= -1
      p.x = Math.max(0, Math.min(canvas.value!.width, p.x))
    }
    if (p.y < 0 || p.y > canvas.value!.height) {
      p.vy *= -1
      p.y = Math.max(0, Math.min(canvas.value!.height, p.y))
    }

    // Apply friction
    p.vx *= 0.99
    p.vy *= 0.99

    // Draw particle
    ctx!.beginPath()
    ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
    ctx!.fillStyle = props.particleColor
    ctx!.fill()
  })

  // Draw connections
  if (props.connectParticles) {
    drawConnections()
  }
}

// Mouse move handler
const handleMouseMove = (e: MouseEvent) => {
  if (!canvas.value) return
  const rect = canvas.value.getBoundingClientRect()
  mouseX = e.clientX - rect.left
  mouseY = e.clientY - rect.top
}

// Initialize
const init = () => {
  if (!isBrowser || !canvas.value) return

  ctx = canvas.value.getContext('2d')
  if (!ctx) return

  resizeCanvas()

  if (shouldReduceMotion.value) {
    drawStaticFrame()
  } else {
    startAnimation()
  }

  emit('initialized')
}

// Expose methods
defineExpose({
  updateParticleCount: (count: number) => {
    if (count > particles.length) {
      for (let i = particles.length; i < count; i++) {
        particles.push({
          x: Math.random() * (canvas.value?.width || 0),
          y: Math.random() * (canvas.value?.height || 0),
          vx: (Math.random() - 0.5) * props.speed,
          vy: (Math.random() - 0.5) * props.speed,
          radius: Math.random() * 1.5 + 1,
        })
      }
    } else if (count < particles.length) {
      particles.splice(count)
    }
  },
  pauseAnimation: pause,
  resumeAnimation: resume,
  isRunning,
  fps,
})

onMounted(() => {
  if (!isBrowser) return

  init()

  if (props.mouseInteraction && canvas.value) {
    canvas.value.addEventListener('mousemove', handleMouseMove)
  }
})

onUnmounted(() => {
  if (!isBrowser) return

  stopAnimation()

  if (canvas.value && props.mouseInteraction) {
    canvas.value.removeEventListener('mousemove', handleMouseMove)
  }
})

// Watch for prop changes
watch(
  () => [props.particleCount, props.speed],
  () => {
    if (isBrowser) {
      initParticles()
      if (shouldReduceMotion.value) {
        drawStaticFrame()
      }
    }
  }
)

// Watch for reduced motion preference changes
watch(shouldReduceMotion, newValue => {
  if (!isBrowser) return

  if (newValue) {
    stopAnimation()
    initParticles()
    drawStaticFrame()
  } else {
    initParticles()
    startAnimation()
  }
})
</script>

<style scoped>
.particle-field {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
