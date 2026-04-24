import { config } from '@vue/test-utils'
import { vi } from 'vitest'

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock requestAnimationFrame
global.requestAnimationFrame = vi.fn((callback: FrameRequestCallback) => {
  if (typeof callback === 'function') {
    return window.setTimeout(() => callback(Date.now()), 16)
  }
  return 0
}) as unknown as (callback: FrameRequestCallback) => number

global.cancelAnimationFrame = vi.fn((id: number) => {
  if (id) {
    clearTimeout(id)
  }
}) as unknown as (handle: number) => void

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: unknown) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Global test configuration
config.global.stubs = {}
config.global.mocks = {
  $t: (key: string) => key,
}
