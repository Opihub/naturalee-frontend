import BaseButton from './BaseButton.vue'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
export default {
  title: 'Atoms/BaseButton',
  component: BaseButton,
  tags: ['autodocs'],
  argTypes: {
    style: {
      control: {
        type: 'select',
      },
      options: ['green', 'yellow', 'transparent'],
    },
  },
}

// More on writing stories with args: https://storybook.js.org/docs/vue/writing-stories/args
const Template = (args) => ({
  components: { BaseButton },
  setup() {
    return { args }
  },
  template: `
  <BaseButton v-bind="args">
    {{ args.default }}
  </BaseButton>
  `,
})

export const Default = Template.bind({})
Default.args = {
  default: 'Lorem ipsum',
}

export const Yellow = Template.bind({})
Yellow.args = {
  default: 'Lorem ipsum',
  style: 'yellow',
}

export const Green = Template.bind({})
Green.args = {
  default: 'Lorem ipsum',
  style: 'green',
}

export const ForFilter = Template.bind({})
ForFilter.args = {
  default: 'Lorem ipsum',
  style: 'transparent',
}
