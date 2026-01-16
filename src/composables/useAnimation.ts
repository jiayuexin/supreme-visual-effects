import { ref, onUnmounted, type Ref } from 'vue'
import { isBrowser, raf, cancelRaf } from './useBrowser'

export interface AnimationOptions {
  /** Whether to start animation immediately */
  autoStart?: boolean
  /** Animation loop callback */
  onFrame?: (timestamp: number, deltaTime: number) => void
  /** Callback when animation starts */
  onStart?: () => void
  /** Callback when animation stops */
  onStop?: () => void
}

export interface AnimationControls {
  /** Whether animation is currently running */
  isRunning: Ref<boolean>
  /** Current frame timestamp */
  timestamp: Ref<number>
  /** Delta time since last frame (ms) */
  deltaTime: Ref<number>
  /** Frames per second */
  fps: Ref<number>
  /** Start the animation loop */
  start: () => void
  /** Stop the animation loop */
  stop: () => void
  /** Pause the animation (can be resumed) */
  pause: () => void
  /** Resume a paused animation */
  resume: () => void
  /** Toggle animation state */
  toggle: () => void
}

/**
 * Composable for managing requestAnimationFrame loops
 * Provides FPS tracking, pause/resume, and automatic cleanup
 */
export const useAnimation = (options: AnimationOptions = {}): AnimationControls => {
  const { autoStart = false, onFrame, onStart, onStop } = options

  const isRunning = ref(false)
  const isPaused = ref(false)
  const timestamp = ref(0)
  const deltaTime = ref(0)
  const fps = ref(0)

  let animationId: number | null = null
  let lastTimestamp = 0
  let fpsFrameCount = 0
  let fpsLastTime = 0

  const animate = (currentTimestamp: number) => {
    if (!isRunning.value || isPaused.value) return

    // Calculate delta time
    if (lastTimestamp === 0) {
      lastTimestamp = currentTimestamp
      fpsLastTime = currentTimestamp
    }

    deltaTime.value = currentTimestamp - lastTimestamp
    timestamp.value = currentTimestamp
    lastTimestamp = currentTimestamp

    // Calculate FPS (update every second)
    fpsFrameCount++
    if (currentTimestamp - fpsLastTime >= 1000) {
      fps.value = Math.round((fpsFrameCount * 1000) / (currentTimestamp - fpsLastTime))
      fpsFrameCount = 0
      fpsLastTime = currentTimestamp
    }

    // Call user callback
    onFrame?.(currentTimestamp, deltaTime.value)

    // Continue loop
    animationId = raf(animate)
  }

  const start = () => {
    if (!isBrowser || isRunning.value) return

    isRunning.value = true
    isPaused.value = false
    lastTimestamp = 0
    fpsFrameCount = 0
    fpsLastTime = 0

    onStart?.()
    animationId = raf(animate)
  }

  const stop = () => {
    if (!isBrowser) return

    isRunning.value = false
    isPaused.value = false

    if (animationId !== null) {
      cancelRaf(animationId)
      animationId = null
    }

    // Reset values
    timestamp.value = 0
    deltaTime.value = 0
    fps.value = 0
    lastTimestamp = 0

    onStop?.()
  }

  const pause = () => {
    if (!isRunning.value || isPaused.value) return
    isPaused.value = true

    if (animationId !== null) {
      cancelRaf(animationId)
      animationId = null
    }
  }

  const resume = () => {
    if (!isRunning.value || !isPaused.value) return
    isPaused.value = false
    lastTimestamp = 0 // Reset to avoid large delta
    animationId = raf(animate)
  }

  const toggle = () => {
    if (isRunning.value) {
      if (isPaused.value) {
        resume()
      } else {
        pause()
      }
    } else {
      start()
    }
  }

  // Auto start if requested
  if (autoStart && isBrowser) {
    // Use setTimeout to ensure it runs after component is mounted
    // Check if requestAnimationFrame is available (not in all test environments)
    if (typeof requestAnimationFrame !== 'undefined') {
      setTimeout(start, 0)
    }
  }

  // Cleanup on unmount
  onUnmounted(() => {
    stop()
  })

  return {
    isRunning,
    timestamp,
    deltaTime,
    fps,
    start,
    stop,
    pause,
    resume,
    toggle,
  }
}

/**
 * Easing functions for animations
 */
export const easings = {
  linear: (t: number) => t,
  easeIn: (t: number) => t * t,
  easeOut: (t: number) => t * (2 - t),
  easeInOut: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  easeInCubic: (t: number) => t * t * t,
  easeOutCubic: (t: number) => --t * t * t + 1,
  easeInOutCubic: (t: number) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1),
  easeInQuart: (t: number) => t * t * t * t,
  easeOutQuart: (t: number) => 1 - --t * t * t * t,
  easeInOutQuart: (t: number) => (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t),
  easeInElastic: (t: number) => {
    const c4 = (2 * Math.PI) / 3
    return t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c4)
  },
  easeOutElastic: (t: number) => {
    const c4 = (2 * Math.PI) / 3
    return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1
  },
  easeOutBounce: (t: number) => {
    const n1 = 7.5625
    const d1 = 2.75
    if (t < 1 / d1) {
      return n1 * t * t
    } else if (t < 2 / d1) {
      return n1 * (t -= 1.5 / d1) * t + 0.75
    } else if (t < 2.5 / d1) {
      return n1 * (t -= 2.25 / d1) * t + 0.9375
    } else {
      return n1 * (t -= 2.625 / d1) * t + 0.984375
    }
  },
}

export type EasingFunction = (t: number) => number
export type EasingName = keyof typeof easings
