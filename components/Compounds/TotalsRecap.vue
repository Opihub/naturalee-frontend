<template>
  <div :class="CSS_NAME">
    <span>Subtotale</span>
    <PriceHolder :price="subTotals" />

    <span>Spedizione</span>
    <ShippingMethods :class="`${CSS_NAME}__shipping`" />

    <span :class="[`${CSS_NAME}__sum`, totalClassName]">Totale</span>
    <PriceHolder
      :class="[`${CSS_NAME}__sum`, `${CSS_NAME}__sum--price`, totalClassName]"
      :price="subTotals"
    />
  </div>
</template>

<script setup>
// Imports

// Constants
const CSS_NAME = 'c-totals'

// Define (Props, Emits, Page Meta)
defineProps({
  subTotals: {
    type: Number,
    required: true,
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
$prefix: 'totals';
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
