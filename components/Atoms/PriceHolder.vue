<template>
  <span :class="CSS_NAME">
    <slot name="before" />

    <span
      :class="[
        CSS_NAME_VALUE,
        salesPrice ? 'is-sale' : '',
        !salesPrice ? CSS_NAME_VALUE_GREEN : '',
      ]"
    >
      <span v-if="!currencyAfterPrice" :class="CSS_NAME_CURRENCY">{{
        currency
      }}</span>
      {{ formattedPrice(price) }}
      <span v-if="currencyAfterPrice" :class="CSS_NAME_CURRENCY">{{
        currency
      }}</span>
    </span>

    <span
      v-if="salesPrice"
      :class="[CSS_NAME_VALUE, salesPrice ? CSS_NAME_VALUE_GREEN : '']"
      class="u-ml-small"
    >
      <span v-if="!currencyAfterPrice" :class="CSS_NAME_CURRENCY">{{
        currency
      }}</span>
      {{ formattedPrice(salesPrice) }}
      <span v-if="currencyAfterPrice" :class="CSS_NAME_CURRENCY">{{
        currency
      }}</span>
    </span>
    <slot name="after" :price-class-name="CSS_NAME" />
  </span>
</template>

<script setup>
const CSS_NAME = 'o-price'
const CSS_NAME_VALUE = `${CSS_NAME}__value`
const CSS_NAME_VALUE_GREEN = `${CSS_NAME_VALUE}--green`
const CSS_NAME_CURRENCY = `${CSS_NAME}__currency`

const props = defineProps({
  price: {
    type: Number,
    required: true,
  },
  salesPrice: {
    type: Number,
    default: null,
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

//Methods
const formattedPrice = (value) => {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
  })
    .format(value)
    .replaceAll(/[^0-9,.]/gi, '')
}
</script>

<style lang="scss">
$prefix: 'price';
@include object($prefix) {
  font-family: get-var(family-main);
  font-weight: get-var(weight-black);
  @include element('value') {
    display: inline-flex;
    flex-wrap: nowrap;
    gap: get-var(gap, rem(4px), $prefix: $prefix);
    @include is('sale') {
      text-decoration: line-through;
    }
    @include modifier('green') {
      color: get-var(color-green);
      font-size: rem(26px);
    }
  }
}
</style>
