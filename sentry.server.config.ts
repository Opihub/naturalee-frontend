import * as Sentry from '@sentry/nuxt'

if (process.env.SENTRY_DSN) {
  const tracesSampleRate =
    process.env?.SENTRY_TRACES_SAMPLE_RATE &&
    !isNaN(parseFloat(process.env?.SENTRY_TRACES_SAMPLE_RATE))
      ? parseFloat(process.env?.SENTRY_TRACES_SAMPLE_RATE)
      : 0.3

  const debug = process.env?.SENTRY_DEBUG
    ? Boolean(process.env?.SENTRY_DEBUG)
    : false

  Sentry.init({
    dsn: process.env.SENTRY_DSN,

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug,
  })
}
