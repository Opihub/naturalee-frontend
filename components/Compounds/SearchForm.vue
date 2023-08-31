<template>
  <slot name="before" />

  <form :class="className" method="GET" v-bind="$attrs">
    <InputField
      v-model="search"
      :class="`${CSS_NAME}__input`"
      type="search"
      :placeholder="placeholder"
      :rounded="true"
      :borderless="true"
    />

    <BaseButton
      :class="`${CSS_NAME}__submit`"
      type="submit"
      color="yellow"
      svg="search"
      :svg-size="svgSize"
      >Cerca</BaseButton
    >
  </form>

  <slot name="after" />
</template>

<script setup>
// Imports

// Constants
const CSS_NAME = 'c-search'

// Props & Emits
const props = defineProps({
  placeholder: {
    type: String,
    default: null,
  },
  size: {
    type: String,
    default: 'default',
    validator(value) {
      return ['default', 'mini'].includes(value)
    },
  },
})

// Component life-cycle hooks

// Data
const search = ref('')

// Watcher

// Computed
const svgSize = computed(() => {
  if (props.size === 'mini') {
    return [15, 15]
  }

  return [22, 22]
})

const className = computed(() => {
  const className = [CSS_NAME]

  if (props.size !== 'default') {
    className.push(`${CSS_NAME}--${props.size}`)
  }

  return className
})

// Methods
</script>

<style lang="scss">
$prefix: 'search';
@include component($prefix) {
  @include set-local-vars(
    $prefix: 'button',
    $map: (
      padding: rem(21px) rem(30px),
      font-weight: get-var(weight-extrabold),
      font-size: rem(15px),
      line-height: rem(19px),
      svg-gap: rem(12px),
    )
  );

  @include set-local-vars(
    $prefix: 'input',
    $map: (
      width: 100%,
      padding: rem(21px) rem(35px),
      font-size: get-var(font-size, rem(18px), $prefix: $prefix),
      line-height: get-var(line-height, rem(22px), $prefix: $prefix),
    )
  );

  display: flex;
  background-color: get-var(color-white);
  border-radius: get-var(border-circle);
  font-size: get-var(font-size, rem(18px), $prefix: $prefix);
  line-height: get-var(line-height, rem(22px), $prefix: $prefix);
  display: flex;
  align-items: stretch;

  @include modifier('mini') {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        font-size: rem(14px),
        line-height: rem(18px),
      )
    );

    @include set-local-vars(
      $prefix: 'button',
      $map: (
        font-size: get-var(font-size, $prefix: $prefix),
        line-height: get-var(line-height, $prefix: $prefix),
        padding: rem(7px) rem(20px),
      )
    );

    @include set-local-vars(
      $prefix: 'input',
      $map: (
        font-size: get-var(font-size, $prefix: $prefix),
        line-height: get-var(line-height, $prefix: $prefix),
        padding: rem(7px) rem(20px),
      )
    );
  }

  @include element('input') {
    flex: 0 1 100%;
  }

  @include element('submit') {
    flex: 0 0 auto;
  }
}
</style>
