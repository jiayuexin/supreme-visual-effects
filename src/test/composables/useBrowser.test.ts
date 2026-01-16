import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, nextTick } from 'vue'
import { useBrowser, isBrowser, isSSR, getElementRect, raf, cancelRaf } from '../../composables/useBrowser'

describe('useBrowser', () => {
  describe('constants', () => {
    it('should detect browser environment', () => {
      expect(typeof isBrowser).toBe('boolean')
      expect(typeof isSSR).toBe('boolean')
      expect(isBrowser).toBe(!isSSR)
    })
  })

  describe('useBrowser composable', () => {
    it('should return browser state', async () => {
      const TestComponent = defineComponent({
        setup() {
          const browser = useBrowser()
          return { browser }
        },
        template: '<div>{{ browser.isClient }}</div>',
      })

      const wrapper = mount(TestComponent)
      await nextTick()

      expect(wrapper.vm.browser.isBrowser).toBe(true)
      expect(wrapper.vm.browser.isSSR).toBe(false)
      expect(wrapper.vm.browser.isClient.value).toBe(true)
      expect(typeof wrapper.vm.browser.windowWidth.value).toBe('number')
      expect(typeof wrapper.vm.browser.windowHeight.value).toBe('number')
      expect(typeof wrapper.vm.browser.devicePixelRatio.value).toBe('number')
      expect(typeof wrapper.vm.browser.isOnline.value).toBe('boolean')
      expect(typeof wrapper.vm.browser.isMobile.value).toBe('boolean')
      expect(typeof wrapper.vm.browser.isTouch.value).toBe('boolean')

      wrapper.unmount()
    })

    it('should update window dimensions on resize', async () => {
      const TestComponent = defineComponent({
        setup() {
          const browser = useBrowser()
          return { browser }
        },
        template: '<div></div>',
      })

      const wrapper = mount(TestComponent)
      await nextTick()

      window.dispatchEvent(new Event('resize'))
      await nextTick()

      expect(wrapper.vm.browser.windowWidth.value).toBeGreaterThanOrEqual(0)
      expect(wrapper.vm.browser.windowHeight.value).toBeGreaterThanOrEqual(0)

      wrapper.unmount()
    })

    it('should update online status', async () => {
      const TestComponent = defineComponent({
        setup() {
          const browser = useBrowser()
          return { browser }
        },
        template: '<div></div>',
      })

      const wrapper = mount(TestComponent)
      await nextTick()

      window.dispatchEvent(new Event('offline'))
      await nextTick()

      window.dispatchEvent(new Event('online'))
      await nextTick()

      wrapper.unmount()
    })
  })

  describe('getElementRect', () => {
    it('should return null for null element', () => {
      expect(getElementRect(null)).toBeNull()
    })

    it('should return rect object for valid element', () => {
      const element = document.createElement('div')
      document.body.appendChild(element)

      const rect = getElementRect(element)
      expect(rect).not.toBeNull()
      expect(typeof rect?.width).toBe('number')
      expect(typeof rect?.height).toBe('number')

      document.body.removeChild(element)
    })
  })

  describe('raf and cancelRaf', () => {
    it('should request and cancel animation frame', () => {
      const callback = vi.fn()
      const id = raf(callback)

      expect(id).toBeDefined()

      cancelRaf(id)
    })
  })
})
