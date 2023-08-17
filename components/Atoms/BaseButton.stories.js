import BaseButton from './BaseButton.vue'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
export default {
  title: 'Atoms/Button',
  component: BaseButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    color: {
      control: {
        type: 'select',
      },
      options: ['green', 'yellow', 'transparent'],
    },
    scope: {
      control: {
        type: 'select',
      },
      options: ['filter', 'search'],
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
    <template #default v-if="args.defaultSlot">{{ args.defaultSlot }}</template>
    <template #svg v-if="args.svgSlot">{{ args.svgSlot }}</template>
  </BaseButton>
  `,
})

export const Default = Template.bind({})
Default.args = {
  text: 'Lorem ipsum',
}

export const Yellow = Template.bind({})
Yellow.args = {
  text: 'Lorem ipsum',
  color: 'yellow',
}

export const Green = Template.bind({})
Green.args = {
  text: 'Lorem ipsum',
  color: 'green',
}

export const ForFilter = Template.bind({})
ForFilter.args = {
  text: 'Lorem ipsum',
  color: 'transparent',
  scope: 'filter',
}

export const Search = Template.bind({})
Search.args = {
  text: 'Lorem ipsum',
  color: 'yellow',
  scope: 'search',
  svg: 'search',
  svgSize: ['22px', '22px'],
}
