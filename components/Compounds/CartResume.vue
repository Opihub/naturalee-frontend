<template>
  <ReceiptBlock :class="CSS_NAME">
    <template #header>
      <BaseHeading tag="span" use="custom">{{ $t('cart.total') }}</BaseHeading>
    </template>

    <template #default="{ className }">
      <div :class="[`${CSS_NAME}__coupon`, className]">
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

      <div :class="[`${CSS_NAME}__footer`, className]">
        <BaseButton as="link" color="green" to="/checkout">{{
          $t('cart.proceed')
        }}</BaseButton>
      </div>
    </template>
  </ReceiptBlock>
</template>

<script setup>
// Imports
import { useCartStore } from '@/stores/cart'

// Constants
const CSS_NAME = 'c-cart-resume'

// Define (Props, Emits, Page Meta)

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
  @include element('coupon') {
    border-bottom: 2px solid get-var(color-light);
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
        padding-right: get-var(padding, $prefix: 'receipt');
      }

      &:nth-child(odd) {
        padding-left: get-var(padding, $prefix: 'receipt');
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
