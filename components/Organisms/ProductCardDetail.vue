<template>
  <ReceiptBlock :class="CSS_NAME" top-less>
    <template #default="{ className }">
      <div :class="[className, `${CSS_NAME}__row`]">
        <PriceHolder
          v-if="product?.costPerUnit && product?.costPerUnit > 0"
          :class="[`${CSS_NAME}__kg-price`, 'u-mb-half']"
          :price="product?.costPerUnit"
          :sales-price="product?.discountKgPrice"
          :unit="product?.unit"
        />
        <PriceHolder
          :class="[`${CSS_NAME}__price`, 'u-mb-micro']"
          :price="product.price"
        >
          <template v-if="product?.discountPrice" #before>
            <PriceHolder
              :class="`${CSS_NAME}__price__discount`"
              :price="product.discountPrice"
            />
          </template>
        </PriceHolder>
        <span :class="[`${CSS_NAME}__tax`, 'u-mb-large']">{{
          $t('common.vatInclude')
        }}</span>

        <strong :class="stockClassName">{{
          $t('products.stock', stock)
        }}</strong>
      </div>

      <div :class="[className, `${CSS_NAME}__row`]">
        <BaseCounter
          v-model.number="quantity"
          :disabled="isDisabled"
          big
          class="u-mb-half"
        />

        <AddToCartButton
          :product="product"
          :quantity="quantity"
          :disabled="isDisabled"
        >
          <span>{{
            product.stockStatus === 'instock' && product.price > 0
              ? $t('cart.addTo')
              : $t('cart.notAvailable')
          }}</span>
          <template #added>{{ $t('cart.added') }}</template>
        </AddToCartButton>
      </div>

      <div :class="[className, `${CSS_NAME}__row`, `${CSS_NAME}__row--footer`]">
        <WishlistButton :product="product" />
        <b class="u-ml-micro" @click="() => update(product)">{{
          $t('wishlist.add')
        }}</b>
      </div>
    </template>
  </ReceiptBlock>
</template>

<script setup>
// Imports
import { useWishlistStore } from '@/stores/wishlist'
// Constants
const CSS_NAME = 'c-product-card-detail'

// Define (Props, Emits, Page Meta)
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

// Component life-cycle hooks

// Composables
const wishlist = useWishlistStore()
// Data
const quantity = ref(1)

// Watcher

// Computed
const stockClassName = computed(() => {
  const className = [`${CSS_NAME}__stock`]

  if (props.stock) {
    console.debug(props.stock)
  }

  return className
})

const isDisabled = computed(() => {
  return (
    props.product.price <= 0 ||
    ('status' in props.product && props.product.status === 'disabled') ||
    props.product.stockStatus === 'outofstock'
  )
})

const stock = computed(() => {
  switch (props.product.stockStatus) {
    case 'outofstock':
      return 0

    case 'instock':
      return 2

    default:
      console.debug(props.product.stockStatus)
  }
})

// Methods
const { update } = wishlist
</script>

<style lang="scss">
$prefix: 'product-card-detail';
@include component($prefix) {
  position: relative;
  font-family: get-var(family-main);
  @include typography(16px, 20px);

  @include set-local-vars(
    $prefix: 'button',
    $map: (
      font-size: rem(15px),
      line-height: rem(18px),
    )
  );

  @include object('counter') {
    align-self: center;
    @include set-local-vars(
      $prefix: 'counter',
      $map: (
        width: 60%,
      )
    );
  }

  @include set-local-vars(
    $prefix: 'receipt',
    $map: (
      padding: rem(30px),
    )
  );

  @include element('row') {
    border-bottom: 2px solid get-var(color-light);
    display: flex;
    flex-direction: column;

    @include modifier('footer') {
      border-bottom: 0;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      &:hover button {
        @include set-local-vars(
          $prefix: 'wishlist-button',
          $map: (
            heart-color: red,
          )
        );
      }
      & b {
        cursor: pointer;
      }
    }
  }

  @include element('tax') {
    display: block;
    @include typography(14px, 18px);
  }

  @include element('stock') {
    text-transform: uppercase;
    display: block;
    font-weight: get-var(weight-bold);
    color: get-var(color-green);
    @include typography(14px, 18px);
  }

  @include element('kg-price') {
    display: block;
    font-weight: get-var(weight-regular);
  }

  @include element('price') {
    display: block;
    @include typography(38px, 48px);
    color: get-var(color-green);

    @include element('discount') {
      color: get-var(color-dark);
      display: block;
      @include typography(16px, 20px);
    }
  }
}
</style>
