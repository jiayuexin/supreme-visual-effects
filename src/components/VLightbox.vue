<template>
  <Teleport to="body">
    <Transition name="lightbox" appear>
      <div
        v-if="isOpen"
        ref="lightbox"
        class="lightbox-overlay"
        :style="overlayStyle"
        tabindex="0"
        @click="handleOverlayClick"
        @keydown="handleKeydown"
      >
        <div class="lightbox-content" :style="contentStyle" @click.stop>
          <!-- Close button -->
          <button v-if="showCloseButton" class="lightbox-close" aria-label="Close lightbox" @click="close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
              />
            </svg>
          </button>

          <!-- Navigation arrows -->
          <button
            v-if="showNavigation && canGoPrev"
            class="lightbox-nav lightbox-nav-prev"
            aria-label="Previous item"
            @click="goToPrev"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>

          <button
            v-if="showNavigation && canGoNext"
            class="lightbox-nav lightbox-nav-next"
            aria-label="Next item"
            @click="goToNext"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </button>

          <!-- Content slot -->
          <div class="lightbox-body">
            <slot :item="currentItem" :index="currentIndex" :close="close">
              <div v-if="currentItem" class="lightbox-default-content">
                <img
                  v-if="currentItem.image"
                  :src="currentItem.image"
                  :alt="currentItem.alt || 'Lightbox image'"
                  class="lightbox-image"
                />
                <div v-if="currentItem.title || currentItem.description" class="lightbox-text">
                  <h3 v-if="currentItem.title" class="lightbox-title">{{ currentItem.title }}</h3>
                  <p v-if="currentItem.description" class="lightbox-description">{{ currentItem.description }}</p>
                </div>
              </div>
            </slot>
          </div>

          <!-- Counter -->
          <div v-if="showCounter && items.length > 1" class="lightbox-counter">
            {{ currentIndex + 1 }} / {{ items.length }}
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'

interface LightboxItem {
  src: string
  title?: string
  description?: string
  alt?: string
  [key: string]: unknown
}

interface LightboxProps {
  isOpen: boolean
  items: LightboxItem[]
  currentIndex: number
  showCloseButton: boolean
  showNavigation: boolean
  showCounter: boolean
  closeOnOverlay: boolean
  closeOnEscape: boolean
  keyboardNavigation: boolean
  animationType: 'fade' | 'scale' | 'slide'
  animationDuration: number
  backgroundColor: string
  maxWidth: string
  maxHeight: string
}

const props = withDefaults(defineProps<LightboxProps>(), {
  isOpen: false,
  items: () => [],
  currentIndex: 0,
  showCloseButton: true,
  showNavigation: true,
  showCounter: true,
  closeOnOverlay: true,
  closeOnEscape: true,
  keyboardNavigation: true,
  animationType: 'fade',
  animationDuration: 300,
  backgroundColor: 'rgba(0, 0, 0, 0.9)',
  maxWidth: '90vw',
  maxHeight: '90vh',
})

const emit = defineEmits<{
  (e: 'update:isOpen', isOpen: boolean): void
  (e: 'update:currentIndex', index: number): void
  (e: 'close'): void
  (e: 'open'): void
  (e: 'item-change', index: number, item: LightboxItem): void
}>()

const lightbox = ref<HTMLElement | null>(null)
const currentIndex = ref(props.currentIndex)

const currentItem = computed(() => {
  return props.items[currentIndex.value] || null
})

const canGoPrev = computed(() => {
  return currentIndex.value > 0
})

const canGoNext = computed(() => {
  return currentIndex.value < props.items.length - 1
})

const overlayStyle = computed(() => ({
  backgroundColor: props.backgroundColor,
  animationDuration: `${props.animationDuration}ms`,
}))

const contentStyle = computed(() => ({
  maxWidth: props.maxWidth,
  maxHeight: props.maxHeight,
  animationDuration: `${props.animationDuration}ms`,
}))

const open = () => {
  emit('update:isOpen', true)
  emit('open')

  nextTick(() => {
    if (lightbox.value) {
      lightbox.value.focus()
    }
  })
}

const close = () => {
  emit('update:isOpen', false)
  emit('close')
}

const goToIndex = (index: number) => {
  if (index < 0 || index >= props.items.length) return

  currentIndex.value = index
  emit('update:currentIndex', index)
  emit('item-change', index, props.items[index])
}

const goToPrev = () => {
  if (canGoPrev.value) {
    goToIndex(currentIndex.value - 1)
  }
}

const goToNext = () => {
  if (canGoNext.value) {
    goToIndex(currentIndex.value + 1)
  }
}

const handleOverlayClick = () => {
  if (props.closeOnOverlay) {
    close()
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  if (!props.keyboardNavigation) return

  switch (e.key) {
    case 'Escape':
      if (props.closeOnEscape) {
        e.preventDefault()
        close()
      }
      break
    case 'ArrowLeft':
      e.preventDefault()
      goToPrev()
      break
    case 'ArrowRight':
      e.preventDefault()
      goToNext()
      break
    case 'Home':
      e.preventDefault()
      goToIndex(0)
      break
    case 'End':
      e.preventDefault()
      goToIndex(props.items.length - 1)
      break
  }
}

const preventBodyScroll = () => {
  document.body.style.overflow = 'hidden'
}

const restoreBodyScroll = () => {
  document.body.style.overflow = ''
}

watch(
  () => props.isOpen,
  (newVal: boolean) => {
    if (newVal) {
      preventBodyScroll()
      open()
    } else {
      restoreBodyScroll()
    }
  }
)

watch(
  () => props.currentIndex,
  (newVal: number) => {
    currentIndex.value = newVal
  }
)

onMounted(() => {
  if (props.isOpen) {
    preventBodyScroll()
  }
})

onUnmounted(() => {
  restoreBodyScroll()
})

// 暴露方法给父组件
defineExpose({
  open,
  close,
  goToIndex,
  goToPrev,
  goToNext,
})
</script>

<style scoped>
.lightbox-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
  outline: none;
}

.lightbox-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
}

.lightbox-close {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 40px;
  height: 40px;
  border: none;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: background-color 0.2s ease;
}

.lightbox-close:hover {
  background: rgba(0, 0, 0, 0.7);
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border: none;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: background-color 0.2s ease;
}

.lightbox-nav:hover {
  background: rgba(0, 0, 0, 0.7);
}

.lightbox-nav-prev {
  left: 20px;
}

.lightbox-nav-next {
  right: 20px;
}

.lightbox-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.lightbox-default-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.lightbox-image {
  width: 100%;
  height: auto;
  max-height: 70vh;
  object-fit: contain;
  display: block;
}

.lightbox-text {
  padding: 20px;
  background: white;
}

.lightbox-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #333;
}

.lightbox-description {
  font-size: 1rem;
  color: #666;
  line-height: 1.5;
}

.lightbox-counter {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  z-index: 10;
}

/* Transitions */
.lightbox-enter-active,
.lightbox-leave-active {
  transition: all 0.3s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}

.lightbox-enter-from .lightbox-content,
.lightbox-leave-to .lightbox-content {
  transform: scale(0.8);
}

.lightbox-enter-to .lightbox-content,
.lightbox-leave-from .lightbox-content {
  transform: scale(1);
}
</style>
