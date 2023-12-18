<template>
  <section class="s-dashboard">
    <SiteContainer :max-width="740" padless>
      <BaseParagraph class="u-mb-half">
        <i18n-t keypath="welcome">
          <template #username>
            <b>{{ username }}</b>
          </template>
          <template #logout>
            <InlineButton
              color="green"
              underline
              :text="$t('common.logout')"
              @click.prevent="logout"
            />
          </template>
        </i18n-t>
      </BaseParagraph>

      <BaseParagraph>
        <i18n-t keypath="paragraph">
          <template #orders>
            <BaseLink
              :to="{ name: 'orders-list' }"
              color="green"
              underline
              inline
              :text="t('orders')"
            />
          </template>
          <template #addresses>
            <BaseLink
              :to="{ name: 'addresses-list' }"
              color="green"
              underline
              inline
              :text="t('addresses')"
            />
          </template>
          <template #profile>
            <BaseLink
              :to="{ name: 'profile' }"
              color="green"
              underline
              inline
              :text="t('profile')"
            />
          </template>
        </i18n-t>
      </BaseParagraph>
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
  key: 'dashboard',
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
const { t } = useI18n({
  useScope: 'local',
})

// Data
const { username } = storeToRefs(store)

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

<i18n lang="json" locale="it">
{
  "welcome": "Ciao {username} (non sei {username}? {logout})",
  "paragraph": "Dalla bacheca del tuo account puoi visualizzare i tuoi {orders}, gestire i tuoi {addresses} e {profile}",
  "orders": "ordini recenti",
  "addresses": "indirizzi di spedizione e fatturazione",
  "profile": "modificare la password e i dettagli dell’account"
}
</i18n>
