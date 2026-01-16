import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import VConfetti from '../../components/VConfetti.vue'

describe('VConfetti', () => {
  beforeEach(() => {
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

    global.requestAnimationFrame = vi.fn((cb: FrameRequestCallback) => {
      return window.setTimeout(cb, 16)
    }) as unknown as (callback: FrameRequestCallback) => number

    global.cancelAnimationFrame = vi.fn((id: number) => {
      if (id) {
        clearTimeout(id)
      }
    }) as unknown as (handle: number) => void

    global.window.innerWidth = 1024
    global.window.innerHeight = 768
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  const defaultProps = {
    enabled: true,
    particleCount: 100,
    colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'],
    shapes: ['circle', 'square', 'triangle'],
    gravity: 0.3,
    wind: 0.1,
    speed: 5,
    spread: 45,
    size: 8,
    duration: 3000,
    burst: true,
    continuous: false,
    continuousInterval: 1000,
    position: 'top',
    direction: 'up',
  }

  it('should render correctly with default props', () => {
    const wrapper = mount(VConfetti, {
      props: defaultProps,
    })

    expect(wrapper.find('.confetti-container').exists()).toBe(true)
  })

  it('should enable confetti when enabled prop is true', () => {
    const wrapper = mount(VConfetti, {
      props: {
        ...defaultProps,
        enabled: true,
      },
    })

    expect(wrapper.vm.enabled).toBe(true)
  })

  it('should disable confetti when enabled prop is false', () => {
    const wrapper = mount(VConfetti, {
      props: {
        ...defaultProps,
        enabled: false,
      },
    })

    expect(wrapper.vm.enabled).toBe(false)
  })

  it('should set correct particle count', () => {
    const wrapper = mount(VConfetti, {
      props: {
        ...defaultProps,
        particleCount: 100,
      },
    })

    expect(wrapper.vm.particleCount).toBe(100)
  })

  it('should set correct colors', () => {
    const colors = ['#ff0000', '#00ff00', '#0000ff']
    const wrapper = mount(VConfetti, {
      props: {
        ...defaultProps,
        colors,
      },
    })

    expect(wrapper.vm.colors).toEqual(colors)
  })

  it('should set correct shapes', () => {
    const shapes: ('circle' | 'square' | 'triangle')[] = ['circle', 'square', 'triangle']
    const wrapper = mount(VConfetti, {
      props: {
        ...defaultProps,
        shapes,
      },
    })

    expect(wrapper.vm.shapes).toEqual(shapes)
  })

  it('should set correct gravity', () => {
    const wrapper = mount(VConfetti, {
      props: {
        ...defaultProps,
        gravity: 0.5,
      },
    })

    expect(wrapper.vm.gravity).toBe(0.5)
  })

  it('should set correct wind', () => {
    const wrapper = mount(VConfetti, {
      props: {
        ...defaultProps,
        wind: 0.5,
      },
    })

    expect(wrapper.vm.wind).toBe(0.5)
  })

  it('should have burst method exposed', () => {
    const wrapper = mount(VConfetti, {
      props: defaultProps,
    })

    expect(typeof wrapper.vm.burst).toBe('function')
  })

  it('should have stop method exposed', () => {
    const wrapper = mount(VConfetti, {
      props: defaultProps,
    })

    expect(typeof wrapper.vm.stop).toBe('function')
  })
})
