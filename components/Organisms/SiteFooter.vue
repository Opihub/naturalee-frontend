<template>
  <footer :class="CSS_NAME">
    <SiteContainer :class="`${CSS_NAME}__container`">
      <div :class="`${CSS_NAME}__left`">
        <SiteLogo :alt="true" />
        <InlineMenu
          gap="mini"
          :menu="socialsMenu"
          :class="`${CSS_NAME}__menu`"
        />
      </div>

      <InlineMenu :menu="menu" :class="`${CSS_NAME}__menu`" />

      <NuxtImg v-if="paymentImage" :class="`${CSS_NAME}__right`" :src="paymentImage" />
    </SiteContainer>

    <SiteContainer
      :class="[`${CSS_NAME}__container`, `${CSS_NAME}__container--bottom`]"
    >
      <InlineMenu :class="`${CSS_NAME}__left`" :menu="copyright" color="white" gap="mini" separator="-">
        <template #before="{ className }">
          <li :class="className">&copy;Copyright {{ getYear() }}</li>
        </template>
        <template #after="{ className }">
          <li :class="className">
            <!-- TODO: apertura popup delle company info -->
            <u>Company Info</u>
          </li>
        </template>
      </InlineMenu>

      <InlineMenu :class="`${CSS_NAME}__right`" :menu="privacyMenu" color="white" gap="mini" separator="-">
        <template v-if="slots.by" #after="{ className }">
          <li :class="className"><slot name="by" /></li>
        </template>
      </InlineMenu>
    </SiteContainer>
  </footer>
</template>

<script setup>
const CSS_NAME = 'c-footer'

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
      padding: rem(12px),
      gap: rem(44px),
      font-size: 13px,
      line-height: 16px,
    )
  );

  display: flex;
  flex-wrap: wrap;
  gap: get-var(gap, $prefix: $prefix);
  background-color: get-var(color-green);
  padding: get-var(padding, $prefix: $prefix) 0;
  position: relative;

  @include element('container') {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    justify-content: space-between;
    align-items: center;
    column-gap: rem(8px);

    @include modifier(bottom) {
      color: get-var(color-white);
      grid-template-columns: auto auto;

      @include set-local-vars(
        $prefix: 'menu',
        $map: (
          font-size: 13px,
          line-height: 16px,
          font-weight: get-var(weight-regular),
        )
      );
    }
  }

  @include element('left') {
    justify-self: start;
  }

  @include element('center') {
    list-style: none;
    padding: 0;
    text-align: center;
  }

  @include element('right') {
    justify-self: end;
  }
}
</style>
