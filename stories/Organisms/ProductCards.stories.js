import ProductCards from '@/components/Organisms/ProductCards.vue'
import SVGDefinitions from '@/components/Atoms/SVGDefinitions.vue'

export default {
  title: 'Organisms/Product Cards',
  component: ProductCards,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    title: 'Frutta e Verdura Fresca',
    products: [
      {
        id: 1,
        image: 'https://picsum.photos/300/300',
        title: 'Anguria',
        provenance: 'Italia',
        slug: 'anguria',
        link: 'frutta/anguria',
      },
      {
        id: 2,
        image: 'https://picsum.photos/300/300',
        title: 'Melone',
        provenance: 'Italia',
        slug: 'melone',
        link: 'frutta/melone',
      },
      {
        id: 3,
        image: 'https://picsum.photos/300/300',
        title: 'Pere Williams',
        provenance: 'Italia',
        slug: 'pere-williams',
        link: 'frutta/pere-williams',
      },
      {
        id: 4,
        image: 'https://picsum.photos/300/300',
        title: 'Carciofi',
        provenance: 'Italia',
        slug: 'carciofi',
        link: 'verdura/carciofi',
      },
      {
        id: 5,
        image: 'https://picsum.photos/300/300',
        title: 'Peperoni',
        provenance: 'Italia',
        slug: 'peperoni',
        link: 'verdura/peperoni',
      },
    ],
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
