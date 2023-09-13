import ProductImage from '@/components/Atoms/ProductImage.vue'
import SVGDefinitions from '@/components/Atoms/SVGDefinitions.vue'

export default {
  title: 'Atoms/Product Image',
  component: ProductImage,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: {
        type: 'select',
      },
      options: ['cover', 'contain'],
    },
  },
  args: {
    size: 'cover',
  },
}

const Template = (args) => ({
  components: { ProductImage, SVGDefinitions },
  setup() {
    return { args }
  },
  template: `
  <div style="max-width: 100%; width: 240px">
    <SVGDefinitions />
    <ProductImage v-bind="args">
  </div>`,
})

export const Default = Template.bind({})
Default.args = {
  src: 'https://picsum.photos/300/300',
}

export const WithPlaceholder = Template.bind({})
WithPlaceholder.args = {
  size: 'contain',
}
