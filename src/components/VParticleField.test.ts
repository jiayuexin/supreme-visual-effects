import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import VParticleField from './VParticleField.vue'

describe('VParticleField', () => {
  // Mock the canvas API
  beforeEach(() => {
    // Mock canvas getContext
    const mockGetContext = vi.fn().mockImplementation(() => ({
      fillRect: vi.fn(),
      beginPath: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      closePath: vi.fn(),
      fill: vi.fn(),
      save: vi.fn(),
      restore: vi.fn(),
      translate: vi.fn(),
      rotate: vi.fn(),
      clearRect: vi.fn(),
      arc: vi.fn(),
    }))

    global.HTMLCanvasElement.prototype.getContext = mockGetContext

    // Mock requestAnimationFrame
    global.requestAnimationFrame = vi.fn(cb => setTimeout(cb, 16))
    global.cancelAnimationFrame = vi.fn(id => clearTimeout(id))
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should render canvas element', () => {
    const wrapper = mount(VParticleField)
    expect(wrapper.find('canvas').exists()).toBe(true)
  })
})
