<template>
  <div :class="className">
    <slot>{{ message }}</slot>
  </div>
</template>

<script setup>
const CSS_NAME = 'o-message'

const props = defineProps({
  message: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    default: null,
    validator(value) {
      return ['success', 'danger'].includes(value)
    },
  },
  color: {
    type: String,
    default: 'white',
    validator(value) {
      return ['white', 'light'].includes(value)
    },
  },
})

const className = computed(() => {
  const className = [CSS_NAME]

  if (props.status) {
    className.push(`${CSS_NAME}--${props.status}`)
  }

  if (props.color && props.color !== 'white') {
    className.push(`${CSS_NAME}--${props.color}`)
  }

  return className
})
</script>

<style lang="scss">
$prefix: 'message';
@include object($prefix) {
  width: 100%;
  display: block;
  padding: get-var(padding, rem(15px) rem(20px), $prefix: $prefix);
  border-radius: get-var(radius, rem(10px), $prefix: $prefix);
  background-color: get-var(background, get-var(color-white), $prefix: $prefix);

  @include modifier('light') {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        background: get-var(color-light),
      )
    );
  }
}
</style>
