// import { within, userEvent } from '@storybook/testing-library';
import FaqPage from '@/pages/faq.vue'
import DefaultLayout from '@/layouts/default.vue'
import Layout from '@/stories/Layouts/default.stories'
import SVGDefinitions from '@/components/Atoms/SVGDefinitions.vue'

import { createResponse } from '@/server/utils/responses'
import { random } from '@/utils/random'

const foundedFAQs = {
  url: '/faq',
  method: 'GET',
  status: 200,
  response: () => {
    const length = random(6, 12)

    return createResponse({
      code: 'faq_found',
      message: `Sono state trovate ${length} faq`,

      data: Array.from(
        {
          length,
        },
        () => {
          return {
            title: 'Lorem ipsum dolor sit?',
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
          }
        }
      ),
    })
  },
}

export default {
  title: 'Pages/FAQ',
  component: FaqPage,
  parameters: {
    layout: 'fullscreen',
    mockData: [foundedFAQs],
  },
  args: {
    ...Layout.args,
  },
}

export const WithLayout = {
  render: (args) => ({
    components: {
      FaqPage,
      DefaultLayout,
      SVGDefinitions,
    },
    setup() {
      return { args }
    },
    template: `
    <SVGDefinitions />
    <DefaultLayout v-bind="args">
      <FaqPage />
    </DefaultLayout>
    `,
  }),
}

export const WithoutLayout = {
  render: (args) => ({
    components: {
      FaqPage,
      SVGDefinitions,
    },
    setup() {
      return { args }
    },
    template: '<SVGDefinitions /><FaqPage />',
  }),
}
