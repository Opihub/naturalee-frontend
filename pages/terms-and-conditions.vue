<script setup>
// Imports

// Constants

// Define (Props, Emits, Page Meta)
definePageMeta({
  path: '/termini-e-condizioni',
  layout: 'standard',
  name: 'terms-and-conditions',
})

defineI18nRoute({
  paths: {
    it: '/termini-e-condizioni',
  },
  locales: ['it'],
})

const config = useRuntimeConfig()

if (config.public?.iubenda?.cookiePolicyId) {
  await navigateTo(
    `https://www.iubenda.com/termini-e-condizioni/${config.public.iubenda.cookiePolicyId}`,
    { external: true }
  )
}

await navigateTo({ name: 'home' })
</script>
