<template>
  <BaseOverlay :class="CSS_NAME" class="u-pt-small u-pb-small">
    <InlineMenu
      :menu="primaryMenu"
      :class="`${CSS_NAME}__menu`"
      direction="vertical"
      color="dark"
      arrow
    />

    <span class="u-mt-large u-d-block u-ml-container u-mr-container">{{
      $t('common.account')
    }}</span>
    <InlineMenu
      :menu="profileMenu"
      :class="`${CSS_NAME}__menu`"
      direction="vertical"
      color="dark"
      arrow
    >
      <template v-if="isLoggedIn" #after="{ itemClassName, itemLinkClassName }">
        <li :class="[itemClassName]">
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

    <span class="u-mt-auto u-text-center u-d-block">{{
      $t('common.followUs')
    }}</span>
    <InlineMenu
      :menu="socialsMenu"
      :class="`${CSS_NAME}__socials`"
      class="u-mt-tiny"
      color="green"
      svg-size="22px"
    />
  </BaseOverlay>
</template>

<script setup>
// Imports
import { useAccountStore } from '@/stores/account'

// Constants
const CSS_NAME = 'c-header-mobile'

// Define (Props, Emits, Page Meta)
defineProps({
  primaryMenu: {
    type: Array,
    default() {
      return []
    },
  },
  profileMenu: {
    type: Array,
    default() {
      return []
    },
  },
  socialsMenu: {
    type: Array,
    default() {
      return []
    },
  },
})

// Composables
const accountStore = useAccountStore()
const { logout } = useLogout()

// Data
const { isLoggedIn } = storeToRefs(accountStore)
</script>

<style lang="scss" scoped>
$prefix: 'header-mobile';
@include component($prefix) {
  @include set-local-vars(
    $prefix: 'overlay',
    $map: (
      inset: calc(get-var(layout-header-height) + get-var(layout-header-offset))
        0 get-var(layout-bottom-gap) 0,
    )
  );

  @include from(tablet) {
    display: none;
  }

  @include set-local-vars(
    $prefix: 'container',
    $map: (
      height: 100%,
      padding: 0,
      align-items: stretch,
      direction: column,
    )
  );

  @include element('menu') {
    width: 100%;

    @include set-local-vars(
      $prefix: 'menu',
      $map: (
        row-gap: 0,
        font-size: rem(18px),
        line-height: rem(26px),
      )
    );

    @include set-local-vars(
      $prefix: 'menu-item',
      $map: (
        width: 100%,
        border: 1px solid rgba(get-var(rgb-green), 0.45),
        padding: rem(15px) get-var(default-padding, $prefix: container),
      )
    );

    @include set-local-vars(
      $prefix: 'link-label',
      $map: (
        width: 100%,
        disposition: space-between,
      )
    );

    @include set-local-vars(
      $prefix: 'button',
      $map: (
        font-weight: get-var(weight-bold),
      )
    );
  }

  @include element('socials') {
    width: 100%;
    padding: 0 get-var(default-padding, $prefix: container);
    flex-wrap: wrap;

    @include set-local-vars(
      $prefix: 'menu',
      $map: (
        gap: rem(5px),
        justify-content: center,
        font-size: rem(20px),
      )
    );

    @include set-local-vars(
      $prefix: 'menu-item',
      $map: (
        padding: rem(14px),
      )
    );
  }
}
</style>
