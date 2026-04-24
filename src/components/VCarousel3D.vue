<template>
  <div
    ref="container"
    class="carousel-3d-container"
    :style="containerStyle"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <div class="carousel-3d-wrapper" :style="wrapperStyle">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="carousel-3d-item"
        :class="{ active: index === currentIndex }"
        :style="getItemStyle(index)"
      >
        <slot :name="`item-${index}`" :item="item" :index="index">
          <div class="carousel-item-content">
            <img v-if="item.image" :src="item.image" :alt="item.title || `Item ${index + 1}`" class="carousel-image" />
            <div v-if="item.title || item.description" class="carousel-text">
              <h3 v-if="item.title" class="carousel-title">{{ item.title }}</h3>
              <p v-if="item.description" class="carousel-description">{{ item.description }}</p>
            </div>
          </div>
        </slot>
      </div>
    </div>

    <!-- Navigation arrows -->
    <button
      v-if="showArrows"
      class="carousel-arrow carousel-arrow-prev"
      :disabled="!canGoPrev"
      aria-label="Previous item"
      @click="goToPrev"
    >
      ‹
    </button>
    <button
      v-if="showArrows"
      class="carousel-arrow carousel-arrow-next"
      :disabled="!canGoNext"
      aria-label="Next item"
      @click="goToNext"
    >
      ›
    </button>

    <!-- Indicators -->
    <div v-if="showIndicators" class="carousel-indicators">
      <button
        v-for="(item, index) in items"
        :key="index"
        class="carousel-indicator"
        :class="{ active: index === currentIndex }"
        :aria-label="`Go to item ${index + 1}`"
        @click="goToIndex(index)"
      >
        <span class="indicator-dot"></span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useReducedMotion } from '../composables/useReducedMotion'

interface CarouselItem {
  id?: string | number
  title?: string
  description?: string
  image?: string
  [key: string]: unknown
}

interface Props {
  items: CarouselItem[]
  currentIndex?: number
  autoPlay?: boolean
  autoPlayInterval?: number
  showArrows?: boolean
  showIndicators?: boolean
  perspective?: number
  itemSpacing?: number
  rotationY?: number
  scale?: number
  transitionDuration?: number
  loop?: boolean
  touchSensitivity?: number
  respectReducedMotion?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  currentIndex: 0,
  autoPlay: false,
  autoPlayInterval: 3000,
  showArrows: true,
  showIndicators: true,
  perspective: 1000,
  itemSpacing: 200,
  rotationY: 45,
  scale: 0.8,
  transitionDuration: 500,
  loop: true,
  touchSensitivity: 50,
  respectReducedMotion: true,
})

const { prefersReducedMotion } = useReducedMotion()

// Check if 3D effects should be simplified
const shouldSimplify = computed(() => {
  return props.respectReducedMotion && prefersReducedMotion.value
})

const emit = defineEmits<{
  (e: 'update:currentIndex', index: number): void
  (e: 'item-change', index: number, item: CarouselItem): void
  (e: 'item-click', index: number, item: CarouselItem): void
}>()

const container = ref<HTMLElement | null>(null)
const currentIndex = ref(props.currentIndex)
const isHovered = ref(false)
const isTransitioning = ref(false)
const isMounted = ref(true)
const touchStartX = ref(0)
const touchStartTime = ref(0)
let autoPlayTimer: number | null = null

const containerStyle = computed(() => ({
  perspective: `${props.perspective}px`,
  transformStyle: 'preserve-3d',
  position: 'relative',
  overflow: 'hidden',
}))

const wrapperStyle = computed(() => ({
  transformStyle: 'preserve-3d',
  transition:
    isTransitioning.value && !shouldSimplify.value
      ? `transform ${props.transitionDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`
      : 'none',
}))

const canGoPrev = computed(() => {
  return props.loop || currentIndex.value! > 0
})

const canGoNext = computed(() => {
  return props.loop || currentIndex.value! < props.items.length - 1
})

const getItemStyle = (index: number) => {
  const isActive = index === currentIndex.value

  // Simplified style for reduced motion - no 3D transforms
  if (shouldSimplify.value) {
    return {
      transform: 'none',
      opacity: isActive ? 1 : 0,
      zIndex: isActive ? 10 : 1,
      position: 'absolute' as const,
      top: '50%',
      left: '50%',
      marginLeft: '-150px',
      marginTop: '-100px',
    }
  }

  const totalItems = props.items.length
  const angle = (360 / totalItems) * index
  const radius = props.itemSpacing!

  const x = Math.sin((angle * Math.PI) / 180) * radius!
  const z = Math.cos((angle * Math.PI) / 180) * radius!

  const scale = isActive ? 1 : props.scale
  const opacity = isActive ? 1 : 0.6

  return {
    transform: `translateX(${x}px) translateZ(${z}px) rotateY(${angle}deg) scale(${scale})`,
    opacity,
    zIndex: isActive ? 10 : 1,
  }
}

const goToIndex = (index: number) => {
  if (index === currentIndex.value || isTransitioning.value) return

  isTransitioning.value = true
  currentIndex.value = index

  emit('update:currentIndex', index)
  emit('item-change', index, props.items[index])

  setTimeout(() => {
    if (!isMounted.value) return
    isTransitioning.value = false
  }, props.transitionDuration)
}

const goToNext = () => {
  if (!canGoNext.value) return

  const nextIndex = currentIndex.value! === props.items.length - 1 ? 0 : currentIndex.value! + 1
  goToIndex(nextIndex)
}

const goToPrev = () => {
  if (!canGoPrev.value) return

  const prevIndex = currentIndex.value! === 0 ? props.items.length - 1 : currentIndex.value! - 1
  goToIndex(prevIndex)
}

const startAutoPlay = () => {
  // Disable autoplay when reduced motion is preferred
  if (!props.autoPlay || isHovered.value || shouldSimplify.value) return

  autoPlayTimer = window.setInterval(() => {
    goToNext()
  }, props.autoPlayInterval)
}

const stopAutoPlay = () => {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer)
    autoPlayTimer = null
  }
}

const handleMouseEnter = () => {
  isHovered.value = true
  stopAutoPlay()
}

const handleMouseLeave = () => {
  isHovered.value = false
  if (props.autoPlay) {
    startAutoPlay()
  }
}

const handleTouchStart = (e: TouchEvent) => {
  touchStartX.value = e.touches[0].clientX
  touchStartTime.value = Date.now()
  stopAutoPlay()
}

const handleTouchMove = (e: TouchEvent) => {
  e.preventDefault()
}

const handleTouchEnd = (e: TouchEvent) => {
  const touchEndX = e.changedTouches[0].clientX
  const touchEndTime = Date.now()

  const deltaX = touchEndX - touchStartX.value
  const deltaTime = touchEndTime - touchStartTime.value

  if (Math.abs(deltaX) > props.touchSensitivity! && deltaTime < 500) {
    if (deltaX > 0) {
      goToPrev()
    } else {
      goToNext()
    }
  }

  if (props.autoPlay) {
    startAutoPlay()
  }
}

onMounted(() => {
  isMounted.value = true
  if (props.autoPlay) {
    startAutoPlay()
  }
})

onUnmounted(() => {
  isMounted.value = false
  stopAutoPlay()
})

watch(
  () => props.autoPlay,
  (newVal: boolean) => {
    if (newVal && !isHovered.value) {
      startAutoPlay()
    } else {
      stopAutoPlay()
    }
  }
)

watch(
  () => props.currentIndex,
  (newVal: number) => {
    if (newVal !== currentIndex.value) {
      goToIndex(newVal)
    }
  }
)

// 暴露方法给父组件
defineExpose({
  goToNext,
  goToPrev,
  goToIndex,
  startAutoPlay,
  stopAutoPlay,
})
</script>

<style scoped>
.carousel-3d-container {
  position: relative;
  width: 100%;
  height: 400px;
  perspective: 1000px;
  transform-style: preserve-3d;
}

.carousel-3d-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
}

.carousel-3d-item {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300px;
  height: 200px;
  margin-left: -150px;
  margin-top: -100px;
  transform-style: preserve-3d;
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  cursor: pointer;
}

.carousel-item-content {
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  padding: 1rem;
  box-sizing: border-box;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.carousel-text {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  padding: 1rem;
  color: white;
}

.carousel-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.carousel-description {
  font-size: 0.9rem;
  opacity: 0.9;
}

.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-arrow:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-50%) scale(1.1);
}

.carousel-arrow:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.carousel-arrow-prev {
  left: 20px;
}

.carousel-arrow-next {
  right: 20px;
}

.carousel-indicators {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;
}

.carousel-indicator {
  width: 12px;
  height: 12px;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-indicator.active {
  background: rgba(255, 255, 255, 0.8);
  border-color: rgba(255, 255, 255, 0.8);
}

.indicator-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: currentColor;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.carousel-indicator.active .indicator-dot {
  opacity: 1;
}
</style>
