<template>
  <section>
    <BaseHeading tag="h1" use="h3" class="u-mb-large" color="black">
      Modifica il tuo profilo
    </BaseHeading>

    <FormUpdateUserDetails :user-data="account" />
  </section>
</template>

<script setup>
// Constants

// Define (Props, Emits, Page Meta)
definePageMeta({
  path: '/il-mio-account/profilo',
  name: 'profile',
  key: 'profile',
})

defineI18nRoute({
  paths: {
    it: '/il-mio-account/profilo',
  },
  locales: ['it'],
})

// Component life-cycle hooks

// Composables
const user = useAccountStore()

// Data
const account = await user.load().catch((error) => {
  console.error(error)

  notify({
    status: 'error',
    notification:
      'È avvenuto un errore durante il recupero dei dati del profilo. Prova a ricaricare la pagina',
  })
})

// Watcher

// Computed

// Methods
</script>
