<template>
  <canvas ref="canvas" class="starfield"></canvas>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch, useTemplateRef } from 'vue'

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

const props = defineProps({
  starCount: {
    type: Number,
    default: 200,
  },
  speed: {
    type: Number,
    default: 0.5,
  },
  starColor: {
    type: String,
    default: '#ffffff',
  },
  backgroundColor: {
    type: String,
    default: 'transparent',
  },
  mouseInteraction: {
    type: Boolean,
    default: true,
  },
  twinkleSpeed: {
    type: Number,
    default: 2,
  },
  depth: {
    type: Number,
    default: 1000,
  },
  autoRotation: {
    type: Boolean,
    default: false,
  },
  rotationSpeed: {
    type: Number,
    default: 0.1,
  },
})

const is_browser = typeof window !== 'undefined' && typeof document !== 'undefined'

const canvas = useTemplateRef<HTMLCanvasElement>('canvas')
let animationId: number | null = null
let stars: Star[] = []
let mouseX = 0
let mouseY = 0
let centerX = 0
let centerY = 0
let rotation = 0

const initStars = () => {
  if (!is_browser) return
  stars = []
  for (let i = 0; i < props.starCount; i++) {
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
}

const updateStars = () => {
  if (!is_browser) return
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
  if (!is_browser || !canvas.value) return

  const ctx = canvas.value.getContext('2d')
  if (!ctx) return

  // Clear canvas
  ctx.fillStyle = props.backgroundColor
  ctx.fillRect(0, 0, canvas.value.width, canvas.value.height)

  // Sort stars by z for proper depth rendering
  const sortedStars = [...stars].sort((a, b) => b.z - a.z)

  sortedStars.forEach(star => {
    const x = (star.x / star.z) * 1000 + centerX
    const y = (star.y / star.z) * 1000 + centerY
    const size = (star.size / star.z) * 100

    if (
      x >= 0 &&
      x <= (canvas.value as HTMLCanvasElement).width &&
      y >= 0 &&
      y <= (canvas.value as HTMLCanvasElement).height
    ) {
      const alpha = (1 - star.z / props.depth) * star.brightness
      const color = props.starColor

      ctx.save()
      ctx.globalAlpha = alpha
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fill()

      // Add glow effect for larger stars
      if (size > 1) {
        ctx.shadowColor = color
        ctx.shadowBlur = size * 2
        ctx.beginPath()
        ctx.arc(x, y, size * 0.5, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      }
      ctx.restore()
    }
  })

  ctx.globalAlpha = 1
}

const animate = () => {
  if (!is_browser) return
  updateStars()
  drawStars()
  animationId = requestAnimationFrame(animate)
}

const resize = () => {
  if (!is_browser || !canvas.value) return

  const parent = canvas.value.parentElement
  if (!parent) return

  canvas.value.width = parent.clientWidth
  canvas.value.height = parent.clientHeight
  centerX = canvas.value.width / 2
  centerY = canvas.value.height / 2
}

const handleMouseMove = (e: MouseEvent) => {
  if (!is_browser || !canvas.value) return

  const rect = canvas.value.getBoundingClientRect()
  mouseX = e.clientX - rect.left
  mouseY = e.clientY - rect.top
}

// 暴露方法给父组件
defineExpose({
  pauseAnimation: () => {
    if (animationId) {
      cancelAnimationFrame(animationId)
      animationId = null
    }
  },
  resumeAnimation: () => {
    if (!animationId) {
      animate()
    }
  },
  reset: () => {
    if (is_browser) {
      initStars()
    }
  },
  updateStarCount: (count: number) => {
    if (count > stars.length) {
      // Add stars
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
      // Remove stars
      stars.splice(count)
    }
  }
})

onMounted(() => {
  if (!is_browser || !canvas.value) return

  initStars()
  resize()
  animate()

  window.addEventListener('resize', resize)

  if (props.mouseInteraction) {
    canvas.value.addEventListener('mousemove', handleMouseMove)
  }
})

onUnmounted(() => {
  if (!is_browser) return
  if (animationId) {
    cancelAnimationFrame(animationId)
  }

  window.removeEventListener('resize', resize)

  if (canvas.value && props.mouseInteraction) {
    canvas.value.removeEventListener('mousemove', handleMouseMove)
  }
})

watch(
  () => [props.starCount, props.speed, props.twinkleSpeed],
  () => {
    if (is_browser) {
      initStars()
    }
  }
)
</script>

<style scoped>
.starfield {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
}
</style>