<template>
  <BaseLink
    :class="CSS_CLASS"
    color="white"
    :arrow="true"
    :style="style"
    :label-class-name="`${CSS_CLASS}__label`"
  >
    <slot />
  </BaseLink>
</template>

<script setup>
const CSS_CLASS = 'c-category-card'

const props = defineProps({
  image: {
    type: String,
    default: null,
  },
})

const style = computed(() => {
  return { '--background-image': `url("${props.image}")` }
})
</script>

<style lang="scss">
@include component(category-card) {
  $prefix: category-card;

  @include set-vars(
    $prefix: $prefix,
    $map: (
      background-color: transparent,
      border-radius: rem(20px),
      padding: rem(24px),
      aspect-ratio: '100 / 128.61',
      scale: 1,
      bottom: get-var(padding, $prefix: $prefix),
      bottom-translate: 0,
    )
  );

  width: 100%;
  background-color: #{get-var(background-color, $prefix: $prefix)};
  aspect-ratio: #{get-var(aspect-ratio, $prefix: $prefix)};
  border-radius: #{get-var(border-radius, $prefix: $prefix)};
  padding: #{get-var(padding, $prefix: $prefix)};
  @include typography(40px, 50px);
  font-weight: get-var(weight-bold);
  align-items: flex-end;
  justify-content: center;
  flex-wrap: nowrap;
  position: relative;
  overflow: hidden;
  @include transition(background-color);

  @include element(label) {
    text-align: center;
    position: absolute;
    inset: auto #{get-var(padding, $prefix: $prefix)} #{get-var(
        bottom,
        $prefix: $prefix
      )} #{get-var(padding, $prefix: $prefix)};
    z-index: 1;
    transform: translateY(#{get-var(bottom-translate, $prefix: $prefix)});
    @include transition(bottom, transform);
  }

  &::before {
    content: '';
    position: absolute;
    z-index: -1;
    inset: 0;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-color: get-var(color-green);
    background-image: var(--background-image);
    transform: scale(#{get-var(scale, $prefix: $prefix)});
    border-radius: #{get-var(border-radius, $prefix: $prefix)};

    @include transition(transform);
  }

  &:hover {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        background-color: get-var(color-green),
        scale: 1.1,
        bottom: 50%,
        bottom-translate: 50%,
      )
    );
  }
}
</style>
