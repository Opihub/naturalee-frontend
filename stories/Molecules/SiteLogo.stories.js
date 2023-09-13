import SiteLogo from '@/components/Molecules/SiteLogo.vue'

export default {
  title: 'Molecules/Logo',
  component: SiteLogo,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    alt: false,
  },
}

const Template = (args) => ({
  components: {
    SiteLogo,
  },
  setup() {
    return { args }
  },
  template: `<SiteLogo v-bind="args">`,
})

export const Default = Template.bind({})

export const Alternative = Template.bind({})
Alternative.args = {
  alt: true,
}
