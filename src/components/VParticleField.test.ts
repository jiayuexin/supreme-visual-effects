import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import VParticleField from './VParticleField.vue'

describe('VParticleField', () => {
  it('should render canvas element', () => {
    const wrapper = mount(VParticleField)
    expect(wrapper.find('canvas').exists()).toBe(true)
  })
})