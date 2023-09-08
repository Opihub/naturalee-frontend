import { additionalData } from './utils/globalCSS'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'
const runtimeDir = fileURLToPath(new URL('.storybook/runtime', import.meta.url))

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      title: process.env.APP_TITLE,
      endpoint: process.env.API_ENDPOINT_URL || '/',
    },
  },
  app: {
    baseURL: process.env.BASE_URL ? process.env.BASE_URL : '/',
    rootId: 'app',
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
  },
  css: ['@splidejs/vue-splide/css/core', '@/assets/css/main.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData,
        },
      },
    },
  },
  modules: [
    '@nuxtjs/google-fonts',
    'nuxt-svgo',
    'nuxt-icons',
    '@nuxt/image',
    [
      '@pinia/nuxt',
      {
        autoImports: [
          'defineStore',
          'skipHydrate',
          'acceptHMRUpdate',
          'storeToRefs',
        ],
      },
    ],
  ],
  components: [
    {
      path: '~/components/Atoms',
      pathPrefix: false,
    },
    {
      path: '~/components/Molecules',
      pathPrefix: false,
    },
    {
      path: '~/components/Compounds',
      pathPrefix: false,
    },
    {
      path: '~/components/Organisms',
      pathPrefix: false,
    },
  ],
  googleFonts: {
    inject: true,
    download: true,
    display: 'swap',
    families: {
      Mulish: [400, 700, 800],
      Lato: {
        wght: [300, 400, 700],
        ital: [400],
      },
    },
  },
  image: {
    // Options
  },
  svgo: {
    defaultImport: 'component',
  },
  // @ts-ignore
  storybook: {
    components: {
      NuxtImg: 'storybook/custom/components.mjs',
    },
    composables: {
      'storybook/custom/composables.mjs': {
        '#app': [
          'useFetch',
          'useLazyFetch',
          'useAsyncData',
          'useLazyAsyncData',
          'useRuntimeConfig',
        ],
        '#build/storybook/composables.mjs': ['useNuxtApp'],
      },
    },
    templates: [
      {
        src: join(runtimeDir, 'composables.mjs'),
        filename: 'storybook/custom/composables.mjs',
      },

      {
        src: join(runtimeDir, 'components.mjs'),
        filename: 'storybook/custom/components.mjs',
      },
    ],
  },
})
