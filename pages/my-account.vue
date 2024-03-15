<template>
  <section class="o-page">
    <HeaderBottomBar v-if="breadcrumbs" :breadcrumb="breadcrumbs" />

    <ProfileDashboard>
      <NuxtPage :page-key="pageKey" />
    </ProfileDashboard>
  </section>
</template>

<script setup>
// Imports

// Constants

// Define (Props, Emits, Page Meta)
definePageMeta({
  path: '/il-mio-account',
  layout: 'standard',
  name: 'my-account',
  middleware: 'auth',
})

// Component life-cycle hooks

// Composables
const route = useRoute()
const router = useRouter()

// Data
const page = ref({})
const breadcrumbs = ref(page.value?.breadcrumbs || [])

// Watcher
watch(
  () => route.path,
  async () => {
    let path = route.path
    const isOrderChild = ['order-products', 'order-view'].includes(route.name)

    if (isOrderChild) {
      const orderRoute = router.resolve({
        name: 'orders-list',
      })

      path = orderRoute.path
    }

    const isAddressesChild = ['address-details'].includes(route.name)

    if (isAddressesChild) {
      const addressesRoute = router.resolve({
        name: 'addresses-list',
      })

      path = addressesRoute.path
    }

    const { page: response } = await usePage(path)

    page.value = response.value
    if (page.value && 'seo' in page.value) {
      usePageSeo(page.value.seo)
    }

    const newBreadcrumbs = page.value?.breadcrumbs || breadcrumbs.value
    breadcrumbs.value = [...newBreadcrumbs]

    if (isOrderChild) {
      const alreadyExists = breadcrumbs.value.some((breadcrumb) => {
        return breadcrumb.link === route.path
      })

      if (!alreadyExists) {
        breadcrumbs.value.push({
          link: route.path,
          title: orderId(route.params.id),
        })
      }
    }

    if (isAddressesChild) {
      const alreadyExists = breadcrumbs.value.some((breadcrumb) => {
        return breadcrumb.link === route.path
      })

      if (!alreadyExists) {
        breadcrumbs.value.push({
          link: route.path,
          title:
            route.params.addresses == 'billing' ? 'Fatturazione' : 'Spedizione',
        })
      }
    }
  },
  { immediate: true }
)

// Computed

// Methods
const pageKey = (route) => {
  console.debug(route.name)

  if (route.name === 'my-account') {
    return 'dashboard'
  }

  return route.name
}
</script>
