<template>
  <button type="button" :class="CSS_NAME">
    <Suspense>
      <ShareIcon :class="`${CSS_NAME}__icon`" />
    </Suspense>
  </button>
</template>

<script setup>
// Imports
import ShareIcon from 'assets/svg/share.svg'

// Constants
const CSS_NAME = 'o-share-button'
</script>

<style lang="scss">
$prefix: 'share-button';
%active {
  @include set-local-vars(
    $prefix: $prefix,
    $map: (
      share-color: get-var(color-green),
    )
  );
}

@include object($prefix) {
  @include set-vars(
    $prefix: $prefix,
    $map: (
      share-color: get-var(color-white),
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

    [data-name='feather-share'] {
      stroke: get-var(share-color, $prefix: $prefix);

      @include transition(stroke);
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
