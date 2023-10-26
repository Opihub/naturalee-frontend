<template>
  <NuxtLink
    :class="className"
    active-class="is-current"
    exact-active-class="is-exact"
  >
    <Suspense v-if="svg || slots.svg">
      <slot name="svg" :class-name="CSS_NAME_ICON">
        <BaseIcon
          :name="svg"
          :class="CSS_NAME_ICON"
          :icon-size="svgSize"
          :filled="svgFilled"
        />
      </slot>

      <template #fallback>
        <span class="nuxt-icon" :class="CSS_NAME_ICON">
          <svg viewBox="0 0 50 50">
            <g>
              <circle
                cx="25"
                cy="25"
                r="20"
                fill="#f0f1fb"
                stroke="#00966e"
                stroke-width="2"
              />
            </g>
          </svg>
        </span>
      </template>
    </Suspense>

    <span
      v-if="slots.default || text || arrow"
      :class="[`${CSS_NAME}__label`, labelClassName]"
    >
      <slot>
        <span v-if="text">{{ text }}</span>
      </slot>

      <ArrowSVG v-if="arrow" :class="`${CSS_NAME}__arrow`" />
    </span>
  </NuxtLink>
</template>

<script setup>
// Imports
import ArrowSVG from 'assets/svg/arrow.svg'

// Constants
const CSS_NAME = 'o-link'
const CSS_NAME_ICON = `${CSS_NAME}__icon`

// Define (Props, Emits, Page Meta)
const props = defineProps({
  svg: {
    type: String,
    default: null,
  },
  svgFilled: {
    type: Boolean,
    default: true,
  },
  svgSize: {
    type: String,
    default: '1em',
  },
  text: {
    type: String,
    default: null,
  },
  arrow: {
    type: Boolean,
    default: false,
  },
  underline: {
    type: Boolean,
    default: false,
  },
  inline: {
    type: Boolean,
    default: false,
  },
  labelClassName: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: 'yellow',
    validator(value) {
      // The value must match one of these strings
      return ['yellow', 'white', 'dark', 'green'].includes(value)
    },
  },
})

// Component life-cycle hooks

// Composables
const slots = useSlots()

// Data

// Watcher

// Computed
const className = computed(() => {
  const className = [CSS_NAME]

  if (props.color && props.color !== 'yellow') {
    className.push(`${CSS_NAME}--${props.color}`)
  }

  if (props.arrow) {
    className.push('has-arrow')
  }

  if (props.svg || slots.svg) {
    className.push('has-icon')
  }

  if (props.underline) {
    className.push('has-underline')
  }

  if (props.inline) {
    className.push('is-inline')
  }

  return className
})

// Methods
</script>

<style lang="scss">
@mixin set-active($color) {
  // @include is('current') {
  //   @include set-local-vars(
  //     $prefix: $prefix,
  //     $map: (
  //       text-color: get-var('color-#{$color}'),
  //     )
  //   );
  // }

  @include is('exact') {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        text-color: get-var('color-#{$color}'),
      )
    );
  }
}

$prefix: 'link';
@include object($prefix) {
  $svg-prefix: 'link-svg';
  $arrow-prefix: 'arrow';
  $label-prefix: 'link-label';

  @include set-local-vars(
    $prefix: $svg-prefix,
    $map: (
      width: rem(40px),
      height: rem(40px),
    )
  );

  @include set-local-vars(
    $prefix: $arrow-prefix,
    $map: (
      width: max(0.5em, #{rem(10px)}),
      height: max(0.5em, #{rem(10px)}),
    )
  );

  text-decoration: none;
  color: get-var(text-color, get-var(color-yellow), $prefix: $prefix);
  display: get-var(display, inline-flex, $prefix: $prefix);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: get-var(gap, rem(4px) rem(18px), $prefix: $prefix);
  @include transition(color);

  // @include current(white);

  &:hover {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        text-color: get-var(color-white),
      )
    );
  }

  @include element('icon') {
    display: block;
    text-align: center;

    svg {
      margin: 0 auto;
      width: get-var(width, $prefix: $svg-prefix);
      height: get-var(height, $prefix: $svg-prefix);

      @include transition(fill);
    }
  }

  @include element('arrow') {
    margin: 0;
    width: get-var(width, $prefix: $arrow-prefix);
    height: get-var(height, $prefix: $arrow-prefix);
    align-self: baseline;
  }

  @include element('label') {
    display: get-var(display, inline-flex, $prefix: $prefix);
    align-items: baseline;
    width: get-var(width, auto, $prefix: $label-prefix);
    justify-content: get-var(disposition, center, $prefix: $label-prefix);
    gap: get-var(gap, rem(4px) rem(18px), $prefix: $prefix);
    @include transition(color);
  }

  @include set-active('white');

  @include modifier('white') {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        text-color: get-var(color-white),
      )
    );

    &:hover {
      @include set-local-vars(
        $prefix: $prefix,
        $map: (
          text-color: get-var(color-yellow),
        )
      );
    }

    @include set-active('yellow');
  }

  @include modifier('dark') {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        text-color: get-var(color-black),
      )
    );

    &:hover {
      @include set-local-vars(
        $prefix: $prefix,
        $map: (
          text-color: get-var(color-green),
          // text-color: get-var(color-yellow),
        )
      );
    }

    @include set-active('green');
  }

  @include modifier('green') {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        text-color: get-var(color-green),
      )
    );

    &:hover {
      @include set-local-vars(
        $prefix: $prefix,
        $map: (
          text-color: get-var(color-yellow),
        )
      );
    }

    @include set-active('yellow');
  }

  @include is('inline') {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        display: inline,
      )
    );
  }

  @include has('underline') {
    text-decoration: underline;
  }

  @include has('icon') {
    @include element('arrow') {
      align-self: center;
    }
  }
}
</style>
