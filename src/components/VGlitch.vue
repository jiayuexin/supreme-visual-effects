<template>
  <div
    ref="container"
    class="glitch-container"
    :style="containerStyle"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="triggerGlitch"
  >
    <div class="glitch-content" :class="glitchClasses" :style="contentStyle">
      <slot></slot>
    </div>

    <!-- Glitch layers for RGB separation effect -->
    <div v-if="showGlitchLayers" class="glitch-layer glitch-red" :style="redLayerStyle">
      <slot></slot>
    </div>
    <div v-if="showGlitchLayers" class="glitch-layer glitch-green" :style="greenLayerStyle">
      <slot></slot>
    </div>
    <div v-if="showGlitchLayers" class="glitch-layer glitch-blue" :style="blueLayerStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useReducedMotion } from '../composables/useReducedMotion'

interface GlitchEffect {
  type: 'shake' | 'rgb' | 'noise' | 'scan' | 'distort'
  intensity: number
  duration: number
}

interface GlitchProps {
  enabled?: boolean
  autoTrigger?: boolean
  triggerInterval?: number
  intensity?: number
  duration?: number
  effects?: GlitchEffect[]
  shakeIntensity?: number
  rgbIntensity?: number
  noiseIntensity?: number
  scanIntensity?: number
  distortIntensity?: number
  color?: string
  backgroundColor?: string
  respectReducedMotion?: boolean
}

const props = withDefaults(defineProps<GlitchProps>(), {
  enabled: true,
  autoTrigger: false,
  triggerInterval: 3000,
  intensity: 0.5,
  duration: 200,
  effects: () => [
    { type: 'shake', intensity: 0.8, duration: 100 },
    { type: 'rgb', intensity: 0.6, duration: 150 },
    { type: 'noise', intensity: 0.4, duration: 200 },
  ],
  shakeIntensity: 10,
  rgbIntensity: 5,
  noiseIntensity: 0.1,
  scanIntensity: 2,
  distortIntensity: 0.05,
  color: '#ff0000',
  backgroundColor: '#000000',
  respectReducedMotion: true,
})

const { prefersReducedMotion } = useReducedMotion()

// Check if glitch effects should be completely disabled
const shouldDisableGlitch = computed(() => {
  return props.respectReducedMotion && prefersReducedMotion.value
})

const emit = defineEmits<{
  (e: 'glitch-start'): void
  (e: 'glitch-end'): void
  (e: 'glitch-trigger'): void
}>()

const container = ref<HTMLElement | null>(null)
const isGlitching = ref(false)
const isHovered = ref(false)
const isMounted = ref(true)
let glitchTimer: ReturnType<typeof setTimeout> | null = null
let autoTimer: ReturnType<typeof setTimeout> | null = null
let animationFrameId: number | null = null
const currentEffect = ref<GlitchEffect | null>(null)

// Random values updated by animation loop to avoid Math.random() in computed
const randomOffsetX = ref(0)
const randomOffsetY = ref(0)
const randomHue = ref(0)
const randomSkewX = ref(0)
const randomSkewY = ref(0)

const glitchClasses = computed(() => ({
  'glitch-active': isGlitching.value,
  'glitch-shake': currentEffect.value?.type === 'shake',
  'glitch-rgb': currentEffect.value?.type === 'rgb',
  'glitch-noise': currentEffect.value?.type === 'noise',
  'glitch-scan': currentEffect.value?.type === 'scan',
  'glitch-distort': currentEffect.value?.type === 'distort',
}))

const containerStyle = computed(() => ({
  position: 'relative',
  display: 'inline-block',
  overflow: 'hidden',
}))

const contentStyle = computed(() => {
  const baseStyle = {
    position: 'relative',
    zIndex: 1,
    transition: isGlitching.value ? 'none' : 'all 0.3s ease',
  }

  if (!isGlitching.value || !currentEffect.value) {
    return baseStyle
  }

  const effect = currentEffect.value

  switch (effect.type) {
    case 'shake':
      return {
        ...baseStyle,
        transform: `translate(${randomOffsetX.value}px, ${randomOffsetY.value}px)`,
        filter: `hue-rotate(${randomHue.value}deg)`,
      }
    case 'rgb':
      return {
        ...baseStyle,
        filter: `sepia(1) hue-rotate(${randomHue.value}deg) saturate(2)`,
      }
    case 'noise':
      return {
        ...baseStyle,
        filter: `contrast(${1 + effect.intensity}) brightness(${1 + effect.intensity * 0.5})`,
      }
    case 'scan':
      return {
        ...baseStyle,
        filter: `blur(${effect.intensity}px)`,
      }
    case 'distort':
      return {
        ...baseStyle,
        transform: `skew(${randomSkewX.value}deg, ${randomSkewY.value}deg)`,
      }
    default:
      return baseStyle
  }
})

const showGlitchLayers = computed(() => {
  return isGlitching.value && currentEffect.value?.type === 'rgb'
})

const redLayerStyle = computed(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  color: '#ff0000',
  mixBlendMode: 'screen',
  transform: `translateX(${randomOffsetX.value}px)`,
  opacity: 0.8,
  zIndex: 2,
}))

const greenLayerStyle = computed(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  color: '#00ff00',
  mixBlendMode: 'screen',
  transform: `translateX(${randomOffsetX.value}px)`,
  opacity: 0.8,
  zIndex: 3,
}))

const blueLayerStyle = computed(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  color: '#0000ff',
  mixBlendMode: 'screen',
  transform: `translateX(${randomOffsetX.value}px)`,
  opacity: 0.8,
  zIndex: 4,
}))

const updateRandomValues = () => {
  if (!isGlitching.value) return
  randomOffsetX.value = (Math.random() - 0.5) * props.shakeIntensity * 2
  randomOffsetY.value = (Math.random() - 0.5) * props.shakeIntensity * 2
  randomHue.value = (Math.random() - 0.5) * 360
  randomSkewX.value = (Math.random() - 0.5) * props.distortIntensity * 10
  randomSkewY.value = (Math.random() - 0.5) * props.distortIntensity * 10
  animationFrameId = requestAnimationFrame(updateRandomValues)
}

const startGlitchAnimation = () => {
  stopGlitchAnimation()
  animationFrameId = requestAnimationFrame(updateRandomValues)
}

const stopGlitchAnimation = () => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
}

const triggerGlitch = () => {
  if (!props.enabled || isGlitching.value || shouldDisableGlitch.value) return

  emit('glitch-trigger')
  startGlitch()
}

const startGlitch = () => {
  if (isGlitching.value) return

  isGlitching.value = true
  emit('glitch-start')
  startGlitchAnimation()

  // 随机选择一个效果
  const randomEffect = props.effects[Math.floor(Math.random() * props.effects.length)]
  currentEffect.value = randomEffect

  // 设置持续时间
  const duration = randomEffect.duration * props.intensity

  glitchTimer = window.setTimeout(() => {
    if (!isMounted.value) return
    stopGlitch()
  }, duration)
}

const stopGlitch = () => {
  isGlitching.value = false
  currentEffect.value = null
  stopGlitchAnimation()

  if (glitchTimer) {
    clearTimeout(glitchTimer)
    glitchTimer = null
  }

  emit('glitch-end')
}

const handleMouseEnter = () => {
  isHovered.value = true
  if (props.enabled && !isGlitching.value && !shouldDisableGlitch.value) {
    triggerGlitch()
  }
}

const handleMouseLeave = () => {
  isHovered.value = false
}

const startAutoTrigger = () => {
  if (!props.autoTrigger || !props.enabled || shouldDisableGlitch.value) return

  const trigger = () => {
    if (props.enabled && !isGlitching.value && !shouldDisableGlitch.value) {
      triggerGlitch()
    }

    autoTimer = window.setTimeout(trigger, props.triggerInterval)
  }

  trigger()
}

const stopAutoTrigger = () => {
  if (autoTimer) {
    clearTimeout(autoTimer)
    autoTimer = null
  }
}

onMounted(() => {
  isMounted.value = true
  if (props.autoTrigger) {
    startAutoTrigger()
  }
})

onUnmounted(() => {
  isMounted.value = false
  stopGlitch()
  stopGlitchAnimation()
  stopAutoTrigger()
})

watch(
  () => [props.enabled, props.autoTrigger],
  () => {
    if (props.enabled && props.autoTrigger && !shouldDisableGlitch.value) {
      startAutoTrigger()
    } else {
      stopAutoTrigger()
    }
  }
)

// Stop glitch when reduced motion preference changes
watch(shouldDisableGlitch, disabled => {
  if (disabled) {
    stopGlitch()
    stopGlitchAnimation()
    stopAutoTrigger()
  } else if (props.autoTrigger && props.enabled) {
    startAutoTrigger()
  }
})
</script>

<style scoped>
.glitch-container {
  position: relative;
  display: inline-block;
  overflow: hidden;
}

.glitch-content {
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
}

.glitch-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  mix-blend-mode: screen;
}

.glitch-red {
  color: #ff0000;
  z-index: 2;
}

.glitch-green {
  color: #00ff00;
  z-index: 3;
}

.glitch-blue {
  color: #0000ff;
  z-index: 4;
}

.glitch-shake {
  animation: shake 0.1s infinite;
}

.glitch-rgb {
  animation: rgbShift 0.2s infinite;
}

.glitch-noise {
  animation: noise 0.3s infinite;
}

.glitch-scan {
  animation: scan 0.4s infinite;
}

.glitch-distort {
  animation: distort 0.5s infinite;
}

@keyframes shake {
  0%,
  100% {
    transform: translate(0);
  }
  25% {
    transform: translate(-2px, 2px);
  }
  50% {
    transform: translate(2px, -2px);
  }
  75% {
    transform: translate(-2px, -2px);
  }
}

@keyframes rgbShift {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-2px);
  }
  50% {
    transform: translateX(2px);
  }
  75% {
    transform: translateX(-1px);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes noise {
  0%,
  100% {
    filter: contrast(1) brightness(1);
  }
  50% {
    filter: contrast(1.2) brightness(1.1);
  }
}

@keyframes scan {
  0% {
    filter: blur(0);
  }
  50% {
    filter: blur(1px);
  }
  100% {
    filter: blur(0);
  }
}

@keyframes distort {
  0%,
  100% {
    transform: skew(0deg, 0deg);
  }
  25% {
    transform: skew(1deg, 0deg);
  }
  50% {
    transform: skew(0deg, 1deg);
  }
  75% {
    transform: skew(-1deg, 0deg);
  }
}
</style>
