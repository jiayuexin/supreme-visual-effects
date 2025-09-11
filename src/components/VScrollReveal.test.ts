import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import VScrollReveal from './VScrollReveal.vue'

describe('VScrollReveal', () => {
  it('renders slot content', () => {
    const wrapper = mount(VScrollReveal, {
      slots: {
        default: '<p>hello</p>'
      }
    })
    expect(wrapper.text()).toContain('hello')
  })
})