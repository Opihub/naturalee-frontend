import MiniCart from '@/components/Compounds/MiniCart.vue'
import { getFromMock } from '@/utils/mock'

export default {
  title: 'Compounds/Mini Cart',
  component: MiniCart,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    cart: getFromMock('shop_cart_products'),
  },
}

const Template = (args) => ({
  components: { MiniCart },
  setup() {
    return { args }
  },
  template: `
  <MiniCart v-bind="args" />
  `,
})

export const Default = Template.bind({})
Default.args = {}

export const Empty = Template.bind({})
Empty.args = {
  cart: [],
}
