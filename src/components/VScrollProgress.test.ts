import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import VScrollProgress from './VScrollProgress.vue'

describe('VScrollProgress', () => {
  it('should render correctly with default props', () => {
    const wrapper = mount(VScrollProgress)

    expect(wrapper.find('.scroll-progress-container').exists()).toBe(true)
  })

  it('should render at top position', () => {
    const wrapper = mount(VScrollProgress, {
      props: {
        position: 'top',
      },
    })

    expect(wrapper.vm.position).toBe('top')
  })

  it('should render at bottom position', () => {
    const wrapper = mount(VScrollProgress, {
      props: {
        position: 'bottom',
      },
    })

    expect(wrapper.vm.position).toBe('bottom')
  })

  it('should set correct color', () => {
    const wrapper = mount(VScrollProgress, {
      props: {
        color: '#ff0000',
      },
    })

    expect(wrapper.vm.color).toBe('#ff0000')
  })

  it('should show percentage when showPercentage prop is true', () => {
    const wrapper = mount(VScrollProgress, {
      props: {
        showPercentage: true,
      },
    })

    expect(wrapper.vm.showPercentage).toBe(true)
  })

  it('should hide percentage when showPercentage prop is false', () => {
    const wrapper = mount(VScrollProgress, {
      props: {
        showPercentage: false,
      },
    })

    expect(wrapper.vm.showPercentage).toBe(false)
  })

  it('should enable glow effect when glow prop is true', () => {
    const wrapper = mount(VScrollProgress, {
      props: {
        glow: true,
      },
    })

    expect(wrapper.vm.glow).toBe(true)
  })

  it('should disable glow effect when glow prop is false', () => {
    const wrapper = mount(VScrollProgress, {
      props: {
        glow: false,
      },
    })

    expect(wrapper.vm.glow).toBe(false)
  })

  it('should set correct height', () => {
    const wrapper = mount(VScrollProgress, {
      props: {
        height: '8px',
      },
    })

    expect(wrapper.vm.height).toBe('8px')
  })

  it('should set correct target element', () => {
    const targetElement = '.content'
    const wrapper = mount(VScrollProgress, {
      props: {
        target: targetElement,
      },
    })

    expect(wrapper.vm.target).toBe(targetElement)
  })
})
