<template>
  <div :class="className">
    <MarkerLabel
      v-if="product.marker && product.marker?.text"
      :class="`${CSS_NAME}__marker`"
      :marker="product.marker"
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
        class="u-mb-small"
        >{{ product.provenance }}</BaseHeading
      >

      <ProductDescriptor
        class="u-mb-medium"
        :cost-descriptor="product.costDescription"
        :selling="product.selling"
      />
    </div>
    <PriceHolder
      class="u-mb-mini u-mt-auto"
      :price="product.price"
      :sales-price="product?.discountPrice"
      :is-green="product?.discountPrice ? true : false"
      :normal-price-green="product?.discountPrice ? false : true"
    >
      <template v-if="product.selling" #after="{ priceClassName }">
        <small
          v-if="product.costPerUnit"
          :class="`${priceClassName}__cost-per-unit`"
        >
          <PriceHolder
            v-if="product?.discountKgPrice && product?.discountKgPrice > 0"
            :class="`${priceClassName}__cost-per-unit__value`"
            :price="product?.costPerUnit"
            :sales-price="product?.discountKgPrice"
            :unit="product?.unit"
        /></small>
      </template>
    </PriceHolder>
    <div :class="`${CSS_NAME}__buttons`" class="u-mt-large u-mt-none@desktop">
      <BaseCounter v-model="quantity" :disabled="isDisabled" />

      <AddToCartButton
        :product="product"
        :quantity="quantity"
        :disabled="isDisabled"
        ><span>{{ $t('cart.addTo') }}</span>
        <NuxtIcon
          name="bag"
          :class="`${CSS_NAME}__button__svg`"
          :filled="false"
      /></AddToCartButton>
    </div>

    <BaseLink
      v-if="details"
      underline
      color="dark"
      :class="`${CSS_NAME}__link`"
      :to="product.link"
      >{{ $t('products.viewDetails') }}</BaseLink
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
</script>

<style lang="scss">
$prefix: 'product-card';

@include component($prefix) {
  @include from(tablet) {
    @include set-local-vars(
      $prefix: 'row',
      $map: (
        columns: 2,
      )
    );
  }
  @include from(desktop) {
    @include set-local-vars(
      $prefix: 'row',
      $map: (
        columns: 4,
      )
    );
  }
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
  align-items: flex-start;
  width: 100%;
  text-align: center;
  background-color: get-var(color-white);
  border-radius: rem(20px);
  @include set-vars(
    $prefix: $prefix,
    $map: (
      padding-top: rem(30px),
    )
  );
  @include set-vars(
    $prefix: $prefix,
    $map: (
      padding-x: rem(30px),
    )
  );
  @include set-vars(
    $prefix: $prefix,
    $map: (
      padding-bottom: rem(25px),
    )
  );
  padding: get-var(padding-top, $prefix: $prefix)
    get-var(padding-x, $prefix: $prefix)
    get-var(padding-bottom, $prefix: $prefix);
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
    margin-bottom: rem(22px);
    @include typography(16px, 20px);
  }

  @include element('title') {
    font-weight: get-var(weight-bold);
    @include typography(22px, 28px);
    span {
      width: 100%;
      justify-content: flex-start;
    }
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
  @include object('price') {
    display: block;
    text-align: start;
  }
  @include object('button') {
    margin: rem(20px) auto rem(12px);
    @include set-local-vars(
      $prefix: 'button',
      $map: (
        padding: rem(12px) rem(80px),
      )
    );
    @include from(tablet) {
      @include set-local-vars(
        $prefix: 'button',
        $map: (
          padding: rem(12px) rem(30px),
        )
      );
    }
    @include from(desktop) {
      @include set-local-vars(
        $prefix: 'button',
        $map: (
          padding: rem(12px) rem(30px),
        )
      );
    }
  }
  @include object('link') {
    width: 100%;
  }
  @include element('link') {
    margin-top: rem(20px);
    padding-top: rem(20px);
    text-align: center;
    text-decoration: none;
    &::before {
      content: '';
      display: block;
      position: relative;
      top: -20px;
      width: calc(100% + (get-var(padding-x, $prefix: $prefix) * 2));
      height: 2px;
      background-color: get-var(color-light);
      margin-left: calc(get-var(padding-x, $prefix: $prefix) / -1);
    }
  }

  @include from(tablet) {
    @include set-local-vars(
      $prefix: 'counter',
      $map: (
        margin: 0,
      )
    );
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
  @include element('buttons') {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @include from('desktop') {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: baseline;
      gap: rem(26px);
      flex-wrap: wrap;
    }
    @include object('button') {
      svg {
        display: inline-block;
        margin-left: rem(14px);
        margin-top: rem(-5px);
        color: get-var(color-yellow);
        transition: all 0.5s;
      }
      &:hover svg {
        color: get-var(color-green);
      }
    }
  }
}
</style>
