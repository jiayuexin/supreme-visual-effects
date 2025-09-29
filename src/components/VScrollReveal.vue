<template>
  <div ref="target" :class="{ 'is-visible': isVisible }">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  threshold: {
    type: Number,
    default: 0.1,
  },
  once: {
    type: Boolean,
    default: true,
  },
})

const is_browser = typeof window !== 'undefined' && typeof document !== 'undefined'

const target = ref<HTMLElement | null>(null)
const isVisible = ref(false)

let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!is_browser || !target.value) return

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        if (props.once && observer) {
          observer.disconnect()
        }
      } else {
        if (!props.once) {
          isVisible.value = false
        }
      }
    },
    {
      threshold: props.threshold,
    }
  )

  observer.observe(target.value)
})

onUnmounted(() => {
  if (!is_browser) return
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
div {
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275),
    transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

div.is-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>