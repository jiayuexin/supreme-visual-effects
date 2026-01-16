import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import VLightbox from '../../components/VLightbox.vue'

describe('VLightbox', () => {
  const mockImages = [
    { src: 'image1.jpg', caption: 'Image 1' },
    { src: 'image2.jpg', caption: 'Image 2' },
    { src: 'image3.jpg', caption: 'Image 3' },
  ]

  it('should render correctly with default props', () => {
    const wrapper = mount(VLightbox, {
      props: { items: mockImages, isOpen: true },
      global: { stubs: { teleport: true } },
    })
    expect(wrapper.find('.lightbox-overlay').exists()).toBe(true)
  })

  it('should render with custom images', () => {
    const wrapper = mount(VLightbox, {
      props: { items: mockImages, isOpen: true },
    })
    expect(wrapper.vm.items).toEqual(mockImages)
  })

  it('should show navigation when showNavigation prop is true', () => {
    const wrapper = mount(VLightbox, {
      props: { items: mockImages, isOpen: true, showNavigation: true },
    })
    expect(wrapper.vm.showNavigation).toBe(true)
  })

  it('should hide navigation when showNavigation prop is false', () => {
    const wrapper = mount(VLightbox, {
      props: { items: mockImages, isOpen: true, showNavigation: false },
    })
    expect(wrapper.vm.showNavigation).toBe(false)
  })

  it('should set correct animation type', () => {
    const wrapper = mount(VLightbox, {
      props: { items: mockImages, isOpen: true, animationType: 'fade' },
    })
    expect(wrapper.vm.animationType).toBe('fade')
  })

  it('should emit open event when lightbox is opened', async () => {
    const wrapper = mount(VLightbox, {
      props: { items: mockImages, isOpen: true },
    })
    wrapper.vm.open()
    expect(wrapper.emitted('open')).toBeTruthy()
  })

  it('should emit close event when lightbox is closed', async () => {
    const wrapper = mount(VLightbox, {
      props: { items: mockImages, isOpen: true },
    })
    wrapper.vm.open()
    wrapper.vm.close()
    expect(wrapper.emitted('close')).toBeTruthy()
  })
})
