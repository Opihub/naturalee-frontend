<template>
  <div :class="CSS_CLASS">
    <MarkerLabel
      v-if="product.marker && product.marker.text"
      :class="`${CSS_CLASS}__marker`"
      :text="product.marker.text"
      :color="product.marker.color"
    />

    <WishlistButton :product="product" :class="`${CSS_CLASS}__wishlist`" />

    <ProductImage
      :class="[`${CSS_CLASS}__thumbnail`, 'u-mb-half']"
      :src="product.image"
      :size="fit"
    />

    <div :class="[`${CSS_CLASS}__body`, 'u-mb-large']">
      <BaseHeading
        tag="span"
        :class="`${CSS_CLASS}__title`"
        class="u-mb-micro"
        >{{ product.title }}</BaseHeading
      >
      <BaseHeading
        tag="span"
        :class="`${CSS_CLASS}__provenance`"
        class="u-mb-tiny"
        >{{ product.provenance }}</BaseHeading
      >

      <PriceHolder class="u-mb-mini" :price="product.price">
        <template #after>
          <small class="u-ml-micro">/ {{ product.unit }}</small>
        </template>
      </PriceHolder>

      <BaseHeading tag="small" :class="`${CSS_CLASS}__cost`">
        {{ product.descriptionCost }}
      </BaseHeading>
    </div>

    <BaseCounter v-model="quantity" class="u-mt-auto" />

    <AddToCartButton
      class="u-mb-tiny u-mt-half"
      :product="product"
      :quantity="quantity"
      :disabled="product.price <= 0"
    />

    <BaseLink underline color="dark" :to="product.link"
      >Vai alla scheda prodotto</BaseLink
    >
  </div>
</template>

<script setup>
// Imports

// Constants
const CSS_CLASS = 'c-product-card'

// Define (Props, Emits, Page Meta)
const props = defineProps({
  product: {
    type: Object,
    required: true,
    validator(value) {
      return (
        'id' in value &&
        'title' in value &&
        'provenance' in value &&
        'link' in value
      )
    },
  },
})

// Component life-cycle hooks

// Composables

// Data
// TODO: aggiungere counter
const quantity = ref(1)

// Watcher

// Computed
const fit = computed(() => {
  const { image } = props.product
  if (image) {
    return 'cover'
  }

  return 'contain'
})

// Methods
</script>

<style lang="scss">
$prefix: 'product-card';
@include component($prefix) {
  @include set-vars(
    $prefix: $prefix,
    $map: (
      opacity: 1,
    )
  );

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  text-align: center;
  background-color: get-var(color-white);
  border-radius: rem(20px);
  padding: rem(30px) rem(30px) rem(40px);
  position: relative;
  overflow: hidden;

  @include element('marker') {
    position: absolute;
    left: 0;
    top: rem(24px);
    z-index: 1;
  }

  @include element('wishlist') {
    position: absolute;
    right: rem(30px);
    top: rem(30px);
    z-index: 1;
  }

  @include element('body') {
    align-self: stretch;
    text-align: left;
    font-weight: get-var(weight-regular);
    @include typography(16px, 20px);
  }

  @include element('title') {
    font-weight: get-var(weight-bold);
    @include typography(22px, 28px);
  }

  @include element('thumbnail') {
    margin: 0 auto;
    max-width: get-var(width, rem(300px), $prefix: $prefix);
  }
}
</style>
