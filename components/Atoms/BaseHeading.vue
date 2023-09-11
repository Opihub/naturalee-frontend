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
  /**
   * Usato per gestire quale tag HTML avrà il titolo.
   * Se `use` non viene usato, allora `tag` verrà impiegato anche
   * per definire lo stile
   */
  tag: {
    type: String,
    default: 'h1',
    validator(value) {
      return ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span'].includes(value)
    },
  },
  /**
   * Usato per definire lo stile del titolo
   */
  use: {
    type: String,
    default: null,
    validator(value) {
      return ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'custom'].includes(value)
    },
  },
})

const className = computed(() => {
  const className = [CSS_NAME]

  if (props.use) {
    if (props.use !== 'custom') {
      className.push(`${CSS_NAME}--${props.use}`)
    }
  } else if (props.tag && props.tag !== 'span') {
    className.push(`${CSS_NAME}--${props.tag}`)
  }

  return className
})
</script>

<style lang="scss">
$prefix: 'heading';
@include object($prefix) {
  color: get-var(text-color, $prefix: $prefix);
  font-weight: get-var(font-weight, $prefix: $prefix);
  font-size: get-var(font-size, $prefix: $prefix);
  line-height: get-var(line-height, $prefix: $prefix);
  text-transform: get-var(text-transform, none, $prefix: $prefix);
  font-family: get-var(font-family, get-var(family-main), $prefix: $prefix);
  display: block;

  @include modifier('h1') {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        font-weight: get-var(weight-extrabold),
        font-size: 36px,
        line-height: 42px,
      )
    );
    color: get-var(text-color, get-var(color-dark), $prefix: $prefix);

    @include media(desktop) {
      @include set-local-vars(
        $prefix: $prefix,
        $map: (
          font-size: 70px,
          line-height: 80px,
        )
      );
    }
  }

  @include modifier('h2') {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        font-weight: get-var(weight-extrabold),
        font-size: 38px,
        line-height: 44px,
      )
    );
    color: get-var(text-color, get-var(color-white), $prefix: $prefix);

    @include media(desktop) {
      @include set-local-vars(
        $prefix: $prefix,
        $map: (
          font-size: 50px,
          line-height: 60px,
        )
      );
    }
  }

  @include modifier('h3') {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        font-weight: get-var(weight-bold),
        font-size: 40px,
        line-height: 50px,
      )
    );
    color: get-var(text-color, get-var(color-white), $prefix: $prefix);

    @include media(desktop) {
      @include set-local-vars(
        $prefix: $prefix,
        $map: (
          font-size: 40px,
          line-height: 50px,
        )
      );
    }
  }

  @include modifier('h4') {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        font-weight: get-var(weight-bold),
        font-size: 30px,
        line-height: 40px,
      )
    );
    color: get-var(text-color, get-var(color-white), $prefix: $prefix);

    @include media(desktop) {
      @include set-local-vars(
        $prefix: $prefix,
        $map: (
          font-size: 30px,
          line-height: 40px,
        )
      );
    }
  }

  @include modifier('h5') {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        font-weight: get-var(weight-bold),
        font-size: 30px,
        line-height: 40px,
      )
    );
    color: get-var(text-color, get-var(color-green), $prefix: $prefix);

    @include media(desktop) {
      @include set-local-vars(
        $prefix: $prefix,
        $map: (
          font-size: 26px,
          line-height: 30px,
        )
      );
    }
  }

  @include modifier('h6') {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        font-weight: get-var(weight-extrabold),
        font-size: 18px,
        line-height: 23px,
        text-transform: uppercase,
      )
    );
    color: get-var(text-color, get-var(color-white), $prefix: $prefix);

    @include media(desktop) {
      @include set-local-vars(
        $prefix: $prefix,
        $map: (
          font-size: 18px,
          line-height: 23px,
        )
      );
    }
  }
}
</style>
