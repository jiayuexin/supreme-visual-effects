import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import VStarfield from './VStarfield.vue'

describe('VStarfield', () => {
  beforeEach(() => {
    // Mock canvas getContext
    const mockGetContext = vi.fn().mockImplementation(() => ({
      fillRect: vi.fn(),
      beginPath: vi.fn(),
      arc: vi.fn(),
      fill: vi.fn(),
      save: vi.fn(),
      restore: vi.fn(),
      closePath: vi.fn(),
    }))

    global.HTMLCanvasElement.prototype.getContext = mockGetContext

    // Mock getBoundingClientRect
    global.Element.prototype.getBoundingClientRect = vi.fn().mockReturnValue({
      x: 0,
      y: 0,
      width: 800,
      height: 600,
      top: 0,
      left: 0,
      bottom: 600,
      right: 800,
      toJSON: vi.fn(),
    })

    // Mock requestAnimationFrame
    global.requestAnimationFrame = vi.fn(cb => setTimeout(cb, 16))
    global.cancelAnimationFrame = vi.fn(id => clearTimeout(id))

    // Mock window.addEventListener
    vi.spyOn(window, 'addEventListener').mockImplementation(() => {})
    vi.spyOn(window, 'removeEventListener').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should render correctly with default props', () => {
    const wrapper = mount(VStarfield)

    expect(wrapper.find('canvas').exists()).toBe(true)
  })

  it('should set correct star count', () => {
    const wrapper = mount(VStarfield, {
      props: {
        starCount: 200,
      },
    })

    expect(wrapper.vm.starCount).toBe(200)
  })

  it('should set correct speed', () => {
    const wrapper = mount(VStarfield, {
      props: {
        speed: 0.8,
      },
    })

    expect(wrapper.vm.speed).toBe(0.8)
  })

  it('should enable mouse interaction when mouseInteraction prop is true', () => {
    const wrapper = mount(VStarfield, {
      props: {
        mouseInteraction: true,
      },
    })

    expect(wrapper.vm.mouseInteraction).toBe(true)
  })

  it('should disable mouse interaction when mouseInteraction prop is false', () => {
    const wrapper = mount(VStarfield, {
      props: {
        mouseInteraction: false,
      },
    })

    expect(wrapper.vm.mouseInteraction).toBe(false)
  })

  it('should set correct depth', () => {
    const wrapper = mount(VStarfield, {
      props: {
        depth: 2000,
      },
    })

    expect(wrapper.vm.depth).toBe(2000)
  })

  it('should set correct color', () => {
    const wrapper = mount(VStarfield, {
      props: {
        starColor: '#ffffff',
      },
    })

    expect(wrapper.vm.starColor).toBe('#ffffff')
  })
})
