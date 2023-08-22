import 'assets/css/main.scss'
import '@splidejs/vue-splide/css/core'

/** @type { import('@storybook/vue3').Preview } */
const preview = {
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
