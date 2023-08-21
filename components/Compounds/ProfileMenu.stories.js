import ProfileMenu from './ProfileMenu.vue'

export default {
  title: 'Compounds/Profile Menu',
  component: ProfileMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    _modalWidth: 'string',
    size: {
      control: {
        type: 'select',
      },
      options: ['default', 'mini'],
    },
  },
  args: {
    _modalWidth: '317px',
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
  <div :style="{width: args._modalWidth}" style="padding: 10px; max-width: calc(100vw - 1rem * 2);">
    <ProfileMenu :style="{width: '100%', maxWidth: args._modalWidth}" v-bind="args" />
  </div>
  `,
})

export const Default = Template.bind({})
Default.args = {
  username: 'Opiquad',
  _modalWidth: '317px',
}
