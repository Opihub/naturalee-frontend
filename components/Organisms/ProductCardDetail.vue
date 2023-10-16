<template>
  <ReceiptBlock :class="CSS_NAME" top-less>
    <template #default="{ className }">
      <div :class="[className, `${CSS_NAME}__row`]">
        <PriceHolder
          v-if="product?.discountKgPrice && product?.discountKgPrice > 0"
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

        <strong :class="stockClassName">{{ $t('products.stock', 2) }}</strong>
      </div>

      <div :class="[className, `${CSS_NAME}__row`]">
        <BaseCounter
          v-model="quantity"
          :disabled="isDisabled"
          big
          class="u-mb-half"
        />

        <AddToCartButton
          :product="product"
          :quantity="quantity"
          :disabled="isDisabled"
        >
          <span>{{ $t('cart.addTo') }}</span>
        </AddToCartButton>
      </div>

      <div :class="[className, `${CSS_NAME}__row`, `${CSS_NAME}__row--footer`]">
        <WishlistButton :product="product" />
      </div>
    </template>
  </ReceiptBlock>
</template>

<script setup>
// Imports

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
    ('status' in props.product && props.product.status === 'disabled')
  )
})

// Methods
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
