<template>
  <span :class="CSS_NAME">
    <slot name="before" />

    <span :class="CSS_NAME_VALUE">
      <span v-if="!currencyAfterPrice" :class="CSS_NAME_CURRENCY">{{
        currency
      }}</span>
      {{ formattedPrice }}
      <span v-if="currencyAfterPrice" :class="CSS_NAME_CURRENCY">{{
        currency
      }}</span>
    </span>

    <slot name="after" />
  </span>
</template>

<script setup>
const CSS_NAME = 'o-price'
const CSS_NAME_VALUE = `${CSS_NAME}__value`
const CSS_NAME_CURRENCY = `${CSS_NAME}__currency`

const props = defineProps({
  price: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: '€',
  },
  currencyAfterPrice: {
    type: Boolean,
    default: false,
  },
})

const formattedPrice = computed(() => {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
  })
    .format(props.price)
    .replaceAll(/[^0-9,.]/gi, '')
})
</script>

<style lang="scss">
$prefix: 'price';
@include object($prefix) {
  font-family: get-var(family-main);
  font-weight: get-var(weight-bold);

  @include element('value') {
    display: inline-flex;
    flex-wrap: nowrap;
    gap: get-var(gap, rem(4px), $prefix: $prefix);
  }
}
</style>
