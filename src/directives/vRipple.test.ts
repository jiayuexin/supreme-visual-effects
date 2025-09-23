import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { VRipple } from './vRipple'

const TestComponent = {
  template: '<button v-ripple>Click</button>',
  directives: { ripple: VRipple },
}

describe('VRipple Directive', () => {
  it('mounts and adds ripple on click', async () => {
    const wrapper = mount(TestComponent)
    expect(wrapper.exists()).toBe(true)
    await wrapper.trigger('mousedown', { clientX: 10, clientY: 10 })
    // after triggering, a ripple span should be appended
    const spans = wrapper.findAll('span')
    expect(spans.length).toBe(1)
  })
})
