import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import VParticleField from '../components/VParticleField.vue'

describe('VParticleField', () => {
  let mockCanvas: any
  let mockContext: any

  beforeEach(() => {
    mockContext = {
      clearRect: vi.fn(),
      beginPath: vi.fn(),
      arc: vi.fn(),
      fill: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      stroke: vi.fn(),
    }

    mockCanvas = {
      getContext: vi.fn().mockReturnValue(mockContext),
      width: 800,
      height: 600,
      getBoundingClientRect: vi.fn().mockReturnValue({
        width: 800,
        height: 600,
      }),
    }

    // Mock canvas element
    vi.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
      if (tagName === 'canvas') {
        return mockCanvas
      }
      return document.createElement(tagName)
    })

    // Mock getBoundingClientRect for parent element
    vi.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({
      width: 800,
      height: 600,
      top: 0,
      left: 0,
      bottom: 600,
      right: 800,
      x: 0,
      y: 0,
      toJSON: vi.fn(),
    })
  })

  it('renders canvas element', () => {
    const wrapper = mount(VParticleField)

    expect(wrapper.find('canvas').exists()).toBe(true)
    expect(wrapper.find('canvas').classes()).toContain('particle-field')
  })

  it('initializes with default props', () => {
    const wrapper = mount(VParticleField)

    expect(wrapper.props()).toMatchObject({
      particleCount: 100,
      particleColor: 'rgba(255, 255, 255, 0.8)',
      lineColor: 'rgba(255, 255, 255, 0.2)',
      speed: 0.5,
      maxDistance: 120,
    })
  })

  it('accepts custom props', () => {
    const wrapper = mount(VParticleField, {
      props: {
        particleCount: 50,
        speed: 1.0,
        particleColor: '#ff0000',
      },
    })

    expect(wrapper.props('particleCount')).toBe(50)
    expect(wrapper.props('speed')).toBe(1.0)
    expect(wrapper.props('particleColor')).toBe('#ff0000')
  })

  it('handles window resize', () => {
    // const _wrapper = mount(VParticleField)

    // Trigger resize event
    window.dispatchEvent(new Event('resize'))

    // Canvas should be resized
    expect(mockCanvas.width).toBe(800)
    expect(mockCanvas.height).toBe(600)
  })

  it('cleans up on unmount', () => {
    const _wrapper = mount(VParticleField)
    const cancelAnimationFrameSpy = vi.spyOn(window, 'cancelAnimationFrame')

    _wrapper.unmount()

    expect(cancelAnimationFrameSpy).toHaveBeenCalled()
  })
})
