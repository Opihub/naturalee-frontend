import SiteBottomHeader from './SiteBottomHeader.vue'
import BreadCrumb from '@/components/Molecules/BreadCrumb.stories'

export default {
  title: 'Organisms/Header Bottom Bar',
  component: SiteBottomHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    breadcrumb: BreadCrumb.args.menu,
  },
}

const Template = (args) => ({
  components: { SiteBottomHeader },
  setup() {
    return { args }
  },
  template: `
  <SiteBottomHeader v-bind="args" />
  `,
})

export const Default = Template.bind({})
Default.args = {}
