import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import VImageComparison from '../../components/VImageComparison.vue'

describe('VImageComparison', () => {
  const beforeImage = 'https://example.com/before.jpg'
  const afterImage = 'https://example.com/after.jpg'

  it('should render correctly with default props', () => {
    const wrapper = mount(VImageComparison, {
      props: { beforeImage, afterImage },
    })
    expect(wrapper.find('.image-comparison-container').exists()).toBe(true)
  })

  it('should render with custom images', () => {
    const wrapper = mount(VImageComparison, {
      props: { beforeImage, afterImage },
    })
    expect(wrapper.vm.beforeImage).toBe(beforeImage)
    expect(wrapper.vm.afterImage).toBe(afterImage)
  })

  it('should render with custom labels', () => {
    const wrapper = mount(VImageComparison, {
      props: { beforeImage, afterImage, beforeLabel: 'Before', afterLabel: 'After' },
    })
    expect(wrapper.vm.beforeLabel).toBe('Before')
    expect(wrapper.vm.afterLabel).toBe('After')
  })

  it('should set correct initial position', () => {
    const wrapper = mount(VImageComparison, {
      props: { beforeImage, afterImage, initialPosition: 75 },
    })
    expect(wrapper.vm.initialPosition).toBe(75)
  })

  it('should set correct orientation', () => {
    const wrapper = mount(VImageComparison, {
      props: { beforeImage, afterImage, sliderSize: 8 },
    })
    expect(wrapper.vm.sliderSize).toBe(8)
  })
})
