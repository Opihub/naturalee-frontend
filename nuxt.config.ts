import { additionalData } from './utils/globalCSS'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'
import type { ModuleOptions } from '@nuxt/image'
const runtimeDir = fileURLToPath(new URL('.storybook/runtime', import.meta.url))

const imageSettings: Partial<ModuleOptions> &
  Pick<ModuleOptions, 'domains' | 'alias'> = {
  domains: [],
  alias: {},
  // providers: {
  //   myProvider: {
  //     name: 'clientProvider', // optional value to overrider provider name
  //     provider: '~/providers/clientProvider.ts', // Path to custom provider
  //     options: {
  //       // ... provider options
  //       baseURL: process.env.BASE_URL ? process.env.BASE_URL : '/',
  //     },
  //   },
  // },
}

if (process.env.API_ENDPOINT_URL) {
  const endpoint = new URL(process.env.API_ENDPOINT_URL)
  imageSettings.domains.push(endpoint.host)
  imageSettings.alias.remote = endpoint.protocol + '//' + endpoint.host
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    endpoint: process.env.API_ENDPOINT_URL || '/',
    useKV: !!process.env?.USE_KV || !!process.env?.KV_URL || false,

    public: {
      title: process.env.APP_TITLE,
      endpoint: process.env.API_ENDPOINT_URL || '/',
      seoSeparator: '-',
      stripeKey: process.env.STRIPE_PUBLIC_KEY,
      recaptchaKey: process.env.RECAPTCHA_PUBLIC_KEY,
      isProduction: process.env?.IS_PRODUCTION || false,
      currency: 'EUR',
      iubenda: {
        siteId: process.env?.IUBENDA_SITE_ID,
        cookiePolicyId: process.env?.IUBENDA_ID,
      },
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
      bodyAttrs: {
        id: 'body',
        'attr-lang': 'it',
        'iubenda-site-id': process.env?.IUBENDA_SITE_ID || '',
        'iubenda-cookie-policy-id': process.env?.IUBENDA_ID || '',
      },
    },
  },
  experimental: {
    inlineRouteRules: true,
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
    '@zadigetvoltaire/nuxt-gtm',
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
    // outputDir: 'public',
    // stylePath: 'google-fonts.css',
    // fontsDir: 'fonts',
    // // useStylesheet: true,
    // fontsPath: '/fonts',
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
  image: imageSettings,

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
  gtm: {
    id: process.env?.GTM_ID || '',
    enabled: Boolean(process.env?.GTM_ID),
    debug: Boolean(process.env?.GTM_DEBUG),
    trackOnNextTick: true,
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
