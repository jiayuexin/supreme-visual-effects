import type { Meta, StoryObj } from '@storybook/vue3'
import VScrollReveal from './VScrollReveal.vue'

const meta: Meta<typeof VScrollReveal> = {
  title: 'Components/VScrollReveal',
  component: VScrollReveal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A component that reveals content when it comes into view during scrolling.',
      },
    },
  },
  argTypes: {
    threshold: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'The percentage of the element that must be visible to trigger the reveal',
    },
    once: {
      control: { type: 'boolean' },
      description: 'Whether the animation should only happen once',
    },
  },
  args: {
    threshold: 0.1,
    once: true,
  },
}

export default meta
type Story = StoryObj<typeof VScrollReveal>

export const Default: Story = {
  render: args => ({
    components: { VScrollReveal },
    setup() {
      return { args }
    },
    template: `
      <div style="height: 200vh; padding: 2rem;">
        <div style="height: 50vh; background: #f0f0f0; display: flex; align-items: center; justify-content: center;">
          <p>Scroll down to see the effect</p>
        </div>
        <VScrollReveal v-bind="args">
          <div style="background: linear-gradient(45deg, #667eea, #764ba2); color: white; padding: 3rem; text-align: center; border-radius: 8px;">
            <h2>Revealed Content</h2>
            <p>This content appears with a smooth animation when scrolled into view.</p>
          </div>
        </VScrollReveal>
        <div style="height: 50vh; background: #f0f0f0; display: flex; align-items: center; justify-content: center;">
          <p>More content below</p>
        </div>
      </div>
    `,
  }),
}

export const MultipleItems: Story = {
  render: args => ({
    components: { VScrollReveal },
    setup() {
      return { args }
    },
    template: `
      <div style="height: 300vh; padding: 2rem;">
        <VScrollReveal v-for="n in 5" :key="n" v-bind="args" style="margin-bottom: 2rem;">
          <div :style="{
            background: \`linear-gradient(45deg, hsl(\${n * 60}, 70%, 60%), hsl(\${n * 60 + 30}, 70%, 60%))\`,
            color: 'white',
            padding: '2rem',
            text-align: 'center',
            borderRadius: '8px'
          }">
            <h3>Item {{ n }}</h3>
            <p>This is item number {{ n }} with a unique color.</p>
          </div>
        </VScrollReveal>
      </div>
    `,
  }),
}

export const LowThreshold: Story = {
  args: {
    threshold: 0.8,
    once: true,
  },
  render: args => ({
    components: { VScrollReveal },
    setup() {
      return { args }
    },
    template: `
      <div style="height: 200vh; padding: 2rem;">
        <div style="height: 50vh; background: #f0f0f0; display: flex; align-items: center; justify-content: center;">
          <p>Scroll down - this item needs 80% visibility</p>
        </div>
        <VScrollReveal v-bind="args">
          <div style="background: linear-gradient(45deg, #ff6b6b, #4ecdc4); color: white; padding: 3rem; text-align: center; border-radius: 8px;">
            <h2>High Threshold</h2>
            <p>This content requires 80% visibility to appear.</p>
          </div>
        </VScrollReveal>
      </div>
    `,
  }),
}
