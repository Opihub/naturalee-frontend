<template>
  <footer :class="CSS_NAME">
    <SiteContainer :class="CSS_NAME_NAVIGATION">
      <div :class="[`${CSS_NAME_NAVIGATION}__links`, `${CSS_NAME}__left`]">
        <SiteLogo :alt="true" />
        <InlineMenu :menu="socialsMenu" />
      </div>

      <InlineMenu :menu="menu" :class="`${CSS_NAME_NAVIGATION}__menu`" />

      <NuxtImg
        v-if="paymentImage"
        :class="[`${CSS_NAME_NAVIGATION}__payment`, `${CSS_NAME}__right`]"
        :src="paymentImage"
      />
    </SiteContainer>

    <SiteContainer :class="CSS_NAME_INFO">
      <InlineMenu
        :class="[`${CSS_NAME_INFO}__menu`, `${CSS_NAME}__left`]"
        :menu="copyright"
        color="white"
        gap="mini"
        separator="-"
      >
        <template #before="{ itemClassName }">
          <li :class="itemClassName">&copy;Copyright {{ getYear() }}</li>
        </template>
        <template #after="{ itemClassName }">
          <li :class="itemClassName">
            <!-- TODO: apertura popup delle company info -->
            <u>Company Info</u>
          </li>
        </template>
      </InlineMenu>

      <InlineMenu
        :class="[`${CSS_NAME_INFO}__menu`, `${CSS_NAME}__right`]"
        :menu="privacyMenu"
        color="white"
        gap="mini"
        separator="-"
      >
        <template v-if="slots.by" #after="{ className }">
          <li :class="className"><slot name="by" /></li>
        </template>
      </InlineMenu>
    </SiteContainer>
  </footer>
</template>

<script setup>
const CSS_NAME = 'c-footer'
const CSS_NAME_NAVIGATION = `${CSS_NAME}__navigation`
const CSS_NAME_INFO = `${CSS_NAME}__info`

defineProps({
  copyright: {
    type: Array,
    default() {
      return []
    },
  },
  menu: {
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
  privacyMenu: {
    type: Array,
    default() {
      return []
    },
  },
  paymentImage: {
    type: String,
    default: null,
  },
})

const slots = useSlots()

const getYear = () => {
  const current = new Date()
  return current.getFullYear()
}
</script>

<style lang="scss">
$prefix: 'footer';
@include component($prefix) {
  @include set-vars(
    $prefix: $prefix,
    $map: (
      padding: rem(30px) 0 rem(40px),
      gap: rem(44px),
      font-size: 13px,
      line-height: 19px,
      max-image-width: rem(270px),
    )
  );

  display: flex;
  flex-wrap: wrap;
  gap: get-var(gap, $prefix: $prefix);
  background-color: get-var(color-green);
  padding: get-var(padding, $prefix: $prefix);
  position: relative;

  @include until(tablet) {
    @include set-local-vars(
      $prefix: 'logo',
      $map: (
        width: get-var(max-image-width, $prefix: $prefix),
        height: 42.5px,
      )
    );
  }

  @include from(tablet) {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        padding: rem(12px) 0,
      )
    );
  }

  @include element('left') {
    justify-self: start;

    svg {
      fill: currentColor;

      @include set-local-vars(
        $prefix: 'link-svg',
        $map: (
          width: auto,
          height: rem(24px),
        )
      );
    }
  }

  @include element('right') {
    justify-self: end;
  }

  @include element('navigation') {
    display: flex;
    flex-direction: column;
    gap: rem(30px);

    @include from(tablet) {
      display: grid;
      grid-template-columns: auto 1fr;
      grid-template-rows: auto auto;
      align-items: center;
      gap: rem(8px);

      @include set-local-vars(
        $prefix: 'menu',
        $map: (
          font-size: 18px,
          line-height: 23px,
        )
      );
    }

    @include from(desktop) {
      grid-template-columns: 1fr auto 1fr;
      grid-template-rows: auto;
      justify-content: space-between;
    }

    @include element('links') {
      grid-column: 1 / 2;
      display: flex;
      align-items: center;
      gap: rem(30px);
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: center;

      @include from(desktop) {
        flex-direction: row;
        align-items: baseline;
      }

      @include between(tablet, desktop) {
        grid-row: 1 / 3;
        grid-column: 1 / 2;
      }
    }

    @include element('menu') {
      grid-column: 2 / 3;
      list-style: none;
      padding: 0;
      text-align: center;
      flex-direction: column;
      justify-content: flex-start;
      align-items: stretch;

      @include set-local-vars(
        $prefix: 'menu-item',
        $map: (
          width: 100%,
          padding: rem(10px),
        )
      );

      @include until(tablet) {
        @include set-local-vars(
          $prefix: 'menu',
          $map: (
            gap: 0,
          )
        );
      }

      @include from(tablet) {
        flex-direction: row;
      }

      @include between(tablet, desktop) {
        grid-row: 1 / 2;
        grid-column: 2 / 3;
        justify-self: end;
      }
    }

    @include element('payment') {
      grid-column: 3 / 4;
      margin: 0 auto;
      max-width: get-var(max-image-width, $prefix: $prefix);
      flex-wrap: wrap;
      justify-content: center;

      @include from(tablet) {
        margin: 0;
        max-width: 100%;
      }

      @include between(tablet, desktop) {
        grid-row: 2 / 3;
        grid-column: 2 / 3;
      }
    }
  }

  @include element('info') {
    display: flex;
    flex-direction: column;
    color: get-var(color-white);
    gap: rem(10px);

    @include from(desktop) {
      display: grid;
      grid-template-columns: auto auto;
      justify-content: space-between;
      align-items: center;
      column-gap: rem(8px);
    }

    @include set-local-vars(
      $prefix: 'menu',
      $map: (
        row-gap: rem(4px),
        font-size: 13px,
        line-height: 16px,
        font-weight: get-var(weight-regular),
      )
    );

    @include element('menu') {
      flex-wrap: wrap;
      justify-content: center;
    }
  }
}
</style>
