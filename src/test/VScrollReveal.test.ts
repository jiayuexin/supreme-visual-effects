import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import VScrollReveal from '../components/VScrollReveal.vue'

describe('VScrollReveal', () => {
  let mockIntersectionObserver: any

  beforeEach(() => {
    mockIntersectionObserver = {
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }

    // Mock IntersectionObserver
    global.IntersectionObserver = vi.fn().mockImplementation(() => mockIntersectionObserver)
  })

  it('renders correctly', () => {
    const wrapper = mount(VScrollReveal, {
      slots: {
        default: 'Test content',
      },
    })

    expect(wrapper.text()).toBe('Test content')
    expect(wrapper.find('div').classes()).toContain('scroll-reveal')
  })

  it('shows content when visible', async () => {
    const wrapper = mount(VScrollReveal, {
      slots: {
        default: 'Test content',
      },
    })

    // Simulate intersection
    const callback = (global.IntersectionObserver as any).mock.calls[0][0]
    callback([{ isIntersecting: true }])

    await wrapper.vm.$nextTick()

    expect(wrapper.find('div').classes()).toContain('is-visible')
  })

  it('respects threshold prop', () => {
    mount(VScrollReveal, {
      props: {
        threshold: 0.5,
      },
    })

    expect(global.IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({
        threshold: 0.5,
      })
    )
  })

  it('respects once prop', async () => {
    const wrapper = mount(VScrollReveal, {
      props: {
        once: true,
      },
    })

    // Simulate intersection
    const callback = (global.IntersectionObserver as any).mock.calls[0][0]
    callback([{ isIntersecting: true }])

    await wrapper.vm.$nextTick()

    expect(mockIntersectionObserver.disconnect).toHaveBeenCalled()
  })
})
