<template>
  <div ref="target" class="v-text-reveal">
    <span
      v-for="(segment, index) in segments"
      :key="index"
      class="v-text-reveal-segment"
      :class="{
        'v-text-reveal-segment-visible': visibleIndexes.includes(index),
        [`v-text-reveal-${animationType}`]: true,
      }"
      :style="segmentStyle"
    >
      {{ segment }}
      <span v-if="animation === 'word' && index < segments.length - 1">&nbsp;</span>
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'
import { useIntersectionObserver } from '../composables/useIntersectionObserver'
import { useReducedMotion } from '../composables/useReducedMotion'

interface TextRevealProps {
  text: string
  animation?: 'word' | 'char' | 'line'
  animationType?: 'fade' | 'slide' | 'scale' | 'blur'
  duration?: number
  stagger?: number
  threshold?: number
  once?: boolean
  delay?: number
  respectReducedMotion?: boolean
}

const props = withDefaults(defineProps<TextRevealProps>(), {
  animation: 'word',
  animationType: 'fade',
  duration: 600,
  stagger: 50,
  threshold: 0.1,
  once: true,
  delay: 0,
  respectReducedMotion: true,
})

const emit = defineEmits<{
  (e: 'start'): void
  (e: 'complete'): void
  (e: 'visible'): void
}>()

const target = ref<HTMLElement | null>(null)
const visibleIndexes = ref<number[]>([])
const timers: ReturnType<typeof setTimeout>[] = []
const { prefersReducedMotion } = useReducedMotion()

const segments = computed(() => {
  if (!props.text) return []
  if (props.animation === 'char') return props.text.split('')
  if (props.animation === 'line') return props.text.split(/\n/)
  return props.text.split(/\s+/).filter(Boolean)
})

const segmentStyle = computed(() => ({
  transitionDuration: `${props.duration}ms`,
}))

const clearTimers = () => {
  timers.forEach(t => clearTimeout(t))
  timers.length = 0
}

const reveal = () => {
  clearTimers()
  visibleIndexes.value = []

  const shouldSkipAnimation = props.respectReducedMotion && prefersReducedMotion.value

  if (shouldSkipAnimation) {
    visibleIndexes.value = segments.value.map((_, i) => i)
    emit('visible')
    emit('start')
    emit('complete')
    return
  }

  emit('start')

  if (props.delay > 0) {
    const delayTimer = setTimeout(() => {
      startReveal()
    }, props.delay)
    timers.push(delayTimer)
  } else {
    startReveal()
  }
}

const startReveal = () => {
  segments.value.forEach((_, i) => {
    const timer = setTimeout(() => {
      visibleIndexes.value.push(i)
      if (i === 0) emit('visible')
      if (i === segments.value.length - 1) emit('complete')
    }, i * props.stagger)
    timers.push(timer)
  })
}

const reset = () => {
  clearTimers()
  visibleIndexes.value = []
}

defineExpose({ reveal, reset })

const { isIntersecting, stop: stopObserver } = useIntersectionObserver({
  target,
  threshold: props.threshold,
  once: props.once,
})

watch(isIntersecting, intersecting => {
  if (intersecting) {
    reveal()
  }
})

onUnmounted(() => {
  clearTimers()
  stopObserver()
})
</script>

<style scoped>
.v-text-reveal {
  overflow: hidden;
}

.v-text-reveal-segment {
  display: inline-block;
  opacity: 0;
  transition-property: opacity, transform, filter;
  transition-timing-function: ease-out;
}

.v-text-reveal-segment-visible {
  opacity: 1;
}

.v-text-reveal-fade.v-text-reveal-segment {
  transform: none;
}

.v-text-reveal-slide.v-text-reveal-segment {
  transform: translateY(20px);
}

.v-text-reveal-slide.v-text-reveal-segment-visible {
  transform: translateY(0);
}

.v-text-reveal-scale.v-text-reveal-segment {
  transform: scale(0.8);
}

.v-text-reveal-scale.v-text-reveal-segment-visible {
  transform: scale(1);
}

.v-text-reveal-blur.v-text-reveal-segment {
  filter: blur(8px);
}

.v-text-reveal-blur.v-text-reveal-segment-visible {
  filter: blur(0);
}

.v-text-reveal-line {
  display: block;
}
</style>
