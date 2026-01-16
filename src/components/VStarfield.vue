<template>
  <canvas ref="canvas" class="starfield" :aria-label="ariaLabel"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useReducedMotion } from '../composables/useReducedMotion'
import { useAnimation } from '../composables/useAnimation'
import { useResizeObserver } from '../composables/useResizeObserver'
import { isBrowser } from '../composables/useBrowser'

interface Star {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  vz: number
  size: number
  brightness: number
  twinkle: number
}

interface Props {
  starCount?: number
  speed?: number
  starColor?: string
  backgroundColor?: string
  mouseInteraction?: boolean
  twinkleSpeed?: number
  depth?: number
  autoRotation?: boolean
  rotationSpeed?: number
  respectReducedMotion?: boolean
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  starCount: 200,
  speed: 0.5,
  starColor: '#ffffff',
  backgroundColor: 'transparent',
  mouseInteraction: true,
  twinkleSpeed: 2,
  depth: 1000,
  autoRotation: false,
  rotationSpeed: 0.1,
  respectReducedMotion: true,
  ariaLabel: 'Animated starfield background',
})

const emit = defineEmits<{
  (e: 'initialized'): void
  (e: 'frame', fps: number): void
}>()

const { prefersReducedMotion } = useReducedMotion()

const canvas = ref<HTMLCanvasElement | null>(null)
let stars: Star[] = []
let mouseX = 0
let mouseY = 0
let centerX = 0
let centerY = 0
let rotation = 0
let ctx: CanvasRenderingContext2D | null = null

// Should reduce motion
const shouldReduceMotion = () => {
  return props.respectReducedMotion && prefersReducedMotion.value
}

// Use resize observer
useResizeObserver({
  target: canvas,
  onResize: resize,
})

// Animation loop
const {
  isRunning,
  fps,
  start: startAnimation,
  stop: stopAnimation,
  pause,
  resume,
} = useAnimation({
  onFrame: () => {
    if (!shouldReduceMotion()) {
      updateStars()
      drawStars()
    }
  },
})

// Watch FPS
watch(fps, newFps => {
  emit('frame', newFps)
})

const initStars = () => {
  stars = []
  const effectiveSpeed = shouldReduceMotion() ? 0 : props.speed

  for (let i = 0; i < props.starCount; i++) {
    stars.push({
      x: (Math.random() - 0.5) * 2000,
      y: (Math.random() - 0.5) * 2000,
      z: Math.random() * props.depth,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      vz: -Math.random() * effectiveSpeed,
      size: Math.random() * 2 + 0.5,
      brightness: Math.random(),
      twinkle: Math.random() * Math.PI * 2,
    })
  }
}

const updateStars = () => {
  stars.forEach(star => {
    star.x += star.vx
    star.y += star.vy
    star.z += star.vz

    // Mouse interaction
    if (props.mouseInteraction) {
      const dx = mouseX - centerX
      const dy = mouseY - centerY
      const distance = Math.sqrt(dx * dx + dy * dy)
      const influence = Math.max(0, 1 - distance / 200)

      star.vx += dx * influence * 0.0001
      star.vy += dy * influence * 0.0001
    }

    // Auto rotation
    if (props.autoRotation) {
      const angle = rotation * props.rotationSpeed
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      const newX = star.x * cos - star.y * sin
      const newY = star.x * sin + star.y * cos
      star.x = newX
      star.y = newY
    }

    // Reset star if it goes too far
    if (star.z <= 0) {
      star.x = (Math.random() - 0.5) * 2000
      star.y = (Math.random() - 0.5) * 2000
      star.z = props.depth
    }

    // Twinkle effect
    star.twinkle += props.twinkleSpeed * 0.01
    star.brightness = 0.5 + 0.5 * Math.sin(star.twinkle)
  })

  if (props.autoRotation) {
    rotation += 0.01
  }
}

const drawStars = () => {
  if (!canvas.value || !ctx) return

  // Clear canvas
  ctx.fillStyle = props.backgroundColor
  ctx.fillRect(0, 0, canvas.value.width, canvas.value.height)

  // Sort stars by z for proper depth rendering
  const sortedStars = [...stars].sort((a, b) => b.z - a.z)

  sortedStars.forEach(star => {
    const x = (star.x / star.z) * 1000 + centerX
    const y = (star.y / star.z) * 1000 + centerY
    const size = (star.size / star.z) * 100

    if (x >= 0 && x <= canvas.value!.width && y >= 0 && y <= canvas.value!.height) {
      const alpha = (1 - star.z / props.depth) * star.brightness
      const color = props.starColor

      ctx!.save()
      ctx!.globalAlpha = alpha
      ctx!.fillStyle = color
      ctx!.beginPath()
      ctx!.arc(x, y, size, 0, Math.PI * 2)
      ctx!.fill()

      // Add glow effect for larger stars
      if (size > 1) {
        ctx!.shadowColor = color
        ctx!.shadowBlur = size * 2
        ctx!.beginPath()
        ctx!.arc(x, y, size * 0.5, 0, Math.PI * 2)
        ctx!.fill()
        ctx!.shadowBlur = 0
      }
      ctx!.restore()
    }
  })

  ctx.globalAlpha = 1
}

const drawStaticFrame = () => {
  if (!canvas.value || !ctx) return

  ctx.fillStyle = props.backgroundColor
  ctx.fillRect(0, 0, canvas.value.width, canvas.value.height)

  stars.forEach(star => {
    const x = (star.x / star.z) * 1000 + centerX
    const y = (star.y / star.z) * 1000 + centerY
    const size = (star.size / star.z) * 100

    if (x >= 0 && x <= canvas.value!.width && y >= 0 && y <= canvas.value!.height) {
      const alpha = (1 - star.z / props.depth) * 0.8

      ctx!.save()
      ctx!.globalAlpha = alpha
      ctx!.fillStyle = props.starColor
      ctx!.beginPath()
      ctx!.arc(x, y, size, 0, Math.PI * 2)
      ctx!.fill()
      ctx!.restore()
    }
  })

  ctx.globalAlpha = 1
}

function resize() {
  if (!canvas.value) return

  const parent = canvas.value.parentElement
  const width = parent?.clientWidth || canvas.value.clientWidth || 800
  const height = parent?.clientHeight || canvas.value.clientHeight || 400

  canvas.value.width = width
  canvas.value.height = height
  centerX = canvas.value.width / 2
  centerY = canvas.value.height / 2

  // Redraw if reduced motion
  if (shouldReduceMotion()) {
    drawStaticFrame()
  }
}

const handleMouseMove = (e: MouseEvent) => {
  if (!canvas.value) return
  const rect = canvas.value.getBoundingClientRect()
  mouseX = e.clientX - rect.left
  mouseY = e.clientY - rect.top
}

// Expose methods
defineExpose({
  pauseAnimation: pause,
  resumeAnimation: resume,
  reset: () => {
    initStars()
    if (shouldReduceMotion()) {
      drawStaticFrame()
    }
  },
  updateStarCount: (count: number) => {
    if (count > stars.length) {
      for (let i = stars.length; i < count; i++) {
        stars.push({
          x: (Math.random() - 0.5) * 2000,
          y: (Math.random() - 0.5) * 2000,
          z: Math.random() * props.depth,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          vz: -Math.random() * props.speed,
          size: Math.random() * 2 + 0.5,
          brightness: Math.random(),
          twinkle: Math.random() * Math.PI * 2,
        })
      }
    } else if (count < stars.length) {
      stars.splice(count, stars.length - count)
    }
  },
  isRunning,
  fps,
})

onMounted(() => {
  if (!isBrowser || !canvas.value) return

  ctx = canvas.value.getContext('2d')
  if (!ctx) return

  initStars()
  resize()

  if (shouldReduceMotion()) {
    drawStaticFrame()
  } else {
    startAnimation()
  }

  if (props.mouseInteraction) {
    canvas.value.addEventListener('mousemove', handleMouseMove)
  }

  emit('initialized')
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
  () => [props.starCount, props.speed, props.twinkleSpeed],
  () => {
    if (isBrowser) {
      initStars()
      if (shouldReduceMotion()) {
        drawStaticFrame()
      }
    }
  }
)

// Watch for reduced motion preference changes
watch(prefersReducedMotion, newValue => {
  if (!isBrowser) return

  if (props.respectReducedMotion && newValue) {
    stopAnimation()
    initStars()
    drawStaticFrame()
  } else {
    initStars()
    startAnimation()
  }
})
</script>

<style scoped>
.starfield {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
