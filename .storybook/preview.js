import 'assets/css/main.scss'
import '@splidejs/vue-splide/css/core'

/** @type { import('@storybook/vue3').Preview } */
const preview = {
  mockAddonConfigs: {
    // globalMockData: [{
    //   // An array of mock objects which will add in every story
    //   url: 'http://localhost:0000',
    //   method: 'PUT',
    //   status: 201,
    //   response: {},
    // }],
    refreshStoryOnUpdate: true, // This property re-renders the story if there's any data changes
    disableUsingOriginal: true, // This property disables the toggle (on/off) option to use the original endpoint
    disable: false, // This property disables the panel from all the stories
  },
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
