import SiteTeaser from '@/components/Organisms/SiteTeaser.vue'
import BreadCrumb from '@/stories/Molecules/BreadCrumb.stories'

export default {
  title: 'Organisms/Teaser',
  component: SiteTeaser,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    title: 'Amet consectetur adipiscing elit',
    image: 'https://picsum.photos/1920/300',
  },
}

const Template = (args) => ({
  components: { SiteTeaser },
  setup() {
    return { args }
  },
  template: `<SiteTeaser v-bind="args" />`,
})

export const Default = Template.bind({})
Default.args = {}

export const WithBreadcrumbs = Template.bind({})
WithBreadcrumbs.args = {
  breadcrumb: BreadCrumb.args.menu,
}
