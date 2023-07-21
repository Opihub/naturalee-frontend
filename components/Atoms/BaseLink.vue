<template>
  <NuxtLink :class="className">
    <Suspense>
      <slot name="svg">
        <NuxtIcon
          v-if="svg"
          :name="svg"
          :class="`${CSS_NAME}__icon`"
          :filled="false"
        />
      </slot>
    </Suspense>

    <slot>
      <span v-if="text">{{ text }}</span>
    </slot>

    <ArrowSVG v-if="arrow" :class="`${CSS_NAME}__arrow`" />
  </NuxtLink>
</template>

<script setup>
import ArrowSVG from 'assets/svg/arrow.svg'

const CSS_NAME = 'o-link'

const props = defineProps({
  svg: {
    type: String,
    default: null,
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
  color: {
    type: String,
    default: null,
    validator(value) {
      // The value must match one of these strings
      return ['dark'].includes(value)
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
@include object(link) {
  $prefix: link;
  $svg-prefix: svg;
  $arrow-prefix: arrow;

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
  color: #{get-var(text-color, $prefix: $prefix)};
  display: inline-flex;
  flex-wrap: wrap;
  gap: #{get-var(gap, $prefix: $prefix)};
  align-items: baseline;
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
      width: #{get-var(width, $prefix: $svg-prefix)};
      height: #{get-var(height, $prefix: $svg-prefix)};
    }
  }

  @include element('arrow') {
    margin: 0;
    width: #{get-var(width, $prefix: $arrow-prefix)};
    height: #{get-var(height, $prefix: $arrow-prefix)};
    align-self: baseline;
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

  @include has('arrow') {
    @include element('icon') {
      grid-column: 1 / 3;
    }
  }

  @include has('icon') {
    display: inline-grid;
    grid-template-areas:
      '2fr'
      '1fr 1fr';

    @include element('arrow') {
      align-self: center;
    }
  }
}
</style>
