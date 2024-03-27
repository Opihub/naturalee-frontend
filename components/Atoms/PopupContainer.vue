<template>
  <div
    ref="popupElement"
    v-element-visibility="onElementVisibility"
    :class="className"
    :style="style"
  >
    <slot />
  </div>
</template>

<script setup>
// Imports
import { useElementBounding } from '@vueuse/core'
import { vElementVisibility } from '@vueuse/components'

// Constants
const CSS_NAME = 'o-popup'

// Define (Props, Emits, Page Meta)
const props = defineProps({
  maxWidth: {
    type: String,
    default: null,
    validator(value) {
      return !isNaN(parseFloat(value))
    },
  },
  color: {
    type: String,
    default: 'green',
    validator(value) {
      return ['green', 'white'].includes(value)
    },
  },
  xCentered: {
    type: Boolean,
    default: false,
  },
  yCentered: {
    type: Boolean,
    default: false,
  },
})

// Component life-cycle hooks
onMounted(() => {})

onUnmounted(() => {})

// Data & Composables
const { style: maxWidth } = useMaxWidth(props.maxWidth, 'popup')

const popupElement = ref(null)
const { top, right, bottom, left, width, height } =
  useElementBounding(popupElement)
const offset = reactive({
  x: 0,
  y: 0,
})

// Watcher

// Computed
const className = computed(() => {
  const className = [CSS_NAME]

  if (props.color !== 'green') {
    className.push(`${CSS_NAME}--${props.color}`)
  }

  if (props.xCentered) {
    className.push(`${CSS_NAME}--x-centered`)
  }

  if (props.yCentered) {
    className.push(`${CSS_NAME}--y-centered`)
  }

  return className
})

const style = computed(() => {
  let style = {}

  if (maxWidth.value) {
    style = { ...maxWidth.value }
  }

  if (offset.x) {
    style['--popup-offset-x'] = `${offset.x}px`
  }

  if (offset.y) {
    style['--popup-offset-y'] = `${offset.y}px`
  }

  return style
})

// Methods
const onElementVisibility = (state) => {
  if (!state) {
    offset.x = 0
    return
  }

  if (right.value > document.body.clientWidth) {
    const xDiff = document.body.clientWidth - right.value

    offset.x = xDiff
  } else if (left.value < 0) {
    offset.x = Math.abs(left.value)
  }

  // TODO: implementare offset Y
}
</script>

<style lang="scss">
$prefix: 'popup';
@include object($prefix) {
  @include set-vars(
    $prefix: $prefix,
    $map: (
      outer-arrow-size: 10px,
      inner-arrow-offset: 1px,
      inner-arrow-size:
        calc(
          get-var(outer-arrow-size, $prefix: $prefix) -
            get-var(inner-arrow-offset, $prefix: $prefix)
        ),
    )
  );

  width: get-var(max-width, 100%, $prefix: $prefix);
  max-width: get-var(max-width, get-var(container-width), $prefix: $prefix);
  margin: 0;
  padding: 0;
  border: 1px solid
    get-var(border-color, get-var(color-green), $prefix: $prefix);
  background-color: get-var(
    background-color,
    get-var(color-white),
    $prefix: $prefix
  );
  position: relative;
  transform: translateX(
      calc(
        get-var(default-x, 0px, $prefix: $prefix) +
          get-var(offset-x, 0px, $prefix: $prefix)
      )
    )
    translateY(
      calc(
        get-var(default-y, 0px, $prefix: $prefix) +
          get-var(offset-y, 0px, $prefix: $prefix)
      )
    );

  &::before,
  &::after {
    content: '';
    display: block;
    position: absolute;
    inset: auto auto 100% 50%;
    transform: translateX(
      calc(-50% - get-var(offset-x, 0px, $prefix: $prefix))
    );
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
  }

  &::after {
    border-width: 0 get-var(inner-arrow-size, $prefix: $prefix)
      get-var(inner-arrow-size, $prefix: $prefix);
    border-bottom-color: get-var(
      arrow-color,
      get-var(color-green),
      $prefix: $prefix
    );
  }

  &::before {
    border-width: 0 get-var(outer-arrow-size, $prefix: $prefix)
      get-var(outer-arrow-size, $prefix: $prefix);
    border-bottom-color: get-var(
      border-color,
      get-var(color-green),
      $prefix: $prefix
    );
  }

  @include modifier('white') {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        arrow-color: get-var(color-white),
      )
    );
  }

  @include modifier('x-centered') {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        default-x: -50%,
      )
    );
  }

  @include modifier('y-centered') {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        default-y: -50%,
      )
    );
  }
}
</style>
