// Browser utilities
export { useBrowser, isBrowser, isSSR, getElementRect, raf, cancelRaf } from './useBrowser'

// Animation utilities
export {
  useAnimation,
  easings,
  type AnimationOptions,
  type AnimationControls,
  type EasingFunction,
  type EasingName,
} from './useAnimation'

// Intersection Observer
export {
  useIntersectionObserver,
  isIntersectionObserverSupported,
  type IntersectionObserverOptions,
  type IntersectionObserverReturn,
} from './useIntersectionObserver'

// Resize Observer
export {
  useResizeObserver,
  useWindowResize,
  isResizeObserverSupported,
  type ResizeObserverOptions,
  type ResizeObserverReturn,
} from './useResizeObserver'

// Reduced Motion
export { useReducedMotion, checkReducedMotion } from './useReducedMotion'
