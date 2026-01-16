import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Composable for detecting user's reduced motion preference
 * Respects the prefers-reduced-motion media query for accessibility
 */
export const useReducedMotion = () => {
  const prefersReducedMotion = ref(false)
  const isBrowser = typeof window !== 'undefined'

  let mediaQuery: MediaQueryList | null = null

  const updateMotionPreference = (e: MediaQueryListEvent | MediaQueryList) => {
    prefersReducedMotion.value = e.matches
  }

  onMounted(() => {
    if (!isBrowser) return

    try {
      mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      if (mediaQuery) {
        prefersReducedMotion.value = mediaQuery.matches
        mediaQuery.addEventListener('change', updateMotionPreference)
      }
    } catch {
      // matchMedia not supported or returned null (e.g., in test environment)
      prefersReducedMotion.value = false
    }
  })

  onUnmounted(() => {
    if (!isBrowser || !mediaQuery) return
    try {
      mediaQuery.removeEventListener('change', updateMotionPreference)
    } catch {
      // Ignore cleanup errors
    }
  })

  return {
    prefersReducedMotion,
  }
}

/**
 * Non-reactive version for immediate checks (useful in setup or computed)
 */
export const checkReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false
  try {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    return mediaQuery?.matches ?? false
  } catch {
    return false
  }
}
