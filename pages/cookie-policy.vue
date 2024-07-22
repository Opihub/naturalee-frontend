<script setup>
// Imports

// Constants

// Define (Props, Emits, Page Meta)
definePageMeta({
  name: 'cookie-policy ',
})

defineRouteRules({
  index: false,
  robots: false,
})

const config = useRuntimeConfig()

if (config.public?.iubenda?.cookiePolicyId) {
  await navigateTo(
    `https://www.iubenda.com/privacy-policy/${config.public.iubenda.cookiePolicyId}/cookie-policy`,
    { external: true }
  )
}

// await navigateTo({ name: 'home' })
</script>
