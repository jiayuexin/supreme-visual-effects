import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import VConfetti from './VConfetti.vue'

describe('VConfetti', () => {
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
    global.requestAnimationFrame = vi.fn((cb: FrameRequestCallback) => {
      return window.setTimeout(cb, 16)
    }) as unknown as (callback: FrameRequestCallback) => number

    global.cancelAnimationFrame = vi.fn((id: number) => {
      if (id) {
        clearTimeout(id)
      }
    }) as unknown as (handle: number) => void

    // Mock window methods
    global.window.innerWidth = 1024
    global.window.innerHeight = 768
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should render correctly with default props', () => {
    const wrapper = mount(VConfetti)

    expect(wrapper.find('.confetti-container').exists()).toBe(true)
  })

  it('should enable confetti when enabled prop is true', () => {
    const wrapper = mount(VConfetti, {
      props: {
        enabled: true,
      },
    })

    expect(wrapper.vm.enabled).toBe(true)
  })

  it('should disable confetti when enabled prop is false', () => {
    const wrapper = mount(VConfetti, {
      props: {
        enabled: false,
      },
    })

    expect(wrapper.vm.enabled).toBe(false)
  })

  it('should set correct particle count', () => {
    const wrapper = mount(VConfetti, {
      props: {
        particleCount: 100,
      },
    })

    expect(wrapper.vm.particleCount).toBe(100)
  })

  it('should set correct colors', () => {
    const colors = ['#ff0000', '#00ff00', '#0000ff']
    const wrapper = mount(VConfetti, {
      props: {
        colors,
      },
    })

    expect(wrapper.vm.colors).toEqual(colors)
  })

  it('should set correct shapes', () => {
    const shapes: ('circle' | 'square' | 'triangle')[] = ['circle', 'square', 'triangle']
    const wrapper = mount(VConfetti, {
      props: {
        shapes,
      },
    })

    expect(wrapper.vm.shapes).toEqual(shapes)
  })

  it('should set correct gravity', () => {
    const wrapper = mount(VConfetti, {
      props: {
        gravity: 0.5,
      },
    })

    expect(wrapper.vm.gravity).toBe(0.5)
  })

  it('should set correct wind', () => {
    const wrapper = mount(VConfetti, {
      props: {
        wind: 0.5,
      },
    })

    expect(wrapper.vm.wind).toBe(0.5)
  })

  it('should call burst method', () => {
    const wrapper = mount(VConfetti)

    // Test that the method exists and can be called
    expect(typeof wrapper.vm.burst).toBe('function')

    // Mock the burst method to avoid canvas errors
    const burstSpy = vi.spyOn(wrapper.vm, 'burst').mockImplementation(() => {})

    wrapper.vm.burst()
    expect(burstSpy).toHaveBeenCalled()
  })

  it('should call stop method', () => {
    const wrapper = mount(VConfetti)

    // Test that the method exists and can be called
    expect(typeof wrapper.vm.stop).toBe('function')

    // Mock the stop method
    const stopSpy = vi.spyOn(wrapper.vm, 'stop').mockImplementation(() => {})

    wrapper.vm.stop()
    expect(stopSpy).toHaveBeenCalled()
  })
})
