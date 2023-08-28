import PostcodeModal from './PostcodeModal.vue'

export default {
  title: 'Compounds/Postcode Modal',
  component: PostcodeModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
  },
}

const Template = (args) => ({
  components: { PostcodeModal },
  setup() {
    return { args }
  },
  template: `
  <PostcodeModal v-bind="args" />
  `,
})

export const Default = Template.bind({})
Default.args = {}
