import InlineMenu from '@/components/Molecules/InlineMenu.vue'
import { getFromMock } from '@/utils/mock'

export default {
  title: 'Molecules/Inline Menu',
  component: InlineMenu,
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/vue/configure/story-layout
    layout: 'centered',
  },
  argTypes: {
    _background: 'color',
    color: {
      control: {
        type: 'select',
      },
      options: ['yellow', 'dark', 'white'],
    },

    gap: {
      control: {
        type: 'select',
      },
      options: {
        'Normal (30px)': 'normal',
        'Large (50px)': 'large',
        'Stretch (16px)': 'stretch',
        'Mini (12px)': 'mini',
      },
    },
  },
  args: {
    _background: '#00966E',
    gap: 'normal',
    menu: getFromMock('menu', 'primary'),
  },
}

// More on writing stories with args: https://storybook.js.org/docs/vue/writing-stories/args
const Template = (args) => ({
  components: { InlineMenu },
  setup() {
    return { args }
  },
  template: `
  <div :style="{backgroundColor: args._background}" style="padding: 10px">
    <InlineMenu v-bind="args" />
  </div>
  `,
})

export const MainHeader = Template.bind({})
MainHeader.args = {}

export const MainFooter = Template.bind({})
MainFooter.args = {
  gap: 'large',
}

export const Social = Template.bind({})
Social.args = {
  gap: 'stretch',
  menu: getFromMock('menu', 'socials'),
}

export const Privacy = Template.bind({})
Privacy.args = {
  gap: 'mini',
  color: 'white',
  separator: '-',
  menu: getFromMock('menu', 'privacy'),
}
