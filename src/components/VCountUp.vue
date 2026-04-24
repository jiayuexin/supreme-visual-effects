<template>
  <span class="v-count-up" :style="textStyle">
    {{ formattedValue }}
  </span>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useAnimation, easings } from '../composables/useAnimation'
import { useReducedMotion } from '../composables/useReducedMotion'

interface CountUpProps {
  end: number
  start?: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  separator?: string
  autoStart?: boolean
  easing?: string
  respectReducedMotion?: boolean
}

const props = withDefaults(defineProps<CountUpProps>(), {
  start: 0,
  duration: 2000,
  decimals: 0,
  prefix: '',
  suffix: '',
  separator: ',',
  autoStart: true,
  easing: 'easeOut',
  respectReducedMotion: true,
})

const emit = defineEmits<{
  (e: 'start'): void
  (e: 'end'): void
  (e: 'update', currentValue: number): void
}>()

const { prefersReducedMotion } = useReducedMotion()
const currentRaw = ref(props.start)

const getEasing = (name: string) => {
  return (easings as Record<string, (t: number) => number>)[name] || easings.easeOut
}

const formatNumber = (value: number, decimals: number, separator: string): string => {
  const fixed = value.toFixed(decimals)
  const parts = fixed.split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator)
  return parts.join('.')
}

const formattedValue = computed(() => {
  const formatted = formatNumber(currentRaw.value, props.decimals, props.separator)
  return `${props.prefix}${formatted}${props.suffix}`
})

const textStyle = computed(() => ({
  display: 'inline-block',
  fontVariantNumeric: 'tabular-nums',
}))

let animationControls: ReturnType<typeof useAnimation> | null = null
let elapsed = 0

const runAnimation = () => {
  if (props.respectReducedMotion && prefersReducedMotion.value) {
    currentRaw.value = props.end
    emit('update', props.end)
    emit('end')
    return
  }

  if (animationControls) {
    animationControls.stop()
  }

  elapsed = 0
  const easingFn = getEasing(props.easing)

  animationControls = useAnimation({
    autoStart: true,
    onFrame: (_timestamp, deltaTime) => {
      if (!animationControls) return
      elapsed += deltaTime
      const progress = Math.min(elapsed / props.duration, 1)
      currentRaw.value = props.start + (props.end - props.start) * easingFn(progress)
      emit('update', currentRaw.value)
      if (progress >= 1) {
        currentRaw.value = props.end
        animationControls.stop()
        emit('end')
      }
    },
    onStart: () => {
      emit('start')
    },
  })
}

const start = () => {
  currentRaw.value = props.start
  runAnimation()
}

const pause = () => {
  animationControls?.pause()
}

const resume = () => {
  animationControls?.resume()
}

const reset = () => {
  animationControls?.stop()
  currentRaw.value = props.start
}

defineExpose({ start, pause, resume, reset })

watch(
  () => props.end,
  () => {
    if (props.autoStart) {
      runAnimation()
    }
  }
)

onMounted(() => {
  if (props.autoStart) {
    runAnimation()
  }
})
</script>

<style scoped>
.v-count-up {
  white-space: nowrap;
}
</style>
