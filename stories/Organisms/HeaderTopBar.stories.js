import HeaderTopBar from '@/components/Organisms/HeaderTopBar.vue'
import { getFromMock } from '@/utils/mock'

export default {
  title: 'Organisms/Header Top Bar',
  component: HeaderTopBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    socialsMenu: getFromMock('menu', 'socials'),
    banners: getFromMock('topbar'),
    primaryMenu: getFromMock('menu', 'primary'),
  },
}

const Template = (args) => ({
  components: { HeaderTopBar },
  setup() {
    return { args }
  },
  template: `
  <HeaderTopBar v-bind="args" />
  `,
})

export const Default = Template.bind({})
Default.args = {}
