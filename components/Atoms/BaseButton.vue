<template>
  <component
    :is="is"
    :class="className"
    :type="type"
    active-class="is-current"
    exact-active-class="is-exact"
  >
    <slot :svg-style="svgStyle" :filled="svgFilled">
      <span v-if="text">{{ text }}</span>
    </slot>

    <Suspense>
      <slot name="svg" :svg-style="svgStyle" :filled="svgFilled">
        <BaseIcon
          v-if="svg"
          :name="svg"
          :icon-size="svgStyle"
          :filled="svgFilled"
        />
      </slot>
    </Suspense>
  </component>
</template>

<script setup>
const CSS_NAME = 'o-button'

const props = defineProps({
  as: {
    type: String,
    default: 'button',
    validator(value) {
      return ['button', 'div', 'span', 'link'].includes(value)
    },
  },
  svg: {
    type: String,
    default: null,
  },
  svgSize: {
    type: Array,
    default: () => [],
  },
  svgFilled: {
    type: Boolean,
    default: false,
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
  scope: {
    type: String,
    default: null,
    validator(value) {
      // The value must match one of these strings
      return ['filter'].includes(value)
    },
  },
  color: {
    type: String,
    default: null,
    validator(value) {
      // The value must match one of these strings
      return ['black', 'green', 'yellow', 'transparent', 'white'].includes(
        value
      )
    },
  },
})

const slots = useSlots()

const svgStyle = computed(() => {
  let width = null
  let height = null

  if (Array.isArray(props.svgSize) && props.svgSize.length > 0) {
    width = props.svgSize[0]
    if (props.svgSize.length > 1) {
      height = props.svgSize[1]
    } else {
      height = props.svgSize[0]
    }
  }
  return {
    '--svg-width': typeof width === 'number' ? `${width}px` : width,
    '--svg-height': typeof height === 'number' ? `${height}px` : height,
  }
})

const className = computed(() => {
  const className = [CSS_NAME]

  if (slots.svg || props.svg) {
    className.push(`has-svg`)
  }

  if (props.scope) {
    className.push(`${CSS_NAME}--${props.scope}`)
  }

  if (props.color && props.color !== 'white') {
    className.push(`${CSS_NAME}--${props.color}`)
  }

  if (props.active) {
    className.push('is-active')
  }

  return className
})

const is = computed(() => {
  return props.as === 'link' ? resolveComponent('NuxtLink') : props.as
})
</script>

<style lang="scss">
$prefix: 'button';
@include object($prefix) {
  $svg-prefix: 'svg';

  @include set-vars(
    $prefix: $prefix,
    $map: (
      border-width: 0,
    )
  );

  @include set-local-vars(
    $prefix: $svg-prefix,
    $map: (
      width: 1em,
      height: 1em,
    )
  );

  &:focus {
    outline: 1px solid get-var(color-yellow);
  }

  border: #{get-var(border-width, $prefix: $prefix)} solid #{get-var(
      color-dark
    )};
  border-radius: 999em;
  font-weight: get-var(font-weight, font-weight(bold), $prefix: $prefix);
  padding: get-var(padding, rem(12px) rem(44px), $prefix: $prefix);
  cursor: pointer;
  text-align: center;
  background-color: get-var(
    background-color,
    get-var(color-white),
    $prefix: $prefix
  );
  font-family: get-var(font-family, get-var(family-main), $prefix: $prefix);
  color: get-var(text-color, get-var(color-green), $prefix: $prefix);
  display: inline-flex;
  align-items: center;
  justify-content: get-var(justify-content, center, $prefix: $prefix);
  font-size: get-var(font-size, 1em, $prefix: $prefix);
  line-height: get-var(line-height, inherit, $prefix: $prefix);
  gap: get-var(svg-gap, rem(18px), $prefix: $prefix);
  text-transform: get-var(text-transform, uppercase, $prefix: $prefix);
  opacity: 1;

  svg {
    margin: 0;
    width: #{get-var(width, $prefix: $svg-prefix)};
    height: #{get-var(height, $prefix: $svg-prefix)};
    fill: get-var(fill, currentColor, $prefix: $prefix);
    stroke: get-var(stroke, currentColor, $prefix: $prefix);

    @include transition(fill, stroke);
  }

  @include has('svg') {
    justify-content: get-var(justify-content, space-between, $prefix: $prefix);
  }

  @include transition(background-color, color, border-color, opacity);

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
        background-color: transparent,
        text-color: get-var(color-dark),
        border-width: 1px,
      )
    );

    @include is('active') {
      @include set-local-vars(
        $prefix: $prefix,
        $map: (
          background-color:
            get-var(color-background, get-var(color-dark), $prefix: $prefix),
          text-color: get-var(color-white),
        )
      );
    }

    &:hover {
      @include set-local-vars(
        $prefix: $prefix,
        $map: (
          background-color: get-var(color-white),
          text-color: get-var(color-dark),
        )
      );
    }
  }

  @include modifier('filter') {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        padding: 12px 14px,
        font-weight: font-weight(medium),
      )
    );
  }

  &:disabled {
    opacity: 0.5;
    cursor: no-drop;
  }
}
</style>
