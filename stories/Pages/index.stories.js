// import { within, userEvent } from '@storybook/testing-library';
import HomePage from '@/pages/index.vue'
import DefaultLayout from '@/layouts/default.vue'
import Layout from '@/stories/Layouts/default.stories'
import SVGDefinitions from '@/components/Atoms/SVGDefinitions.vue'

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
      SVGDefinitions,
    },
    setup() {
      return { args }
    },
    template: `
    <SVGDefinitions />
    <DefaultLayout v-bind="args">
      <HomePage />
    </DefaultLayout>
    `,
  }),
}

export const WithoutLayout = {
  render: (args) => ({
    components: {
      HomePage,
      SVGDefinitions,
    },
    setup() {
      return { args }
    },
    template: '<SVGDefinitions /><HomePage />',
  }),
}
