<template>
  <div ref="container" class="parallax-container" :style="containerStyle">
    <div v-for="(layer, index) in layers" :key="index" class="parallax-layer" :style="getLayerStyle(layer, index)">
      <slot :name="`layer-${index}`" :layer="layer" :index="index">
        <!-- Content must be provided via named slot -->
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { isBrowser } from '../composables/useBrowser'

interface ParallaxLayer {
  speed: number
  direction: 'up' | 'down' | 'left' | 'right'
  offset?: number
  style?: Record<string, string | number>
}

interface ParallaxProps {
  layers?: ParallaxLayer[]
  enabled?: boolean
  throttle?: number
  offset?: number
}

const props = withDefaults(defineProps<ParallaxProps>(), {
  layers: () => [],
  enabled: true,
  throttle: 16,
  offset: 0,
})

const container = ref<HTMLElement | null>(null)
const scrollY = ref(0)
const containerTop = ref(0)
const containerHeight = ref(0)
const windowHeight = ref(0)
let throttleTimer: ReturnType<typeof setTimeout> | null = null

const containerStyle = computed(() => ({
  position: 'relative' as const,
  overflow: 'hidden' as const,
  height: '100vh' as const,
}))

const getLayerStyle = (layer: ParallaxLayer, _index: number) => {
  if (!props.enabled) {
    return {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      ...layer.style,
    }
  }

  const scrollProgress = getScrollProgress()
  const parallaxOffset = calculateParallaxOffset(layer, scrollProgress)

  return {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    transform: `translateY(${parallaxOffset}px)`,
    willChange: 'transform',
    ...layer.style,
  }
}

const getScrollProgress = () => {
  if (containerHeight.value === 0) return 0

  const scrolled = scrollY.value - containerTop.value + props.offset
  const progress = scrolled / (containerHeight.value + windowHeight.value)
  return Math.max(0, Math.min(1, progress))
}

const calculateParallaxOffset = (layer: ParallaxLayer, progress: number) => {
  const scrollDistance = containerHeight.value + windowHeight.value
  const parallaxDistance = scrollDistance * (1 - layer.speed)
  const offset = layer.offset || 0

  let direction = 1
  switch (layer.direction) {
    case 'up':
      direction = -1
      break
    case 'down':
      direction = 1
      break
    case 'left':
      direction = -1
      break
    case 'right':
      direction = 1
      break
  }

  return parallaxDistance * progress * direction + offset
}

const handleScroll = () => {
  if (!isBrowser || throttleTimer) return

  throttleTimer = window.setTimeout(() => {
    scrollY.value = window.pageYOffset || document.documentElement.scrollTop
    updateContainerInfo()
    throttleTimer = null
  }, props.throttle)
}

const updateContainerInfo = () => {
  if (!isBrowser || !container.value) return

  const rect = container.value.getBoundingClientRect()
  containerTop.value = rect.top + scrollY.value
  containerHeight.value = rect.height
  windowHeight.value = window.innerHeight
}

const handleResize = () => {
  if (isBrowser) {
    updateContainerInfo()
  }
}

onMounted(() => {
  if (!isBrowser || !props.enabled) return

  updateContainerInfo()
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (!isBrowser) return
  if (throttleTimer) {
    clearTimeout(throttleTimer)
  }

  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)
})

watch(
  () => props.enabled,
  (newVal: boolean) => {
    if (!isBrowser) return
    if (newVal) {
      updateContainerInfo()
      window.addEventListener('scroll', handleScroll, { passive: true })
      window.addEventListener('resize', handleResize)
    } else {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }
)
</script>

<style scoped>
.parallax-container {
  position: relative;
  overflow: hidden;
}

.parallax-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
