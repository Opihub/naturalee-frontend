import BaseParagraph from '@/components/Atoms/BaseParagraph.vue'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
export default {
  title: 'Atoms/Paragraph',
  component: BaseParagraph,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    _background: 'color',
    color: {
      control: {
        type: 'select',
      },
      options: ['white', 'dark'],
    },
  },
  args: {
    _background: '#ffffff',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
  },
}

// More on writing stories with args: https://storybook.js.org/docs/vue/writing-stories/args
const Template = (args) => ({
  components: { BaseParagraph },
  setup() {
    return { args }
  },
  template: `
  <div :style="{backgroundColor: args._background}" style="padding: 10px">
    <BaseParagraph v-bind="args">
  </div>
  `,
})

export const Default = Template.bind({})

export const White = Template.bind({})
White.args = {
  _background: '#00966E',
  color: 'white',
}
