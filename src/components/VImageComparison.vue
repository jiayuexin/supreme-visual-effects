<template>
  <div
    ref="container"
    class="image-comparison-container"
    :style="containerStyle"
    @mousedown="handleMouseDown"
    @mousemove="handleMouseMove"
    @mouseup="handleMouseUp"
    @mouseleave="handleMouseUp"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
    @touchcancel="handleTouchEnd"
  >
    <!-- Before image -->
    <div class="image-before">
      <img
        :src="beforeImage"
        :alt="beforeAlt"
        class="comparison-image"
        :style="beforeImageStyle"
        loading="lazy"
        @load="beforeLoaded = true"
        @error="beforeError = true"
      />
      <div v-if="!beforeLoaded" class="image-loading">Loading...</div>
      <div v-if="beforeError" class="image-error">Failed to load</div>
      <div v-if="beforeLabel" class="image-label image-label-before">
        {{ beforeLabel }}
      </div>
    </div>

    <!-- After image -->
    <div class="image-after">
      <img
        :src="afterImage"
        :alt="afterAlt"
        class="comparison-image"
        :style="afterImageStyle"
        loading="lazy"
        @load="afterLoaded = true"
        @error="afterError = true"
      />
      <div v-if="!afterLoaded" class="image-loading">Loading...</div>
      <div v-if="afterError" class="image-error">Failed to load</div>
      <div v-if="afterLabel" class="image-label image-label-after">
        {{ afterLabel }}
      </div>
    </div>

    <!-- Slider line -->
    <div class="slider-line" :style="sliderLineStyle">
      <div class="slider-handle">
        <div class="slider-handle-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.5 12l3.5 3.5 3.5-3.5-3.5-3.5L8.5 12z" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Slider area for interaction -->
    <div
      class="slider-area"
      :style="sliderAreaStyle"
      @mousedown="handleSliderMouseDown"
      @touchstart="handleSliderTouchStart"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface ImageComparisonProps {
  beforeImage: string
  afterImage: string
  beforeAlt?: string
  afterAlt?: string
  beforeLabel?: string
  afterLabel?: string
  initialPosition?: number
  sliderColor?: string
  sliderSize?: number
  handleSize?: number
  showLabels?: boolean
  keyboardControl?: boolean
  animationDuration?: number
}

const props = withDefaults(defineProps<ImageComparisonProps>(), {
  beforeAlt: 'Before image',
  afterAlt: 'After image',
  beforeLabel: 'Before',
  afterLabel: 'After',
  initialPosition: 50,
  sliderColor: '#ffffff',
  sliderSize: 4,
  handleSize: 40,
  showLabels: true,
  keyboardControl: true,
  animationDuration: 300,
})

const emit = defineEmits<{
  (e: 'position-change', position: number): void
  (e: 'slider-start'): void
  (e: 'slider-end'): void
}>()

const container = ref<HTMLElement | null>(null)
const position = ref(props.initialPosition)
const isDragging = ref(false)
const startX = ref(0)
const startPosition = ref(0)
const beforeLoaded = ref(false)
const beforeError = ref(false)
const afterLoaded = ref(false)
const afterError = ref(false)

const containerStyle = computed(() => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  cursor: isDragging.value ? 'grabbing' : 'grab',
}))

const beforeImageStyle = computed(() => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
}))

const afterImageStyle = computed(() => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
  clipPath: `inset(0 ${100 - position.value}% 0 0)`,
}))

const sliderLineStyle = computed(() => ({
  position: 'absolute',
  top: 0,
  left: `${position.value}%`,
  width: `${props.sliderSize}px`,
  height: '100%',
  backgroundColor: props.sliderColor,
  transform: 'translateX(-50%)',
  zIndex: 2,
  transition: isDragging.value ? 'none' : `left ${props.animationDuration}ms ease`,
}))

const sliderAreaStyle = computed(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 3,
  cursor: isDragging.value ? 'grabbing' : 'grab',
}))

const updatePosition = (clientX: number) => {
  if (!container.value) return

  const rect = container.value.getBoundingClientRect()
  const x = clientX - rect.left
  const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))

  position.value = percentage
  emit('position-change', percentage)
}

const handleMouseDown = (e: MouseEvent) => {
  e.preventDefault()
  isDragging.value = true
  startX.value = e.clientX
  startPosition.value = position.value
  emit('slider-start')

  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

const handleMouseMove = (e: MouseEvent) => {
  if (!isDragging.value) return

  e.preventDefault()
  updatePosition(e.clientX)
}

const handleMouseUp = () => {
  if (!isDragging.value) return

  isDragging.value = false
  emit('slider-end')

  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
}

const handleTouchStart = (e: TouchEvent) => {
  e.preventDefault()
  isDragging.value = true
  startX.value = e.touches[0].clientX
  startPosition.value = position.value
  emit('slider-start')
}

const handleTouchMove = (e: TouchEvent) => {
  if (!isDragging.value) return

  e.preventDefault()
  updatePosition(e.touches[0].clientX)
}

const handleTouchEnd = () => {
  if (!isDragging.value) return

  isDragging.value = false
  emit('slider-end')
}

const handleSliderMouseDown = (e: MouseEvent) => {
  e.stopPropagation()
  handleMouseDown(e)
}

const handleSliderTouchStart = (e: TouchEvent) => {
  e.stopPropagation()
  handleTouchStart(e)
}

const handleKeydown = (e: KeyboardEvent) => {
  if (!props.keyboardControl) return

  const step = 5
  let newPosition = position.value

  switch (e.key) {
    case 'ArrowLeft':
      e.preventDefault()
      newPosition = Math.max(0, position.value - step)
      break
    case 'ArrowRight':
      e.preventDefault()
      newPosition = Math.min(100, position.value + step)
      break
    case 'Home':
      e.preventDefault()
      newPosition = 0
      break
    case 'End':
      e.preventDefault()
      newPosition = 100
      break
    default:
      return
  }

  position.value = newPosition
  emit('position-change', newPosition)
}

const reset = () => {
  position.value = props.initialPosition
  emit('position-change', props.initialPosition)
}

// 暴露方法给父组件
defineExpose({
  reset,
  setPosition: (newPosition: number) => {
    position.value = Math.max(0, Math.min(100, newPosition))
    emit('position-change', position.value)
  },
})

onMounted(() => {
  if (props.keyboardControl) {
    document.addEventListener('keydown', handleKeydown)
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
  document.removeEventListener('touchmove', handleTouchMove)
  document.removeEventListener('touchend', handleTouchEnd)
})
</script>

<style scoped>
.image-comparison-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.image-before,
.image-after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.image-after {
  clip-path: inset(0 50% 0 0);
}

.comparison-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.image-loading,
.image-error {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #999;
  font-size: 0.9rem;
  z-index: 1;
}

.slider-line {
  position: absolute;
  top: 0;
  left: 50%;
  width: 4px;
  height: 100%;
  background: #ffffff;
  transform: translateX(-50%);
  z-index: 2;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.slider-handle {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40px;
  height: 40px;
  background: #ffffff;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  cursor: grab;
  transition: transform 0.2s ease;
}

.slider-handle:hover {
  transform: translate(-50%, -50%) scale(1.1);
}

.slider-handle:active {
  cursor: grabbing;
  transform: translate(-50%, -50%) scale(0.95);
}

.slider-handle-icon {
  width: 24px;
  height: 24px;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slider-area {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  cursor: grab;
}

.slider-area:active {
  cursor: grabbing;
}

.image-label {
  position: absolute;
  top: 20px;
  padding: 8px 16px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  font-weight: bold;
  border-radius: 4px;
  z-index: 4;
}

.image-label-before {
  left: 20px;
}

.image-label-after {
  right: 20px;
}
</style>
