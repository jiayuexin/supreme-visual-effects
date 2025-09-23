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
    vi.mocked(IntersectionObserver).mockImplementation(() => mockIntersectionObserver)
  })

  it('renders correctly', () => {
    const wrapper = mount(VScrollReveal, {
      slots: {
        default: 'Test content',
      },
    })

    expect(wrapper.text()).toBe('Test content')
    expect(wrapper.classes()).toContain('scroll-reveal')
  })

  it('shows content when visible', async () => {
    const wrapper = mount(VScrollReveal, {
      slots: {
        default: 'Test content',
      },
    })

    // Simulate intersection
    const callback = mockIntersectionObserver.observe.mock.calls[0][1]
    callback([{ isIntersecting: true }])

    await wrapper.vm.$nextTick()

    expect(wrapper.classes()).toContain('is-visible')
  })

  it('respects threshold prop', () => {
    mount(VScrollReveal, {
      props: {
        threshold: 0.5,
      },
    })

    expect(mockIntersectionObserver.observe).toHaveBeenCalledWith(
      expect.any(Element),
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
    const callback = mockIntersectionObserver.observe.mock.calls[0][1]
    callback([{ isIntersecting: true }])

    await wrapper.vm.$nextTick()

    expect(mockIntersectionObserver.disconnect).toHaveBeenCalled()
  })
})
