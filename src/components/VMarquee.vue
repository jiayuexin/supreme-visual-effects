<template>
  <div
    ref="container"
    class="v-marquee"
    :class="{ 'v-marquee-pause-on-hover': pauseOnHover, 'v-marquee-gradient': gradient }"
    :style="marqueeStyle"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div class="v-marquee-content" :style="contentStyle">
      <!-- Original content -->
      <div class="v-marquee-track" :style="trackStyle">
        <slot></slot>
      </div>
      <!-- Duplicated content for seamless loop -->
      <div class="v-marquee-track" :style="trackStyle" aria-hidden="true">
        <slot></slot>
      </div>
      <!-- Third copy to fill gap during animation -->
      <div class="v-marquee-track" :style="trackStyle" aria-hidden="true">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useReducedMotion } from '../composables/useReducedMotion'

interface MarqueeProps {
  speed?: number
  direction?: 'left' | 'right'
  pauseOnHover?: boolean
  gap?: string
  gradient?: boolean
  gradientWidth?: string
}

const props = withDefaults(defineProps<MarqueeProps>(), {
  speed: 50,
  direction: 'left',
  pauseOnHover: true,
  gap: '2rem',
  gradient: false,
  gradientWidth: '200px',
})

const emit = defineEmits<{
  (e: 'enter'): void
  (e: 'leave'): void
}>()

const container = ref<HTMLElement | null>(null)
const contentWidth = ref(0)
const isPaused = ref(false)
const { prefersReducedMotion } = useReducedMotion()

const measureContent = () => {
  if (!container.value) return
  const track = container.value.querySelector('.v-marquee-track') as HTMLElement
  if (track) {
    contentWidth.value = track.scrollWidth
  }
}

const animationDuration = computed(() => {
  if (contentWidth.value === 0) return 1
  return contentWidth.value / props.speed
})

const animationDirection = computed(() => {
  return props.direction === 'left' ? 'normal' : 'reverse'
})

const marqueeStyle = computed(
  () =>
    ({
      '--marquee-duration': `${animationDuration.value}s`,
      '--marquee-direction': animationDirection.value,
      '--marquee-gap': props.gap,
      '--marquee-gradient-width': props.gradientWidth,
      '--marquee-play-state': isPaused.value || prefersReducedMotion.value ? 'paused' : 'running',
    }) as Record<string, string>
)

const contentStyle = computed(() => ({
  display: 'flex',
  gap: props.gap,
  animation: 'marquee var(--marquee-duration) linear infinite var(--marquee-direction)',
  animationPlayState: 'var(--marquee-play-state)',
}))

const trackStyle = computed(() => ({
  display: 'flex',
  flexShrink: 0,
  gap: props.gap,
  alignItems: 'center',
}))

const handleMouseEnter = () => {
  if (props.pauseOnHover) {
    isPaused.value = true
  }
  emit('enter')
}

const handleMouseLeave = () => {
  if (props.pauseOnHover) {
    isPaused.value = false
  }
  emit('leave')
}

const pause = () => {
  isPaused.value = true
}

const resume = () => {
  isPaused.value = false
}

defineExpose({ pause, resume })

onMounted(() => {
  measureContent()
  window.addEventListener('resize', measureContent)
})

onUnmounted(() => {
  window.removeEventListener('resize', measureContent)
})
</script>

<style scoped>
.v-marquee {
  overflow: hidden;
  width: 100%;
  position: relative;
}

.v-marquee-content {
  will-change: transform;
}

.v-marquee-pause-on-hover:hover .v-marquee-content {
  animation-play-state: paused !important;
}

.v-marquee-gradient::before,
.v-marquee-gradient::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: var(--marquee-gradient-width);
  z-index: 1;
  pointer-events: none;
}

.v-marquee-gradient::before {
  left: 0;
  background: linear-gradient(to right, white, transparent);
}

.v-marquee-gradient::after {
  right: 0;
  background: linear-gradient(to left, white, transparent);
}
</style>

<style>
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-33.333% - var(--marquee-gap)));
  }
}
</style>
