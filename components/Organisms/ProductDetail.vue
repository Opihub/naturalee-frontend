<template>
  <div :class="CSS_NAME" class="o-row">
    <div class="o-row__column _image">
      <ProductImage :src="product.image" />
    </div>

    <div class="o-row__column _card">
      <MarkerLabel v-if="product.marker" :marker="product.marker" />

      <BaseHeading :text="product.title" />
      <BaseHeading
        v-if="product.provenance"
        tag="h2"
        :text="product.provenance"
      />

      <div>
        <BaseButton color="green">{{ $t('cart.addTo') }}</BaseButton>
        <WishlistButton :product="product" />
      </div>
    </div>
  </div>
</template>

<script setup>
// Imports

// Constants
const CSS_NAME = 'c-product-detail'

// Define (Props, Emits, Page Meta)
defineProps({
  product: {
    type: Object,
    required: true,
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
$prefix: 'product-detail';
@include component($prefix) {
  @include set-local-vars(
    $prefix: 'row',
    $map: (
      columns: 2,
    )
  );

  ._image {
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      max-width: rem(520px);
      margin: 0 auto;
    }
  }

  ._card {
    background-color: get-var(color-white);
    display: flex;
    flex-direction: column;
    position: relative;
    padding: rem(120px);
    border-radius: rem(60px);

    @include object('marker') {
      position: absolute;
      left: 0;
      top: rem(60px);
    }

    @include set-local-vars(
      $prefix: 'heading',
      $map: (
        text-color: get-var(color-black),
      )
    );
  }
}
</style>
