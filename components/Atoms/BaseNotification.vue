<template>
  <div :id="id" :class="className">
    <slot>{{ message }}</slot>
    <CrossButton :class="`${CSS_NAME}__close`" @click="removeNotification(id)" />
  </div>
</template>

<script setup>
// Imports
import { useNotificationsStore } from '@/stores/notifications'

// Constants
const CSS_NAME = 'o-notification'

// Define (Props, Emits, Page Meta)
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    default: null,
    validator(value) {
      return [null, 'success', 'danger', 'warning', 'info'].includes(value)
    },
  },
  horizontal: {
    type: [String, Object],
    default() {
      return { 0: 'center', desktop: 'right' }
    },
    validator(value) {
      if (typeof value !== 'object') {
        value = { 0: value }
      }

      return Object.values(value).every((item) =>
        ['left', 'center', 'middle', 'right'].includes(item)
      )
    },
  },
  vertical: {
    type: [String, Object],
    default: 'top',
    validator(value) {
      if (typeof value !== 'object') {
        value = { 0: value }
      }

      return Object.values(value).every((item) =>
        ['top', 'center', 'middle', 'bottom'].includes(item)
      )
    },
  },
})

// Component life-cycle hooks

// Composables
const store = useNotificationsStore()

// Data

// Watcher

// Computed
const className = computed(() => {
  const className = [CSS_NAME]

  let { horizontal, vertical } = props
  if (horizontal) {
    if (typeof horizontal !== 'object') {
      horizontal = { 0: horizontal }
    }

    Object.entries(horizontal).forEach(([breakpoint, position]) => {
      if (position === 'middle') {
        position = 'center'
      }

      if (breakpoint === 0) {
        className.push(`is-x-${position}`)
        return
      }

      className.push(`is-x-${position}@${breakpoint}`)
    })
  }

  if (vertical) {
    if (typeof vertical !== 'object') {
      vertical = { 0: vertical }
    }

    Object.entries(vertical).forEach(([breakpoint, position]) => {
      if (position === 'middle') {
        position = 'center'
      }

      if (breakpoint === 0) {
        className.push(`is-y-${position}`)
        return
      }

      className.push(`is-y-${position}@${breakpoint}`)
    })
  }

  if (props.status) {
    className.push(`is-${props.status}`)
  }

  return className
})

// Methods
const { removeNotification } = store
</script>

<style lang="scss">
$prefix: 'notification';
@include object($prefix) {
  @include set-vars(
    $prefix: $prefix,
    $map: (
      top: 0,
      left: auto,
      right: 0,
      bottom: auto,
      x-translate: 0,
      y-translate: 0,
    )
  );

  @include set-local-vars(
    $prefix: 'cross',
    $map: (
      color: get-var(text-color, get-var(color-black), $prefix: $prefix),
    )
  );

  position: get-var(position, fixed, $prefix: $prefix);
  z-index: get-var(z-#{$prefix});
  inset: get-var(top, $prefix: $prefix) get-var(right, $prefix: $prefix)
    get-var(bottom, $prefix: $prefix) get-var(left, $prefix: $prefix);
  transform: translate(
    get-var(x-translate, $prefix: $prefix),
    get-var(y-translate, $prefix: $prefix)
  );
  border-radius: rem(5px);
  margin: rem(15px);
  padding: rem(15px) rem(50px) rem(15px) rem(20px);
  color: get-var(text-color, get-var(color-black), $prefix: $prefix);
  background-color: get-var(
    background-color,
    get-var(color-white),
    $prefix: $prefix
  );
  font-weight: get-var(weight-regular);
  @include typography(16px, 22px);

  @include element('close') {
    position: absolute;
    right: rem(15px);
    top: 50%;
    transform: translateY(-50%);
  }

  @include is('success') {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        background-color: get-var(color-green),
        text-color: get-var(color-white),
      )
    );
  }

  @include is('danger') {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        background-color: get-var(color-red),
        text-color: get-var(color-white),
      )
    );
  }

  @include is('warning') {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        background-color: get-var(color-yellow),
        text-color: get-var(color-black),
      )
    );
  }

  @include is('info') {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        background-color: get-var(color-brown),
        text-color: get-var(color-white),
      )
    );
  }

  @include is('y-top') {
    @include set-vars(
      $prefix: $prefix,
      $map: (
        top: 0,
        bottom: auto,
      )
    );
  }

  @include is('y-center') {
    @include set-vars(
      $prefix: $prefix,
      $map: (
        top: 50%,
        bottom: auto,
        y-translate: -50%,
      )
    );
  }

  @include is('y-bottom') {
    @include set-vars(
      $prefix: $prefix,
      $map: (
        top: auto,
        bottom: 0,
      )
    );
  }

  @include is('x-left') {
    @include set-vars(
      $prefix: $prefix,
      $map: (
        left: 0,
        right: auto,
      )
    );
  }

  @include is('x-center') {
    @include set-vars(
      $prefix: $prefix,
      $map: (
        left: 50%,
        right: auto,
        x-translate: -50%,
      )
    );
  }

  @include is('x-right') {
    @include set-vars(
      $prefix: $prefix,
      $map: (
        left: auto,
        right: 0,
      )
    );
  }
}
</style>
