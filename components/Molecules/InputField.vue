<template>
  <div :class="className">
    <BaseLabel
      v-if="slots.default"
      :class="`${CSS_NAME}__label`"
      :for-input="name"
    >
      <slot />
    </BaseLabel>
    <span
      v-if="error"
      :id="`${name}Error`"
      :class="`${CSS_NAME}__error`"
      role="alert"
      :aria-hidden="isValid !== false"
      :aria-invalid="isValid === false"
    >
      <span>{{ error }}</span>
    </span>
    <BaseInput
      v-model="value"
      :class="{ [`${CSS_NAME}__input`]: true, 'u-mt-micro': !!slots.default }"
      :type="type"
      :name="name"
      v-bind="attributes"
      @valid="hideError"
      @invalid="showError"
    />
  </div>
</template>

<script setup>
const CSS_NAME = 'c-input-field'

const props = defineProps({
  name: {
    type: String,
    default: null,
  },
  type: {
    type: String,
    default: 'text',
  },
  error: {
    type: String,
    default: null,
  },
  errorAfter: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: [String, Number, Boolean],
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const slots = useSlots()
const attrs = useAttrs()

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const attributes = computed(() => {
  return {
    ...attrs,
    class: attrs.inputClass || attrs['input-class'] || null,
  }
})

const className = computed(() => {
  let className = [CSS_NAME]

  if (props.type) {
    className.push(`${CSS_NAME}--${props.type}`)
  }

  if (props.error) {
    className.push('has-error-message')
  }

  if (isValid.value === false) {
    className.push('is-invalid')
  }

  if (props.errorAfter) {
    className.push('has-error-after')
  }

  if (!slots.default) {
    className.push('has-no-label')
  }

  if (attrs.class) {
    let classes = []

    if (Array.isArray(attrs.class)) {
      classes = attrs.class
    } else if (typeof attrs.class === 'string') {
      classes.push(attrs.class)
    } else if (typeof attrs.class === 'object') {
      for (const [className, condition] of Object.entries(attrs.class)) {
        if (condition) {
          classes.push(className)
        }
      }
    } else {
      console.warn(attrs.class)
    }

    className = [...className, ...classes]
  }

  return className
})

const isValid = ref(null)

const hideError = () => {
  isValid.value = true
}

const showError = () => {
  isValid.value = false
}
</script>

<style lang="scss">
$prefix: 'input-field';
@include component($prefix) {
  $prefix-label: '#{$prefix}-label';
  $prefix-input: '#{$prefix}-input';
  $prefix-error: '#{$prefix}-error';

  display: flex;
  flex-direction: column;

  @include element('label') {
    margin: get-var(margin, 0, $prefix: $prefix-label);
    padding: get-var(padding, 0, $prefix: $prefix-label);
  }

  @include element('error') {
    font-size: 0.72em;
    line-height: 1.23;
    text-transform: uppercase;
    color: get-var(color-red);
    opacity: 0;
    visibility: hidden;
    // margin: get-var(margin, 0, $prefix: $prefix-error);
    // padding: get-var(padding, 0, $prefix: $prefix-error);
    position: relative;
    white-space: get-var(white-space, normal, $prefix-error);

    @include transition(opacity, visibility);

    &[aria-hidden='false'] {
      opacity: 1;
      visibility: visible;
    }

    & > span {
      margin: get-var(margin, 0, $prefix: $prefix-error);
      padding: get-var(padding, 0, $prefix: $prefix-error);
    }
  }

  @include has('no-label') {
    @include element('input') {
      height: 100%;
    }
  }

  @include has('error-message') {
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: auto 1fr;
    column-gap: rem(10px);
    align-items: end;

    @include element('label') {
      grid-column: 1 / 2;
      grid-row: 1 / 2;
    }

    @include element('error') {
      grid-column: 2 / 3;
      grid-row: 1 / 2;
      // justify-self: end;
      justify-self: stretch;

      & > span {
        inset: auto 0 0;
        position: absolute;
      }
    }

    @include element('input') {
      grid-column: 1 / 3;
      grid-row: 2 / 3;
    }

    @include has('error-after') {
      grid-template-columns: 100%;
      grid-template-rows: auto 1fr auto;

      @include element('label') {
        grid-column: 1 / 2;
        grid-row: 1 / 2;
      }

      @include element('error') {
        grid-column: 1 / 2;
        grid-row: 3 / 4;

        & > span {
          inset: 0 0 auto;
        }
      }

      @include element('input') {
        grid-column: 1 / 2;
        grid-row: 2 / 3;
      }
    }
  }
}
</style>
