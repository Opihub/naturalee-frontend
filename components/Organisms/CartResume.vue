<template>
  <ReceiptBlock :class="CSS_NAME">
    <div :class="[`${CSS_NAME}__head`, `${CSS_NAME}__block`]">
      <BaseHeading tag="span" use="custom">Totale carrello</BaseHeading>
    </div>

    <div :class="[`${CSS_NAME}__coupon`, `${CSS_NAME}__block`]"></div>

    <div :class="`${CSS_NAME}__body`">
      <span>{{ $t('cart.subTotals') }}</span>
      <PriceHolder :price="subTotals" />

      <span>{{ $t('cart.shipping') }}</span>
      <div :class="`${CSS_NAME}__shipping`">
        <div
          v-if="shippingMethods.length"
          :class="[`${CSS_NAME}__shipping__method`, 'u-mb-half']"
        >
          <ToggleField
            v-for="method in shippingMethods"
            :key="method.id"
            radio
            class="u-mb-tiny"
            :value="method.id"
            :model-value="selectedShippingMethods === method.id"
            @update:model-value="selectedShippingMethods = method.id"
            >{{ method.title }}</ToggleField
          >
        </div>

        <div>
          <span>{{ $t('cart.shippingTo', { city: 'milano' }) }}</span>
          <button class=""></button>
        </div>
      </div>

      <span :class="`${CSS_NAME}__body__totals`">{{ $t('cart.totals') }}</span>
      <PriceHolder
        :class="[
          `${CSS_NAME}__body__totals`,
          `${CSS_NAME}__body__totals--price`,
        ]"
        :price="subTotals"
      />
    </div>

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
const shippingMethods = ref([
  {
    id: 'free',
    title: 'Spedizione gratuita',
    price: 0,
  },
  {
    id: 'pick-up',
    title: 'Ritiro in sede',
    price: 0,
  },
])
const selectedShippingMethods = ref(shippingMethods.value[0].id)

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

    padding: rem(20px) 0;
    display: grid;
    gap: rem(20px);
    grid-template-columns: 1fr auto;
    font-weight: get-var(weight-regular);
    @include typography(18px, 28px);

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
