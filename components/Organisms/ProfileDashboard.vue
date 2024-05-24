<template>
  <SiteContainer class="u-pt-large u-pb-huge">
    <div class="o-row" :class="CSS_NAME">
      <InlineMenu
        :class="`${CSS_NAME}__menu`"
        :item-class="`${CSS_NAME}__menu__item`"
        :menu="menu.profile"
        color="dark"
        direction="vertical"
      >
        <template #after="{ itemClassName, itemLinkClassName }">
          <li :class="[itemClassName, `${CSS_NAME}__menu__item`]">
            <InlineButton
              :class="itemLinkClassName"
              color="black"
              align="left"
              @click.prevent="logout"
              >{{ $t('form.logout') }}</InlineButton
            >
          </li>
        </template>
      </InlineMenu>

      <SiteContainer :max-width="1060" class="u-pt-half u-pb-half" padless>
        <slot />
      </SiteContainer>
    </div>
  </SiteContainer>
</template>

<script setup>
// Imports
import { useConfigurationStore } from '@/stores/configuration';

// Constants
const CSS_NAME = 'c-profile-dashboard'
const configurationStore = useConfigurationStore()

// Composables
const { menu } = storeToRefs(configurationStore)

// Define (Props, Emits, Page Meta)

// Component life-cycle hooks

// Composables

// Data

// Watcher

// Computed

// Methods
const { logout } = useLogout()
</script>

<style lang="scss">
$prefix: 'profile-dashboard';
@include component($prefix) {
  flex-direction: column;

  @include from(tablet) {
    flex-direction: row;
    flex-wrap: nowrap;
  }

  @include element('menu') {
    text-align: left;
    text-transform: uppercase;
    margin-left: rem(30px);
    flex: 0 0 rem(250px);
    max-width: rem(250px);

    @include from(tablet) {
      margin-left: 0;
    }

    @include element('item') {
      border-bottom: 1px solid get-var(color-white);

      @include set-local-vars(
        $prefix: 'button',
        $map: (
          text-transform: uppercase,
          font-weight: get-var(weight-bold),
        )
      );
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
