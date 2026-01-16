import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, nextTick } from 'vue'
import { useAnimation, easings } from '../../composables/useAnimation'

describe('useAnimation', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('basic functionality', () => {
    it('should initialize with default values', () => {
      const TestComponent = defineComponent({
        setup() {
          const animation = useAnimation()
          return { animation }
        },
        template: '<div></div>',
      })

      const wrapper = mount(TestComponent)

      expect(wrapper.vm.animation.isRunning.value).toBe(false)
      expect(wrapper.vm.animation.timestamp.value).toBe(0)
      expect(wrapper.vm.animation.deltaTime.value).toBe(0)
      expect(wrapper.vm.animation.fps.value).toBe(0)

      wrapper.unmount()
    })

    it('should start and stop animation', async () => {
      const onStart = vi.fn()
      const onStop = vi.fn()

      const TestComponent = defineComponent({
        setup() {
          const animation = useAnimation({
            onStart,
            onStop,
          })
          return { animation }
        },
        template: '<div></div>',
      })

      const wrapper = mount(TestComponent)

      wrapper.vm.animation.start()
      expect(wrapper.vm.animation.isRunning.value).toBe(true)
      expect(onStart).toHaveBeenCalled()

      wrapper.vm.animation.stop()
      expect(wrapper.vm.animation.isRunning.value).toBe(false)
      expect(onStop).toHaveBeenCalled()

      wrapper.unmount()
    })

    it('should pause and resume animation', async () => {
      const TestComponent = defineComponent({
        setup() {
          const animation = useAnimation()
          return { animation }
        },
        template: '<div></div>',
      })

      const wrapper = mount(TestComponent)

      wrapper.vm.animation.start()
      expect(wrapper.vm.animation.isRunning.value).toBe(true)

      wrapper.vm.animation.pause()

      wrapper.vm.animation.resume()
      expect(wrapper.vm.animation.isRunning.value).toBe(true)

      wrapper.vm.animation.stop()
      wrapper.unmount()
    })

    it('should toggle animation state', async () => {
      const TestComponent = defineComponent({
        setup() {
          const animation = useAnimation()
          return { animation }
        },
        template: '<div></div>',
      })

      const wrapper = mount(TestComponent)

      expect(wrapper.vm.animation.isRunning.value).toBe(false)

      wrapper.vm.animation.toggle()
      expect(wrapper.vm.animation.isRunning.value).toBe(true)

      wrapper.vm.animation.stop()
      wrapper.unmount()
    })

    it('should auto start when autoStart is true', async () => {
      const TestComponent = defineComponent({
        setup() {
          const animation = useAnimation({ autoStart: true })
          return { animation }
        },
        template: '<div></div>',
      })

      const wrapper = mount(TestComponent)
      await nextTick()

      vi.advanceTimersByTime(10)
      await nextTick()

      expect(wrapper.vm.animation.isRunning.value).toBe(true)

      wrapper.vm.animation.stop()
      wrapper.unmount()
    })

    it('should call onFrame callback', async () => {
      const onFrame = vi.fn()

      const TestComponent = defineComponent({
        setup() {
          const animation = useAnimation({ onFrame })
          return { animation }
        },
        template: '<div></div>',
      })

      const wrapper = mount(TestComponent)

      wrapper.vm.animation.start()
      vi.advanceTimersByTime(16)

      wrapper.vm.animation.stop()
      wrapper.unmount()
    })

    it('should cleanup on unmount', async () => {
      const TestComponent = defineComponent({
        setup() {
          const animation = useAnimation()
          return { animation }
        },
        template: '<div></div>',
      })

      const wrapper = mount(TestComponent)
      wrapper.vm.animation.start()

      wrapper.unmount()
    })
  })

  describe('easings', () => {
    it('should have all easing functions', () => {
      expect(typeof easings.linear).toBe('function')
      expect(typeof easings.easeIn).toBe('function')
      expect(typeof easings.easeOut).toBe('function')
      expect(typeof easings.easeInOut).toBe('function')
      expect(typeof easings.easeInCubic).toBe('function')
      expect(typeof easings.easeOutCubic).toBe('function')
      expect(typeof easings.easeInOutCubic).toBe('function')
      expect(typeof easings.easeInQuart).toBe('function')
      expect(typeof easings.easeOutQuart).toBe('function')
      expect(typeof easings.easeInOutQuart).toBe('function')
      expect(typeof easings.easeInElastic).toBe('function')
      expect(typeof easings.easeOutElastic).toBe('function')
      expect(typeof easings.easeOutBounce).toBe('function')
    })

    it('should return correct values for linear easing', () => {
      expect(easings.linear(0)).toBe(0)
      expect(easings.linear(0.5)).toBe(0.5)
      expect(easings.linear(1)).toBe(1)
    })

    it('should return correct boundary values for all easings', () => {
      Object.entries(easings).forEach(([_name, fn]) => {
        expect(fn(0)).toBeCloseTo(0, 5)
        expect(fn(1)).toBeCloseTo(1, 5)
      })
    })

    it('should return values between 0 and 1 for most easings at t=0.5', () => {
      const standardEasings = ['linear', 'easeIn', 'easeOut', 'easeInOut']
      standardEasings.forEach(name => {
        const value = easings[name as keyof typeof easings](0.5)
        expect(value).toBeGreaterThanOrEqual(0)
        expect(value).toBeLessThanOrEqual(1)
      })
    })
  })
})
