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
      seoSeparator: '-',
      stripeKey: process.env.STRIPE_PUBLIC_KEY,
    },
  },
  app: {
    baseURL: process.env.BASE_URL ? process.env.BASE_URL : '/',
    rootId: 'app',
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
      htmlAttrs: {
        lang: 'it-IT',
      },
    },
  },
  experimental: {
    inlineRouteRules: true
  },
  css: [
    '@splidejs/vue-splide/css/core',
    'assets/css/main.scss',
    // 'assets/css/google-fonts.css',
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
    '/checkout': { ssr: false },
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
    ['@nuxtjs/robots', { configPath: 'robots.config.js' }],
    '@nuxtjs/sitemap',
  ],
  googleFonts: {
    download: true,
    inject: true,
    outputDir: 'public',
    stylePath: 'google-fonts.css',
    fontsDir: 'fonts',
    // useStylesheet: true,
    fontsPath: '/fonts',
    display: 'swap',
    families: {
      Mulish: [400, 700, 800],
      Lato: {
        wght: [300, 400, 700],
        ital: [400],
      },
    },
  },
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
    locales: [{ code: 'it', iso: 'it-IT' }],
    defaultLocale: 'it',
    compilation: {
      jit: process.env?.COMPILATED_TRANSLATION ? false : true,
    },
    vueI18n: './i18n.config.ts', // if you are using custom path, default
  },
  image: {
    providers: {
      myProvider: {
        name: 'clientProvider', // optional value to overrider provider name
        provider: '~/providers/clientProvider.ts', // Path to custom provider
        options: {
          // ... provider options
          baseURL: process.env.BASE_URL ? process.env.BASE_URL : '/',
        },
      },
    },
  },

  sitemap: {
    sitemaps: {
      pages: {
        includeAppSources: true,
        exclude: [
          '/frutta/**',
          '/verdura/**',
          '/aromi/**',
          '/esotico/**',
          '/dispensa/**',
        ],
      },
      shop: {
        includeAppSources: false,
        urls() {
          // resolved when the sitemap is shown
          return ['/frutta/', '/verdura/', '/aromi/', '/esotico/', '/dispensa/']
        },
        sources: ['/api/__sitemap__/shop'],
        defaults: { priority: 0.7 },
      },
    },
  },

  site: {
    trailingSlash: true,
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
