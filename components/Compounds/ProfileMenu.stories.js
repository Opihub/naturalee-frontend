import ProfileMenu from './ProfileMenu.vue'

export default {
  title: 'Compounds/Profile Menu',
  component: ProfileMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    menu: [
      {
        id: 1,
        title: 'Il mio profilo',
        url: '#',
        target: null,
      },
      {
        id: 2,
        title: 'I miei ordini',
        url: '#',
        target: null,
      },
      {
        id: 3,
        title: 'La mia lista',
        url: '#',
        target: null,
      },
    ],
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
