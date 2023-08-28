import HeaderMain from '@/components/Organisms/HeaderMain.vue'
import MiniCart from '@/stories/Compounds/MiniCart.stories'
import ProfileMenu from '@/stories/Compounds/ProfileMenu.stories'
import CategoriesMenu from '@/stories/Compounds/CategoriesMenu.stories'

export default {
  title: 'Organisms/Header',
  component: HeaderMain,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    cart: MiniCart.args.cart,
    username: 'Opiquad',
    profileMenu: ProfileMenu.args.menu,
    categories: CategoriesMenu.args.categories,
  },
}

const Template = (args) => ({
  components: { HeaderMain },
  setup() {
    return { args }
  },
  template: `
  <HeaderMain v-bind="args" />
  `,
})

export const NotLoggedInAndCartEmpty = Template.bind({})
NotLoggedInAndCartEmpty.args = {
  username: null,
  cart: [],
}

export const LoggedInAndCartEmpty = Template.bind({})
LoggedInAndCartEmpty.args = {
  cart: [],
}

export const NotLoggedInAndCartFull = Template.bind({})
NotLoggedInAndCartFull.args = {
  username: null,
}

export const LoggedInAndCartFull = Template.bind({})
LoggedInAndCartFull.args = {}
