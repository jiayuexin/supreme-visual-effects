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

interface GlitchEffect {
  type: 'shake' | 'rgb' | 'noise' | 'scan' | 'distort'
  intensity: number
  duration: number
}

const props = defineProps({
  enabled: {
    type: Boolean,
    default: true,
  },
  autoTrigger: {
    type: Boolean,
    default: false,
  },
  triggerInterval: {
    type: Number,
    default: 3000,
  },
  intensity: {
    type: Number,
    default: 0.5,
  },
  duration: {
    type: Number,
    default: 200,
  },
  effects: {
    type: Array as () => GlitchEffect[],
    default: () => [
      { type: 'shake', intensity: 0.8, duration: 100 },
      { type: 'rgb', intensity: 0.6, duration: 150 },
      { type: 'noise', intensity: 0.4, duration: 200 },
    ],
  },
  shakeIntensity: {
    type: Number,
    default: 10,
  },
  rgbIntensity: {
    type: Number,
    default: 5,
  },
  noiseIntensity: {
    type: Number,
    default: 0.1,
  },
  scanIntensity: {
    type: Number,
    default: 2,
  },
  distortIntensity: {
    type: Number,
    default: 0.05,
  },
  color: {
    type: String,
    default: '#ff0000',
  },
  backgroundColor: {
    type: String,
    default: '#000000',
  },
})

const emit = defineEmits<{
  'glitch-start': []
  'glitch-end': []
  'glitch-trigger': []
}>()

const container = ref<HTMLElement | null>(null)
const isGlitching = ref(false)
const isHovered = ref(false)
let glitchTimer: number | null = null
let autoTimer: number | null = null
const currentEffect = ref<GlitchEffect | null>(null)

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
        transform: `translate(${getRandomOffset()}px, ${getRandomOffset()}px)`,
        filter: `hue-rotate(${getRandomHue()}deg)`,
      }
    case 'rgb':
      return {
        ...baseStyle,
        filter: `sepia(1) hue-rotate(${getRandomHue()}deg) saturate(2)`,
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
        transform: `skew(${getRandomSkew()}deg, ${getRandomSkew()}deg)`,
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
  transform: `translateX(${getRandomOffset()}px)`,
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
  transform: `translateX(${getRandomOffset()}px)`,
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
  transform: `translateX(${getRandomOffset()}px)`,
  opacity: 0.8,
  zIndex: 4,
}))

const getRandomOffset = () => {
  return (Math.random() - 0.5) * props.shakeIntensity * 2
}

const getRandomHue = () => {
  return (Math.random() - 0.5) * 360
}

const getRandomSkew = () => {
  return (Math.random() - 0.5) * props.distortIntensity * 10
}

const triggerGlitch = () => {
  if (!props.enabled || isGlitching.value) return

  emit('glitch-trigger')
  startGlitch()
}

const startGlitch = () => {
  if (isGlitching.value) return

  isGlitching.value = true
  emit('glitch-start')

  // 随机选择一个效果
  const randomEffect = props.effects[Math.floor(Math.random() * props.effects.length)]
  currentEffect.value = randomEffect

  // 设置持续时间
  const duration = randomEffect.duration * props.intensity

  glitchTimer = window.setTimeout(() => {
    stopGlitch()
  }, duration)
}

const stopGlitch = () => {
  isGlitching.value = false
  currentEffect.value = null

  if (glitchTimer) {
    clearTimeout(glitchTimer)
    glitchTimer = null
  }

  emit('glitch-end')
}

const handleMouseEnter = () => {
  isHovered.value = true
  if (props.enabled && !isGlitching.value) {
    triggerGlitch()
  }
}

const handleMouseLeave = () => {
  isHovered.value = false
}

const startAutoTrigger = () => {
  if (!props.autoTrigger || !props.enabled) return

  const trigger = () => {
    if (props.enabled && !isGlitching.value) {
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
  if (props.autoTrigger) {
    startAutoTrigger()
  }
})

onUnmounted(() => {
  stopGlitch()
  stopAutoTrigger()
})

watch(
  () => [props.enabled, props.autoTrigger],
  () => {
    if (props.enabled && props.autoTrigger) {
      startAutoTrigger()
    } else {
      stopAutoTrigger()
    }
  }
)
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
