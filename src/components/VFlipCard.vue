<template>
  <div class="v-flip-card" :class="cardClasses" :style="cardStyle" @click="handleClick">
    <div class="v-flip-card-inner" :style="innerStyle">
      <div class="v-flip-card-front">
        <slot name="front"></slot>
      </div>
      <div class="v-flip-card-back">
        <slot name="back"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useReducedMotion } from '../composables/useReducedMotion'

interface FlipCardProps {
  trigger?: 'hover' | 'click'
  direction?: 'x' | 'y'
  duration?: number
  perspective?: number
  reverse?: boolean
}

const props = withDefaults(defineProps<FlipCardProps>(), {
  trigger: 'hover',
  direction: 'y',
  duration: 600,
  perspective: 1000,
  reverse: false,
})

const emit = defineEmits<{
  (e: 'flip'): void
  (e: 'unflip'): void
}>()

const isFlipped = ref(false)
const { prefersReducedMotion } = useReducedMotion()

const rotationAxis = computed(() => (props.direction === 'y' ? 'rotateY' : 'rotateX'))

const cardClasses = computed(() => ({
  'v-flip-card-is-flipped': isFlipped.value,
  'v-flip-card-reverse': props.reverse,
  'v-flip-card-trigger-hover': props.trigger === 'hover',
  'v-flip-card-direction-x': props.direction === 'x',
}))

const cardStyle = computed(() => ({
  perspective: `${props.perspective}px`,
}))

const innerStyle = computed(() => {
  // Only apply inline transform for click trigger; hover trigger uses CSS
  if (props.trigger !== 'click') return {}
  return {
    transitionDuration: `${props.duration}ms`,
    transform: isFlipped.value ? `${rotationAxis.value}(180deg)` : `${rotationAxis.value}(0deg)`,
  }
})

const handleClick = () => {
  if (props.trigger !== 'click') return
  toggle()
}

const flip = () => {
  if (prefersReducedMotion.value) return
  isFlipped.value = true
  emit('flip')
}

const unflip = () => {
  isFlipped.value = false
  emit('unflip')
}

const toggle = () => {
  if (isFlipped.value) {
    unflip()
  } else {
    flip()
  }
}

defineExpose({ flip, unflip, toggle })
</script>

<style scoped>
.v-flip-card {
  position: relative;
  width: 100%;
  height: 100%;
}

.v-flip-card-inner {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition-timing-function: ease-in-out;
}

.v-flip-card-front,
.v-flip-card-back {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.v-flip-card-front {
  z-index: 1;
}

.v-flip-card-back {
  transform: rotateY(180deg);
}

.v-flip-card-direction-x .v-flip-card-back {
  transform: rotateX(180deg);
}

.v-flip-card-trigger-hover:hover .v-flip-card-inner {
  transform: rotateY(180deg);
}

.v-flip-card-trigger-hover.v-flip-card-direction-x:hover .v-flip-card-inner {
  transform: rotateX(180deg);
}
</style>
