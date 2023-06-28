<template>
  <div class="o-layout">
    <SiteTopBar ref="topBar" />

    <SiteHeader ref="header" />

    <slot />

    <SiteFooter ref="footer" />
  </div>
</template>

<script setup>
const topBar = ref(null)
const header = ref(null)
const footer = ref(null)
</script>
