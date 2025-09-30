<template>
  <div
    class="neon-text-container"
    :style="containerStyle"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div class="neon-text" :class="neonClasses" :style="neonStyle">
      {{ text }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

interface NeonTextProps {
  text: string
  color: string
  glowColor: string
  glowIntensity: number
  glowSpread: number
  animation: boolean
  animationType: 'flicker' | 'pulse' | 'wave' | 'none'
  animationSpeed: number
  fontSize: string
  fontFamily: string
  fontWeight: string
  hoverEffect: boolean
  hoverGlowIntensity: number
}

const props = withDefaults(defineProps<NeonTextProps>(), {
  color: '#00ffff',
  glowColor: '#00ffff',
  glowIntensity: 20,
  glowSpread: 5,
  animation: true,
  animationType: 'flicker',
  animationSpeed: 1,
  fontSize: '2rem',
  fontFamily: 'Arial, sans-serif',
  fontWeight: 'bold',
  hoverEffect: true,
  hoverGlowIntensity: 40,
})

const emit = defineEmits<{
  (e: 'mouse-enter'): void
  (e: 'mouse-leave'): void
}>()

const isHovered = ref(false)
const animationId = ref<number | null>(null)
const time = ref(0)

const neonClasses = computed(() => ({
  'neon-flicker': props.animation && props.animationType === 'flicker',
  'neon-pulse': props.animation && props.animationType === 'pulse',
  'neon-wave': props.animation && props.animationType === 'wave',
  'neon-hover': isHovered.value && props.hoverEffect,
}))

const containerStyle = computed(() => ({
  display: 'inline-block',
  cursor: props.hoverEffect ? 'pointer' : 'default',
}))

const neonStyle = computed(() => {
  const baseGlowIntensity = isHovered.value && props.hoverEffect ? props.hoverGlowIntensity : props.glowIntensity

  const animatedIntensity = props.animation ? getAnimatedIntensity(baseGlowIntensity) : baseGlowIntensity

  return {
    fontSize: props.fontSize,
    fontFamily: props.fontFamily,
    fontWeight: props.fontWeight,
    color: props.color,
    textShadow: generateTextShadow(animatedIntensity),
    filter: generateFilter(animatedIntensity),
  }
})

const getAnimatedIntensity = (baseIntensity: number) => {
  if (!props.animation) return baseIntensity

  switch (props.animationType) {
    case 'flicker': {
      const flicker = Math.random() > 0.5 ? 1 : 0.3
      return baseIntensity * flicker
    }
    case 'pulse': {
      const pulse = 0.5 + 0.5 * Math.sin(time.value * props.animationSpeed * 2)
      return baseIntensity * pulse
    }
    case 'wave': {
      const wave = 0.5 + 0.5 * Math.sin(time.value * props.animationSpeed)
      return baseIntensity * wave
    }
    default:
      return baseIntensity
  }
}

const generateTextShadow = (intensity: number) => {
  const shadows = []
  const steps = Math.floor(intensity / 2)

  for (let i = 1; i <= steps; i++) {
    const opacity = (intensity - i) / intensity
    const blur = i * props.glowSpread
    shadows.push(
      `0 0 ${blur}px ${props.glowColor}${Math.floor(opacity * 255)
        .toString(16)
        .padStart(2, '0')}`
    )
  }

  // 添加主要发光效果
  shadows.push(`0 0 ${intensity}px ${props.glowColor}`)
  shadows.push(`0 0 ${intensity * 2}px ${props.glowColor}`)

  return shadows.join(', ')
}

const generateFilter = (intensity: number) => {
  if (intensity < 10) return 'none'

  return `drop-shadow(0 0 ${intensity}px ${props.glowColor})`
}

const animate = () => {
  time.value += 0.016 * props.animationSpeed // 约60fps

  if (props.animationType === 'flicker') {
    // 闪烁效果需要更频繁的更新
    animationId.value = requestAnimationFrame(animate)
  } else {
    // 其他效果可以降低更新频率
    setTimeout(() => {
      animationId.value = requestAnimationFrame(animate)
    }, 16)
  }
}

const handleMouseEnter = () => {
  isHovered.value = true
  emit('mouse-enter')
}

const handleMouseLeave = () => {
  isHovered.value = false
  emit('mouse-leave')
}

const startAnimation = () => {
  if (animationId.value) {
    cancelAnimationFrame(animationId.value)
  }

  if (props.animation && props.animationType !== 'none') {
    animate()
  }
}

const stopAnimation = () => {
  if (animationId.value) {
    cancelAnimationFrame(animationId.value)
    animationId.value = null
  }
}

onMounted(() => {
  if (props.animation) {
    startAnimation()
  }
})

onUnmounted(() => {
  stopAnimation()
})

watch(
  () => [props.animation, props.animationType, props.animationSpeed],
  () => {
    if (props.animation && props.animationType !== 'none') {
      startAnimation()
    } else {
      stopAnimation()
    }
  }
)
</script>

<style scoped>
.neon-text-container {
  display: inline-block;
  position: relative;
}

.neon-text {
  display: inline-block;
  text-align: center;
  transition: all 0.3s ease;
  user-select: none;
}

.neon-flicker {
  animation: flicker 0.1s infinite alternate;
}

.neon-pulse {
  animation: pulse 2s ease-in-out infinite;
}

.neon-wave {
  animation: wave 3s ease-in-out infinite;
}

.neon-hover {
  transform: scale(1.05);
}

@keyframes flicker {
  0%,
  100% {
    opacity: 1;
    filter: brightness(1);
  }
  50% {
    opacity: 0.8;
    filter: brightness(1.2);
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    filter: brightness(1);
  }
  50% {
    transform: scale(1.02);
    filter: brightness(1.1);
  }
}

@keyframes wave {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-2px);
  }
}
</style>
