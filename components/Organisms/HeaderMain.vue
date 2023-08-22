<template>
  <header :class="CSS_NAME">
    <SiteContainer :class="CSS_NAME_CONTAINER">
      <SiteLogo :class="`${CSS_NAME}__logo`" />

      <InlineMenu
        :class="`${CSS_NAME}__categories`"
        :menu="categories"
        :item-class="`${CSS_NAME}__categories__item`"
        gap="large"
        color="dark"
        hover-color="green"
      />

      <ClientOnly>
        <ul :class="CSS_NAME_ACTIONS">
          <li
            :class="`${CSS_NAME_ACTIONS}__single`"
            @mouseleave="isMiniCartMenuOpen = false"
          >
            <MiniCartIcon
              :class="`${CSS_NAME_ACTIONS}__icon`"
              :count="cart.length.toString()"
              @mouseover="isMiniCartMenuOpen = true"
            />
            <Transition name="fade">
              <MiniCart
                v-show="isMiniCartMenuOpen"
                :cart="cart"
                :class="`${CSS_NAME_ACTIONS}__popup`"
              />
            </Transition>
          </li>
          <li
            :class="`${CSS_NAME_ACTIONS}__single`"
            @mouseleave="isProfileMenuOpen = false"
          >
            <ProfileIcon
              :is-logged-in="!!username"
              :class="{
                [`${CSS_NAME_ACTIONS}__icon`]: true,
                'is-active': isProfileMenuOpen,
              }"
              @mouseover="isProfileMenuOpen = true"
            />
            <Transition name="fade">
              <ProfileMenu
                v-if="username"
                v-show="isProfileMenuOpen"
                :menu="profileMenu"
                :username="username"
                :class="`${CSS_NAME_ACTIONS}__popup`"
              />
            </Transition>
          </li>
        </ul>
      </ClientOnly>
    </SiteContainer>
  </header>
</template>

<script setup>
const CSS_NAME = 'c-header'
const CSS_NAME_CONTAINER = `${CSS_NAME}__container`
const CSS_NAME_ACTIONS = `${CSS_NAME}__actions`

defineProps({
  categories: {
    type: Array,
    default() {
      return []
    },
  },
  username: {
    type: String,
    default: null,
  },
  profileMenu: {
    type: Array,
    default() {
      return []
    },
  },
  cart: {
    type: Array,
    default() {
      return []
    },
  },
})

const isMiniCartMenuOpen = ref(false)
const isProfileMenuOpen = ref(false)
</script>

<style lang="scss">
$prefix: 'header';
@include component($prefix) {
  @include set-vars(
    $prefix: $prefix,
    $map: (
      gap: rem(44px),
      font-size: rem(13px),
      line-height: rem(16px),
      // height: rem(100px),
    )
  );

  // height: get-var(height, $prefix: $prefix);
  display: flex;
  flex-wrap: wrap;
  gap: get-var(gap, $prefix: $prefix);
  background-color: get-var(color-white);
  padding: 0;
  position: relative;

  @include element('container') {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    justify-content: space-between;
    align-items: center;
    column-gap: rem(8px);
  }

  @include element('logo') {
    margin-right: auto;
  }

  @include element('categories') {
    height: 100%;
    text-transform: uppercase;

    @include set-vars(
      $prefix: 'menu',
      $map: (
        font-size: rem(15px),
        line-height: rem(19px),
      )
    );

    @include set-local-vars(
      $prefix: 'menu-item',
      $map: (
        height: 100%,
        padding: rem(18px) rem(16px),
      )
    );

    @include element('item') {
      height: 100%;
    }
  }

  @include element('actions') {
    justify-self: end;
    list-style: none;
    display: flex;
    justify-content: flex-end;
    align-items: stretch;
    padding: 0;
    align-self: stretch;

    @include element('single') {
      width: rem(80px);
      height: 100%;
      position: relative;
      border-right: 1px solid rgba(get-var(rgb-green), 0.45);

      &:last-child {
        border-right: 0;
      }
    }

    @include element('icon') {
      width: 100%;
      height: 100%;
    }

    @include element('popup') {
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
