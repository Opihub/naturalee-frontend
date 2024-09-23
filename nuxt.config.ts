import type { ModuleOptions, NuxtConfig } from 'nuxt/schema'
import { additionalData } from './utils/globalCSS'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'
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

const modules: NuxtConfig['modules'] = [
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
  '@vite-pwa/nuxt',
]

const gtm: NuxtConfig['gtm'] = {
  id: process.env?.GTM_ID || '',
  enabled: !!process.env?.GTM_ENABLED,
  debug: !!process.env?.GTM_DEBUG,
  trackOnNextTick: true,
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    endpoint: process.env.API_ENDPOINT_URL + '/api' || '/',
    useKV: !!process.env?.USE_KV || !!process.env?.KV_URL || false,
    monthlyKVLimit: process.env?.KV_MONTHLY_LIMIT ? parseInt(process.env?.KV_MONTHLY_LIMIT) : 0,
    dailyKVLimit: process.env?.KV_DAILY_LIMIT ? parseInt(process.env?.KV_DAILY_LIMIT) : 0,

    public: {
      title: process.env.APP_TITLE,
      endpoint: process.env.API_ENDPOINT_URL + '/api' || '/',
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
        {
          rel: 'apple-touch-icon',
          type: 'image/png',
          href: '/favicon-180x180.png',
        },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
      meta: [{ name: 'theme-color', content: '#00966e' }],
      htmlAttrs: {
        lang: 'it-IT',
      },
      bodyAttrs: {
        id: 'body',
        'attr-lang': 'it',
        'iubenda-site-id': process.env?.IUBENDA_SITE_ID || '',
        'iubenda-cookie-policy-id': process.env?.IUBENDA_ID || '',
      },
      script: [
        {
          children: `(function(w,d, s, id) {if(typeof(w.webpushr)!=='undefined') return;w.webpushr=w.webpushr||function(){(w.webpushr.q=w.webpushr.q||[]).push(arguments)};var js, fjs = d.getElementsByTagName(s)[0];js = d.createElement(s); js.id = id;js.async=1;js.src = "https://cdn.webpushr.com/app.min.js";
fjs.parentNode.appendChild(js);}(window,document, 'script', 'webpushr-jssdk'));
webpushr('setup',{'key':'${process.env?.WEBPUSHR_TOKEN}', sw: 'none' });`,
          type: 'text/javascript',
          tagPosition: 'bodyOpen',
        },
      ],
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
  pwa: {
    strategies: 'injectManifest',
    srcDir: 'service-worker',
    filename: 'sw.ts',
    // strategies: sw ? 'injectManifest' : 'generateSW',
    // srcDir: sw ? 'service-worker' : undefined,
    // filename: sw ? 'sw.ts' : undefined,
    // injectRegister: false,
    registerType: 'autoUpdate',
    includeAssets: [
      'favicon.ico',
      'android-icon-192x192.png',
      'favicon-32x32.png',
      'favicon-naturalee-512x512.png',
    ],
    manifest: {
      name: process.env.APP_TITLE,
      short_name: 'Naturalee',
      description: 'Naturalee',
      theme_color: '#00966e',
      icons: [
        {
          src: 'android-icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'favicon-naturalee-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          // purpose: 'any maskable',
        },
      ],
    },
    useCredentials: true,
    injectManifest: {
      additionalManifestEntries: [
        '/',
        'api/v1/config',

        'login/',
        // 'api/v1/pages/login',

        'faq/',
        // 'api/v1/pages/faq',
        // 'api/v1/faq',

        'contatti/',
        // 'api/v1/pages/contatti',

        'azienda/',
        // 'api/v1/pages/azienda',

        'frutta/',
        // 'api/v1/shop/categories/frutta',
        // 'api/v1/shop/categories/frutta/products?limit=12',

        'verdura/',
        // 'api/v1/shop/categories/verdura',
        // 'api/v1/shop/categories/verdura/products?limit=12',

        'aromi/',
        // 'api/v1/shop/categories/aromi',
        // 'api/v1/shop/categories/aromi/products?limit=12',

        'esotico/',
        // 'api/v1/shop/categories/esotico',
        // 'api/v1/shop/categories/esotico/products?limit=12',

        'dispensa/',
        // 'api/v1/shop/categories/dispensa',
        // 'api/v1/shop/categories/dispensa/products?limit=12',
      ],
      globPatterns: ['**/*.{js,css,html,jpeg,jpeg,png,svg,ico}'],
      globIgnores: ['google70829fb40494f313.html'],
    },
    client: {
      installPrompt: true,
      // you don't need to include this: only for testing purposes
      // if enabling periodic sync for update use 1 hour or so (periodicSyncForUpdates: 3600)
      periodicSyncForUpdates: 20,
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      // navigateFallback: '/',
      // navigateFallbackAllowlist: [/^\/$/, /^(.*)$/],
      type: 'module',
    },
  },
  routeRules: {
    '/checkout': { ssr: false },
  },
  modules,
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
  gtm,
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
