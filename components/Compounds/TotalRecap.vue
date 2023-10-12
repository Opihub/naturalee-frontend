<template>
  <div :class="CSS_NAME">
    <template v-if="!withoutSubTotal">
      <span>{{ $t('common.subTotal') }}</span>
      <PriceHolder :price="subTotal" />
    </template>

    <template v-if="!withoutShipping">
      <span>{{ $t('orders.shipping') }}</span>
      <ShippingMethods :class="`${CSS_NAME}__shipping`" />
    </template>

    <span :class="[`${CSS_NAME}__sum`, totalClassName]">{{
      $t('common.total')
    }}</span>
    <PriceHolder
      :class="[`${CSS_NAME}__sum`, `${CSS_NAME}__sum--price`, totalClassName]"
      :price="subTotal"
    />
  </div>
</template>

<script setup>
// Imports

// Constants
const CSS_NAME = 'c-total'

// Define (Props, Emits, Page Meta)
defineProps({
  subTotal: {
    type: Number,
    required: true,
  },
  withoutSubTotal: {
    type: Boolean,
    default: false,
  },
  withoutShipping: {
    type: Boolean,
    default: false,
  },
  withoutPayment: {
    type: Boolean,
    default: true,
  },
  totalClassName: {
    type: String,
    default: null,
  },
})

// Component life-cycle hooks

// Composables

// Data

// Watcher

// Computed

// Methods
</script>

<style lang="scss">
$prefix: 'total';
@include component($prefix) {
  display: grid;
  gap: rem(20px) 0;
  grid-template-columns: 1fr auto;

  & > *:nth-child(odd) {
    padding-right: rem(20px);
  }

  @include element('sum') {
    font-weight: get-var(weight-bold);
  }
}
</style>
