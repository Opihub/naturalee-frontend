<template>
  <ul :class="className" :style="style">
    <slot name="before" :class-name="`${CSS_NAME}__item`" />
    <li v-for="record in menu" :key="record.id" :class="`${CSS_NAME}__item`">
      <BaseLink
        v-if="record.url"
        :to="record.url"
        :text="record.title || record.text"
        :target="record.target"
        :color="color"
      />
      <span v-else>{{ record.title || record.text }}</span>
    </li>
    <slot name="after" :class-name="`${CSS_NAME}__item`" />
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
  const style = {}

  if (props.separator) {
    style['--menu-separator'] = `"${props.separator}"`
  }

  return style
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
$prefix: 'menu';
@include component($prefix) {
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
  gap: get-var(gap, $prefix: $prefix);
  padding: 0;
  margin: 0;
  color: get-var(text-color, $prefix: $prefix);
  font-weight: get-var(font-weight, get-var(weight-bold), $prefix: $prefix);
  font-size: get-var(font-size, rem(15px), $prefix: $prefix);
  line-height: get-var(line-height, rem(16px), $prefix: $prefix);

  @include modifier('mini') {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        gap: rem(12px),
      )
    );
  }

  @include modifier('stretch') {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        gap: rem(16px),
      )
    );
  }

  @include modifier('large') {
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

  @include modifier('separate') {
    @include element('item') {
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
