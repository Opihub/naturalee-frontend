<template>
  <section class="o-page s-page-login">
    <HeaderBottomBar v-if="page.breadcrumbs" :breadcrumb="page.breadcrumbs" />

    <ProfileForms class="o-page__main" />
  </section>
</template>

<script setup>
// Define (Props, Emits, Page Meta)
definePageMeta({
  layout: 'standard',
  name: 'login',
  middleware: () => {
    const store = useAccountStore()
    const localeRoute = useLocaleRoute()
    const { isLoggedIn } = storeToRefs(store)

    if (isLoggedIn.value) {
      return navigateTo(localeRoute({ name: 'my-account' }))
    }

    return true
  },
})

// Component life-cycle hooks
onMounted(() => {
  if (route.query?.createAccount) {
    notify({
      status: 'warning',
      message: t('pages.login.createAccount'),
    })
  }
})
// Composables
const route = useRoute()
// Data
const { page } = await usePage('il-mio-account')
if (page.value && 'seo' in page.value) {
  usePageSeo(page.value.seo)
}

const { t } = useI18n({
  useScope: 'local',
})
// Watcher

// Computed

// Methods
</script>

<style lang="scss">
.s-page-login {
  display: flex;
  min-height: calc(
    100vh - var(--layout-header-height, 0px) - var(
        --layout-footer-height,
        0px
      ) - var(--layout-header-offset, 0px)
  );
}
</style>
