<template>
  <div :class="className">
    <slot name="before" />

    <button
      :class="[`${CSS_NAME}__button`, `${CSS_NAME}__button--minus`]"
      type="button"
      @click="decrease"
    >
      <span>-</span>
    </button>
    <input
      :class="`${CSS_NAME}__input`"
      type="number"
      :name="name"
      :value="modelValue"
      :min="min"
      :step="step"
      :max="max"
      :size="size"
      @input="input"
      @blur="check"
    />
    <button
      :class="[`${CSS_NAME}__button`, `${CSS_NAME}__button--plus`]"
      type="button"
      @click="increase"
    >
      <span>+</span>
    </button>

    <slot name="after" />
  </div>
</template>

<script setup>
// Imports

// Constants
const CSS_NAME = 'o-counter'

// Define (Props, Emits, Page Meta)
const props = defineProps({
  name: {
    type: String,
    default: null,
  },
  min: {
    type: Number,
    default: 0,
  },
  step: {
    type: Number,
    default: 1,
  },
  max: {
    type: Number,
    default: null,
  },
  modelValue: {
    type: Number,
    default: null,
  },
})

const emit = defineEmits(['update:modelValue', 'valid', 'invalid'])

// Component life-cycle hooks

// Data
const isValid = ref(false)
const firstInteraction = ref(false)

// Watcher

// Computed
const className = computed(() => {
  const className = [CSS_NAME]

  if (isValid.value === true) {
    className.push('is-valid')
  } else if (isValid.value === false) {
    className.push('is-invalid')
  }

  if (firstInteraction.value) {
    className.push('is-init')
  }

  return className
})

const size = computed(() => {
  return Math.max(2, props.modelValue.toString().length - 1)
})

// Methods
const input = (event) => {
  const { value } = event.target

  emit('update:modelValue', isNaN(value) || value === '' ? props.min : value)

  check(event)
}

const calculate = (negative = false) => {
  let value = parseFloat(props.modelValue) + props.step * (negative ? -1 : 1)

  if (props.min !== null && value < props.min) {
    value = props.min
  } else if (props.max !== null && value > props.max) {
    value = props.max
  }

  return value
}

const decrease = (event) => {
  emit('update:modelValue', calculate(true))

  check(event)
}

const increase = (event) => {
  emit('update:modelValue', calculate(false))

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
$prefix: 'counter';

%input-valid {
  @include set-local-vars(
    $prefix: $prefix,
    $map: (
      border-color: get-var(color-green),
    )
  );
}

%input-invalid {
  @include set-local-vars(
    $prefix: $prefix,
    $map: (
      border-color: get-var(color-red),
      text-color: get-var(color-red),
    )
  );
}

@include object($prefix) {
  @include set-vars(
    $prefix: $prefix,
    $map: (
      background-color: get-var(color-white),
      text-color: get-var(color-dark),
      border-width: 1px,
      border-color: get-var(color-dark),
      radius: rem(10px),
    )
  );

  display: inline-flex;
  background-color: transparent;
  align-items: center;
  justify-content: center;
  margin: get-var(margin, 0, $prefix: $prefix);
  color: get-var(text-color, $prefix: $prefix);
  width: get-var(width, auto, $prefix: $prefix);
  max-width: get-var(max-width, 100%, $prefix: $prefix);
  text-align: center;

  @include element('button') {
    width: rem(30px);
    height: rem(30px);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin: 0;
    appearance: none;
    background-color: get-var(color-white);
    border: 1px solid get-var(border-color, $prefix: $prefix);
    border-radius: 100%;
    padding: 0;
    position: relative;
    cursor: pointer;
    @include transition(border-color);

    span {
      font-size: 0;
    }

    &::before,
    &::after {
      content: '';
      display: block;
      width: rem(12px);
      height: rem(2px);
      position: absolute;
      top: 50%;
      left: 50%;
      background-color: get-var(border-color, $prefix: $prefix);
      transform: translate(-50%, -50%)
        rotate(calc(90deg * #{get-var(rotate, 0, $prefix, $prefix)}));
      @include transition(background-color);
    }

    &::after {
      @include set-local-vars(
        $prefix: $prefix,
        $map: (
          rotate: 1,
        )
      );
    }

    &:hover {
      @include set-local-vars(
        $prefix: $prefix,
        $map: (
          border-color: get-var(color-yellow),
        )
      );
    }

    @include modifier('minus') {
      &::after {
        content: none;
        display: none;
      }
    }
  }

  @include element('input') {
    appearance: textfield;
    border: 0;
    text-align: center;
    padding: 0;
    margin: 0;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  &:focus {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        border-color: get-var(color-yellow),
      )
    );
    outline: none;
  }

  &::placeholder {
    opacity: 0.4;
  }

  @include is('init') {
    @include is('valid') {
      @extend %input-valid;
    }

    &:valid {
      @extend %input-valid;
    }

    @include is('invalid') {
      @extend %input-invalid;
    }

    &:invalid {
      @extend %input-invalid;
    }
  }
}
</style>
