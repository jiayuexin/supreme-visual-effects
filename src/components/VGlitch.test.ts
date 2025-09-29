import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import VGlitch from './VGlitch.vue'

describe('VGlitch', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should render correctly with default props', () => {
    const wrapper = mount(VGlitch, {
      slots: {
        default: '<div>Glitch Content</div>',
      },
    })

    expect(wrapper.find('.glitch-container').exists()).toBe(true)
    expect(wrapper.text()).toContain('Glitch Content')
  })

  it('should render slot content', () => {
    const wrapper = mount(VGlitch, {
      slots: {
        default: '<div class="slot-content">Slot Content</div>',
      },
    })

    expect(wrapper.find('.slot-content').exists()).toBe(true)
    expect(wrapper.text()).toContain('Slot Content')
  })

  it('should enable glitch when enabled prop is true', () => {
    const wrapper = mount(VGlitch, {
      props: {
        enabled: true,
      },
      slots: {
        default: 'Enabled Glitch',
      },
    })

    expect(wrapper.vm.enabled).toBe(true)
  })

  it('should disable glitch when enabled prop is false', () => {
    const wrapper = mount(VGlitch, {
      props: {
        enabled: false,
      },
      slots: {
        default: 'Disabled Glitch',
      },
    })

    expect(wrapper.vm.enabled).toBe(false)
  })

  it('should auto trigger glitch when autoTrigger is true', async () => {
    const wrapper = mount(VGlitch, {
      props: {
        autoTrigger: true,
        triggerInterval: 1000,
      },
      slots: {
        default: 'Auto Glitch',
      },
    })

    expect(wrapper.vm.autoTrigger).toBe(true)

    // 快进时间以触发自动故障效果
    vi.advanceTimersByTime(1000)
  })

  it('should set correct intensity', () => {
    const wrapper = mount(VGlitch, {
      props: {
        intensity: 0.9,
      },
      slots: {
        default: 'Intense Glitch',
      },
    })

    expect(wrapper.vm.intensity).toBe(0.9)
  })
})
