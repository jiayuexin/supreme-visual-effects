import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import VCarousel3D from '../../components/VCarousel3D.vue'

describe('VCarousel3D', () => {
  const mockItems = [
    { title: 'Item 1', image: 'image1.jpg' },
    { title: 'Item 2', image: 'image2.jpg' },
    { title: 'Item 3', image: 'image3.jpg' },
  ]

  it('should render correctly with default props', () => {
    const wrapper = mount(VCarousel3D, {
      props: {
        items: mockItems,
      },
    })

    expect(wrapper.find('.carousel-3d-container').exists()).toBe(true)
  })

  it('should render with custom items', () => {
    const wrapper = mount(VCarousel3D, {
      props: {
        items: mockItems,
      },
    })

    expect(wrapper.vm.items).toEqual(mockItems)
  })

  it('should enable auto play when autoPlay prop is true', () => {
    const wrapper = mount(VCarousel3D, {
      props: {
        items: mockItems,
        autoPlay: true,
      },
    })

    expect(wrapper.vm.autoPlay).toBe(true)
  })

  it('should disable auto play when autoPlay prop is false', () => {
    const wrapper = mount(VCarousel3D, {
      props: {
        items: mockItems,
        autoPlay: false,
      },
    })

    expect(wrapper.vm.autoPlay).toBe(false)
  })

  it('should show arrows when showArrows prop is true', () => {
    const wrapper = mount(VCarousel3D, {
      props: {
        items: mockItems,
        showArrows: true,
      },
    })

    expect(wrapper.vm.showArrows).toBe(true)
  })

  it('should show indicators when showIndicators prop is true', () => {
    const wrapper = mount(VCarousel3D, {
      props: {
        items: mockItems,
        showIndicators: true,
      },
    })

    expect(wrapper.vm.showIndicators).toBe(true)
  })

  it('should set correct rotationY', () => {
    const wrapper = mount(VCarousel3D, {
      props: {
        items: mockItems,
        rotationY: 90,
      },
    })

    expect(wrapper.vm.rotationY).toBe(90)
  })

  it('should emit update:currentIndex event when current index changes', async () => {
    const wrapper = mount(VCarousel3D, {
      props: {
        items: mockItems,
      },
    })

    wrapper.vm.goToNext()
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('update:currentIndex')).toBeTruthy()
  })
})
