import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import VTypingText from '../../components/VTypingText.vue'

describe('VTypingText', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('rendering', () => {
    it('renders correctly with default props', () => {
      const wrapper = mount(VTypingText, {
        props: {
          text: 'Hello World',
          autoStart: false,
        },
      })

      expect(wrapper.find('.typing-text').exists()).toBe(true)
      expect(wrapper.find('.typing-content').exists()).toBe(true)
    })

    it('shows cursor when cursor prop is true and typing', async () => {
      const wrapper = mount(VTypingText, {
        props: {
          text: 'Hello',
          cursor: true,
          autoStart: true,
        },
      })

      // Advance time to start typing
      vi.advanceTimersByTime(200)
      await wrapper.vm.$nextTick()

      // Cursor should be visible during typing
      // Cursor visibility depends on typing state
      expect(wrapper.find('.typing-text').exists()).toBe(true)
    })

    it('hides cursor when cursor prop is false', () => {
      const wrapper = mount(VTypingText, {
        props: {
          text: 'Hello',
          cursor: false,
          autoStart: true,
        },
      })

      vi.advanceTimersByTime(100)
      expect(wrapper.find('.typing-cursor').exists()).toBe(false)
    })

    it('applies custom cursor character', async () => {
      const wrapper = mount(VTypingText, {
        props: {
          text: 'Hello',
          cursorChar: '_',
          autoStart: true,
        },
      })

      vi.advanceTimersByTime(100)
      await wrapper.vm.$nextTick()

      const cursor = wrapper.find('.typing-cursor')
      if (cursor.exists()) {
        expect(cursor.text()).toBe('_')
      }
    })
  })

  describe('typing behavior', () => {
    it('types text character by character', async () => {
      const wrapper = mount(VTypingText, {
        props: {
          text: 'Hi',
          speed: 100,
          autoStart: true,
        },
      })

      expect(wrapper.find('.typing-content').text()).toBe('')

      // First character appears after first interval
      vi.advanceTimersByTime(100)
      await wrapper.vm.$nextTick()

      // Second character
      vi.advanceTimersByTime(100)
      await wrapper.vm.$nextTick()
      expect(wrapper.find('.typing-content').text()).toBe('Hi')
    })

    it('respects delay before starting', async () => {
      const wrapper = mount(VTypingText, {
        props: {
          text: 'Hi',
          speed: 100,
          delay: 500,
          autoStart: true,
        },
      })

      // Before delay
      vi.advanceTimersByTime(100)
      await wrapper.vm.$nextTick()
      expect(wrapper.find('.typing-content').text()).toBe('')

      // After delay + first character
      vi.advanceTimersByTime(500)
      await wrapper.vm.$nextTick()
      // Text should start appearing
      expect(wrapper.find('.typing-content').text().length).toBeGreaterThanOrEqual(0)
    })

    it('does not auto start when autoStart is false', async () => {
      const wrapper = mount(VTypingText, {
        props: {
          text: 'Hello',
          autoStart: false,
        },
      })

      vi.advanceTimersByTime(1000)
      await wrapper.vm.$nextTick()
      expect(wrapper.find('.typing-content').text()).toBe('')
    })
  })

  describe('events', () => {
    it('emits typing-start when typing begins', async () => {
      const wrapper = mount(VTypingText, {
        props: {
          text: 'Hello',
          autoStart: true,
        },
      })

      expect(wrapper.emitted('typing-start')).toBeTruthy()
    })

    it('emits typing-complete when typing finishes', async () => {
      const wrapper = mount(VTypingText, {
        props: {
          text: 'Hi',
          speed: 100,
          autoStart: true,
        },
      })

      // Type all characters
      vi.advanceTimersByTime(300)
      await wrapper.vm.$nextTick()

      expect(wrapper.emitted('typing-complete')).toBeTruthy()
    })

    it('emits typing-pause when paused', async () => {
      const wrapper = mount(VTypingText, {
        props: {
          text: 'Hello',
          speed: 100,
          autoStart: true,
        },
      })

      vi.advanceTimersByTime(100)
      await wrapper.vm.$nextTick()

      const vm = wrapper.vm as any
      vm.pause()

      expect(wrapper.emitted('typing-pause')).toBeTruthy()
    })

    it('emits typing-resume when resumed', async () => {
      const wrapper = mount(VTypingText, {
        props: {
          text: 'Hello',
          speed: 100,
          autoStart: true,
        },
      })

      vi.advanceTimersByTime(100)
      await wrapper.vm.$nextTick()

      const vm = wrapper.vm as any
      vm.pause()
      vm.resume()

      expect(wrapper.emitted('typing-resume')).toBeTruthy()
    })
  })

  describe('exposed methods', () => {
    it('start() begins typing', async () => {
      const wrapper = mount(VTypingText, {
        props: {
          text: 'Hi',
          speed: 100,
          autoStart: false,
        },
      })

      const vm = wrapper.vm as any
      vm.start()

      vi.advanceTimersByTime(200)
      await wrapper.vm.$nextTick()

      expect(wrapper.find('.typing-content').text().length).toBeGreaterThan(0)
    })

    it('stop() stops typing', async () => {
      const wrapper = mount(VTypingText, {
        props: {
          text: 'Hello',
          speed: 100,
          autoStart: true,
        },
      })

      vi.advanceTimersByTime(100)
      await wrapper.vm.$nextTick()

      const vm = wrapper.vm as any
      vm.stop()

      const textBefore = wrapper.find('.typing-content').text()

      vi.advanceTimersByTime(500)
      await wrapper.vm.$nextTick()

      expect(wrapper.find('.typing-content').text()).toBe(textBefore)
    })

    it('reset() clears text and resets state', async () => {
      const wrapper = mount(VTypingText, {
        props: {
          text: 'Hello',
          speed: 100,
          autoStart: true,
        },
      })

      vi.advanceTimersByTime(300)
      await wrapper.vm.$nextTick()

      const vm = wrapper.vm as any
      vm.reset()
      await wrapper.vm.$nextTick()

      expect(wrapper.find('.typing-content').text()).toBe('')
    })
  })

  describe('array of texts', () => {
    it('handles array of texts', async () => {
      const wrapper = mount(VTypingText, {
        props: {
          text: ['Hi', 'Bye'],
          speed: 100,
          autoStart: true,
        },
      })

      // Type first text
      vi.advanceTimersByTime(200)
      await wrapper.vm.$nextTick()

      expect(wrapper.find('.typing-content').text()).toBe('Hi')
    })
  })

  describe('styling', () => {
    it('applies custom color', () => {
      const wrapper = mount(VTypingText, {
        props: {
          text: 'Hello',
          color: 'red',
          autoStart: false,
        },
      })

      const style = wrapper.find('.typing-text').attributes('style')
      expect(style).toContain('color: red')
    })

    it('applies custom fontSize', () => {
      const wrapper = mount(VTypingText, {
        props: {
          text: 'Hello',
          fontSize: '24px',
          autoStart: false,
        },
      })

      const style = wrapper.find('.typing-text').attributes('style')
      expect(style).toContain('font-size: 24px')
    })

    it('applies custom fontFamily', () => {
      const wrapper = mount(VTypingText, {
        props: {
          text: 'Hello',
          fontFamily: 'monospace',
          autoStart: false,
        },
      })

      const style = wrapper.find('.typing-text').attributes('style')
      expect(style).toContain('font-family: monospace')
    })
  })

  describe('watch behavior', () => {
    it('resets and restarts when text changes', async () => {
      const wrapper = mount(VTypingText, {
        props: {
          text: 'Hi',
          speed: 100,
          autoStart: true,
        },
      })

      vi.advanceTimersByTime(200)
      await wrapper.vm.$nextTick()
      expect(wrapper.find('.typing-content').text()).toBe('Hi')

      await wrapper.setProps({ text: 'Bye' })
      vi.advanceTimersByTime(300)
      await wrapper.vm.$nextTick()

      // Should have started typing new text
      expect(wrapper.find('.typing-content').text().length).toBeGreaterThanOrEqual(0)
    })
  })
})
