<template>
  <div :class="className">
    <MarkerLabel
      v-if="product.marker && product.marker.text"
      :class="`${CSS_NAME}__marker`"
      :text="product.marker.text"
      :color="product.marker.color"
    />

    <WishlistButton
      v-if="wishlist"
      :product="product"
      :class="`${CSS_NAME}__wishlist`"
    />

    <NuxtLink :to="product.link" :class="`${CSS_NAME}__thumbnail`">
      <ProductImage :src="product.image" :size="fit" />
    </NuxtLink>

    <div :class="`${CSS_NAME}__body`">
      <BaseLink
        :to="product.link"
        :class="[`${CSS_NAME}__title`, 'u-mb-micro']"
        color="dark"
        >{{ product.title }}</BaseLink
      >
      <BaseHeading
        tag="span"
        :class="`${CSS_NAME}__provenance`"
        class="u-mb-tiny"
        >{{ product.provenance }}</BaseHeading
      >

      <PriceHolder class="u-mb-mini" :price="product.price">
        <template v-if="product.selling" #after>
          <small class="u-ml-micro">/ {{ product.selling }}</small>
        </template>
      </PriceHolder>

      <BaseHeading tag="small" :class="`${CSS_NAME}__cost`">
        {{ product.costDescription }}
      </BaseHeading>
    </div>

    <BaseCounter v-model="quantity" :disabled="isDisabled" />

    <AddToCartButton
      :product="product"
      :quantity="quantity"
      :disabled="isDisabled"
    />

    <BaseLink v-if="details" underline color="dark" :to="product.link"
      >Vai alla scheda prodotto</BaseLink
    >
  </div>
</template>

<script setup>
// Imports

// Constants
const CSS_NAME = 'c-product-card'

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
  type: {
    type: String,
    default: 'grid',
    validator(value) {
      return ['grid', 'list'].includes(value)
    },
  },
  wishlist: {
    type: Boolean,
    default: true,
  },
  details: {
    type: Boolean,
    default: true,
  },
})

// Component life-cycle hooks

// Composables

// Data
const quantity = ref(props.product?.quantity || 1)

// Watcher

// Computed
const className = computed(() => {
  const className = [CSS_NAME]

  if (props.type === 'list') {
    className.push(`${CSS_NAME}--inline`)
  }

  return className
})

const fit = computed(() => {
  const { image } = props.product
  if (image) {
    return 'cover'
  }

  return 'contain'
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
$prefix: 'product-card';
@include component($prefix) {
  @include set-vars(
    $prefix: $prefix,
    $map: (
      opacity: 1,
    )
  );

  @include set-local-vars(
    $prefix: 'counter',
    $map: (
      margin: auto 0 0,
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
    margin-bottom: rem(30px);
    @include typography(16px, 20px);
  }

  @include element('title') {
    font-weight: get-var(weight-bold);
    @include typography(22px, 28px);
  }

  @include element('thumbnail') {
    width: 100%;
    display: block;
    margin-bottom: rem(20px);

    svg {
      margin: 0 auto;
      max-width: get-var(width, rem(300px), $prefix: $prefix);
      transform: scale(1);

      @include transition(transform);
    }

    &:hover {
      svg {
        transform: scale(1.05);
      }
    }
  }

  @include object('button') {
    margin: rem(20px) auto rem(12px);
  }

  @include from(tablet) {
    @include modifier('inline') {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: rem(15px);

      @include set-local-vars(
        $prefix: 'counter',
        $map: (
          margin: 0 0 0 auto,
        )
      );

      @include set-local-vars(
        $prefix: $prefix,
        $map: (
          button-width: rem(200px),
          width: rem(100px),
        )
      );

      @include from(desktop) {
        @include set-local-vars(
          $prefix: $prefix,
          $map: (
            button-width: auto,
            width: rem(150px),
          )
        );
      }

      @include element('thumbnail') {
        width: auto;
        margin-bottom: 0;
        flex: 0 0 get-var(width, rem(100px), $prefix: $prefix);

        svg {
          margin: 0;
        }
      }

      @include element('body') {
        align-self: center;
        margin-bottom: 0;
      }

      @include object('button') {
        margin: 0;
        flex: 0 0 get-var(button-width, rem(200px), $prefix: $prefix);
      }
    }
  }
}
</style>
