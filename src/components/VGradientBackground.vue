<template>
  <div ref="container" class="gradient-background" :style="gradientStyle">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

interface GradientStop {
  color: string
  position: number
}

interface GradientLayer {
  type: 'linear' | 'radial' | 'conic'
  direction?: string
  stops: GradientStop[]
  animation?: {
    type: 'flow' | 'breathe' | 'twinkle'
    duration: number
    intensity: number
  }
}

const props = defineProps({
  layers: {
    type: Array as () => GradientLayer[],
    default: () => [
      {
        type: 'linear',
        direction: '45deg',
        stops: [
          { color: '#667eea', position: 0 },
          { color: '#764ba2', position: 100 },
        ],
        animation: {
          type: 'flow',
          duration: 8,
          intensity: 0.3,
        },
      },
    ],
  },
  animation: {
    type: Boolean,
    default: true,
  },
  speed: {
    type: Number,
    default: 1,
  },
})

const container = ref<HTMLElement | null>(null)
const animationId = ref<number | null>(null)
const time = ref(0)

const gradientStyle = computed(() => {
  if (!props.animation) {
    return generateStaticGradient()
  }

  return generateAnimatedGradient()
})

const generateStaticGradient = () => {
  const gradients = props.layers.map(layer => {
    const stops = layer.stops.map(stop => `${stop.color} ${stop.position}%`).join(', ')

    let gradient = ''

    switch (layer.type) {
      case 'linear':
        gradient = `linear-gradient(${layer.direction || '45deg'}, ${stops})`
        break
      case 'radial':
        gradient = `radial-gradient(circle, ${stops})`
        break
      case 'conic':
        gradient = `conic-gradient(${stops})`
        break
    }

    return gradient
  })

  return {
    background: gradients.join(', '),
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
}

const generateAnimatedGradient = () => {
  const gradients = props.layers.map(layer => {
    const stops = layer.stops
      .map(stop => {
        let color = stop.color

        if (layer.animation) {
          const t = time.value * props.speed
          // keep local intensity if needed in future adjustments
          // const _intensity = layer.animation.intensity || 0.3

          switch (layer.animation.type) {
            case 'flow': {
              const hue = (parseInt(stop.color.slice(1, 3), 16) + t * 10) % 360
              color = `hsl(${hue}, 70%, 60%)`
              break
            }
            case 'breathe': {
              const alpha = 0.5 + 0.5 * Math.sin(t * 2)
              color = stop.color.replace(/rgba?\(([^)]+)\)/, `rgba($1, ${alpha})`)
              break
            }
            case 'twinkle': {
              const brightness = 0.8 + 0.4 * Math.sin(t * 3)
              color = adjustBrightness(stop.color, brightness)
              break
            }
          }
        }

        return `${color} ${stop.position}%`
      })
      .join(', ')

    let gradient = ''

    switch (layer.type) {
      case 'linear': {
        const angle = layer.direction ? parseFloat(layer.direction) + time.value * 10 : 45 + time.value * 10
        gradient = `linear-gradient(${angle}deg, ${stops})`
        break
      }
      case 'radial': {
        const size = 100 + 20 * Math.sin(time.value)
        gradient = `radial-gradient(circle ${size}%, ${stops})`
        break
      }
      case 'conic': {
        const rotation = time.value * 30
        gradient = `conic-gradient(from ${rotation}deg, ${stops})`
        break
      }
    }

    return gradient
  })

  return {
    background: gradients.join(', '),
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
}

const adjustBrightness = (color: string, factor: number): string => {
  // 简单的亮度调整实现
  if (color.startsWith('#')) {
    const hex = color.slice(1)
    const r = Math.min(255, Math.max(0, parseInt(hex.slice(0, 2), 16) * factor))
    const g = Math.min(255, Math.max(0, parseInt(hex.slice(2, 4), 16) * factor))
    const b = Math.min(255, Math.max(0, parseInt(hex.slice(4, 6), 16) * factor))
    return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`
  }
  return color
}

const animate = () => {
  time.value += 0.016 // 约60fps
  animationId.value = requestAnimationFrame(animate)
}

onMounted(() => {
  if (props.animation) {
    animate()
  }
})

onUnmounted(() => {
  if (animationId.value) {
    cancelAnimationFrame(animationId.value)
  }
})

watch(
  () => props.animation,
  newVal => {
    if (newVal && !animationId.value) {
      animate()
    } else if (!newVal && animationId.value) {
      cancelAnimationFrame(animationId.value)
      animationId.value = null
    }
  }
)
</script>

<style scoped>
.gradient-background {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 200px;
  overflow: hidden;
}
</style>
