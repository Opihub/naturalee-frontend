<template>
  <NuxtLink :class="className">
    <Suspense>
      <slot name="svg" :class-name="CSS_NAME_ICON">
        <NuxtIcon
          v-if="svg"
          :name="svg"
          :class="CSS_NAME_ICON"
          :filled="svgFilled"
        />
      </slot>
    </Suspense>

    <span v-if="slots.default || text || arrow" :class="[`${CSS_NAME}__label`, labelClassName]">
      <slot>
        <span v-if="text">{{ text }}</span>
      </slot>

      <ArrowSVG v-if="arrow" :class="`${CSS_NAME}__arrow`" />
    </span>
  </NuxtLink>
</template>

<script setup>
import ArrowSVG from 'assets/svg/arrow.svg'

const CSS_NAME = 'o-link'
const CSS_NAME_ICON = `${CSS_NAME}__icon`

const props = defineProps({
  svg: {
    type: String,
    default: null,
  },
  svgFilled: {
    type: Boolean,
    default: true,
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
  labelClassName: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: null,
    validator(value) {
      // The value must match one of these strings
      return ['white', 'dark'].includes(value)
    },
  },
})

const slots = useSlots()

const className = computed(() => {
  const className = [CSS_NAME]

  if (props.color) {
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

  return className
})
</script>

<style lang="scss">
$prefix: 'link';
@include object($prefix) {
  $svg-prefix: 'link-svg';
  $arrow-prefix: 'arrow';
  $label-prefix: 'link-label';

  @include set-vars(
    $prefix: $prefix,
    $map: (
      text-color: get-var(color-yellow),
      gap: rem(4px) rem(18px),
      font-weight: font-weight(bold),
    )
  );

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
  color: get-var(text-color, $prefix: $prefix);
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  gap: get-var(gap, $prefix: $prefix);
  @include transition(color);

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
    display: inline-flex;
    align-items: baseline;
    width: get-var(width, auto, $prefix: $label-prefix);
    justify-content: get-var(disposition, center, $prefix: $label-prefix);
    gap: get-var(gap, $prefix: $prefix);
    @include transition(color);
  }

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
          text-color: get-var(color-yellow),
        )
      );
    }
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
