import SiteFooter from './SiteFooter.vue'

export default {
  title: 'Organisms/Footer',
  component: SiteFooter,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
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
Default.args = {
  paymentImage: '/pagamenti-sicuri.png',
  menu: [
    {
      id: 1,
      title: 'Azienda',
      url: 'azienda',
      target: null,
    },
    {
      id: 2,
      title: 'Contatti',
      url: 'contatti',
      target: null,
    },
    {
      id: 3,
      title: 'FAQ',
      url: 'faq',
      target: null,
    },
    {
      id: 4,
      title: 'Consegna',
      url: 'consegna',
      target: null,
    },
  ],
  copyright: [
    {
      id: 1,
      text: 'Naturalee SRL',
    },
    {
      id: 2,
      text: 'PI IT123456789',
    },
  ],
  privacyMenu: [
    {
      id: 1,
      title: 'Privacy Policy',
      url: 'privacy-policy',
      target: null,
    },
    {
      id: 2,
      title: 'Cookie Policy',
      url: 'cookie-policy',
      target: null,
    },
    {
      id: 3,
      title: 'Condizioni di vendita',
      url: 'condizioni-di-vendita',
      target: null,
    },
  ],
}
