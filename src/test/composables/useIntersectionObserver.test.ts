import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, ref, nextTick } from 'vue'
import { useIntersectionObserver, isIntersectionObserverSupported } from '../../composables/useIntersectionObserver'

const mockIntersectionObserver = vi.fn()
let observerCallback: IntersectionObserverCallback | null = null

mockIntersectionObserver.mockImplementation((callback: IntersectionObserverCallback) => {
  observerCallback = callback
  return {
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }
})

describe('useIntersectionObserver', () => {
  beforeEach(() => {
    vi.stubGlobal('IntersectionObserver', mockIntersectionObserver)
    mockIntersectionObserver.mockClear()
    observerCallback = null
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('should check if IntersectionObserver is supported', () => {
    expect(isIntersectionObserverSupported()).toBe(true)
  })

  it('should initialize with default values', async () => {
    const TestComponent = defineComponent({
      setup() {
        const target = ref<HTMLElement | null>(null)
        const observer = useIntersectionObserver({ target })
        return { target, observer }
      },
      template: '<div ref="target"></div>',
    })

    const wrapper = mount(TestComponent)
    await nextTick()

    expect(wrapper.vm.observer.isIntersecting.value).toBe(false)
    expect(wrapper.vm.observer.hasIntersected.value).toBe(false)
    expect(wrapper.vm.observer.intersectionRatio.value).toBe(0)

    wrapper.unmount()
  })

  it('should create observer when target is set', async () => {
    const TestComponent = defineComponent({
      setup() {
        const target = ref<HTMLElement | null>(null)
        const observer = useIntersectionObserver({ target })
        return { target, observer }
      },
      template: '<div ref="target"></div>',
    })

    const wrapper = mount(TestComponent)
    await nextTick()

    expect(mockIntersectionObserver).toHaveBeenCalled()

    wrapper.unmount()
  })

  it('should call onEnter when element enters viewport', async () => {
    const onEnter = vi.fn()
    const onLeave = vi.fn()

    const TestComponent = defineComponent({
      setup() {
        const target = ref<HTMLElement | null>(null)
        const observer = useIntersectionObserver({
          target,
          onEnter,
          onLeave,
        })
        return { target, observer }
      },
      template: '<div ref="target"></div>',
    })

    const wrapper = mount(TestComponent)
    await nextTick()

    if (observerCallback) {
      observerCallback(
        [
          {
            isIntersecting: true,
            intersectionRatio: 0.5,
            target: wrapper.vm.target!,
            boundingClientRect: {} as DOMRectReadOnly,
            intersectionRect: {} as DOMRectReadOnly,
            rootBounds: null,
            time: 0,
          },
        ],
        {} as IntersectionObserver
      )
    }

    expect(onEnter).toHaveBeenCalled()
    expect(wrapper.vm.observer.isIntersecting.value).toBe(true)
    expect(wrapper.vm.observer.hasIntersected.value).toBe(true)

    wrapper.unmount()
  })

  it('should call onLeave when element leaves viewport', async () => {
    const onLeave = vi.fn()

    const TestComponent = defineComponent({
      setup() {
        const target = ref<HTMLElement | null>(null)
        const observer = useIntersectionObserver({
          target,
          onLeave,
        })
        return { target, observer }
      },
      template: '<div ref="target"></div>',
    })

    const wrapper = mount(TestComponent)
    await nextTick()

    if (observerCallback) {
      observerCallback(
        [
          {
            isIntersecting: true,
            intersectionRatio: 1,
            target: wrapper.vm.target!,
            boundingClientRect: {} as DOMRectReadOnly,
            intersectionRect: {} as DOMRectReadOnly,
            rootBounds: null,
            time: 0,
          },
        ],
        {} as IntersectionObserver
      )
    }

    if (observerCallback) {
      observerCallback(
        [
          {
            isIntersecting: false,
            intersectionRatio: 0,
            target: wrapper.vm.target!,
            boundingClientRect: {} as DOMRectReadOnly,
            intersectionRect: {} as DOMRectReadOnly,
            rootBounds: null,
            time: 0,
          },
        ],
        {} as IntersectionObserver
      )
    }

    expect(onLeave).toHaveBeenCalled()
    expect(wrapper.vm.observer.isIntersecting.value).toBe(false)

    wrapper.unmount()
  })

  it('should stop and start observing', async () => {
    const TestComponent = defineComponent({
      setup() {
        const target = ref<HTMLElement | null>(null)
        const observer = useIntersectionObserver({ target })
        return { target, observer }
      },
      template: '<div ref="target"></div>',
    })

    const wrapper = mount(TestComponent)
    await nextTick()

    wrapper.vm.observer.stop()
    wrapper.vm.observer.start()

    wrapper.unmount()
  })

  it('should disconnect on once mode after first intersection', async () => {
    const onEnter = vi.fn()

    const TestComponent = defineComponent({
      setup() {
        const target = ref<HTMLElement | null>(null)
        const observer = useIntersectionObserver({
          target,
          once: true,
          onEnter,
        })
        return { target, observer }
      },
      template: '<div ref="target"></div>',
    })

    const wrapper = mount(TestComponent)
    await nextTick()

    if (observerCallback) {
      observerCallback(
        [
          {
            isIntersecting: true,
            intersectionRatio: 1,
            target: wrapper.vm.target!,
            boundingClientRect: {} as DOMRectReadOnly,
            intersectionRect: {} as DOMRectReadOnly,
            rootBounds: null,
            time: 0,
          },
        ],
        {} as IntersectionObserver
      )
    }

    expect(onEnter).toHaveBeenCalledTimes(1)

    wrapper.unmount()
  })
})
