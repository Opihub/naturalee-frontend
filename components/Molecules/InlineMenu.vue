<template>
  <ul :class="className" :style="style">
    <slot
      name="before"
      :item-class-name="CSS_NAME_ITEM"
      :item-link-class-name="CSS_NAME_ITEM_LINK"
      :item-text-class-name="CSS_NAME_ITEM_TEXT"
    />

    <li
      v-for="record in menu"
      :key="record.id"
      :class="{
        [CSS_NAME_ITEM]: true,
        [itemClass]: itemClass,
        'has-no-link': !record.url,
      }"
    >
      <BaseLink
        v-if="record.url"
        :class="CSS_NAME_ITEM_LINK"
        :to="record.url"
        :text="record.title || record.text"
        :target="record.target"
        :svg="record.image"
        :color="color"
        :arrow="arrow"
      />
      <span v-else :class="CSS_NAME_ITEM_TEXT">{{
        record.title || record.text
      }}</span>
    </li>

    <slot
      name="after"
      :item-class-name="CSS_NAME_ITEM"
      :item-link-class-name="CSS_NAME_ITEM_LINK"
      :item-text-class-name="CSS_NAME_ITEM_TEXT"
    />
  </ul>
</template>

<script setup>
const CSS_NAME = 'c-menu'
const CSS_NAME_ITEM = `${CSS_NAME}__item`
const CSS_NAME_ITEM_LINK = `${CSS_NAME_ITEM}__link`
const CSS_NAME_ITEM_TEXT = `${CSS_NAME_ITEM}__text`

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
  itemClass: {
    type: String,
    default: null,
  },
  arrow: {
    type: Boolean,
    default: false,
  },
  direction: {
    type: String,
    default: 'h',
    validator(value) {
      return ['h', 'row', 'horizontal', 'v', 'column', 'vertical'].includes(
        value
      )
    },
  },
  gap: {
    type: String,
    default: null,
    validator(value) {
      return ['mini', 'stretch', 'large'].includes(value)
    },
  },
  color: {
    type: String,
    default: null,
    validator(value) {
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

  if (
    props.direction &&
    ['v', 'column', 'vertical'].includes(props.direction)
  ) {
    className.push(`${CSS_NAME}--vertical`)
  }

  return className
})
</script>

<style lang="scss">
$prefix: 'menu';
@include component($prefix) {
  $item-prefix: 'menu-item';

  @include set-vars(
    $prefix: $prefix,
    $map: (
      text-color: get-var(color-yellow),
    )
  );

  list-style: none;
  display: flex;
  align-items: get-var(align-items, baseline, $prefix: $prefix);
  flex-direction: get-var(direction, row, $prefix: $prefix);
  gap: get-var(
      row-gap,
      get-var(gap, rem(30px), $prefix: $prefix),
      $prefix: $prefix
    )
    get-var(
      column-gap,
      get-var(gap, rem(30px), $prefix: $prefix),
      $prefix: $prefix
    );
  padding: 0;
  margin: 0;
  color: get-var(text-color, $prefix: $prefix);
  font-weight: get-var(font-weight, get-var(weight-bold), $prefix: $prefix);
  font-size: get-var(font-size, rem(15px), $prefix: $prefix);
  line-height: get-var(line-height, rem(16px), $prefix: $prefix);

  @include modifier('vertical') {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        direction: column,
        align-items: stretch,
      )
    );

    @include set-local-vars(
      $prefix: $item-prefix,
      $map: (
        width: 100%,
      )
    );
  }

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

  @include element('item') {
    @include element('text') {
      width: get-var(width, auto, $prefix: $item-prefix);
    }

    @include element('link') {
      width: get-var(width, auto, $prefix: $item-prefix);
      height: get-var(height, auto, $prefix: $item-prefix);
      padding: get-var(padding, 0, $prefix: $item-prefix);
    }

    @include has('no-link') {
      padding: get-var(padding, 0, $prefix: $item-prefix);
    }
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
