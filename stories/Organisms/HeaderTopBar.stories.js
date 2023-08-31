import HeaderTopBar from '@/components/Organisms/HeaderTopBar.vue'

export default {
  title: 'Organisms/Header Top Bar',
  component: HeaderTopBar,
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
