<template>
  <button type="button" :class="className" @click="() => update(product)">
    <Suspense>
      <WishlistIcon :class="`${CSS_NAME}__icon`" />
    </Suspense>
  </button>
</template>

<script setup>
// Imports
import WishlistIcon from 'assets/svg/wishlist-icon.svg'

// Constants
const CSS_NAME = 'o-wishlist-button'

// Define (Props, Emits, Page Meta)
const props = defineProps({
  product: {
    type: Object,
    required: true,
    validator(value) {
      return (
        'variationId' in value &&
        'title' in value &&
        // 'provenance' in value &&
        'link' in value
      )
    },
  },
})

// Component life-cycle hooks

// Composables
const wishlist = useWishlistStore()

// Data

// Watcher

// Computed
const className = computed(() => {
  const className = [CSS_NAME]

  if (wishlist.has(props.product.variationId)) {
    className.push('is-active')
  }

  return className
})

// Methods
const { update } = wishlist
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
