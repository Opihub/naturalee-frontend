import ProfileMenu from '@/components/Compounds/ProfileMenu.vue'
import { getFromMock } from '@/utils/mock'

export default {
  title: 'Compounds/Profile Menu',
  component: ProfileMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    menu: getFromMock('menu', 'profile'),
  },
}

// More on writing stories with args: https://storybook.js.org/docs/vue/writing-stories/args
const Template = (args) => ({
  components: { ProfileMenu },
  setup() {
    return { args }
  },
  template: `
  <ProfileMenu v-bind="args" />
  `,
})

export const Default = Template.bind({})
Default.args = {
  username: 'Opiquad',
}
