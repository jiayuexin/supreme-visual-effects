import { ref, onMounted, onUnmounted, watch, type Ref } from 'vue'
import { isBrowser } from './useBrowser'

export interface ResizeObserverOptions {
  /** Element to observe */
  target: Ref<HTMLElement | null>
  /** Callback when element resizes */
  onResize?: (entry: ResizeObserverEntry) => void
  /** Debounce delay in ms (0 = no debounce) */
  debounce?: number
  /** Box model to observe */
  box?: ResizeObserverBoxOptions
}

export interface ResizeObserverReturn {
  /** Current element width */
  width: Ref<number>
  /** Current element height */
  height: Ref<number>
  /** Content box width */
  contentWidth: Ref<number>
  /** Content box height */
  contentHeight: Ref<number>
  /** Stop observing */
  stop: () => void
  /** Start/restart observing */
  start: () => void
}

/**
 * Composable for ResizeObserver API
 * Provides reactive element dimensions
 */
export const useResizeObserver = (options: ResizeObserverOptions): ResizeObserverReturn => {
  const { target, onResize, debounce = 0, box = 'content-box' } = options

  const width = ref(0)
  const height = ref(0)
  const contentWidth = ref(0)
  const contentHeight = ref(0)

  let observer: ResizeObserver | null = null
  let debounceTimer: ReturnType<typeof setTimeout> | null = null

  const updateDimensions = (entry: ResizeObserverEntry) => {
    // Border box size
    if (entry.borderBoxSize?.length) {
      const borderBox = entry.borderBoxSize[0]
      width.value = borderBox.inlineSize
      height.value = borderBox.blockSize
    } else {
      // Fallback for older browsers
      width.value = entry.contentRect.width
      height.value = entry.contentRect.height
    }

    // Content box size
    if (entry.contentBoxSize?.length) {
      const contentBox = entry.contentBoxSize[0]
      contentWidth.value = contentBox.inlineSize
      contentHeight.value = contentBox.blockSize
    } else {
      contentWidth.value = entry.contentRect.width
      contentHeight.value = entry.contentRect.height
    }

    onResize?.(entry)
  }

  const handleResize = (entries: ResizeObserverEntry[]) => {
    const entry = entries[0]
    if (!entry) return

    if (debounce > 0) {
      if (debounceTimer) {
        clearTimeout(debounceTimer)
      }
      debounceTimer = setTimeout(() => {
        updateDimensions(entry)
      }, debounce)
    } else {
      updateDimensions(entry)
    }
  }

  const createObserver = () => {
    if (!isBrowser || !target.value) return

    // Cleanup existing observer
    if (observer) {
      observer.disconnect()
    }

    try {
      observer = new ResizeObserver(handleResize)
      if (observer && typeof observer.observe === 'function') {
        observer.observe(target.value, { box })
      }
    } catch {
      // ResizeObserver not available or mock incomplete
      observer = null
    }

    // Get initial dimensions
    const rect = target.value.getBoundingClientRect()
    width.value = rect.width
    height.value = rect.height
    contentWidth.value = rect.width
    contentHeight.value = rect.height
  }

  const stop = () => {
    if (debounceTimer) {
      clearTimeout(debounceTimer)
      debounceTimer = null
    }
    if (observer) {
      observer.disconnect()
      observer = null
    }
  }

  const start = () => {
    stop()
    createObserver()
  }

  // Watch for target changes
  watch(target, newTarget => {
    if (newTarget) {
      createObserver()
    } else {
      stop()
    }
  })

  onMounted(() => {
    if (target.value) {
      createObserver()
    }
  })

  onUnmounted(() => {
    stop()
  })

  return {
    width,
    height,
    contentWidth,
    contentHeight,
    stop,
    start,
  }
}

/**
 * Simple helper to check if ResizeObserver is supported
 */
export const isResizeObserverSupported = (): boolean => {
  return isBrowser && 'ResizeObserver' in window
}

/**
 * Composable for window resize events
 * Lighter weight alternative when you only need window dimensions
 */
export const useWindowResize = (options: { debounce?: number; onResize?: () => void } = {}) => {
  const { debounce = 0, onResize } = options

  const width = ref(0)
  const height = ref(0)

  let debounceTimer: ReturnType<typeof setTimeout> | null = null

  const updateDimensions = () => {
    if (!isBrowser) return
    width.value = window.innerWidth
    height.value = window.innerHeight
    onResize?.()
  }

  const handleResize = () => {
    if (debounce > 0) {
      if (debounceTimer) {
        clearTimeout(debounceTimer)
      }
      debounceTimer = setTimeout(updateDimensions, debounce)
    } else {
      updateDimensions()
    }
  }

  onMounted(() => {
    if (!isBrowser) return
    updateDimensions()
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    if (!isBrowser) return
    if (debounceTimer) {
      clearTimeout(debounceTimer)
    }
    window.removeEventListener('resize', handleResize)
  })

  return {
    width,
    height,
  }
}
