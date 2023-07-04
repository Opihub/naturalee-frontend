<template>
  <button class="o-button" :class="className" :type="type">
    <slot>
      <span v-if="text">{{ text }}</span>
    </slot>

    <Suspense>
      <slot name="svg">
        <NuxtIcon v-if="svg" :name="svg" />
      </slot>
    </Suspense>
  </button>
</template>

<script setup>
const CSS_NAME = 'o-button'

const props = defineProps({
  svg: {
    type: String,
    default: null,
  },
  text: {
    type: String,
    default: null,
  },
  type: {
    type: String,
    default: 'button',
  },
  active: {
    type: Boolean,
    default: false,
  },
  style: {
    type: String,
    default: null,
    validator(value) {
      // The value must match one of these strings
      return ['green', 'yellow', 'transparent'].includes(value)
    },
  },
})

const className = computed(() => {
  const className = []

  if (props.style) {
    className.push(`${CSS_NAME}--${props.style}`)
  }

  if (props.active) {
    className.push('is-active')
  }

  return className
})
</script>

<style lang="scss">
@include object(button) {
  $prefix: button;

  @include set-vars(
    $prefix: $prefix,
    $map: (
      padding: 12px 44px,
      background-color: get-var(color-white),
      text-color: get-var(color-green),
      border-width: 0,
      font-weight: font-weight(bold),
    )
  );

  border: #{get-var(border-width, $prefix: $prefix)} solid #{get-var(border-color)};
  border-radius: 999em;
  font-weight: #{get-var(font-weight, $prefix: $prefix)};
  padding: #{get-var(padding, $prefix: $prefix)};
  cursor: pointer;
  text-align: center;
  background-color: #{get-var(background-color, $prefix: $prefix)};
  color: #{get-var(text-color, $prefix: $prefix)};

  @include transition(background-color, color, border-color);

  &:hover {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        background-color: get-var(color-green),
        text-color: get-var(color-white),
      )
    );
  }

  @include modifier('yellow') {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        background-color: get-var(color-yellow),
        text-color: get-var(color-green),
      )
    );

    &:hover {
      @include set-local-vars(
        $prefix: $prefix,
        $map: (
          background-color: get-var(color-white),
          text-color: get-var(color-yellow),
        )
      );
    }
  }

  @include modifier('green') {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        background-color: get-var(color-green),
        text-color: get-var(color-white),
      )
    );

    &:hover {
      @include set-local-vars(
        $prefix: $prefix,
        $map: (
          background-color: get-var(color-yellow),
          text-color: get-var(color-green),
        )
      );
    }
  }

  @include modifier('transparent') {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        padding: 12px 14px,
        background-color: transparent,
        text-color: get-var(border-color),
        border-width: 1px,
        font-weight: font-weight(medium),
      )
    );

    @include is(active) {
      @include set-local-var(
        background-color,
        get-var(color-white),
        $prefix: $prefix
      );
    }

    &:hover {
      @include set-local-var(
        background-color,
        get-var(color-white),
        $prefix: $prefix
      );
    }
  }
}
</style>
