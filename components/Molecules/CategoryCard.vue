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
  position: {
    type: String,
    default: null,
    validator(value) {
      return ['center', 'bottom', 'top'].includes(value)
    },
  },
})

const style = computed(() => {
  const style = {}

  if (props.image) {
    style['--background-image'] = `url("${props.image}")`
  }

  if (props.position) {
    let position = props.position
    if (position !== 'center') {
      position += ' center'
    }

    style['--background-position'] = position
  }

  return style
})
</script>

<style lang="scss">
@include component(category-card) {
  $prefix: category-card;

  @include set-vars(
    $prefix: $prefix,
    $map: (
      border-radius: rem(20px),
      padding: rem(24px),
      aspect-ratio: '100 / 128.61',
      scale: 1,
      bottom: get-var(padding, $prefix: $prefix),
      bottom-translate: 0,
      opacity: 1,
    )
  );

  @include set-local-vars(
    $prefix: 'arrow',
    $map: (
      width: rem(20px),
      height: rem(20px),
    )
  );

  width: 100%;
  height: rem(100px);
  background-color: get-var(color-green);
  border-radius: get-var(border-radius, $prefix: $prefix);
  padding: get-var(padding, $prefix: $prefix);
  @include typography(26px, 33px);
  font-weight: get-var(weight-bold);
  align-items: flex-end;
  justify-content: center;
  flex-wrap: nowrap;
  position: relative;
  overflow: hidden;

  @include from(tablet) {
    height: auto;
    aspect-ratio: get-var(aspect-ratio, $prefix: $prefix);
    @include typography(40px, 50px);
  }

  @include element(label) {
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 2;
    transform: translate(-50%, -50%);
    @include transition(transform);

    @include from(tablet) {
      inset: auto #{get-var(padding, $prefix: $prefix)} #{get-var(
          bottom,
          $prefix: $prefix
        )} #{get-var(padding, $prefix: $prefix)};
      transform: translateY(#{get-var(bottom-translate, $prefix: $prefix)});
      @include transition-properties(bottom, transform);
    }
  }

  &::before {
    content: '';
    position: absolute;
    z-index: 0;
    inset: 0;
    background-position: get-var(position, center, $prefix: 'background');
    background-size: cover;
    background-repeat: no-repeat;
    background-color: get-var(color-green);
    opacity: get-var(opacity, $prefix: $prefix);
    background-image: get-var(image, $prefix: 'background');
    transform: scale(#{get-var(scale, $prefix: $prefix)});
    border-radius: get-var(border-radius, $prefix: $prefix);

    @include transition(transform, opacity);
  }

  &:hover {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        scale: 1.1,
        bottom: 50%,
        bottom-translate: 50%,
        opacity: 0,
      )
    );
  }
}
</style>
