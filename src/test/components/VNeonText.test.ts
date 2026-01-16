import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import VNeonText from '../../components/VNeonText.vue'

describe('VNeonText', () => {
  it('should render correctly with default props', () => {
    const wrapper = mount(VNeonText, { props: { text: 'Neon Text' } })
    expect(wrapper.find('.neon-text').exists()).toBe(true)
    expect(wrapper.text()).toContain('Neon Text')
  })

  it('should render with custom text', () => {
    const wrapper = mount(VNeonText, { props: { text: 'Custom Neon Text' } })
    expect(wrapper.text()).toContain('Custom Neon Text')
  })

  it('should enable animation when animation prop is true', () => {
    const wrapper = mount(VNeonText, { props: { text: 'Animated Text', animation: true } })
    expect(wrapper.vm.animation).toBe(true)
  })

  it('should set correct color and glow color', () => {
    const wrapper = mount(VNeonText, {
      props: { text: 'Colored Text', color: '#ff0000', glowColor: '#0000ff' },
    })
    expect(wrapper.vm.color).toBe('#ff0000')
    expect(wrapper.vm.glowColor).toBe('#0000ff')
  })

  it('should set correct animation type', () => {
    const wrapper = mount(VNeonText, { props: { text: 'Pulsing Text', animationType: 'pulse' } })
    expect(wrapper.vm.animationType).toBe('pulse')
  })

  it('should set correct glow intensity', () => {
    const wrapper = mount(VNeonText, { props: { text: 'Intense Text', glowIntensity: 20 } })
    expect(wrapper.vm.glowIntensity).toBe(20)
  })
})
