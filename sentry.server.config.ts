import * as Sentry from '@sentry/nuxt'

if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: 'https://9ca27fe11618f093d64ba592d311ca89@o625517.ingest.us.sentry.io/4507101999792128',

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,
  })
}
