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
                <div v-if="imageLoading" class="lightbox-loading">
                  <span>Loading...</span>
                </div>
                <img
                  v-if="currentItem?.image || currentItem?.src"
                  v-show="!imageLoading && !imageError"
                  :src="currentItem?.image || currentItem?.src"
                  :alt="currentItem.alt || 'Lightbox image'"
                  class="lightbox-image"
                  loading="lazy"
                  @load="onImageLoad"
                  @error="onImageError"
                />
                <div v-if="imageError" class="lightbox-image-error">
                  <span>Failed to load image</span>
                </div>
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
import { useReducedMotion } from '../composables/useReducedMotion'

interface LightboxItem {
  src?: string
  image?: string
  title?: string
  description?: string
  alt?: string
}

interface LightboxProps {
  isOpen?: boolean
  items?: LightboxItem[]
  currentIndex?: number
  showCloseButton?: boolean
  showNavigation?: boolean
  showCounter?: boolean
  closeOnOverlay?: boolean
  closeOnEscape?: boolean
  keyboardNavigation?: boolean
  animationType?: 'fade' | 'scale' | 'slide'
  animationDuration?: number
  backgroundColor?: string
  maxWidth?: string
  maxHeight?: string
  respectReducedMotion?: boolean
  trapFocus?: boolean
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
  respectReducedMotion: true,
  trapFocus: true,
})

const { prefersReducedMotion } = useReducedMotion()

// Check if animations should be simplified
const shouldSimplifyAnimation = computed(() => {
  return props.respectReducedMotion && prefersReducedMotion.value
})

// Effective animation duration
const effectiveAnimationDuration = computed(() => {
  return shouldSimplifyAnimation.value ? 0 : props.animationDuration
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
const previousActiveElement = ref<HTMLElement | null>(null)
const focusableElements = ref<HTMLElement[]>([])
const imageLoading = ref(false)
const imageError = ref(false)

const currentItem = computed(() => {
  return props.items[currentIndex.value] || null
})

const canGoPrev = computed(() => {
  return currentIndex.value > 0
})

const canGoNext = computed(() => {
  return currentIndex.value < props.items.length - 1
})

const onImageLoad = () => {
  imageLoading.value = false
  imageError.value = false
}

const onImageError = () => {
  imageLoading.value = false
  imageError.value = true
}

const overlayStyle = computed(() => ({
  backgroundColor: props.backgroundColor,
  animationDuration: `${effectiveAnimationDuration.value}ms`,
}))

const contentStyle = computed(() => ({
  maxWidth: props.maxWidth,
  maxHeight: props.maxHeight,
  animationDuration: `${effectiveAnimationDuration.value}ms`,
}))

const open = () => {
  emit('update:isOpen', true)
  emit('open')

  // Store the previously focused element for restoration
  previousActiveElement.value = document.activeElement as HTMLElement

  nextTick(() => {
    if (lightbox.value) {
      lightbox.value.focus()
      updateFocusableElements()
    }
  })
}

const close = () => {
  emit('update:isOpen', false)
  emit('close')

  // Restore focus to the previously focused element
  nextTick(() => {
    if (previousActiveElement.value) {
      previousActiveElement.value.focus()
      previousActiveElement.value = null
    }
  })
}

// Focus trap implementation
const updateFocusableElements = () => {
  if (!lightbox.value) return

  const selectors = [
    'button:not([disabled])',
    'a[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ]

  focusableElements.value = Array.from(lightbox.value.querySelectorAll<HTMLElement>(selectors.join(', ')))
}

const handleFocusTrap = (e: KeyboardEvent) => {
  if (!props.trapFocus || focusableElements.value.length === 0) return

  const firstElement = focusableElements.value[0]
  const lastElement = focusableElements.value[focusableElements.value.length - 1]

  if (e.shiftKey && document.activeElement === firstElement) {
    e.preventDefault()
    lastElement.focus()
  } else if (!e.shiftKey && document.activeElement === lastElement) {
    e.preventDefault()
    firstElement.focus()
  }
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
    case 'Tab':
      handleFocusTrap(e)
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

watch(
  () => currentItem.value?.image || currentItem.value?.src,
  () => {
    imageLoading.value = true
    imageError.value = false
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

.lightbox-loading,
.lightbox-image-error {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  color: #999;
  font-size: 1rem;
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
