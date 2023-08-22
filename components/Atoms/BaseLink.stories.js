import BaseLink from './BaseLink.vue'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
export default {
  title: 'Atoms/Link',
  component: BaseLink,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    color: {
      control: {
        type: 'select',
      },
      options: ['yellow', 'dark', 'white'],
    },
  },
}

// More on writing stories with args: https://storybook.js.org/docs/vue/writing-stories/args
const Template = (args) => ({
  components: { BaseLink },
  setup() {
    return { args }
  },
  template: `
  <BaseLink v-bind="args">
    {{ args.default }}
  </BaseLink>
  `,
})

export const Text = Template.bind({})
Text.args = {
  default: 'Lorem ipsum',
}

export const TextWithArrow = Template.bind({})
TextWithArrow.args = {
  default: 'Lorem ipsum',
  arrow: true,
}

export const TextWithIcon = Template.bind({})
TextWithIcon.args = {
  default: 'Lorem ipsum',
  svg: 'verdura',
}

export const Everything = Template.bind({})
Everything.args = {
  default: 'Lorem ipsum',
  svg: 'verdura',
  arrow: true,
}
