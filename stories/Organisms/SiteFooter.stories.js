import SiteFooter from '@/components/Organisms/SiteFooter.vue'
import getFromMock from '@/utils/mock'

export default {
  title: 'Organisms/Footer',
  component: SiteFooter,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    paymentImage: '/pagamenti-sicuri.png',
    socialsMenu: getFromMock('menu', 'socials'),
    menu: getFromMock('menu', 'primary'),
    copyright: getFromMock('copyright'),
    privacyMenu: getFromMock('menu', 'privacy'),
  },
}

const Template = (args) => ({
  components: { SiteFooter },
  setup() {
    return { args }
  },
  template: `
  <SiteFooter v-bind="args">
    <template #by>R-innovazione by <u>Opiquad.it</u></template>
  </SiteFooter>
  `,
})

export const Default = Template.bind({})
Default.args = {}
