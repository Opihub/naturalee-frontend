<template>
  <button type="button" :class="CSS_NAME" @click="updateWishlist">
    <Suspense>
      <WishlistIcon :class="`${CSS_NAME}__icon`" />
    </Suspense>
  </button>
</template>

<script setup>
import WishlistIcon from 'assets/svg/wishlist-icon.svg'

const CSS_NAME = 'o-wishlist-button'

const props = defineProps({
  productId: {
    type: Number,
    required: true,
  },
})

const updateWishlist = () => {
  console.debug(props.productId)
  // TODO
}
</script>

<style lang="scss">
$prefix: 'wishlist-button';
%active {
  @include set-local-vars(
    $prefix: $prefix,
    $map: (
      heart-color: get-var(color-red),
    )
  );
}

@include object($prefix) {
  @include set-vars(
    $prefix: $prefix,
    $map: (
      heart-color: get-var(color-white),
    )
  );

  padding: 0;
  margin: 0;
  border: 0;
  background-color: transparent;
  border-radius: 0;
  cursor: pointer;

  @include element('icon') {
    width: rem(28.59px);
    height: rem(28px);

    [data-name='heart'] {
      fill: get-var(heart-color, $prefix: $prefix);

      @include transition(fill);
    }
  }

  @include is('active') {
    @extend %active;
  }

  &:hover {
    @extend %active;
  }
}
</style>
