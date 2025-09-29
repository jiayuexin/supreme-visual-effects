<template>
  <div
    ref="container"
    class="scroll-snap-container"
    :style="containerStyle"
    tabindex="0"
    @wheel="handleWheel"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
    @keydown="handleKeydown"
  >
    <div
      v-for="(section, index) in sections"
      :key="index"
      class="scroll-snap-section"
      :class="{ active: currentIndex === index }"
      :style="getSectionStyle(index)"
    >
      <slot :name="`section-${index}`" :section="section" :index="index">
        <div class="section-content">
          <h2>Section {{ index + 1 }}</h2>
          <p>{{ section.content || `This is section ${index + 1}` }}</p>
        </div>
      </slot>
    </div>

    <!-- Navigation indicators -->
    <div v-if="showIndicators" class="scroll-indicators">
      <button
        v-for="(section, index) in sections"
        :key="index"
        class="indicator"
        :class="{ active: currentIndex === index }"
        :aria-label="`Go to section ${index + 1}`"
        @click="goToSection(index)"
      >
        <span class="indicator-dot"></span>
      </button>
    </div>

    <!-- Navigation arrows -->
    <div v-if="showArrows" class="scroll-arrows">
      <button
        class="arrow arrow-up"
        :disabled="currentIndex === 0"
        aria-label="Previous section"
        @click="goToSection(currentIndex - 1)"
      >
        ↑
      </button>
      <button
        class="arrow arrow-down"
        :disabled="currentIndex === sections.length - 1"
        aria-label="Next section"
        @click="goToSection(currentIndex + 1)"
      >
        ↓
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue'

interface ScrollSection {
  content?: string
  style?: Record<string, unknown>
  backgroundColor?: string
  color?: string
}

const props = defineProps({
  sections: {
    type: Array as () => ScrollSection[],
    default: () => [
      { content: 'First section', backgroundColor: '#667eea' },
      { content: 'Second section', backgroundColor: '#764ba2' },
      { content: 'Third section', backgroundColor: '#f093fb' },
    ],
  },
  duration: {
    type: Number,
    default: 800,
  },
  easing: {
    type: String,
    default: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  },
  showIndicators: {
    type: Boolean,
    default: true,
  },
  showArrows: {
    type: Boolean,
    default: true,
  },
  keyboardNavigation: {
    type: Boolean,
    default: true,
  },
  wheelSensitivity: {
    type: Number,
    default: 1,
  },
  touchSensitivity: {
    type: Number,
    default: 50,
  },
})

const emit = defineEmits<{
  'section-change': [index: number, section: ScrollSection]
  'section-enter': [index: number, section: ScrollSection]
  'section-leave': [index: number, section: ScrollSection]
}>()

const container = ref<HTMLElement | null>(null)
const currentIndex = ref(0)
const isScrolling = ref(false)
const touchStartY = ref(0)
const touchStartTime = ref(0)

const containerStyle = computed(() => ({
  height: '100vh',
  overflow: 'hidden',
  position: 'relative',
}))

const getSectionStyle = (index: number) => {
  const section = props.sections[index]
  return {
    height: '100vh',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: section.backgroundColor || '#ffffff',
    color: section.color || '#000000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transform: `translateY(${index * 100}vh)`,
    transition: isScrolling.value ? `transform ${props.duration}ms ${props.easing}` : 'none',
    ...section.style,
  }
}

const goToSection = async (index: number) => {
  if (index < 0 || index >= props.sections.length || isScrolling.value) return

  const previousIndex = currentIndex.value
  currentIndex.value = index
  isScrolling.value = true

  // Emit events
  emit('section-leave', previousIndex, props.sections[previousIndex])
  emit('section-change', index, props.sections[index])

  // Update section positions
  await nextTick()
  updateSectionPositions()

  // Wait for animation to complete
  setTimeout(() => {
    isScrolling.value = false
    emit('section-enter', index, props.sections[index])
  }, props.duration)
}

const updateSectionPositions = () => {
  if (!container.value) return

  const sections = container.value.querySelectorAll('.scroll-snap-section')
  sections.forEach((section, index) => {
    const element = section as HTMLElement
    element.style.transform = `translateY(${(index - currentIndex.value) * 100}vh)`
  })
}

const handleWheel = (e: WheelEvent) => {
  if (isScrolling.value) {
    e.preventDefault()
    return
  }

  const delta = e.deltaY * props.wheelSensitivity

  if (delta > 0 && currentIndex.value < props.sections.length - 1) {
    e.preventDefault()
    goToSection(currentIndex.value + 1)
  } else if (delta < 0 && currentIndex.value > 0) {
    e.preventDefault()
    goToSection(currentIndex.value - 1)
  }
}

const handleTouchStart = (e: TouchEvent) => {
  touchStartY.value = e.touches[0].clientY
  touchStartTime.value = Date.now()
}

const handleTouchMove = (e: TouchEvent) => {
  if (isScrolling.value) {
    e.preventDefault()
    return
  }

  const deltaY = e.touches[0].clientY - touchStartY.value
  const deltaTime = Date.now() - touchStartTime.value

  if (Math.abs(deltaY) > props.touchSensitivity && deltaTime > 100) {
    if (deltaY > 0 && currentIndex.value > 0) {
      goToSection(currentIndex.value - 1)
    } else if (deltaY < 0 && currentIndex.value < props.sections.length - 1) {
      goToSection(currentIndex.value + 1)
    }
  }
}

const handleTouchEnd = () => {
  // Touch handling is done in touchmove
}

const handleKeydown = (e: KeyboardEvent) => {
  if (!props.keyboardNavigation || isScrolling.value) return

  switch (e.key) {
    case 'ArrowUp':
    case 'PageUp':
      e.preventDefault()
      if (currentIndex.value > 0) {
        goToSection(currentIndex.value - 1)
      }
      break
    case 'ArrowDown':
    case 'PageDown':
    case ' ':
      e.preventDefault()
      if (currentIndex.value < props.sections.length - 1) {
        goToSection(currentIndex.value + 1)
      }
      break
    case 'Home':
      e.preventDefault()
      goToSection(0)
      break
    case 'End':
      e.preventDefault()
      goToSection(props.sections.length - 1)
      break
  }
}

onMounted(() => {
  if (container.value) {
    container.value.focus()
  }
  updateSectionPositions()
})

watch(
  () => props.sections,
  () => {
    currentIndex.value = 0
    nextTick(() => {
      updateSectionPositions()
    })
  },
  { deep: true }
)
</script>

<style scoped>
.scroll-snap-container {
  position: relative;
  height: 100vh;
  overflow: hidden;
  outline: none;
}

.scroll-snap-section {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 2rem;
  box-sizing: border-box;
}

.section-content {
  text-align: center;
  max-width: 800px;
}

.section-content h2 {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: bold;
}

.section-content p {
  font-size: 1.2rem;
  line-height: 1.6;
}

.scroll-indicators {
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.indicator {
  width: 12px;
  height: 12px;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.indicator.active {
  background: rgba(255, 255, 255, 0.8);
  border-color: rgba(255, 255, 255, 0.8);
}

.indicator-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: currentColor;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.indicator.active .indicator-dot {
  opacity: 1;
}

.scroll-arrows {
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 3rem;
}

.arrow {
  width: 40px;
  height: 40px;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.arrow:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.8);
}

.arrow:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
</style>
