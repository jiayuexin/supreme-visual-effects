import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import VTextMask from './VTextMask.vue'

describe('VTextMask', () => {
  it('should render correctly with default props', () => {
    const wrapper = mount(VTextMask, {
      props: {
        text: 'Hello World',
      },
    })
    
    expect(wrapper.find('svg').exists()).toBe(true)
    expect(wrapper.text()).toContain('Hello World')
  })

  it('should render with custom text', () => {
    const wrapper = mount(VTextMask, {
      props: {
        text: 'Custom Text',
      },
    })
    
    expect(wrapper.text()).toContain('Custom Text')
  })

  it('should render with custom path', () => {
    const customPath = 'M10 10 L50 50'
    const wrapper = mount(VTextMask, {
      props: {
        text: 'Path Text',
        path: customPath,
      },
    })
    
    expect(wrapper.find('path').attributes('d')).toBe(customPath)
  })

  it('should render with custom font size', () => {
    const wrapper = mount(VTextMask, {
      props: {
        text: 'Size Text',
        fontSize: '24px',
      },
    })
    
    expect(wrapper.vm.fontSize).toBe('24px')
  })

  it('should render with custom animation', async () => {
    const wrapper = mount(VTextMask, {
      props: {
        text: 'Animated Text',
        animation: true,
        duration: 2000,
      },
    })
    
    expect(wrapper.vm.animation).toBe(true)
    expect(wrapper.vm.duration).toBe(2000)
  })
})