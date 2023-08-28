import BaseHeading from '@/components/Atoms/BaseHeading.vue'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
export default {
  title: 'Atoms/Heading',
  component: BaseHeading,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    tag: {
      control: {
        type: 'select',
      },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
  },
}

// More on writing stories with args: https://storybook.js.org/docs/vue/writing-stories/args
const Template = (args) => ({
  components: { BaseHeading },
  setup() {
    return { args }
  },
  template: `
  <BaseHeading v-bind="args">
  `,
})

export const H1 = Template.bind({})
H1.args = {
  tag: 'h1',
  text: 'Lorem ipsum',
}

export const H2 = Template.bind({})
H2.args = {
  tag: 'h2',
  text: 'Lorem ipsum',
}

export const H3 = Template.bind({})
H3.args = {
  tag: 'h3',
  text: 'Lorem ipsum',
}

export const H4 = Template.bind({})
H4.args = {
  tag: 'h4',
  text: 'Lorem ipsum',
}

export const H5 = Template.bind({})
H5.args = {
  tag: 'h5',
  text: 'Lorem ipsum',
}

export const H6 = Template.bind({})
H6.args = {
  tag: 'h6',
  text: 'Lorem ipsum',
}
