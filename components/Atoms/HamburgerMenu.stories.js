import HamburgerMenu from './HamburgerMenu.vue'
import { ref } from 'vue'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
export default {
  title: 'Atoms/Hamburger Menu',
  component: HamburgerMenu,
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
      HamburgerMenu,
    },
    setup() {
      const active = ref(false)
      // eslint-disable-next-line no-unused-vars
      const toggleActive = () => {
        active.value = !active.value
      }
      return { args, active, toggleActive }
    },
    template: `<HamburgerMenu v-bind="args" :class="{ 'is-active': active }" @click="toggleActive">`,
  }),
}

export const Closed = {
  render: (args) => ({
    components: {
      HamburgerMenu,
    },
    setup() {
      return { args }
    },
    template: `<HamburgerMenu v-bind="args">`,
  }),
}

export const Active = {
  render: (args) => ({
    components: {
      HamburgerMenu,
    },
    setup() {
      return { args }
    },
    template: `<HamburgerMenu v-bind="args" class="is-active">`,
  }),
}
