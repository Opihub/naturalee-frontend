import SiteHeader from './SiteHeader.vue'
import MiniCart from '@/components/Compounds/MiniCart.stories'
import ProfileMenu from '@/components/Compounds/ProfileMenu.stories'

export default {
  title: 'Organisms/Header',
  component: SiteHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    profileMenu: ProfileMenu.args.menu,
    categories: [
      {
        id: 1,
        title: 'Verdura',
        url: 'verdura',
        image: 'verdura',
      },
      {
        id: 2,
        title: 'Frutta',
        url: 'frutta',
        image: 'frutta',
      },
      {
        id: 3,
        title: 'Esotico',
        url: 'esotico',
        image: 'esotico',
      },
      {
        id: 4,
        title: 'Aromi',
        url: 'aromi',
        image: 'aromi',
      },
      {
        id: 5,
        title: 'Dispensa',
        url: 'dispensa',
        image: 'dispensa',
      },
    ],
  },
}

const Template = (args) => ({
  components: { SiteHeader },
  setup() {
    return { args }
  },
  template: `
  <SiteHeader v-bind="args" />
  `,
})

export const NotLoggedInAndCartEmpty = Template.bind({})
NotLoggedInAndCartEmpty.args = {}

export const LoggedInAndCartEmpty = Template.bind({})
LoggedInAndCartEmpty.args = {
  username: 'Opiquad'
}

export const NotLoggedInAndCartFull = Template.bind({})
NotLoggedInAndCartFull.args = {
  cart: MiniCart.args.cart,
}

export const LoggedInAndCartFull = Template.bind({})
LoggedInAndCartFull.args = {
  cart: MiniCart.args.cart,
  username: 'Opiquad'
}
