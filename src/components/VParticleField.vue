<template>
  <canvas ref="canvas" class="particle-field"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

interface ParticleFieldProps {
  particleCount: number
  particleColor: string
  lineColor: string
  speed: number
  maxDistance: number
  mouseInteraction: boolean
  mouseRadius: number
  connectParticles: boolean
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
})

const is_browser = typeof window !== 'undefined' && typeof document !== 'undefined'

const canvas = ref<HTMLCanvasElement | null>(null)
let animationFrameId: number
let mouseX = 0
let mouseY = 0

let particles: Particle[] = []

const init = () => {
  if (!is_browser || !canvas.value) return
  const ctx = canvas.value.getContext('2d')
  if (!ctx) return

  const parent = canvas.value.parentElement
  if (!parent) return

  canvas.value.width = parent.clientWidth
  canvas.value.height = parent.clientHeight

  particles = []
  for (let i = 0; i < props.particleCount!; i++) {
    particles.push({
      x: Math.random() * canvas.value.width,
      y: Math.random() * canvas.value.height,
      vx: (Math.random() - 0.5) * props.speed!,
      vy: (Math.random() - 0.5) * props.speed!,
      radius: Math.random() * 1.5 + 1,
    })
  }

  animate()
}

const handleMouseMove = (e: MouseEvent) => {
  if (!is_browser || !canvas.value) return

  const rect = canvas.value.getBoundingClientRect()
  mouseX = e.clientX - rect.left
  mouseY = e.clientY - rect.top
}

const animate = (_timestamp?: number) => {
  if (!is_browser || !canvas.value) return
  const ctx = canvas.value.getContext('2d')
  if (!ctx) return

  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

  particles.forEach(p => {
    // Mouse interaction
    if (props.mouseInteraction) {
      const dx = mouseX - p.x
      const dy = mouseY - p.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < props.mouseRadius!) {
        const force = (props.mouseRadius! - distance) / props.mouseRadius!
        p.vx += dx * force * 0.01
        p.vy += dy * force * 0.01
      }
    }

    p.x += p.vx
    p.y += p.vy

    // Boundary checking with bounce
    if (p.x < 0 || p.x > (canvas.value as HTMLCanvasElement).width) {
      p.vx *= -1
      p.x = Math.max(0, Math.min((canvas.value as HTMLCanvasElement).width, p.x))
    }
    if (p.y < 0 || p.y > (canvas.value as HTMLCanvasElement).height) {
      p.vy *= -1
      p.y = Math.max(0, Math.min((canvas.value as HTMLCanvasElement).height, p.y))
    }

    // Apply slight friction to prevent infinite acceleration
    p.vx *= 0.99
    p.vy *= 0.99

    ctx.beginPath()
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
    ctx.fillStyle = props.particleColor!
    ctx.fill()
  })

  // Connect particles with lines
  if (props.connectParticles) {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y)
        if (dist < props.maxDistance!) {
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.strokeStyle = props.lineColor!
          ctx.lineWidth = 1 - dist / props.maxDistance!
          ctx.stroke()
        }
      }
    }
  }

  animationFrameId = requestAnimationFrame(animate)
}

// 暴露方法给父组件
defineExpose({
  updateParticleCount: (count: number) => {
    if (count > particles.length) {
      // Add particles
      for (let i = particles.length; i < count; i++) {
        particles.push({
          x: Math.random() * (canvas.value?.width || 0),
          y: Math.random() * (canvas.value?.height || 0),
          vx: (Math.random() - 0.5) * props.speed!,
          vy: (Math.random() - 0.5) * props.speed!,
          radius: Math.random() * 1.5 + 1,
        })
      }
    } else if (count < particles.length) {
      // Remove particles
      particles.splice(count)
    }
  },
  pauseAnimation: () => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId)
    }
  },
  resumeAnimation: () => {
    animate()
  },
})

onMounted(() => {
  if (!is_browser) return
  init()
  window.addEventListener('resize', init)

  if (props.mouseInteraction && canvas.value) {
    canvas.value.addEventListener('mousemove', handleMouseMove)
  }
})

onUnmounted(() => {
  if (!is_browser) return
  cancelAnimationFrame(animationFrameId)
  window.removeEventListener('resize', init)

  if (canvas.value && props.mouseInteraction) {
    canvas.value.removeEventListener('mousemove', handleMouseMove)
  }
})

watch(
  () => [props.particleCount, props.speed],
  () => {
    if (is_browser) {
      init()
    }
  }
)
</script>

<style scoped>
.particle-field {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
</style>
