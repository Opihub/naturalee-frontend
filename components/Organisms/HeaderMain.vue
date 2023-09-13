<template>
  <header :class="CSS_NAME">
    <SiteContainer :class="CSS_NAME_CONTAINER">
      <SiteLogo :class="`${CSS_NAME}__logo`" />

      <CategoriesMenu
        :class="`${CSS_NAME}__categories`"
        :categories="categories"
      />

      <ul :class="CSS_NAME_ACTIONS">
        <li
          :class="`${CSS_NAME_ACTIONS}__single`"
          @mouseleave="isMiniCartMenuOpen = false"
        >
          <MiniCartIcon
            :class="`${CSS_NAME_ACTIONS}__icon`"
            :count="count.toString()"
            @mouseover="isMiniCartMenuOpen = true"
          />
          <ClientOnly>
            <Transition name="fade">
              <MiniCart
                v-show="isMiniCartMenuOpen"
                :cart="cart"
                :shipping-cost="shippingCost"
                :totals="totals"
                :class="`${CSS_NAME_ACTIONS}__popup`"
              />
            </Transition>
          </ClientOnly>
        </li>
        <li
          :class="[
            `${CSS_NAME_ACTIONS}__single`,
            `${CSS_NAME_ACTIONS}__single--menu`,
          ]"
        >
          <HamburgerMenu
            :class="{
              [`${CSS_NAME_ACTIONS}__icon`]: true,
              'is-active': isMobileMenuOpen,
            }"
            @click="openMenuMobile"
          />
        </li>
        <li
          :class="[
            `${CSS_NAME_ACTIONS}__single`,
            `${CSS_NAME_ACTIONS}__single--profile`,
          ]"
          @mouseleave="isProfileMenuOpen = false"
        >
          <ProfileIcon
            :is-logged-in="isLoggedIn"
            :class="{
              [`${CSS_NAME_ACTIONS}__icon`]: true,
              'is-active': isProfileMenuOpen,
            }"
            @mouseover="isProfileMenuOpen = true"
          />
          <ClientOnly>
            <Transition name="fade">
              <ProfileMenu
                v-if="isLoggedIn"
                v-show="isProfileMenuOpen"
                :menu="profileMenu"
                :class="`${CSS_NAME_ACTIONS}__popup`"
              />
            </Transition>
          </ClientOnly>
        </li>
      </ul>
    </SiteContainer>
  </header>
</template>

<script setup>
// Imports
import { useAccountStore } from '@/stores/account'
import { useCartStore } from '@/stores/cart'

// Constants
const CSS_NAME = 'c-header'
const CSS_NAME_CONTAINER = `${CSS_NAME}__container`
const CSS_NAME_ACTIONS = `${CSS_NAME}__actions`

// Define (Props, Emits, Page Meta)
defineProps({
  categories: {
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
})

const emit = defineEmits([
  'menuMobile:toggle',
  'menuMobile:open',
  'menuMobile:close',
])

// Component life-cycle hooks

// Composables
const accountStore = useAccountStore()
const cartStore = useCartStore()

// Data
const { isLoggedIn } = storeToRefs(accountStore)
const { cart, count, shippingCost, totals } = storeToRefs(cartStore)
const isMiniCartMenuOpen = ref(false)
const isMobileMenuOpen = ref(false)
const isProfileMenuOpen = ref(false)

// Watcher

// Computed

// Methods
const openMenuMobile = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value

  const event = isMobileMenuOpen.value ? 'open' : 'close'
  emit('menuMobile:toggle', isMobileMenuOpen.value)
  emit(`menuMobile:${event}`, isMobileMenuOpen.value)
}
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
  // position: relative;
  z-index: get-var(z-#{$prefix});
  top: 0;
  position: sticky;

  @include element('container') {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    justify-content: space-between;
    align-items: center;
    gap: rem(8px);

    @include between(tablet, desktop) {
      grid-template-columns: 1fr 1fr;
    }
  }

  @include element('logo') {
    height: 100%;
    grid-column: 1 / 2;
    margin-right: auto;

    @include between(tablet, desktop) {
      padding: rem(12px) 0;
    }
  }

  @include element('categories') {
    grid-column: 2 / 3;
    height: 100%;
    text-transform: uppercase;
    justify-content: center;

    @include until(desktop) {
      display: none;
    }
  }

  @include element('actions') {
    grid-column: 3 / 4;
    justify-self: end;
    list-style: none;
    display: flex;
    justify-content: flex-end;
    align-items: stretch;
    padding: 0;
    align-self: stretch;

    @include between(tablet, desktop) {
      grid-column: 2 / 3;
    }

    @include element('single') {
      height: 100%;
      position: relative;

      @include from(tablet) {
        width: rem(80px);
        border-right: 1px solid rgba(get-var(rgb-green), 0.45);

        &:last-child {
          border-right: 0;
        }
      }

      @include modifier('profile') {
        display: none;

        @include from(tablet) {
          display: block;
        }
      }

      @include modifier('menu') {
        display: block;

        @include from(tablet) {
          display: none;
        }
      }
    }

    @include element('icon') {
      width: 100%;
      height: 100%;
      padding: rem(20px) rem(14px);

      @include from(tablet) {
        padding: 0;
      }
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
