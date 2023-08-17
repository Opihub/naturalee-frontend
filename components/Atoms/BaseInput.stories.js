import BaseInput from './BaseInput.vue'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
export default {
  title: 'Atoms/Input',
  component: BaseInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    width: {
      control: {
        type: 'select',
      },
      options: ['auto', 'full', 'half', 'third'],
    },
  },
}

// More on writing stories with args: https://storybook.js.org/docs/vue/writing-stories/args
const Template = (args) => ({
  components: { BaseInput },
  setup() {
    return { args }
  },
  template: `
  <BaseInput v-bind="args" />
  `,
})

export const Default = Template.bind({})
Default.args = {
  modelValue: '',
  placeholder: 'Lorem ipsum',
}

export const HalfWidth = Template.bind({})
HalfWidth.args = {
  modelValue: 'Lorem ipsum',
  placeholder: 'Lorem ipsum',
  width: 'half',
}

export const ThirdWidth = Template.bind({})
ThirdWidth.args = {
  modelValue: 'Lorem ipsum',
  placeholder: 'Lorem ipsum',
  width: 'third',
}

export const FullWidth = Template.bind({})
FullWidth.args = {
  modelValue: 'Lorem ipsum',
  placeholder: 'Lorem ipsum',
  width: 'full',
}
