<template>
  <PopupContainer :class="CSS_NAME" color="white" max-width="337px">
    <ul :class="CSS_NAME_LIST">
      <li :class="`${CSS_NAME_LIST}__recap`">
        <template v-if="cart.length">
          <span>Il tuo carrello - {{ cart.length }} prodotti</span>

          <BaseLink
            :class="`${CSS_NAME}__review`"
            to="cart"
            :underline="true"
            color="dark"
            >Modifica</BaseLink
          >
        </template>
        <span v-else>Non hai alcun prodotto nel carrello</span>
      </li>

      <li
        v-for="product in cart"
        :key="product.id"
        :class="CSS_NAME_LIST_PRODUCT"
      >
        <NuxtImg
          :class="`${CSS_NAME_LIST_PRODUCT}__image`"
          :src="product.image"
          :width="80"
          :height="80"
          :alt="product.title"
        />

        <span :class="`${CSS_NAME_LIST_PRODUCT}__description`">
          <span :class="`${CSS_NAME_LIST_PRODUCT}__description__quantity`"
            >{{ product.quantity }}{{ product.unit }}</span
          >
          <span :class="`${CSS_NAME_LIST_PRODUCT}__description__title`">{{
            product.title
          }}</span>
        </span>
        <span :class="`${CSS_NAME_LIST_PRODUCT}__code`"
          >Cod. {{ product.sku }}</span
        >

        <PriceHolder
          :class="`${CSS_NAME_LIST_PRODUCT}__price`"
          :price="product.price * product.quantity"
        />
      </li>
    </ul>

    <div v-if="cart.length" :class="CSS_NAME_TOTALS">
      <dl :class="`${CSS_NAME_TOTALS}__calculation`">
        <span :class="`${CSS_NAME_TOTALS_CALCULATION}__record`"
          >Spese di consegna</span
        >
        <PriceHolder
          :class="`${CSS_NAME_TOTALS_CALCULATION}__price`"
          :price="shippingCost"
        />

        <span :class="`${CSS_NAME_TOTALS_CALCULATION}__record`"
          >Totale dell'ordine</span
        >
        <PriceHolder
          :class="[
            `${CSS_NAME_TOTALS_CALCULATION}__price`,
            `${CSS_NAME_TOTALS_CALCULATION}__price--final`,
          ]"
          :price="totals"
        >
          <template #after>
            <small>IVA Inc</small>
          </template>
        </PriceHolder>
      </dl>

      <BaseButton :class="`${CSS_NAME}__submit`" color="green"
        >Procedere con l'ordine</BaseButton
      >
      <BaseLink
        :class="`${CSS_NAME}__review`"
        to="cart"
        :underline="true"
        color="dark"
        >Vai al carrello</BaseLink
      >
    </div>
  </PopupContainer>
</template>

<script setup>
const CSS_NAME = 'c-mini-cart'
const CSS_NAME_LIST = `${CSS_NAME}__list`
const CSS_NAME_LIST_PRODUCT = `${CSS_NAME_LIST}__product`
const CSS_NAME_TOTALS = `${CSS_NAME}__totals`
const CSS_NAME_TOTALS_CALCULATION = `${CSS_NAME_TOTALS}__calculation`

const props = defineProps({
  cart: {
    type: Array,
    default() {
      return []
    },
  },
  shippingCost: {
    type: Number,
    default: 0,
  },
})

const totals = computed(() => {
  let totals = props.shippingCost

  if (props.cart.length) {
    totals += props.cart.reduce((accumulator, product) => {
      return accumulator + product.price * product.quantity
    }, 0)
  }

  return totals
})
</script>

<style lang="scss">
$prefix: 'mini-cart';
@include component($prefix) {
  @include set-vars(
    $prefix: $prefix,
    $map: (
      horizontal-padding: rem(22px),
      max-height: rem(368px),
      product-bound: rem(14px),
      product-description-gap: rem(18px),
    )
  );

  @include element('review') {
    @include typography(14px, 18px);
  }

  @include element('submit') {
    @include typography(15px, 19px);
  }

  @include element('list') {
    overflow: scroll visible;
    max-height: get-var(max-height, $prefix: $prefix);
    list-style: none;
    padding: 0;
    margin: 0;

    @include element('recap') {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: nowrap;
      padding: rem(12px) get-var(horizontal-padding, $prefix: $prefix);
      @include typography(14px, 18px);
      background-color: get-var(color-white);
      position: sticky;
      top: 0;
      z-index: 1;
    }

    @include element('product') {
      margin: 0 get-var(horizontal-padding, $prefix: $prefix);
      width: calc(100% - (get-var(horizontal-padding, $prefix: $prefix) * 2));
      display: grid;
      align-items: end;
      column-gap: get-var(product-bound, $prefix: $prefix);
      row-gap: rem(8px);

      grid-template:
        'image description price' auto
        'image code price' auto / #{rem(80px)} 1fr auto;
      border-bottom: 2px solid get-var(color-light);
      font-family: get-var(family-text);

      @include element('image') {
        grid-area: image;
      }

      @include element('description') {
        grid-area: description;
        display: flex;
        flex-wrap: nowrap;
        align-items: flex-start;
        justify-content: flex-start;

        padding-top: get-var(product-bound, $prefix: $prefix);
        font-weight: get-var(weight-bold);
        // font-weight: get-var(weight-semibold);
        @include typography(13px, 16px);

        @include element('quantity') {
          flex: 0 0 auto;
          margin-right: get-var(product-description-gap, $prefix: $prefix);
          position: relative;
          white-space: nowrap;

          &::after {
            content: '-';
            position: absolute;
            left: 100%;
            top: 50%;
            width: get-var(product-description-gap, $prefix: $prefix);
            height: auto;
            text-align: center;
            transform: translateY(-50%);
          }
        }
      }

      @include element('code') {
        grid-area: code;
        padding-bottom: get-var(product-bound, $prefix: $prefix);
        font-weight: get-var(weight-light);
        @include typography(11px, 13px);
        @include letter-spacing(12);
      }

      @include element('price') {
        grid-area: price;
        padding: get-var(product-bound, $prefix: $prefix) 0;
        @include typography(14px, 18px);
        padding-left: rem(4px);
      }

      &:last-child {
        border-bottom: 0;
      }
    }
  }

  @include element('totals') {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: rem(12px);
    padding: rem(14px) get-var(horizontal-padding, $prefix: $prefix) rem(20px);
    background-color: get-var(color-light);
    text-transform: uppercase;

    @include element('calculation') {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr auto;
      text-transform: none;

      @include element('record') {
        padding: rem(8px);
        padding-left: rem(3px);
        border-bottom: 1px solid get-var(color-dark);
        font-family: get-var(family-text);
        font-weight: get-var(weight-bold);
        // font-weight: get-var(weight-semibold);
        @include typography(12px, 14px);
      }

      @include element('price') {
        text-align: right;
        justify-content: flex-end;
        padding-top: rem(8px);
        padding-bottom: rem(8px);
        border-bottom: 1px solid get-var(color-dark);
        @include typography(14px, 18px);

        @include modifier('final') {
          color: get-var(color-green);
          @include typography(20px, 25px);

          small {
            font-family: get-var(family-text);
            color: get-var(color-dark);
            font-weight: get-var(weight-light);
            font-size: 0.5em;
            display: block;
            width: 100%;
          }
        }
      }

      & > * {
        &:first-child,
        &:nth-child(2) {
          padding-top: 0;
        }

        &:last-child,
        &:nth-last-child(2) {
          border-bottom: 0;
          padding-bottom: 0;
        }
      }
    }
  }
}
</style>
