<template>
  <canvas ref="canvas" class="particle-field"></canvas>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch, useTemplateRef } from 'vue'

const props = defineProps({
  particleCount: {
    type: Number,
    default: 100,
  },
  particleColor: {
    type: String,
    default: 'rgba(255, 255, 255, 0.8)',
  },
  lineColor: {
    type: String,
    default: 'rgba(255, 255, 255, 0.2)',
  },
  speed: {
    type: Number,
    default: 0.5,
  },
  maxDistance: {
    type: Number,
    default: 120,
  },
})

const canvas = useTemplateRef<HTMLCanvasElement>('canvas')
let animationFrameId: number

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

let particles: Particle[] = []

const init = () => {
  if (!canvas.value) return
  const ctx = canvas.value.getContext('2d')
  if (!ctx) return

  const parent = canvas.value.parentElement
  if (!parent) return

  canvas.value.width = parent.clientWidth
  canvas.value.height = parent.clientHeight

  particles = []
  for (let i = 0; i < props.particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.value.width,
      y: Math.random() * canvas.value.height,
      vx: (Math.random() - 0.5) * props.speed,
      vy: (Math.random() - 0.5) * props.speed,
      radius: Math.random() * 1.5 + 1,
    })
  }

  animate()
}

const animate = () => {
  if (!canvas.value) return
  const ctx = canvas.value.getContext('2d')
  if (!ctx) return

  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

  particles.forEach(p => {
    p.x += p.vx
    p.y += p.vy

    if (p.x < 0 || p.x > (canvas.value as HTMLCanvasElement).width) p.vx *= -1
    if (p.y < 0 || p.y > (canvas.value as HTMLCanvasElement).height) p.vy *= -1

    ctx.beginPath()
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
    ctx.fillStyle = props.particleColor
    ctx.fill()
  })

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

  animationFrameId = requestAnimationFrame(animate)
}

onMounted(() => {
  init()
  window.addEventListener('resize', init)
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId)
  window.removeEventListener('resize', init)
})

watch(() => [props.particleCount, props.speed], init)
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
