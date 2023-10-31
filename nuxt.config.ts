import { additionalData } from './utils/globalCSS'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'
import { clearJSON } from './server/utils/storageApi'
import { ofetch } from 'ofetch'
const runtimeDir = fileURLToPath(new URL('.storybook/runtime', import.meta.url))

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      title: process.env.APP_TITLE,
      endpoint: process.env.API_ENDPOINT_URL || '/',
      seoSeparator: '-',
    },
  },
  app: {
    baseURL: process.env.BASE_URL ? process.env.BASE_URL : '/',
    rootId: 'app',
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },
  css: [
    '@splidejs/vue-splide/css/core',
    '@/assets/css/main.scss',
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData,
        },
      },
    },
  },
  routeRules: {
    '/my-account/**': { ssr: false },
  },
  hooks: {
    ready: async () => {
      console.info('Avviato pulizia file')
      await clearJSON()
      console.info('Puliti tutti i file')
    },
    close: async () => {
      console.info('Avviato pulizia file')
      await clearJSON()
      console.info('Puliti tutti i file')
    },
    async 'nitro:config'(nitroConfig) {
      if (nitroConfig.dev) {
        return
      }

      const sitemap = await ofetch(
        (process.env.API_ENDPOINT_URL || '/') + '/v1/sitemap/products',
        { parseResponse: JSON.parse }
      )

      if (!sitemap.success) {
        throw new Error(sitemap.message)
      }

      nitroConfig.prerender.routes = [
        ...nitroConfig.prerender.routes,
        ...sitemap.data,
      ]
    },
  },
  modules: [
    '@nuxtjs/i18n',
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
  i18n: {
    compilation: {
      jit: process.env?.COMPILATED_TRANSLATION ? false : true,
    },
    vueI18n: './i18n.config.ts', // if you are using custom path, default
  },
  googleFonts: {
    inject: false,
    outputDir: 'assets',
    stylePath: 'css/google-fonts.css',
    fontsDir: 'fonts',
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
