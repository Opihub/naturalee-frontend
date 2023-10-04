<template>
  <main>
    <HeaderBottomBar v-if="breadcrumbs" :breadcrumb="breadcrumbs" />

    <ProfileForms v-if="!isLoggedIn" />
    <ClientOnly v-else>
      <ProfileDashboard>
        <NuxtPage :page-key="(route) => route.fullPath" />
      </ProfileDashboard>
    </ClientOnly>
  </main>
</template>

<script setup>
// Imports
import { useAccountStore } from '@/stores/account'

// Constants

// Define (Props, Emits, Page Meta)
definePageMeta({
  layout: 'standard',
})

// Component life-cycle hooks

// Composables
const store = useAccountStore()
const route = useRoute()
const router = useRouter()

// Data
const page = ref({})
const { isLoggedIn } = storeToRefs(store)
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

    const isAddressesChild = ['addresses-details'].includes(route.name)

    if (isAddressesChild) {
      const addressesRoute = router.resolve({
        name: 'addresses-list',
      })

      path = addressesRoute.path
    }

    const { page: response } = await usePage(path)

    page.value = response.value
    // breadcrumbs.value = page.value?.breadcrumbs || breadcrumbs.value
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
</script>
