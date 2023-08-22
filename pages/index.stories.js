// import { within, userEvent } from '@storybook/testing-library';
import HomePage from './index.vue'
import DefaultLayout from '@/layouts/default.vue'
import Layout from '@/layouts/default.stories'

export default {
  title: 'Pages/Home',
  component: HomePage,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/vue/configure/story-layout
    layout: 'fullscreen',
  },
  args: {
    ...Layout.args,
  },
}

export const WithLayout = {
  render: (args) => ({
    components: {
      HomePage,
      DefaultLayout,
    },
    setup() {
      return { args }
    },
    template: `
    <DefaultLayout v-bind="args">
      <HomePage />
    </DefaultLayout>
    `,
  })
}

export const WithoutLayout = {
  render: (args) => ({
    components: {
      HomePage,
    },
    setup() {
      return { args }
    },
    template: '<HomePage />',
  }),
}
