import HeaderBottomBar from './HeaderBottomBar.vue'
import BreadCrumb from '@/components/Molecules/BreadCrumb.stories'

export default {
  title: 'Organisms/Header Bottom Bar',
  component: HeaderBottomBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    breadcrumb: BreadCrumb.args.menu,
  },
}

const Template = (args) => ({
  components: { HeaderBottomBar },
  setup() {
    return { args }
  },
  template: `
  <HeaderBottomBar v-bind="args" />
  `,
})

export const Default = Template.bind({})
Default.args = {}
