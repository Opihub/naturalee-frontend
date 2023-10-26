<template>
  <section class="s-dashboard">
    <NuxtImg
      class="u-mt-large u-mt-none@tablet u-mb-large@tablet"
      src="banner-account.png"
    />

    <SiteContainer :max-width="740" padless>
      <BaseParagraph class="u-mb-half"
        >Ciao <b>{{ account.username }}</b> (non sei
        <b>{{ account.username }}</b
        >?
        <InlineButton color="green" underline @click.prevent="logout"
          >Logout</InlineButton
        >)</BaseParagraph
      >
      <BaseParagraph
        >Dalla bacheca del tuo account puoi visualizzare i tuoi
        <BaseLink :to="{ name: 'orders-list' }" color="green" underline inline
          >ordini recenti</BaseLink
        >, gestire i tuoi
        <BaseLink
          :to="{ name: 'addresses-list' }"
          color="green"
          underline
          inline
          >indirizzi di spedizione e fatturazione</BaseLink
        >
        e modificare la password e i
        <BaseLink :to="{ name: 'profile' }" color="green" underline inline
          >dettagli dell’account</BaseLink
        >.</BaseParagraph
      >
    </SiteContainer>
  </section>
</template>

<script setup>
// Imports
import { useAccountStore } from '@/stores/account'

// Constants

// Define (Props, Emits, Page Meta)
definePageMeta({
  alias: 'dashboard',
  name: 'dashboard',
})

defineI18nRoute({
  paths: {
    it: '/il-mio-account/dashboard',
  },
  locales: ['it'],
})

// Component life-cycle hooks

// Composables
const store = useAccountStore()

// Data
const { account } = storeToRefs(store)

// Watcher

// Computed

// Methods
const { logout } = useLogout()
</script>

<style lang="scss">
@include scope('dashboard') {
  display: flex;
  flex-direction: column-reverse;

  @include from(tablet) {
    flex-direction: column;
  }

  @include set-local-vars(
    $prefix: 'container',
    $map: (
      margin: 0,
    )
  );

  @include set-local-vars(
    $prefix: 'paragraph',
    $map: (
      font-family: get-var(family-main),
    )
  );
}
</style>
