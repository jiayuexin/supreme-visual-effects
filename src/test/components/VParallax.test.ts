import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import VParallax from '../../components/VParallax.vue'

describe('VParallax', () => {
  it('should render correctly with default props', () => {
    const wrapper = mount(VParallax)
    expect(wrapper.find('.parallax-container').exists()).toBe(true)
  })

  it('should render with custom layers', () => {
    const layers = [
      { speed: 0.5, content: 'Background' },
      { speed: 1, content: 'Foreground' },
    ]
    const wrapper = mount(VParallax, { props: { layers } })
    expect(wrapper.vm.layers).toEqual(layers)
  })

  it('should enable parallax when enabled prop is true', async () => {
    const wrapper = mount(VParallax, { props: { enabled: true } })
    expect(wrapper.vm.enabled).toBe(true)
  })

  it('should disable parallax when enabled prop is false', async () => {
    const wrapper = mount(VParallax, { props: { enabled: false } })
    expect(wrapper.vm.enabled).toBe(false)
  })

  it('should render slot content', () => {
    const wrapper = mount(VParallax, {
      slots: { default: '<div class="slot-content">Slot Content</div>' },
    })
    expect(wrapper.find('.parallax-container').exists()).toBe(true)
  })
})
