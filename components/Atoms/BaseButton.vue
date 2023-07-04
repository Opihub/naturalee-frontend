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

  @include set-var(padding, 12px 44px, $prefix: $prefix);
  @include set-var(background-color, get-var(color-white), $prefix: $prefix);
  @include set-var(text-color, get-var(color-green), $prefix: $prefix);
  @include set-var(border-width, 0, $prefix: $prefix);
  @include set-var(font-weight, font-weight(bold), $prefix: $prefix);

  border: 0 solid #{get-var(border-color)};
  border-radius: 999em;
  font-weight: #{get-var(font-weight, $prefix: $prefix)};
  padding: #{get-var(padding, $prefix: $prefix)};
  cursor: pointer;
  text-align: center;
  background-color: #{get-var(background-color, $prefix: $prefix)};
  color: #{get-var(text-color, $prefix: $prefix)};

  @include transition(background-color, color, border-color);

  &:hover {
    @include set-local-var(
      background-color,
      get-var(color-green),
      $prefix: $prefix
    );
    @include set-local-var(text-color, get-var(color-white), $prefix: $prefix);
  }

  @include modifier('yellow') {
    @include set-local-var(
      background-color,
      get-var(color-yellow),
      $prefix: $prefix
    );
    @include set-local-var(text-color, get-var(color-green), $prefix: $prefix);

    &:hover {
      @include set-local-var(
        background-color,
        get-var(color-white),
        $prefix: $prefix
      );
      @include set-local-var(
        text-color,
        get-var(color-yellow),
        $prefix: $prefix
      );
    }
  }

  @include modifier('green') {
    @include set-local-var(
      background-color,
      get-var(color-green),
      $prefix: $prefix
    );
    @include set-local-var(text-color, get-var(color-white), $prefix: $prefix);

    &:hover {
      @include set-local-var(
        background-color,
        get-var(color-yellow),
        $prefix: $prefix
      );
      @include set-local-var(
        text-color,
        get-var(color-green),
        $prefix: $prefix
      );
    }
  }

  @include modifier('transparent') {
    @include set-local-var(padding, 12px 14px, $prefix: $prefix);
    @include set-local-var(background-color, transparent, $prefix: $prefix);
    @include set-local-var(text-color, get-var(border-color), $prefix: $prefix);
    @include set-local-var(font-weight, font-weight(medium), $prefix: $prefix);
    border-width: 1px;

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
