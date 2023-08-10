import BreadCrumb from './BreadCrumb.vue'

export default {
  title: 'Molecules/Breadcrumb',
  component: BreadCrumb,
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/vue/configure/story-layout
    layout: 'centered',
  },
  argTypes: {
    _background: 'color',
  },
  args: {
    _background: '#00966E',
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
  },
}

// More on writing stories with args: https://storybook.js.org/docs/vue/writing-stories/args
const Template = (args) => ({
  components: { BreadCrumb },
  setup() {
    return { args }
  },
  template: `
  <div :style="{backgroundColor: args._background}" style="padding: 10px">
    <BreadCrumb v-bind="args" />
  </div>
  `,
})

export const MainHeader = Template.bind({})
MainHeader.args = {}

export const MainFooter = Template.bind({})
MainFooter.args = {
  gap: 'large',
}

export const Social = Template.bind({})
Social.args = {
  gap: 'stretch',
  menu: [
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
}

export const Privacy = Template.bind({})
Privacy.args = {
  gap: 'mini',
  color: 'white',
  separator: '-',
  menu: [
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
    {
      id: 4,
      title: 'R-innovazione by Opiquad.it',
      url: '#',
      target: null,
    },
  ],
}
