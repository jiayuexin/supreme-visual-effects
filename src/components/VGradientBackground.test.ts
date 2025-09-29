import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import VGradientBackground from './VGradientBackground.vue'

describe('VGradientBackground', () => {
  it('should render correctly with default props', () => {
    const wrapper = mount(VGradientBackground, {
      slots: {
        default: '<div>Content</div>',
      },
    })

    expect(wrapper.find('.gradient-background').exists()).toBe(true)
    expect(wrapper.text()).toContain('Content')
  })

  it('should render with custom layers', () => {
    const layers = [
      {
        type: 'linear',
        direction: '45deg',
        stops: [
          { color: '#ff0000', position: 0 },
          { color: '#0000ff', position: 100 },
        ],
      },
    ]

    const wrapper = mount(VGradientBackground, {
      props: {
        layers,
      },
      slots: {
        default: '<div>Content</div>',
      },
    })

    expect(wrapper.vm.layers).toEqual(layers)
  })

  it('should enable animation when animation prop is true', async () => {
    const wrapper = mount(VGradientBackground, {
      props: {
        animation: true,
      },
      slots: {
        default: '<div>Content</div>',
      },
    })

    expect(wrapper.vm.animation).toBe(true)
  })

  it('should disable animation when animation prop is false', async () => {
    const wrapper = mount(VGradientBackground, {
      props: {
        animation: false,
      },
      slots: {
        default: '<div>Content</div>',
      },
    })

    expect(wrapper.vm.animation).toBe(false)
  })
})
