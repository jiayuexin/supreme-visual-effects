<template>
  <div ref="target" class="scroll-reveal" :class="revealClasses" :style="revealStyle">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useIntersectionObserver } from '../composables/useIntersectionObserver'
import { useReducedMotion } from '../composables/useReducedMotion'

type AnimationPreset = 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'zoom' | 'flip'

interface ScrollRevealProps {
  /** Intersection threshold (0-1) */
  threshold?: number
  /** Only trigger once */
  once?: boolean
  /** Animation duration in ms */
  duration?: number
  /** Animation delay in ms */
  delay?: number
  /** Animation easing function */
  easing?: string
  /** Animation preset */
  animation?: AnimationPreset
  /** Custom transform for hidden state */
  transform?: string
  /** Root margin for intersection observer */
  rootMargin?: string
  /** Respect reduced motion preference */
  respectReducedMotion?: boolean
  /** Distance for slide animations */
  distance?: string
}

const props = withDefaults(defineProps<ScrollRevealProps>(), {
  threshold: 0.1,
  once: true,
  duration: 600,
  delay: 0,
  easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  animation: 'slide-up',
  transform: '',
  rootMargin: '0px',
  respectReducedMotion: true,
  distance: '30px',
})

const emit = defineEmits<{
  (e: 'enter'): void
  (e: 'leave'): void
  (e: 'visible', isVisible: boolean): void
}>()

const { prefersReducedMotion } = useReducedMotion()

const target = ref<HTMLElement | null>(null)

// Use intersection observer composable
const { isIntersecting, hasIntersected } = useIntersectionObserver({
  target,
  threshold: props.threshold,
  rootMargin: props.rootMargin,
  once: props.once,
  onEnter: () => {
    emit('enter')
    emit('visible', true)
  },
  onLeave: () => {
    emit('leave')
    emit('visible', false)
  },
})

// Computed visibility state
const isVisible = computed(() => {
  if (props.once) {
    return hasIntersected.value
  }
  return isIntersecting.value
})

// Should skip animation
const shouldSkipAnimation = computed(() => {
  return props.respectReducedMotion && prefersReducedMotion.value
})

// Get transform based on animation preset
const getHiddenTransform = (): string => {
  if (props.transform) return props.transform

  const distance = props.distance

  switch (props.animation) {
    case 'fade':
      return 'none'
    case 'slide-up':
      return `translateY(${distance})`
    case 'slide-down':
      return `translateY(-${distance})`
    case 'slide-left':
      return `translateX(${distance})`
    case 'slide-right':
      return `translateX(-${distance})`
    case 'zoom':
      return 'scale(0.9)'
    case 'flip':
      return 'perspective(1000px) rotateX(-10deg)'
    default:
      return `translateY(${distance})`
  }
}

// Classes for reveal state
const revealClasses = computed(() => ({
  'is-visible': isVisible.value,
  'reduced-motion': shouldSkipAnimation.value,
}))

// Inline styles for animation
const revealStyle = computed(() => {
  if (shouldSkipAnimation.value) {
    return {
      opacity: 1,
      transform: 'none',
    }
  }

  const baseTransition = `opacity ${props.duration}ms ${props.easing} ${props.delay}ms, transform ${props.duration}ms ${props.easing} ${props.delay}ms`

  if (isVisible.value) {
    return {
      opacity: 1,
      transform: 'none',
      transition: baseTransition,
    }
  }

  return {
    opacity: 0,
    transform: getHiddenTransform(),
    transition: baseTransition,
  }
})

// Watch for visibility changes
watch(isVisible, newValue => {
  emit('visible', newValue)
})

// Expose for parent component access
defineExpose({
  isVisible,
  hasIntersected,
})
</script>

<style scoped>
.scroll-reveal {
  will-change: opacity, transform;
}

.scroll-reveal.reduced-motion {
  transition: none !important;
  transform: none !important;
  opacity: 1 !important;
}
</style>
