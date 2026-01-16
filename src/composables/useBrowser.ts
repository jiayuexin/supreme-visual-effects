import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Composable for browser environment detection and utilities
 * Provides SSR-safe browser checks and common browser APIs
 */

/** Check if code is running in browser environment */
export const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined'

/** Check if code is running in SSR environment */
export const isSSR = !isBrowser

/**
 * Composable for browser-related utilities
 */
export const useBrowser = () => {
  const isClient = ref(false)
  const windowWidth = ref(0)
  const windowHeight = ref(0)
  const devicePixelRatio = ref(1)
  const isOnline = ref(true)
  const isMobile = ref(false)
  const isTouch = ref(false)

  const updateWindowSize = () => {
    if (!isBrowser) return
    windowWidth.value = window.innerWidth
    windowHeight.value = window.innerHeight
  }

  const updateDeviceInfo = () => {
    if (!isBrowser) return
    devicePixelRatio.value = window.devicePixelRatio || 1
    isMobile.value = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    isTouch.value = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  }

  const updateOnlineStatus = () => {
    if (!isBrowser) return
    isOnline.value = navigator.onLine
  }

  onMounted(() => {
    if (!isBrowser) return

    isClient.value = true
    updateWindowSize()
    updateDeviceInfo()
    updateOnlineStatus()

    window.addEventListener('resize', updateWindowSize)
    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)
  })

  onUnmounted(() => {
    if (!isBrowser) return

    window.removeEventListener('resize', updateWindowSize)
    window.removeEventListener('online', updateOnlineStatus)
    window.removeEventListener('offline', updateOnlineStatus)
  })

  return {
    isClient,
    isBrowser,
    isSSR,
    windowWidth,
    windowHeight,
    devicePixelRatio,
    isOnline,
    isMobile,
    isTouch,
  }
}

/**
 * Get element's bounding rect safely
 */
export const getElementRect = (element: HTMLElement | null): DOMRect | null => {
  if (!isBrowser || !element) return null
  return element.getBoundingClientRect()
}

/**
 * Safe requestAnimationFrame wrapper
 */
export const raf = (callback: FrameRequestCallback): number => {
  if (!isBrowser) return 0
  return requestAnimationFrame(callback)
}

/**
 * Safe cancelAnimationFrame wrapper
 */
export const cancelRaf = (id: number): void => {
  if (!isBrowser) return
  cancelAnimationFrame(id)
}
