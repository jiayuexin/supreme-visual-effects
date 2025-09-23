<template>
  <div
    ref="container"
    class="hover-3d-container"
    :style="containerStyle"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mousemove="handleMouseMove"
  >
    <div class="hover-3d-content" :style="contentStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  intensity: {
    type: Number,
    default: 20,
  },
  perspective: {
    type: Number,
    default: 1000,
  },
  transition: {
    type: String,
    default: 'all 0.3s ease',
  },
  resetOnLeave: {
    type: Boolean,
    default: true,
  },
  axis: {
    type: String as () => 'x' | 'y' | 'both',
    default: 'both',
  },
  reverse: {
    type: Boolean,
    default: false,
  },
  scale: {
    type: Number,
    default: 1,
  },
  scaleOnHover: {
    type: Number,
    default: 1.05,
  },
})

const emit = defineEmits<{
  'mouse-enter': []
  'mouse-leave': []
  'mouse-move': [event: MouseEvent]
}>()

const container = ref<HTMLElement | null>(null)
const isHovered = ref(false)
const mouseX = ref(0)
const mouseY = ref(0)
const centerX = ref(0)
const centerY = ref(0)

const containerStyle = computed(() => ({
  perspective: `${props.perspective}px`,
  transformStyle: 'preserve-3d',
  display: 'inline-block',
  cursor: 'pointer',
}))

const contentStyle = computed(() => {
  if (!isHovered.value && props.resetOnLeave) {
    return {
      transform: `scale(${props.scale})`,
      transition: props.transition,
    }
  }

  const rotateX = isHovered.value ? calculateRotateX() : 0
  const rotateY = isHovered.value ? calculateRotateY() : 0
  const scale = isHovered.value ? props.scaleOnHover : props.scale

  let transform = `scale(${scale})`

  if (props.axis === 'x' || props.axis === 'both') {
    transform += ` rotateX(${rotateX}deg)`
  }

  if (props.axis === 'y' || props.axis === 'both') {
    transform += ` rotateY(${rotateY}deg)`
  }

  return {
    transform,
    transformStyle: 'preserve-3d',
    transition: isHovered.value ? props.transition : props.transition,
  }
})

const calculateRotateX = () => {
  if (!isHovered.value) return 0

  const deltaY = mouseY.value - centerY.value
  const rotateX = (deltaY / centerY.value) * props.intensity

  return props.reverse ? -rotateX : rotateX
}

const calculateRotateY = () => {
  if (!isHovered.value) return 0

  const deltaX = mouseX.value - centerX.value
  const rotateY = (deltaX / centerX.value) * props.intensity

  return props.reverse ? -rotateY : rotateY
}

const updateCenter = () => {
  if (!container.value) return

  const rect = container.value.getBoundingClientRect()
  centerX.value = rect.width / 2
  centerY.value = rect.height / 2
}

const handleMouseEnter = () => {
  isHovered.value = true
  emit('mouse-enter')
}

const handleMouseLeave = () => {
  isHovered.value = false
  emit('mouse-leave')
}

const handleMouseMove = (event: MouseEvent) => {
  if (!container.value) return

  const rect = container.value.getBoundingClientRect()
  mouseX.value = event.clientX - rect.left
  mouseY.value = event.clientY - rect.top

  emit('mouse-move', event)
}

onMounted(() => {
  updateCenter()
  window.addEventListener('resize', updateCenter)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateCenter)
})
</script>

<style scoped>
.hover-3d-container {
  display: inline-block;
  perspective: 1000px;
  transform-style: preserve-3d;
}

.hover-3d-content {
  display: inline-block;
  transform-style: preserve-3d;
  backface-visibility: hidden;
}
</style>
