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
const page = ref({})
const store = useAccountStore()
const route = useRoute()

// Data
const { isLoggedIn } = storeToRefs(store)
const breadcrumbs = ref(page.value?.breadcrumbs || [])

// Watcher
watch(
  () => route.path,
  async () => {
    const { page: response } = await usePage(route.path)

    page.value = response.value
    breadcrumbs.value = page.value?.breadcrumbs || breadcrumbs.value
  },
  { immediate: true }
)

// Computed

// Methods
</script>
