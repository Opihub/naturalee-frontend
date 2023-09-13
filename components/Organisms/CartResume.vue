<template>
  <ReceiptBlock :class="CSS_NAME">
    <div :class="[`${CSS_NAME}__head`, `${CSS_NAME}__block`]">
      <BaseHeading tag="span" use="custom">Totale carrello</BaseHeading>
    </div>

    <div :class="[`${CSS_NAME}__coupon`, `${CSS_NAME}__block`]">
      <span>{{ $t('coupon.formTitle') }}</span>
      <FormCoupon
        class="u-mt-mini"
        :placeholder="$t('coupon.formPlaceholder')"
      />
    </div>

    <TotalsRecap
      class="u-pt-half u-pb-half"
      :class="`${CSS_NAME}__body`"
      :sub-totals="subTotals"
      :total-class-name="`${CSS_NAME}__body__totals`"
    />

    <div :class="[`${CSS_NAME}__footer`, `${CSS_NAME}__block`]">
      <BaseButton color="green" @click="$emit('confirm')">{{
        $t('cart.proceed')
      }}</BaseButton>
    </div>
  </ReceiptBlock>
</template>

<script setup>
// Imports
import { useCartStore } from '@/stores/cart'

// Constants
const CSS_NAME = 'c-cart-resume'

// Define (Props, Emits, Page Meta)
defineEmits(['confirm'])

// Component life-cycle hooks

// Composables
const store = useCartStore()

// Data
const { subTotals } = storeToRefs(store)

// Watcher

// Computed

// Methods
</script>

<style lang="scss">
$prefix: 'cart-resume';
@include component($prefix) {
  @include set-vars(
    $prefix: $prefix,
    $map: (
      padding: rem(40px),
    )
  );

  font-family: get-var(family-text);
  font-weight: get-var(weight-regular);
  @include typography(18px, 28px);

  @include element('block') {
    padding: rem(20px) get-var(padding, $prefix: $prefix);
  }

  @include element('head') {
    @include set-local-vars(
      $prefix: 'heading',
      $map: (
        text-transform: uppercase,
      )
    );

    padding-top: rem(10px);
    font-weight: get-var(weight-bold);
    @include typography(16px, 20px);
    border-bottom: 2px solid get-var(color-light);
  }

  @include element('coupon') {
    border-bottom: 2px solid get-var(color-light);
  }

  @include element('shipping') {
  }

  @include element('body') {
    @include set-local-vars(
      $prefix: 'toggle-field',
      $map: (
        offset-top: rem(4px),
      )
    );

    & > * {
      &:nth-child(even) {
        padding-right: get-var(padding, $prefix: $prefix);
      }

      &:nth-child(odd) {
        padding-left: get-var(padding, $prefix: $prefix);
      }
    }

    @include element('totals') {
      font-weight: get-var(weight-bold);
      border-top: 2px solid get-var(color-light);
      padding-top: rem(20px);

      @include modifier('price') {
        @include typography(22px, 35px);
      }
    }
  }

  @include element('footer') {
    @include object('button') {
      width: 100%;
    }
  }
}
</style>
