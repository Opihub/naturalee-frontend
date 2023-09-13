import ProductCard from '@/components/Molecules/ProductCard.vue'
import SVGDefinitions from '@/components/Atoms/SVGDefinitions.vue'
import { getFromMock } from '@/utils/mock'

export default {
  title: 'Molecules/Product Card',
  component: ProductCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

const Template = (args) => ({
  components: { ProductCard, SVGDefinitions },
  setup() {
    return { args }
  },
  template: `
  <div style="max-width: 100%; width: 385px">
    <SVGDefinitions />
    <ProductCard v-bind="args">
      {{ args.default }}
    </ProductCard>
  </div>
  `,
})

export const Default = Template.bind({})
Default.args = {
  product: getFromMock('shop_homepage_products')[0],
}

export const WithMarker = Template.bind({})
WithMarker.args = {
  product: {
    ...Default.args.product,
    marker: {
      text: 'Novità',
      color: '#FF5600',
    },
  },
}

export const WithPlaceholderImage = Template.bind({})
WithPlaceholderImage.args = {
  product: {
    ...Default.args.product,
    image: null,
  },
}
