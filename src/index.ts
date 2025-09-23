import type { App, Plugin } from 'vue'
import { VRipple } from './directives/vRipple'
import VScrollReveal from './components/VScrollReveal.vue'
import VParticleField from './components/VParticleField.vue'
import VGradientBackground from './components/VGradientBackground.vue'
import VStarfield from './components/VStarfield.vue'
import VParallax from './components/VParallax.vue'
import VScrollSnap from './components/VScrollSnap.vue'
import VTypingText from './components/VTypingText.vue'
import VTextMask from './components/VTextMask.vue'
import VNeonText from './components/VNeonText.vue'
import VHover3D from './components/VHover3D.vue'
import VMagneticButton from './components/VMagneticButton.vue'
import VGlitch from './components/VGlitch.vue'
import VCarousel3D from './components/VCarousel3D.vue'
import VImageComparison from './components/VImageComparison.vue'
import VLightbox from './components/VLightbox.vue'
import VDivider from './components/VDivider.vue'
import VScrollProgress from './components/VScrollProgress.vue'
import VConfetti from './components/VConfetti.vue'
import './styles/themes.css'

const components = {
  VScrollReveal,
  VParticleField,
  VGradientBackground,
  VStarfield,
  VParallax,
  VScrollSnap,
  VTypingText,
  VTextMask,
  VNeonText,
  VHover3D,
  VMagneticButton,
  VGlitch,
  VCarousel3D,
  VImageComparison,
  VLightbox,
  VDivider,
  VScrollProgress,
  VConfetti,
}

const directives = {
  ripple: VRipple,
}

interface SupremeEffectsOptions {
  theme?: 'light' | 'dark' | 'auto'
}

const set_theme = (theme: 'light' | 'dark') => {
  document.documentElement.setAttribute('data-sve-theme', theme)
}

const handle_auto_theme = (e: MediaQueryListEvent) => {
  set_theme(e.matches ? 'dark' : 'light')
}

let media_query: MediaQueryList | undefined

export const createSupremeEffects = (options: SupremeEffectsOptions = {}): Plugin => {
  return {
    install(app: App) {
      Object.entries(components).forEach(([name, component]) => {
        app.component(name, component)
      })

      Object.entries(directives).forEach(([name, directive]) => {
        app.directive(name, directive)
      })

      const theme = options.theme || 'auto'

      if (media_query) {
        media_query.removeEventListener('change', handle_auto_theme)
      }

      if (theme === 'auto') {
        media_query = window.matchMedia('(prefers-color-scheme: dark)')
        set_theme(media_query.matches ? 'dark' : 'light')
        media_query.addEventListener('change', handle_auto_theme)
      } else {
        set_theme(theme)
      }
    },
  }
}

// Default export for convenience
export default createSupremeEffects()

export {
  VScrollReveal,
  VParticleField,
  VGradientBackground,
  VStarfield,
  VParallax,
  VScrollSnap,
  VTypingText,
  VTextMask,
  VNeonText,
  VHover3D,
  VMagneticButton,
  VGlitch,
  VCarousel3D,
  VImageComparison,
  VLightbox,
  VDivider,
  VScrollProgress,
  VConfetti,
  VRipple,
}
