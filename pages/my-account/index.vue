<template>
  <main>
    <HeaderBottomBar v-if="page.breadcrumbs" :breadcrumb="page.breadcrumbs" />

    <ProfileForms />
  </main>
</template>

<script setup>
// Imports

// Constants

// Props & Emits

// Component life-cycle hooks

// Composables
const { page } = await usePage('profile')

// Data

// Watcher

// Computed

// Methods
</script>
