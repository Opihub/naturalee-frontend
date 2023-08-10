<template>
  <ul :class="className" :style="style">
    <li v-for="record in menu" :key="record.id" class="c-menu__item">
      <BaseLink :to="record.url" :text="record.title" :target="record.target" :color="color" />
    </li>
  </ul>
</template>

<script setup>
const CSS_NAME = 'c-menu'

const props = defineProps({
  menu: {
    type: Array,
    default() {
      return []
    },
  },
  separator: {
    type: String,
    default: null,
  },
  gap: {
    type: String,
    default: null,
    validator(value) {
      // The value must match one of these strings
      return ['mini', 'stretch', 'large'].includes(value)
    },
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

const style = computed(() => {
  const style = {};

  if (props.separator) {
    style['--link-separator'] = `"${props.separator}"`;
  }

  return style;
})

const className = computed(() => {
  const className = [CSS_NAME]

  if (props.gap) {
    className.push(`${CSS_NAME}--${props.gap}`)
  }

  if (props.separator) {
    className.push(`${CSS_NAME}--separate`)
  }

  if (props.color) {
    className.push(`${CSS_NAME}--${props.color}`)
  }

  return className
})
</script>

<style lang="scss">
@include component("menu") {
  $prefix: link;

  @include set-vars(
    $prefix: $prefix,
    $map: (
      text-color: get-var(color-yellow),
      gap: rem(30px),
    )
  );

  list-style: none;
  display: flex;
  align-items: baseline;
  gap: #{get-var(gap, $prefix: $prefix)};
  padding: 0;
  margin: 0;
  color: #{get-var(text-color, $prefix: $prefix)};
  @include typography(15px, 16px);
  @include font-weight(bold);

  @include modifier("mini") {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        gap: rem(12px),
      )
    );
  }

  @include modifier("stretch") {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        gap: rem(16px),
      )
    );
  }

  @include modifier("large") {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        gap: rem(50px),
      )
    );
  }

  @include modifier('white') {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        text-color: get-var(color-white),
      )
    );
  }

  @include modifier('dark') {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        text-color: get-var(color-black),
      )
    );
  }

  @include modifier("separate") {
    @include element("item") {
      position: relative;

      &::after {
        pointer-events: none;
        content: #{get-var(separator, $prefix: $prefix)};
        display: block;
        position: absolute;
        inset: 50% auto auto 100%;
        transform: translate(0, -50%);
        text-align: center;
        max-width: #{get-var(gap, $prefix: $prefix)};
        width: 100%;
        color: inherit;
      }

      &:last-child {
        &::after {
          display: none;
        }
      }
    }
  }
}
</style>
