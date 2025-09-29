import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import VMagneticButton from './VMagneticButton.vue'

describe('VMagneticButton', () => {
  it('should render correctly with default props', () => {
    const wrapper = mount(VMagneticButton, {
      slots: {
        default: 'Magnetic Button',
      },
    })

    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.text()).toContain('Magnetic Button')
  })

  it('should render with custom content', () => {
    const wrapper = mount(VMagneticButton, {
      slots: {
        default: 'Custom Content',
      },
    })

    expect(wrapper.text()).toContain('Custom Content')
  })

  it('should set correct magnetic strength', () => {
    const wrapper = mount(VMagneticButton, {
      props: {
        magneticStrength: 0.8,
      },
      slots: {
        default: 'Strong Magnet',
      },
    })

    expect(wrapper.vm.magneticStrength).toBe(0.8)
  })

  it('should set correct magnetic range', () => {
    const wrapper = mount(VMagneticButton, {
      props: {
        magneticRange: 150,
      },
      slots: {
        default: 'Wide Range',
      },
    })

    expect(wrapper.vm.magneticRange).toBe(150)
  })

  it('should enable ripple effect when ripple prop is true', () => {
    const wrapper = mount(VMagneticButton, {
      props: {
        ripple: true,
      },
      slots: {
        default: 'Ripple Button',
      },
    })

    expect(wrapper.vm.ripple).toBe(true)
  })

  it('should emit click event when clicked', async () => {
    const wrapper = mount(VMagneticButton, {
      slots: {
        default: 'Click Me',
      },
    })

    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })
})
