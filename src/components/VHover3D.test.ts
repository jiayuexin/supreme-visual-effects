import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import VHover3D from './VHover3D.vue'

describe('VHover3D', () => {
  it('should render correctly with default props', () => {
    const wrapper = mount(VHover3D, {
      slots: {
        default: '<div>Hover Content</div>'
      }
    })
    
    expect(wrapper.find('.hover-3d').exists()).toBe(true)
    expect(wrapper.text()).toContain('Hover Content')
  })

  it('should render slot content', () => {
    const wrapper = mount(VHover3D, {
      slots: {
        default: '<div class="slot-content">Slot Content</div>'
      }
    })
    
    expect(wrapper.find('.slot-content').exists()).toBe(true)
    expect(wrapper.text()).toContain('Slot Content')
  })

  it('should set correct intensity', () => {
    const wrapper = mount(VHover3D, {
      props: {
        intensity: 30
      },
      slots: {
        default: 'High Intensity'
      }
    })
    
    expect(wrapper.vm.intensity).toBe(30)
  })

  it('should set correct scale', () => {
    const wrapper = mount(VHover3D, {
      props: {
        scale: 1.2
      },
      slots: {
        default: 'Scaled Content'
      }
    })
    
    expect(wrapper.vm.scale).toBe(1.2)
  })

  it('should enable perspective when perspective prop is true', () => {
    const wrapper = mount(VHover3D, {
      props: {
        perspective: true
      },
      slots: {
        default: 'Perspective Content'
      }
    })
    
    expect(wrapper.vm.perspective).toBe(true)
  })
})