import type { Meta, StoryObj } from '@storybook/vue3'
import VParticleField from './VParticleField.vue'

const meta: Meta<typeof VParticleField> = {
  title: 'Components/VParticleField',
  component: VParticleField,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A particle field background with animated particles and connecting lines.',
      },
    },
  },
  argTypes: {
    particleCount: {
      control: { type: 'range', min: 10, max: 500, step: 10 },
      description: 'Number of particles in the field',
    },
    speed: {
      control: { type: 'range', min: 0.1, max: 2, step: 0.1 },
      description: 'Speed of particle movement',
    },
    particleColor: {
      control: { type: 'color' },
      description: 'Color of the particles',
    },
    lineColor: {
      control: { type: 'color' },
      description: 'Color of the connecting lines',
    },
    maxDistance: {
      control: { type: 'range', min: 50, max: 300, step: 10 },
      description: 'Maximum distance for line connections',
    },
  },
  args: {
    particleCount: 100,
    speed: 0.5,
    particleColor: 'rgba(255, 255, 255, 0.8)',
    lineColor: 'rgba(255, 255, 255, 0.2)',
    maxDistance: 120,
  },
}

export default meta
type Story = StoryObj<typeof VParticleField>

export const Default: Story = {
  render: args => ({
    components: { VParticleField },
    setup() {
      return { args }
    },
    template: `
      <div style="position: relative; height: 400px; background: #1a1a1a; border-radius: 8px; overflow: hidden;">
        <VParticleField v-bind="args" />
        <div style="position: relative; z-index: 1; height: 100%; display: flex; align-items: center; justify-content: center; color: white; text-align: center; padding: 2rem;">
          <div>
            <h2>Particle Field Background</h2>
            <p>Interactive particle system with connecting lines</p>
          </div>
        </div>
      </div>
    `,
  }),
}

export const Dense: Story = {
  args: {
    particleCount: 300,
    speed: 0.8,
    maxDistance: 80,
  },
  render: args => ({
    components: { VParticleField },
    setup() {
      return { args }
    },
    template: `
      <div style="position: relative; height: 400px; background: #1a1a1a; border-radius: 8px; overflow: hidden;">
        <VParticleField v-bind="args" />
        <div style="position: relative; z-index: 1; height: 100%; display: flex; align-items: center; justify-content: center; color: white; text-align: center; padding: 2rem;">
          <div>
            <h2>Dense Particle Field</h2>
            <p>High particle count with closer connections</p>
          </div>
        </div>
      </div>
    `,
  }),
}

export const Colorful: Story = {
  args: {
    particleCount: 150,
    speed: 1.2,
    particleColor: 'rgba(255, 100, 100, 0.8)',
    lineColor: 'rgba(100, 255, 100, 0.3)',
    maxDistance: 150,
  },
  render: args => ({
    components: { VParticleField },
    setup() {
      return { args }
    },
    template: `
      <div style="position: relative; height: 400px; background: #0a0a0a; border-radius: 8px; overflow: hidden;">
        <VParticleField v-bind="args" />
        <div style="position: relative; z-index: 1; height: 100%; display: flex; align-items: center; justify-content: center; color: white; text-align: center; padding: 2rem;">
          <div>
            <h2>Colorful Particles</h2>
            <p>Red particles with green connecting lines</p>
          </div>
        </div>
      </div>
    `,
  }),
}

export const Slow: Story = {
  args: {
    particleCount: 80,
    speed: 0.2,
    particleColor: 'rgba(255, 255, 255, 0.6)',
    lineColor: 'rgba(255, 255, 255, 0.1)',
    maxDistance: 200,
  },
  render: args => ({
    components: { VParticleField },
    setup() {
      return { args }
    },
    template: `
      <div style="position: relative; height: 400px; background: #1a1a1a; border-radius: 8px; overflow: hidden;">
        <VParticleField v-bind="args" />
        <div style="position: relative; z-index: 1; height: 100%; display: flex; align-items: center; justify-content: center; color: white; text-align: center; padding: 2rem;">
          <div>
            <h2>Slow Particles</h2>
            <p>Gentle, slow-moving particle field</p>
          </div>
        </div>
      </div>
    `,
  }),
}
