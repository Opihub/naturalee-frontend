<template>
  <ReceiptBlock :class="CSS_NAME">
    <template #header>
      <BaseHeading tag="span" use="custom">{{ $t('orders.your') }}</BaseHeading>
    </template>

    <template #default="{ className }">
      <ul :class="[className, `${CSS_NAME}__body`]">
        <li
          v-for="product in products"
          :key="product.id"
          :class="{ [CSS_NAME_ITEM]: true, 'has-variation': !!product.selling }"
        >
          <span :class="`${CSS_NAME_ITEM}__title`">
            {{ product.title
            }}<b class="u-ml-tiny">&times; {{ product.quantity }}</b>
          </span>
          <span v-if="product.selling" :class="`${CSS_NAME_ITEM}__type`">
            <b>{{ $t('products.type') }}:</b> {{ product.selling }}
          </span>
          <PriceHolder
            :class="`${CSS_NAME_ITEM}__price`"
            :price="product.price"
          />
        </li>
      </ul>

      <div :class="[className, `${CSS_NAME}__footer`]">
        <TotalRecap
          :sub-total="subTotal"
          without-sub-total
          without-shipping
          without-payment
        />
      </div>
    </template>
  </ReceiptBlock>
</template>

<script setup>
// Imports

// Constants
const CSS_NAME = 'c-checkout-cart'
const CSS_NAME_ITEM = `${CSS_NAME}__item`

// Define (Props, Emits, Page Meta)
const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
  subTotal: {
    type: Number,
    default: null,
  },
})

// Component life-cycle hooks

// Composables
const subTotal = props.subTotal
  ? ref(props.subTotal)
  : useTotal(props.products).subTotal

// Data

// Watcher

// Computed

// Methods
</script>

<style lang="scss">
$prefix: 'checkout-cart';
@include component($prefix) {
  @include element('body') {
    @include typography(15px, 18px);
    list-style: none;
  }

  @include element('item') {
    padding: rem(10px) 0;
    list-style: none;
    border-bottom: 1px solid get-var(color-light);
    display: grid;
    align-items: center;
    justify-content: space-between;
    grid-template-columns: 1fr auto;
    grid-template-rows: 1fr 1fr;
    gap: rem(5px) rem(10px);

    @include element('title') {
      grid-column: 1 / 2;
      grid-row: 1 / 3;
    }

    @include element('type') {
      grid-column: 1 / 2;
      grid-row: 2 / 3;
    }

    @include element('price') {
      @include typography(13px, 18px);
      grid-column: 2 / 3;
      grid-row: 1 / 3;
    }

    @include has('variation') {
      @include element('title') {
        grid-row: 1 / 2;
      }
    }

    &:last-of-type {
      border-bottom: 0;
    }
  }

  @include element('footer') {
    padding-top: rem(20px);
    padding-bottom: rem(32px);
    border-top: 2px solid get-var(color-light);
  }
}
</style>
