<template>
  <component :is="tag" :class="className">
    <slot>
      {{ text }}
    </slot>
  </component>
</template>

<script setup>
const CSS_NAME = 'o-heading'

const props = defineProps({
  text: {
    type: String,
    default: null,
  },
  tag: {
    type: String,
    default: 'h1',
    validator(value) {
      return ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(value)
    },
  },
})

const className = computed(() => {
  const className = [CSS_NAME]

  if (props.tag) {
    className.push(`${CSS_NAME}--${props.tag}`)
  }

  return className
})
</script>

<style lang="scss">
@include object(heading) {
  $prefix: heading;

  @include set-vars(
    $prefix: $prefix,
    $map: (
      font-weight: get-var(weight-extrabold),
      text-color: get-var(color-dark),
      font-size: 70px,
      line-height: 80px,
      text-transform: none,
    )
  );

  color: get-var(text-color, $prefix: $prefix);
  font-weight: get-var(font-weight, $prefix: $prefix);
  font-size: get-var(font-size, $prefix: $prefix);
  line-height: get-var(line-height, $prefix: $prefix);
  text-transform: get-var(text-transform, $prefix: $prefix);
  display: block;

  @include modifier(h2) {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        font-weight: get-var(weight-extrabold),
        text-color: get-var(color-white),
        font-size: 50px,
        line-height: 60px,
      )
    );
  }

  @include modifier(h3) {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        font-weight: get-var(weight-bold),
        text-color: get-var(color-white),
        font-size: 40px,
        line-height: 50px,
      )
    );
  }

  @include modifier(h4) {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        font-weight: get-var(weight-bold),
        text-color: get-var(color-white),
        font-size: 30px,
        line-height: 40px,
      )
    );
  }

  @include modifier(h5) {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        font-weight: get-var(weight-bold),
        text-color: get-var(color-green),
        font-size: 26px,
        line-height: 30px,
      )
    );
  }

  @include modifier(h6) {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        font-weight: get-var(weight-extrabold),
        text-color: get-var(color-white),
        font-size: 18px,
        line-height: 23px,
        text-transform: uppercase,
      )
    );
  }
}
</style>
