// import { within, userEvent } from '@storybook/testing-library';
import FaqPage from '@/pages/faq.vue'
import DefaultLayout from '@/layouts/default.vue'
import Layout from '@/stories/Layouts/default.stories'
import SVGDefinitions from '@/components/Atoms/SVGDefinitions.vue'

import { createResponse } from '@/server/utils/responses'
import { getFromMock } from '@/utils/mock'

const foundedFAQs = {
  url: '/faq',
  method: 'GET',
  status: 200,
  response: createResponse({
    code: 'faq_found',
    message: `Sono state trovate ${length} faq`,
    data: getFromMock('faq'),
  }),
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
