<template>
  <span :class="className">
    <input
      :class="`${CSS_NAME}__input`"
      type="checkbox"
      :name="name"
      :value="value"
      :checked="modelValue"
      v-bind="attributes"
      @change="input"
    />

    <Suspense>
      <Tick :class="`${CSS_NAME}__display`" />
    </Suspense>
  </span>
</template>

<script setup>
// Imports
import Tick from 'assets/svg/tick.svg'

// Constants
const CSS_NAME = 'o-checkbox'

// Props & Emits
defineProps({
  name: {
    type: String,
    default: null,
  },
  value: {
    type: [String, Number, Boolean],
    default: null,
  },
  modelValue: {
    type: Boolean,
    default: null,
  },
})

const emit = defineEmits(['update:modelValue', 'valid', 'invalid'])

// Component life-cycle hooks

// Data
const isValid = ref(false)

const firstInteraction = ref(false)

const attrs = useAttrs()

// Watcher

// Computed
const className = computed(() => {
  let className = [CSS_NAME]

  if (isValid.value === true) {
    className.push('is-valid')
  } else if (isValid.value === false) {
    className.push('is-invalid')
  }

  if (firstInteraction.value) {
    className.push('is-init')
  }

  if (attrs?.class) {
    className = [...className, ...assembleClassName(attrs.class)]
  }

  return className
})

const attributes = computed(() => {
  const attributes = Object.assign({}, attrs)

  delete attributes.class

  return attributes
})

// Methods
const input = (event) => {
  emit('update:modelValue', event.target.checked)

  check(event)
}

const check = (event) => {
  firstInteraction.value = true

  let eventName = 'invalid'
  if (event.target.checkValidity()) {
    eventName = 'valid'
    isValid.value = true
  } else {
    isValid.value = false
  }

  emit(eventName, event.target.value)
}
</script>

<style lang="scss">
$prefix: 'checkbox';

%input-invalid {
  @include set-local-vars(
    $prefix: $prefix,
    $map: (
      border-color: get-var(color-red),
    )
  );
}

@include object($prefix) {
  $prefix-svg: 'svg';

  @include set-vars(
    $prefix: $prefix,
    $map: (
      border-width: rem(2px),
    )
  );

  cursor: pointer;
  padding: 0;
  display: inline-block;
  user-select: none;
  pointer-events: none;
  position: relative;
  border: get-var(border-width, $prefix: $prefix) solid
    get-var(border-color, get-var(color-yellow), $prefix: $prefix);
  border-radius: rem(5px);
  background-color: get-var(color-white);
  width: get-var(size, rem(20px), $prefix: $prefix);
  height: get-var(size, rem(20px), $prefix: $prefix);

  @include element('input') {
    opacity: 0;
    appearance: none;
    padding: 0;
    pointer-events: all;
    cursor: inherit;
    position: absolute;
    inset: 50% auto auto 50%;
    width: get-var(size, rem(20px), $prefix: $prefix);
    height: get-var(size, rem(20px), $prefix: $prefix);
    transform: translate(-50%, -50%);

    &:checked + #{compose-element(root(&), 'display')} {
      @include set-local-vars(
        $prefix: $prefix,
        $map: (
          on: 1,
        )
      );
    }
  }

  &:focus-within {
    @extend %base-focus;
  }

  @include element('display') {
    display: block;
    position: absolute;
    width: get-var(width, rem(15.14px), $prefix: $prefix-svg);
    height: get-var(height, rem(11.59px), $prefix: $prefix-svg);
    top: rem(1px);
    left: rem(2px);
    opacity: get-var(on, 0, $prefix: $prefix);

    @include transition(opacity);
  }

  @include is('init') {
    @include is('invalid') {
      @extend %input-invalid;
    }

    &:invalid {
      @extend %input-invalid;
    }
  }
}
</style>
