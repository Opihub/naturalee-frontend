<template>
  <BaseLink
    to="/cart"
    :class="CSS_NAME"
    :text="count"
    :label-class-name="`${CSS_NAME}__label`"
  >
    <template #svg="{ className }">
      <NuxtIcon name="bag" :class="className" :filled="false" />
    </template>
  </BaseLink>
</template>

<script setup>
const CSS_NAME = 'c-mini-cart-icon'

defineProps({
  count: {
    type: String,
    required: true,
  },
})
</script>

<style lang="scss">
$prefix: 'mini-cart-icon';
@include component($prefix) {
  @include set-vars(
    $prefix: $prefix,
    $map: (
      bag-color: get-var(color-yellow),
      text-color: get-var(color-green),
    )
  );

  @include set-local-vars(
    $prefix: 'link-svg',
    $map: (
      width: rem(30px),
      height: rem(38px),
    )
  );

  user-select: none;
  align-items: center;
  justify-content: center;
  position: relative;
  color: get-var(bag-color, $prefix: $prefix);

  @include element('label') {
    text-align: center;
    color: get-var(text-color, $prefix: $prefix);
    position: absolute;
    inset: auto auto 50% 50%;
    z-index: 1;
    min-width: rem(10px);
    display: inline-block;
    transform: translate(-50%, rem(14px));
    @include typography(16px, 19px);
    font-weight: get-var(weight-bold);
    font-family: get-var(family-text);
  }

  &:hover {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        bag-color: get-var(color-green),
        text-color: get-var(color-white),
      )
    );
  }
}
</style>
