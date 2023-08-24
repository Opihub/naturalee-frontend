import WishlistButton from './WishlistButton.vue'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
export default {
  title: 'Atoms/Wishlist Button',
  component: WishlistButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    productId: {
      control: {
        type: 'number',
      },
    },
  },
  args: {
    productId: 1,
  },
}

export const Default = {
  render: (args) => ({
    components: {
      WishlistButton,
    },
    setup() {
      return { args }
    },
    template: `<WishlistButton v-bind="args">`,
  }),
}

export const Active = {
  render: (args) => ({
    components: {
      WishlistButton,
    },
    setup() {
      return { args }
    },
    template: `<WishlistButton v-bind="args" class="is-active">`,
  }),
}
