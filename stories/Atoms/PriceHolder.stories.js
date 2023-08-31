import PriceHolder from '@/components/Atoms/PriceHolder.vue'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
export default {
  title: 'Atoms/Price Holder',
  component: PriceHolder,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    price: {
      control: {
        type: 'number',
      },
    },
  },
  args: {
    price: 0,
    currencyAfterPrice: false,
  },
}

const Template = (args) => ({
  components: {
    PriceHolder,
  },
  setup() {
    return { args }
  },
  template: `<PriceHolder v-bind="args">`,
})

export const Default = Template.bind({})

export const ThousandSeparator = Template.bind({})
ThousandSeparator.args = {
  price: 9999.99,
}

export const CurrencyAfterPrice = Template.bind({})
CurrencyAfterPrice.args = {
  currencyAfterPrice: true,
}
