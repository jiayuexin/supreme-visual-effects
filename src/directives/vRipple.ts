import type { Directive } from 'vue'

interface RippleElement extends HTMLElement {
  _ripple?: {
    enabled: boolean
    color: string
    duration: number
  }
}

const rippleDirective: Directive = {
  mounted(el: RippleElement, binding: any) {
    el._ripple = {
      enabled: binding.value?.disabled !== true,
      color: binding.value?.color || 'rgba(255, 255, 255, 0.7)',
      duration: binding.value?.duration || 600,
    }

    const onMouseDown = (e: MouseEvent) => {
      if (!el._ripple?.enabled) return

      const rect = el.getBoundingClientRect()
      const ripple = document.createElement('span')
      const size = Math.max(rect.width, rect.height)

      ripple.style.width = ripple.style.height = `${size}px`
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`
      ripple.style.position = 'absolute'
      ripple.style.borderRadius = '50%'
      ripple.style.backgroundColor = el._ripple.color
      ripple.style.transform = 'scale(0)'
      ripple.style.transition =
        `transform ${el._ripple.duration / 1000}s cubic-bezier(0.4, 0, 0.2, 1), ` +
        `opacity ${el._ripple.duration / 1000}s cubic-bezier(0.4, 0, 0.2, 1)`
      ripple.style.opacity = '1'
      ripple.style.pointerEvents = 'none'

      // Ensure the host element is positioned
      if (getComputedStyle(el).position === 'static') {
        el.style.position = 'relative'
      }
      el.style.overflow = 'hidden'

      el.appendChild(ripple)

      // Animate
      requestAnimationFrame(() => {
        ripple.style.transform = 'scale(2)'
        ripple.style.opacity = '0'
      })

      setTimeout(() => {
        ripple.remove()
      }, el._ripple.duration)
    }

    el.addEventListener('mousedown', onMouseDown)
  },

  updated(el: RippleElement, binding: any) {
    if (el._ripple) {
      el._ripple.enabled = binding.value?.disabled !== true
      el._ripple.color = binding.value?.color || 'rgba(255, 255, 255, 0.7)'
      el._ripple.duration = binding.value?.duration || 600
    }
  },
}

export { rippleDirective as VRipple }
