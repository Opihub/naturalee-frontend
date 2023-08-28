import MarkerLabel from '@/components/Atoms/MarkerLabel.vue'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
export default {
  title: 'Atoms/Marker Label',
  component: MarkerLabel,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    text: 'Lorem',
  },
}

const Template = (args) => ({
  components: {
    MarkerLabel,
  },
  setup() {
    return { args }
  },
  template: `<MarkerLabel v-bind="args" />`,
})

export const Default = Template.bind({})

export const Novità = Template.bind({})
Novità.args = {
  text: 'Novità',
  color: '#FF5600',
}
