<template>
  <input
    :class="className"
    :type="type"
    :name="name"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup>
defineEmits(['update:modelValue'])

const props = defineProps({
  type: {
    type: String,
    default: 'text',
    validator(value) {
      // Sono stati esclusi volontariamente alcuni type
      return [
        'date',
        'datetime-locale',
        'mail',
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

const CSS_NAME = 'o-input'

const className = computed(() => {
  const className = [CSS_NAME]

  if (props.rounded) {
    className.push(`${CSS_NAME}--rounded`)
  }

  if (props.borderless) {
    className.push(`${CSS_NAME}--borderless`)
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
</script>

<style lang="scss">
@include object(input) {
  $prefix: input;
  $svg-prefix: svg;

  @include set-vars(
    $prefix: $prefix,
    $map: (
      // padding: rem(14px) rem(20px),
      // font-size: rem(20px),
      background-color: get-var(color-white),
      text-color: get-var(color-dark),
      border-width: 1px,
      border-color: get-var(color-dark),
      width: auto,
      max-width: 100%,
      font-weight: get-var(weight-regular),
      radius: rem(10px),

      padding: rem(8px) rem(20px),
      font-size: rem(18px),
      line-height: rem(35px),
    )
  );

  border: #{get-var(border-width, $prefix: $prefix)} solid #{get-var(
      border-color
    )};

  border-radius: #{get-var(radius, $prefix: $prefix)};
  font-size: #{get-var(font-size, $prefix: $prefix)};
  line-height: #{get-var(line-height, $prefix: $prefix)};
  font-weight: #{get-var(font-weight, $prefix: $prefix)};
  padding: #{get-var(padding, $prefix: $prefix)};
  background-color: #{get-var(background-color, $prefix: $prefix)};
  color: #{get-var(text-color, $prefix: $prefix)};
  width: #{get-var(width, $prefix: $prefix)};
  max-width: #{get-var(max-width, $prefix: $prefix)};

  &::placeholder {
    opacity: 0.4;
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
