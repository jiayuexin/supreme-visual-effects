<template>
  <div class="typing-text" :style="containerStyle">
    <span class="typing-content" :style="contentStyle">
      {{ displayText }}
    </span>
    <span v-if="showCursor && isTyping" class="typing-cursor" :style="cursorStyle">
      {{ cursorChar }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

interface TypingTextProps {
  text: string | string[]
  speed?: number
  delay?: number
  pause?: number
  loop?: boolean
  cursor?: boolean
  cursorChar?: string
  cursorSpeed?: number
  eraseSpeed?: number
  eraseDelay?: number
  autoStart?: boolean
  color?: string
  fontSize?: string
  fontFamily?: string
}

const props = withDefaults(defineProps<TypingTextProps>(), {
  speed: 100,
  delay: 0,
  pause: 2000,
  loop: false,
  cursor: true,
  cursorChar: '|',
  cursorSpeed: 500,
  eraseSpeed: 50,
  eraseDelay: 1000,
  autoStart: true,
  color: 'inherit',
  fontSize: 'inherit',
  fontFamily: 'inherit',
})

const emit = defineEmits<{
  (e: 'typing-start'): void
  (e: 'typing-complete'): void
  (e: 'typing-pause'): void
  (e: 'typing-resume'): void
}>()

const displayText = ref('')
const currentIndex = ref(0)
const currentTextIndex = ref(0)
const isTyping = ref(false)
const isErasing = ref(false)
const isPaused = ref(false)
const cursorVisible = ref(true)

let typingTimer: number | null = null
let cursorTimer: number | null = null
let pauseTimer: number | null = null

const textArray = computed(() => {
  return Array.isArray(props.text) ? props.text : [props.text]
})

const currentText = computed(() => {
  return textArray.value[currentTextIndex.value] || ''
})

const containerStyle = computed(() => ({
  color: props.color,
  fontSize: props.fontSize,
  fontFamily: props.fontFamily,
  display: 'inline-block',
}))

const contentStyle = computed(() => ({
  display: 'inline',
}))

const cursorStyle = computed(() => ({
  opacity: cursorVisible.value ? 1 : 0,
  transition: `opacity ${props.cursorSpeed / 2}ms ease-in-out`,
}))

const showCursor = computed(() => {
  return props.cursor && (isTyping.value || isPaused.value)
})

const startTyping = () => {
  if (isTyping.value) return

  isTyping.value = true
  isErasing.value = false
  isPaused.value = false
  currentIndex.value = 0
  currentTextIndex.value = 0
  displayText.value = ''

  emit('typing-start')

  if (props.delay > 0) {
    setTimeout(() => {
      typeNextCharacter()
    }, props.delay)
  } else {
    typeNextCharacter()
  }

  startCursorBlink()
}

const typeNextCharacter = () => {
  if (!isTyping.value || isPaused.value) return

  const text = currentText.value

  if (currentIndex.value < text.length) {
    displayText.value += text[currentIndex.value]
    currentIndex.value++

    typingTimer = window.setTimeout(() => {
      typeNextCharacter()
    }, props.speed)
  } else {
    // 完成当前文本
    isTyping.value = false
    emit('typing-complete')

    if (props.loop || currentTextIndex.value < textArray.value.length - 1) {
      // 暂停后继续下一个文本或重新开始
      pauseTimer = window.setTimeout(() => {
        if (props.loop && currentTextIndex.value === textArray.value.length - 1) {
          // 循环模式，重新开始
          currentTextIndex.value = 0
          startErasing()
        } else if (currentTextIndex.value < textArray.value.length - 1) {
          // 下一个文本
          currentTextIndex.value++
          startErasing()
        }
      }, props.pause)
    }
  }
}

const startErasing = () => {
  if (isErasing.value) return

  isErasing.value = true
  isTyping.value = false

  if (props.eraseDelay > 0) {
    setTimeout(() => {
      eraseNextCharacter()
    }, props.eraseDelay)
  } else {
    eraseNextCharacter()
  }
}

const eraseNextCharacter = () => {
  if (!isErasing.value || isPaused.value) return

  if (displayText.value.length > 0) {
    displayText.value = displayText.value.slice(0, -1)

    typingTimer = window.setTimeout(() => {
      eraseNextCharacter()
    }, props.eraseSpeed)
  } else {
    // 擦除完成，开始下一个文本
    isErasing.value = false
    currentIndex.value = 0
    typeNextCharacter()
  }
}

const startCursorBlink = () => {
  if (cursorTimer) {
    clearInterval(cursorTimer)
  }

  cursorTimer = window.setInterval(() => {
    cursorVisible.value = !cursorVisible.value
  }, props.cursorSpeed)
}

const stopCursorBlink = () => {
  if (cursorTimer) {
    clearInterval(cursorTimer)
    cursorTimer = null
  }
  cursorVisible.value = true
}

const pauseTyping = () => {
  if (!isTyping.value && !isErasing.value) return

  isPaused.value = true
  emit('typing-pause')

  if (typingTimer) {
    clearTimeout(typingTimer)
    typingTimer = null
  }
}

const resume = () => {
  if (!isPaused.value) return

  isPaused.value = false
  emit('typing-resume')

  if (isErasing.value) {
    eraseNextCharacter()
  } else {
    typeNextCharacter()
  }
}

const stop = () => {
  isTyping.value = false
  isErasing.value = false
  isPaused.value = false

  if (typingTimer) {
    clearTimeout(typingTimer)
    typingTimer = null
  }

  if (pauseTimer) {
    clearTimeout(pauseTimer)
    pauseTimer = null
  }

  stopCursorBlink()
}

const reset = () => {
  stop()
  displayText.value = ''
  currentIndex.value = 0
  currentTextIndex.value = 0
}

// 暴露方法给父组件
defineExpose({
  start: startTyping,
  pause: pauseTyping,
  resume,
  stop,
  reset,
})

onMounted(() => {
  if (props.autoStart) {
    startTyping()
  }
})

onUnmounted(() => {
  stop()
})

watch(
  () => props.text,
  () => {
    reset()
    if (props.autoStart) {
      startTyping()
    }
  },
  { deep: true }
)

watch(
  () => props.autoStart,
  (newVal: boolean) => {
    if (newVal && !isTyping.value && !isErasing.value) {
      startTyping()
    } else if (!newVal) {
      stop()
    }
  }
)
</script>

<style scoped>
.typing-text {
  display: inline-block;
  position: relative;
}

.typing-content {
  display: inline;
}

.typing-cursor {
  display: inline;
  font-weight: normal;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%,
  50% {
    opacity: 1;
  }
  51%,
  100% {
    opacity: 0;
  }
}
</style>
