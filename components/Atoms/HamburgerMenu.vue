<template>
  <button type="button" :class="CSS_NAME">
    <span :class="`${CSS_NAME}__holder`">
      <span
        :class="[
          `${CSS_NAME}__line`,
          `${CSS_NAME}__bun`,
          `${CSS_NAME}__bun--top`,
        ]"
      ></span>
      <span :class="[`${CSS_NAME}__line`, `${CSS_NAME}__patty`]"></span>
      <span
        :class="[
          `${CSS_NAME}__line`,
          `${CSS_NAME}__bun`,
          `${CSS_NAME}__bun--bottom`,
        ]"
      ></span>
    </span>
  </button>
</template>

<script setup>
const CSS_NAME = 'o-hamburger'
</script>

<style lang="scss">
$prefix: 'hamburger';
@include object($prefix) {
  $prefix-line: '#{$prefix}-line';
  @include set-vars(
    $prefix: $prefix,
    $map: (
      degrees: 0deg,
      offset: 0%,
      height: rem(19px),
    )
  );

  @include set-vars(
    $prefix: $prefix-line,
    $map: (
      height: rem(3px),
    )
  );

  background-color: transparent;
  border-radius: 0;
  border: 0;
  padding: 0;
  margin: 0;
  cursor: pointer;

  @include element('holder') {
    display: block;
    position: relative;
    width: get-var(width, rem(27px), $prefix: $prefix);
    height: get-var(height, $prefix: $prefix);
  }

  @include element('line') {
    height: get-var(height, $prefix: $prefix-line);
    width: 100%;
    background-color: get-var(color-yellow);
    position: absolute;
    border-radius: get-var(border-circle);
    left: 50%;
    right: auto;

    @include transition(transform, background-color);
  }

  @include element('bun') {
    transform: translate(
        -50%,
        calc(
          get-var(offset, $prefix: $prefix) *
            get-var(direction, 1, $prefix: $prefix)
        )
      )
      rotate(
        calc(
          get-var(degrees, 0deg, $prefix: $prefix) *
            get-var(direction, 1, $prefix: $prefix)
        )
      );

    @include modifier('top') {
      @include set-local-vars(
        $prefix: $prefix,
        $map: (
          direction: 1,
        )
      );

      top: 0;
      // transform-origin: top center;
    }

    @include modifier('bottom') {
      @include set-local-vars(
        $prefix: $prefix,
        $map: (
          direction: -1,
        )
      );

      bottom: 0;
      // transform-origin: bottom center;
    }
  }

  @include element('patty') {
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: get-var(opacity, 1, $prefix: $prefix);

    @include transition(opacity, background-color);
  }

  @include is('active') {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        degrees: 45deg,
        opacity: 0,
        offset:
          calc((get-var(height, $prefix: $prefix) - get-var(height, $prefix: $prefix-line)) / 2),
      )
    );
  }
}
</style>
