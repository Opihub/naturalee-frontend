import MiniCart from './MiniCart.vue'

export default {
  title: 'Compounds/Mini Cart',
  component: MiniCart,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    cart: [
      {
        id: 1,
        title: 'Banane Chiquita',
        link: 'frutta/banane-chiquita',
        slug: 'banane-chiquita',
        sku: 'BAN-CHIQ',
        unit: 'kg',
        image: 'https://picsum.photos/id/102/120/120?grayscale&blur=2',
        price: 5.23,
        // discountPrice: "?Number",
        quantity: 3,
      },
      {
        id: 2,
        title: 'Cetrioli Verdi',
        link: 'verdura/cetrioli-verdi',
        slug: 'cetrioli-verdi',
        sku: 'CET-VER',
        unit: 'pz',
        image: 'https://picsum.photos/id/202/120/120?grayscale&blur=2',
        price: 2.99,
        // discountPrice: "?Number",
        quantity: 30,
      },
      {
        id: 3,
        title: 'Carciofi',
        link: 'verdura/carciofi',
        slug: 'carciofi',
        sku: 'CARCF',
        unit: 'pz',
        image: 'https://picsum.photos/id/302/120/120?grayscale&blur=2',
        price: 17.99,
        // discountPrice: "?Number",
        quantity: 2,
      },
      {
        id: 4,
        title: 'Noci di Macadamia',
        link: 'verdura/noci-macadamia',
        slug: 'noci-macadamia',
        sku: 'NOC-MAC',
        unit: 'kg',
        image: 'https://picsum.photos/id/402/120/120?grayscale&blur=2',
        price: 12.99,
        // discountPrice: "?Number",
        quantity: 3,
      },
      {
        id: 5,
        title: 'Songino',
        link: 'verdura/songino',
        slug: 'songino',
        sku: 'SONGINO',
        unit: 'kg',
        image: 'https://picsum.photos/id/502/120/120?grayscale&blur=2',
        price: 1.27,
        // discountPrice: "?Number",
        quantity: 14,
      },
    ],
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
  cart: []
}
