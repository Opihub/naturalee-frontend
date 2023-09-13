import MarqueeSlider from '@/components/Molecules/MarqueeSlider.vue'
import { getFromMock } from '@/utils/mock'

export default {
  title: 'Molecules/Marquee',
  component: MarqueeSlider,
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/vue/configure/story-layout
    layout: 'fullscreen',
  },
  argTypes: {
    _background: 'color',
  },
  args: {
    _background: '#FFFFFF',
    marquee: getFromMock('marquee'),
  },
}

// More on writing stories with args: https://storybook.js.org/docs/vue/writing-stories/args
const Template = (args) => ({
  components: { MarqueeSlider },
  setup() {
    return { args }
  },
  template: `
  <div :style="{backgroundColor: args._background}">
    <MarqueeSlider v-bind="args" />
  </div>
  `,
})

export const Default = Template.bind({})
Default.args = {}
