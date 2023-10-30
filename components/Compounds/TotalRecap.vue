<template>
  <div :class="CSS_NAME">
    <template v-if="!withoutSubTotal">
      <span :class="[`${CSS_NAME}__label`, 'is-label']">{{
        $t('common.subTotal')
      }}</span>
      <PriceHolder class="is-data" :price="subTotal" />
    </template>

    <template v-if="!withoutShipping">
      <span :class="[`${CSS_NAME}__label`, 'is-label']">{{
        $t('orders.shipping')
      }}</span>
      <!-- <ShippingMethods :class="`${CSS_NAME}__shipping`" /> -->

      <strong v-if="hasFreeShipping" :class="`${CSS_NAME}__shipping`">Gratuita</strong>
      <template v-else>
      <PriceHolder
        :class="[`${CSS_NAME}__shipping`, 'is-data']"
        :price="3"
      />
      <span :class="[`${CSS_NAME}__full`, 'is-label', 'is-data']"
        >Aggiungi <PriceHolder :price="50 - subTotal" /> per avere la spedizione
        gratuita</span
      >
      </template>
    </template>

    <span
      :class="[
        `${CSS_NAME}__label`,
        `${CSS_NAME}__sum`,
        totalClassName,
        'is-label',
      ]"
      >{{ $t('common.total') }}</span
    >
    <PriceHolder
      :class="[
        `${CSS_NAME}__sum`,
        `${CSS_NAME}__sum--price`,
        totalClassName,
        'is-data',
      ]"
      :price="total || subTotal"
    />
  </div>
</template>

<script setup>
// Imports

// Constants
const CSS_NAME = 'c-total'

// Define (Props, Emits, Page Meta)
const props = defineProps({
  subTotal: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    default: null,
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
const hasFreeShipping = computed(() => {
  return 50 - props.subTotal <= 0
})

// Methods
</script>

<style lang="scss">
$prefix: 'total';
@include component($prefix) {
  display: grid;
  gap: rem(20px) 0;
  grid-template-columns: 1fr auto;

  @include element('label') {
    padding-right: rem(20px);
  }

  @include element('sum') {
    font-weight: get-var(weight-bold);
  }

  @include element('full') {
    grid-column: 1 / 3;
  }
}
</style>
