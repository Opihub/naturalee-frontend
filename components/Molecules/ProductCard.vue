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

    <div :class="[`${CSS_NAME}__row`, `${CSS_NAME}__info`]">
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

      <div :class="`${CSS_NAME}__descriptor`">
        <ProductDescriptor
          v-if="product.costDescription"
          :value="product.costDescription"
          icon="peso"
        />
        <ProductDescriptor v-if="product.selling" :value="product.selling" />
      </div>
    </div>

    <div :class="[`${CSS_NAME}__row`, 'u-mt-auto']">
      <PriceHolder
        class="u-mb-mini"
        :price="product.price"
        :sales-price="product?.discountPrice"
        :is-green="product?.discountPrice ? true : false"
        :normal-price-green="product?.discountPrice ? false : true"
      >
        <template v-if="product.costPerUnit" #after="{ priceClassName }">
          <small :class="`${priceClassName}__cost-per-unit`">
            <PriceHolder
              :class="`${priceClassName}__cost-per-unit__value`"
              :price="product?.costPerUnit"
              :sales-price="product?.discountKgPrice"
              :unit="product?.unit"
          /></small>
        </template>
      </PriceHolder>
    </div>

    <div :class="[`${CSS_NAME}__row`, `${CSS_NAME}__buy`]">
      <BaseCounter v-model="quantity" :disabled="isDisabled" />

      <AddToCartButton
        :class="`${CSS_NAME}__button`"
        :product="product"
        :quantity="quantity"
        :disabled="isDisabled"
      >
        <span>{{
          product.stockStatus === 'instock'
            ? $t('cart.add')
            : $t('cart.notAvailable')
        }}</span>
        <template #added>{{ $t('cart.added') }}</template>
        <template v-if="product.stockStatus === 'instock'" #svg="{ svgStyle }">
          <BaseIcon name="bag" :icon-size="svgStyle" :filled="true" />
        </template>
      </AddToCartButton>
    </div>

    <BaseLink
      v-if="details"
      color="dark"
      :class="[`${CSS_NAME}__row`, `${CSS_NAME}__link`]"
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
    ('status' in props.product && props.product.status === 'disabled') ||
    props.product.stockStatus === 'outofstock'
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
        columns: 3,
      )
    );
  }
  @include from(full) {
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
      width: rem(108px),
      margin: auto 0 0,
    )
  );
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
  text-align: left;
  background-color: get-var(color-white);
  border-radius: rem(20px);
  padding: get-var(padding, 0, $prefix: $prefix);
  position: relative;
  overflow: hidden;
  @include set-vars(
    $prefix: $prefix,
    $map: (
      padding-x: rem(30px),
    )
  );

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

  @include element('row') {
    padding: get-var(padding-top, 0px, $prefix: $prefix)
      get-var(padding-x, $prefix: $prefix)
      get-var(padding-bottom, 0px, $prefix: $prefix);
  }

  @include element('thumbnail') {
    width: 100%;
    display: block;
    margin-bottom: rem(20px);
    padding-top: rem(30px);

    svg {
      @include until(large) {
        padding: 0 rem(15px);
      }
      width: 100%;
      margin: 0 auto;
      max-width: get-var(width, rem(300px), $prefix: $prefix);

      image {
        transform: scale(1);
        transform-origin: center;

        @include transition(transform);
      }
    }

    &:hover {
      svg {
        image {
          transform: scale(1.1);
        }
      }
    }
  }

  @include element('info') {
    align-self: stretch;
    text-align: left;
    font-weight: get-var(weight-regular);
    margin-bottom: rem(22px);
    @include typography(16px, 20px);
  }

  @include element('descriptor') {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    gap: rem(24px);
  }

  @include element('title') {
    font-weight: get-var(weight-bold);
    @include typography(22px, 28px);
  }

  @include object('price') {
    display: block;
    text-align: start;
  }

  @include element('link') {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        padding-top: rem(20px),
        padding-bottom: rem(20px),
      )
    );

    margin-top: rem(20px);
    text-align: center;
    border-top: 2px solid get-var(color-light);
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

      @include element('info') {
        align-self: center;
        margin-bottom: 0;
      }

      @include element('button') {
        margin: 0;
        flex: 0 0 get-var(button-width, rem(200px), $prefix: $prefix);
      }
    }
  }

  @include element('buy') {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;

    @include object('counter') {
      flex: 0 0 rem(108px);
    }

    @include element('button', true) {
      flex: 1 1 auto;
      max-width: rem(190px);

      @include element('svg') {
        display: inline-block;
        transition: all 0.5s;
      }

      @include set-local-vars(
        $prefix: 'button',
        $map: (
          justify-content: center,
          padding: rem(12px) rem(40px),
          fill: get-var(color-yellow),
        )
      );

      &:hover svg {
        @include set-local-vars(
          $prefix: 'button',
          $map: (
            fill: get-var(color-green),
          )
        );
      }

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
            padding: rem(12px) rem(10px),
          )
        );
      }
    }

    @include from('desktop') {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      gap: rem(10px);
    }
  }
}
</style>
