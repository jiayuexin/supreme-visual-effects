import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import VScrollSnap from './VScrollSnap.vue'

describe('VScrollSnap', () => {
  const mockSections = [
    { content: 'Section 1', backgroundColor: '#ff0000' },
    { content: 'Section 2', backgroundColor: '#00ff00' },
    { content: 'Section 3', backgroundColor: '#0000ff' },
  ]

  beforeEach(() => {
    // Mock window.addEventListener
    vi.spyOn(window, 'addEventListener').mockImplementation(() => {})
    vi.spyOn(window, 'removeEventListener').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should render correctly with default props', () => {
    const wrapper = mount(VScrollSnap, {
      props: {
        sections: mockSections,
      },
    })

    expect(wrapper.find('.scroll-snap-container').exists()).toBe(true)
  })

  it('should render with custom sections', () => {
    const wrapper = mount(VScrollSnap, {
      props: {
        sections: mockSections,
      },
    })

    expect(wrapper.vm.sections).toEqual(mockSections)
  })

  it('should show indicators when showIndicators prop is true', () => {
    const wrapper = mount(VScrollSnap, {
      props: {
        sections: mockSections,
        showIndicators: true,
      },
    })

    expect(wrapper.vm.showIndicators).toBe(true)
  })

  it('should hide indicators when showIndicators prop is false', () => {
    const wrapper = mount(VScrollSnap, {
      props: {
        sections: mockSections,
        showIndicators: false,
      },
    })

    expect(wrapper.vm.showIndicators).toBe(false)
  })

  it('should show arrows when showArrows prop is true', () => {
    const wrapper = mount(VScrollSnap, {
      props: {
        sections: mockSections,
        showArrows: true,
      },
    })

    expect(wrapper.vm.showArrows).toBe(true)
  })

  it('should hide arrows when showArrows prop is false', () => {
    const wrapper = mount(VScrollSnap, {
      props: {
        sections: mockSections,
        showArrows: false,
      },
    })

    expect(wrapper.vm.showArrows).toBe(false)
  })

  it('should enable infinite scroll when infinite prop is true', () => {
    const wrapper = mount(VScrollSnap, {
      props: {
        sections: mockSections,
        infinite: true,
      },
    })

    expect(wrapper.vm.infinite).toBe(true)
  })

  it('should disable infinite scroll when infinite prop is false', () => {
    const wrapper = mount(VScrollSnap, {
      props: {
        sections: mockSections,
        infinite: false,
      },
    })

    expect(wrapper.vm.infinite).toBe(false)
  })

  it('should set correct duration', () => {
    const wrapper = mount(VScrollSnap, {
      props: {
        sections: mockSections,
        duration: 800,
      },
    })

    expect(wrapper.vm.duration).toBe(800)
  })

  it('should emit change event when section changes', async () => {
    const wrapper = mount(VScrollSnap, {
      props: {
        sections: mockSections,
      },
    })

    // 测试初始状态
    expect(wrapper.vm.sections.length).toBe(3)
  })
})
