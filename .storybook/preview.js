import 'assets/css/main.scss'
import '@splidejs/vue-splide/css/core'

import { initialize, mswDecorator } from 'msw-storybook-addon'

/*
 * Initializes MSW
 * See https://github.com/mswjs/msw-storybook-addon#configuring-msw
 * to learn how to customize it
 */
initialize()

/** @type { import('@storybook/vue3').Preview } */
const preview = {
  decorators: [mswDecorator],
  parameters: {
    viewport: {
      viewports: [
        {
          name: 'iPhone from XD',
          type: 'mobile',
          styles: {
            width: '393px',
            height: '760px',
          },
        },
        {
          name: 'Macbook pro',
          type: 'desktop',
          styles: {
            width: '1280px',
            height: '720px',
          },
        },
        {
          name: 'MAX DESKTOP SIZE',
          type: 'desktop',
          styles: {
            width: '992px',
            height: '720px',
          },
        },
        {
          name: 'MAX TABLET SIZE',
          type: 'tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
      ],
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export default preview
