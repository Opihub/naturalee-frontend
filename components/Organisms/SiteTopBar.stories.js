import SiteTopBar from './SiteTopBar.vue'

export default {
  title: 'Organisms/Top Bar',
  component: SiteTopBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    socialsMenu: [
      {
        id: 1,
        title: 'Facebook',
        url: 'https://it-it.facebook.com/',
        target: '_blank',
      },
      {
        id: 2,
        title: 'Instagram',
        url: 'https://www.instagram.com/',
        target: '_blank',
      },
    ],
    banners: [
      'Lorem ipsum',
      'dolor sit amet, consectetur adipiscing elit',
      'dolor sit amet, consectetur adipiscing elit. Fusce tempus ipsum ut erat pharetra, at scelerisque lorem placerat.',
    ],
    primaryMenu: [
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
  },
}

const Template = (args) => ({
  components: { SiteTopBar },
  setup() {
    return { args }
  },
  template: `
  <SiteTopBar v-bind="args" />
  `,
})

export const Default = Template.bind({})
Default.args = {}
