import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, ref, nextTick } from 'vue'
import { useResizeObserver, useWindowResize, isResizeObserverSupported } from '../../composables/useResizeObserver'

const mockResizeObserver = vi.fn()
let observerCallback: ResizeObserverCallback | null = null

mockResizeObserver.mockImplementation((callback: ResizeObserverCallback) => {
  observerCallback = callback
  return {
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }
})

describe('useResizeObserver', () => {
  beforeEach(() => {
    vi.stubGlobal('ResizeObserver', mockResizeObserver)
    mockResizeObserver.mockClear()
    observerCallback = null
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('should check if ResizeObserver is supported', () => {
    expect(isResizeObserverSupported()).toBe(true)
  })

  it('should initialize with default values', async () => {
    const TestComponent = defineComponent({
      setup() {
        const target = ref<HTMLElement | null>(null)
        const observer = useResizeObserver({ target })
        return { target, observer }
      },
      template: '<div ref="target" style="width: 100px; height: 100px;"></div>',
    })

    const wrapper = mount(TestComponent)
    await nextTick()

    expect(typeof wrapper.vm.observer.width.value).toBe('number')
    expect(typeof wrapper.vm.observer.height.value).toBe('number')
    expect(typeof wrapper.vm.observer.contentWidth.value).toBe('number')
    expect(typeof wrapper.vm.observer.contentHeight.value).toBe('number')

    wrapper.unmount()
  })

  it('should create observer when target is set', async () => {
    const TestComponent = defineComponent({
      setup() {
        const target = ref<HTMLElement | null>(null)
        const observer = useResizeObserver({ target })
        return { target, observer }
      },
      template: '<div ref="target"></div>',
    })

    const wrapper = mount(TestComponent)
    await nextTick()

    expect(mockResizeObserver).toHaveBeenCalled()

    wrapper.unmount()
  })

  it('should call onResize callback', async () => {
    const onResize = vi.fn()

    const TestComponent = defineComponent({
      setup() {
        const target = ref<HTMLElement | null>(null)
        const observer = useResizeObserver({
          target,
          onResize,
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
            target: wrapper.vm.target!,
            contentRect: { width: 200, height: 150 } as DOMRectReadOnly,
            borderBoxSize: [{ inlineSize: 200, blockSize: 150 }] as ResizeObserverSize[],
            contentBoxSize: [{ inlineSize: 200, blockSize: 150 }] as ResizeObserverSize[],
            devicePixelContentBoxSize: [] as ResizeObserverSize[],
          },
        ],
        {} as ResizeObserver
      )
    }

    expect(onResize).toHaveBeenCalled()
    expect(wrapper.vm.observer.width.value).toBe(200)
    expect(wrapper.vm.observer.height.value).toBe(150)

    wrapper.unmount()
  })

  it('should stop and start observing', async () => {
    const TestComponent = defineComponent({
      setup() {
        const target = ref<HTMLElement | null>(null)
        const observer = useResizeObserver({ target })
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

  it('should debounce resize events', async () => {
    vi.useFakeTimers()
    const onResize = vi.fn()

    const TestComponent = defineComponent({
      setup() {
        const target = ref<HTMLElement | null>(null)
        const observer = useResizeObserver({
          target,
          onResize,
          debounce: 100,
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
            target: wrapper.vm.target!,
            contentRect: { width: 100, height: 100 } as DOMRectReadOnly,
            borderBoxSize: [{ inlineSize: 100, blockSize: 100 }] as ResizeObserverSize[],
            contentBoxSize: [{ inlineSize: 100, blockSize: 100 }] as ResizeObserverSize[],
            devicePixelContentBoxSize: [] as ResizeObserverSize[],
          },
        ],
        {} as ResizeObserver
      )
      observerCallback(
        [
          {
            target: wrapper.vm.target!,
            contentRect: { width: 200, height: 200 } as DOMRectReadOnly,
            borderBoxSize: [{ inlineSize: 200, blockSize: 200 }] as ResizeObserverSize[],
            contentBoxSize: [{ inlineSize: 200, blockSize: 200 }] as ResizeObserverSize[],
            devicePixelContentBoxSize: [] as ResizeObserverSize[],
          },
        ],
        {} as ResizeObserver
      )
    }

    expect(onResize).not.toHaveBeenCalled()

    vi.advanceTimersByTime(100)

    expect(onResize).toHaveBeenCalledTimes(1)

    wrapper.unmount()
    vi.useRealTimers()
  })
})

describe('useWindowResize', () => {
  it('should track window dimensions', async () => {
    const TestComponent = defineComponent({
      setup() {
        const { width, height } = useWindowResize()
        return { width, height }
      },
      template: '<div></div>',
    })

    const wrapper = mount(TestComponent)
    await nextTick()

    expect(wrapper.vm.width).toBeGreaterThanOrEqual(0)
    expect(wrapper.vm.height).toBeGreaterThanOrEqual(0)

    wrapper.unmount()
  })

  it('should call onResize callback', async () => {
    const onResize = vi.fn()

    const TestComponent = defineComponent({
      setup() {
        const { width, height } = useWindowResize({ onResize })
        return { width, height }
      },
      template: '<div></div>',
    })

    const wrapper = mount(TestComponent)
    await nextTick()

    window.dispatchEvent(new Event('resize'))
    await nextTick()

    expect(onResize).toHaveBeenCalled()

    wrapper.unmount()
  })

  it('should debounce resize events', async () => {
    vi.useFakeTimers()
    const onResize = vi.fn()

    const TestComponent = defineComponent({
      setup() {
        const { width, height } = useWindowResize({ onResize, debounce: 100 })
        return { width, height }
      },
      template: '<div></div>',
    })

    const wrapper = mount(TestComponent)
    await nextTick()

    onResize.mockClear()

    window.dispatchEvent(new Event('resize'))
    window.dispatchEvent(new Event('resize'))
    window.dispatchEvent(new Event('resize'))

    expect(onResize).not.toHaveBeenCalled()

    vi.advanceTimersByTime(100)

    expect(onResize).toHaveBeenCalledTimes(1)

    wrapper.unmount()
    vi.useRealTimers()
  })
})
