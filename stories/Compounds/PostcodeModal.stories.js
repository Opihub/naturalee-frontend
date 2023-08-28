import PostcodeModal from '@/components/Compounds/PostcodeModal.vue'

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
  <div style="height: 100vh">
    <PostcodeModal v-bind="args" />
  </div>
  `,
})

export const Default = Template.bind({})
Default.args = {}
