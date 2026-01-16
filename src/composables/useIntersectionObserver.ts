import { ref, onMounted, onUnmounted, watch, type Ref } from 'vue'
import { isBrowser } from './useBrowser'

export interface IntersectionObserverOptions {
  /** Element to observe */
  target: Ref<HTMLElement | null>
  /** Root element for intersection (default: viewport) */
  root?: Ref<HTMLElement | null> | null
  /** Margin around root element */
  rootMargin?: string
  /** Threshold(s) at which to trigger callback */
  threshold?: number | number[]
  /** Whether to disconnect after first intersection */
  once?: boolean
  /** Callback when intersection changes */
  onIntersect?: (entry: IntersectionObserverEntry) => void
  /** Callback when element enters viewport */
  onEnter?: (entry: IntersectionObserverEntry) => void
  /** Callback when element leaves viewport */
  onLeave?: (entry: IntersectionObserverEntry) => void
}

export interface IntersectionObserverReturn {
  /** Whether element is currently intersecting */
  isIntersecting: Ref<boolean>
  /** Whether element has ever intersected */
  hasIntersected: Ref<boolean>
  /** Current intersection ratio (0-1) */
  intersectionRatio: Ref<number>
  /** Stop observing */
  stop: () => void
  /** Start/restart observing */
  start: () => void
}

/**
 * Composable for IntersectionObserver API
 * Provides reactive intersection state and callbacks
 */
export const useIntersectionObserver = (options: IntersectionObserverOptions): IntersectionObserverReturn => {
  const {
    target,
    root = null,
    rootMargin = '0px',
    threshold = 0,
    once = false,
    onIntersect,
    onEnter,
    onLeave,
  } = options

  const isIntersecting = ref(false)
  const hasIntersected = ref(false)
  const intersectionRatio = ref(0)

  let observer: IntersectionObserver | null = null
  let wasIntersecting = false

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    const entry = entries[0]
    if (!entry) return

    isIntersecting.value = entry.isIntersecting
    intersectionRatio.value = entry.intersectionRatio

    // Call general callback
    onIntersect?.(entry)

    // Handle enter/leave callbacks
    if (entry.isIntersecting && !wasIntersecting) {
      hasIntersected.value = true
      onEnter?.(entry)

      // Disconnect if once mode
      if (once && observer) {
        observer.disconnect()
        observer = null
      }
    } else if (!entry.isIntersecting && wasIntersecting) {
      onLeave?.(entry)
    }

    wasIntersecting = entry.isIntersecting
  }

  const createObserver = () => {
    if (!isBrowser || !target.value) return

    // Cleanup existing observer
    if (observer) {
      observer.disconnect()
    }

    const observerOptions: IntersectionObserverInit = {
      root: root?.value ?? null,
      rootMargin,
      threshold,
    }

    observer = new IntersectionObserver(handleIntersection, observerOptions)
    observer.observe(target.value)
  }

  const stop = () => {
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

  // Watch for root changes if it's a ref
  if (root) {
    watch(root, () => {
      if (target.value) {
        createObserver()
      }
    })
  }

  onMounted(() => {
    if (target.value) {
      createObserver()
    }
  })

  onUnmounted(() => {
    stop()
  })

  return {
    isIntersecting,
    hasIntersected,
    intersectionRatio,
    stop,
    start,
  }
}

/**
 * Simple helper to check if IntersectionObserver is supported
 */
export const isIntersectionObserverSupported = (): boolean => {
  return isBrowser && 'IntersectionObserver' in window
}
