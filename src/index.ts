import type { App, Plugin } from 'vue';
import { VRipple } from './directives/vRipple';
import VScrollReveal from './components/VScrollReveal.vue';
import VParticleField from './components/VParticleField.vue';
import './styles/themes.css';

const components = {
  VScrollReveal,
  VParticleField,
};

const directives = {
  ripple: VRipple,
};

interface SupremeEffectsOptions {
  theme?: 'light' | 'dark' | 'auto';
}

const set_theme = (theme: 'light' | 'dark') => {
  document.documentElement.setAttribute('data-sve-theme', theme);
};

const handle_auto_theme = (e: MediaQueryListEvent) => {
  set_theme(e.matches ? 'dark' : 'light');
};

let media_query: MediaQueryList | undefined;

export const createSupremeEffects = (options: SupremeEffectsOptions = {}): Plugin => {
  return {
    install(app: App) {
      Object.entries(components).forEach(([name, component]) => {
        app.component(name, component);
      });

      Object.entries(directives).forEach(([name, directive]) => {
        app.directive(name, directive);
      });

      const theme = options.theme || 'auto';

      if (media_query) {
        media_query.removeEventListener('change', handle_auto_theme);
      }

      if (theme === 'auto') {
        media_query = window.matchMedia('(prefers-color-scheme: dark)');
        set_theme(media_query.matches ? 'dark' : 'light');
        media_query.addEventListener('change', handle_auto_theme);
      } else {
        set_theme(theme);
      }
    },
  };
};

// Default export for convenience
export default createSupremeEffects();

export { VScrollReveal, VParticleField, VRipple };

