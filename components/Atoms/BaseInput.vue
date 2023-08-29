<template>
  <input
    :class="className"
    :type="type"
    :name="name"
    :value="modelValue"
    @input="input"
    @blur="check"
  />
</template>

<script setup>
const CSS_NAME = 'o-input'

const props = defineProps({
  type: {
    type: String,
    default: 'text',
    validator(value) {
      // Sono stati esclusi volontariamente alcuni type
      return [
        'date',
        'datetime-locale',
        'email',
        'hidden',
        'month',
        'number',
        'password',
        'search',
        'tel',
        'text',
        'time',
        'url',
        'week',
      ].includes(value)
    },
  },
  name: {
    type: String,
    default: null,
  },
  rounded: {
    type: Boolean,
    default: false,
  },
  borderless: {
    type: Boolean,
    default: false,
  },
  width: {
    type: String,
    default: 'auto',
    validator(value) {
      // The value must match one of these strings
      return ['auto', 'full', 'half', 'third'].includes(value)
    },
  },
  modelValue: {
    type: [String, Number, Boolean],
    required: true,
  },
})

const emit = defineEmits(['update:modelValue', 'valid', 'invalid'])

const isValid = ref(false)

const className = computed(() => {
  const className = [CSS_NAME]

  if (props.rounded) {
    className.push(`${CSS_NAME}--rounded`)
  }

  if (props.borderless) {
    className.push(`${CSS_NAME}--borderless`)
  }

  if (isValid.value === true) {
    className.push('is-valid')
  } else if (isValid.value === false) {
    className.push('is-invalid')
  }

  if (firstInteraction.value) {
    className.push('is-init')
  }

  switch (props.width) {
    case 'full':
      className.push(`${CSS_NAME}--100`)
      break
    case 'half':
      className.push(`${CSS_NAME}--50`)
      break
    case 'third':
      className.push(`${CSS_NAME}--33`)
      break

    default:
      break
  }

  return className
})

const firstInteraction = ref(false)

const input = (event) => {
  emit('update:modelValue', event.target.value)

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
$prefix: 'input';

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
    )
  );
}
@include object($prefix) {
  $svg-prefix: 'svg';

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

  border: get-var(border-width, $prefix: $prefix) solid
    get-var(border-color, $prefix: $prefix);

  border-radius: get-var(radius, $prefix: $prefix);
  font-size: get-var(font-size, rem(18px), $prefix: $prefix);
  line-height: get-var(line-height, rem(35px), $prefix: $prefix);
  font-weight: get-var(font-weight, get-var(weight-regular), $prefix: $prefix);
  padding: get-var(padding, rem(8px) rem(20px), $prefix: $prefix);
  background-color: get-var(background-color, $prefix: $prefix);
  color: get-var(text-color, $prefix: $prefix);
  width: get-var(width, auto, $prefix: $prefix);
  max-width: get-var(max-width, 100%, $prefix: $prefix);

  @include transition(border-color);

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

  @include modifier('rounded') {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        radius: 999em,
      )
    );
  }

  @include modifier('borderless') {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        border-width: 0,
      )
    );
  }

  @include modifier('33') {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        width: 100%,
        max-width: 33%,
      )
    );
  }

  @include modifier('50') {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        width: 100%,
        max-width: 50%,
      )
    );
  }

  @include modifier('100') {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        width: 100%,
        max-width: 100%,
      )
    );
  }
}
</style>
