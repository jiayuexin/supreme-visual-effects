import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import VDivider from '../../components/VDivider.vue'

describe('VDivider', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should render correctly with default props', () => {
    const wrapper = mount(VDivider)
    expect(wrapper.find('.divider-container').exists()).toBe(true)
  })

  it('should render wave type divider', () => {
    const wrapper = mount(VDivider, { props: { type: 'wave' } })
    expect(wrapper.vm.type).toBe('wave')
  })

  it('should render dots type divider', () => {
    const wrapper = mount(VDivider, { props: { type: 'dots' } })
    expect(wrapper.vm.type).toBe('dots')
  })

  it('should render gradient type divider', () => {
    const wrapper = mount(VDivider, { props: { type: 'gradient' } })
    expect(wrapper.vm.type).toBe('gradient')
  })

  it('should enable animation when animation prop is true', () => {
    const wrapper = mount(VDivider, { props: { animation: true } })
    expect(wrapper.vm.animation).toBe(true)
  })

  it('should disable animation when animation prop is false', () => {
    const wrapper = mount(VDivider, { props: { animation: false } })
    expect(wrapper.vm.animation).toBe(false)
  })

  it('should set correct color', () => {
    const wrapper = mount(VDivider, { props: { color: '#ff0000' } })
    expect(wrapper.vm.color).toBe('#ff0000')
  })

  it('should set correct height', () => {
    const wrapper = mount(VDivider, { props: { height: '10px' } })
    expect(wrapper.vm.height).toBe('10px')
  })

  it('should set correct dot count for dots type', () => {
    const wrapper = mount(VDivider, { props: { type: 'dots', dotCount: 10 } })
    expect(wrapper.vm.dotCount).toBe(10)
  })

  it('should set correct gradient colors for gradient type', () => {
    const gradientColors = ['#ff0000', '#0000ff']
    const wrapper = mount(VDivider, { props: { type: 'gradient', gradientColors } })
    expect(wrapper.vm.gradientColors).toEqual(gradientColors)
  })
})
