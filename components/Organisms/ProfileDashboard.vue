<template>
  <SiteContainer class="u-pt-large u-pb-huge">
    <div class="o-row" :class="CSS_NAME">
      <InlineMenu
        :class="`${CSS_NAME}__menu`"
        :item-class="`${CSS_NAME}__menu__item`"
        :menu="menu.data"
        color="dark"
        direction="vertical"
      >
        <template #after="{ itemClassName, itemLinkClassName }">
          <li :class="[itemClassName, `${CSS_NAME}__menu__item`]">
            <BaseLink
              to="/"
              :class="itemLinkClassName"
              color="dark"
              @click.prevent="logout"
              >Esci</BaseLink
            >
          </li>
        </template>
      </InlineMenu>

      <SiteContainer :max-width="1060">
        <slot />
      </SiteContainer>
    </div>
  </SiteContainer>
</template>

<script setup>
// Imports
import { useAccountStore } from '@/stores/account'

// Constants
const CSS_NAME = 'c-profile-dashboard'

// Define (Props, Emits, Page Meta)

// Component life-cycle hooks

// Composables
const store = useAccountStore()
const menu = await useApi('menu/dashboard').catch((error) => {
  console.error('Errore durante il caricamento di "menu/categories"', error)
})

// Data

// Watcher

// Computed

// Methods
const { logout } = store
</script>

<style lang="scss">
$prefix: 'profile-dashboard';
@include component($prefix) {
  flex-wrap: nowrap;

  @include element('menu') {
    flex: 0 0 rem(250px);
    text-align: left;
    text-transform: uppercase;

    @include element('item') {
      border-bottom: 1px solid get-var(color-white);
    }

    @include set-local-vars(
      $prefix: 'menu',
      $map: (
        row-gap: 0px,
      )
    );

    @include set-local-vars(
      $prefix: 'menu-item',
      $map: (
        padding: rem(20px) 0,
      )
    );

    @include set-local-vars(
      $prefix: 'link',
      $map: (
        label-width: 100%,
        label-disposition: flex-start,
      )
    );
  }
}
</style>
