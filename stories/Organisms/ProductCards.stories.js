import ProductCards from '@/components/Organisms/ProductCards.vue'
import SVGDefinitions from '@/components/Atoms/SVGDefinitions.vue'
import { getFromMock } from '@/utils/mock'

export default {
  title: 'Organisms/Product Cards',
  component: ProductCards,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    title: 'Frutta e Verdura Fresca',
    products: getFromMock('shop_homepage_products'),
  },
}

const Template = (args) => ({
  components: { ProductCards, SVGDefinitions },
  setup() {
    return { args }
  },
  template: `
  <SVGDefinitions />
  <ProductCards v-bind="args" />
  `,
})

export const Default = Template.bind({})
Default.args = {}
