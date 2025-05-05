<template>
  <div :class="className">
    <BaseLabel :class="`${CSS_NAME}__label`">
      <component
        :is="radio ? BaseRadio : BaseCheckbox"
        v-model="updatedValue"
        :value="value"
        :class="`${CSS_NAME}__input`"
        :name="name"
        v-bind="attributes"
        @valid="hideError"
        @invalid="showError"
      />
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
  </div>
</template>

<script setup>
// Constants
const CSS_NAME = 'c-toggle-field'

// Define (Props, Emits, Page Meta)
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
  errorBefore: {
    type: Boolean,
    default: false,
  },
  value: {
    type: [String, Number, Boolean],
    default: null,
  },
  modelValue: {
    type: [String, Number, Boolean],
    required: true,
  },
  radio: {
    type: Boolean,
    required: false,
  },
  inline: {
    type: Boolean,
    required: false,
  },
  boxed: {
    type: Boolean,
    required: false,
  },
})

defineOptions({
  inheritAttrs: false,
})

const emit = defineEmits(['update:modelValue'])

// Component life-cycle hooks

// Composables
const attrs = useAttrs()

// Data
const isValid = ref(null)

// Watcher

// Computed
const updatedValue = computed({
  get() {
    return props.modelValue
  },
  set(newValue) {
    emit('update:modelValue', newValue)
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

  if (props.error) {
    className.push('has-error-message')
  }

  if (isValid.value === false) {
    className.push('is-invalid')
  }

  if (props.errorBefore) {
    className.push('has-error-before')
  }

  if (props.modelValue === props.value) {
    className.push('is-active')
  }

  if (props.inline) {
    className.push(`${CSS_NAME}--inline`)
  }

  if (props.boxed) {
    className.push(`${CSS_NAME}--boxed`)
  }

  if (attrs.class) {
    className = [...className, ...assembleClassName(attrs.class)]
  }

  return className
})

// Methods
const hideError = () => {
  isValid.value = true
}

const showError = () => {
  isValid.value = false
}
</script>

<style lang="scss">
$prefix: 'toggle-field';
@include component($prefix) {
  $prefix-label: '#{$prefix}-label';
  $prefix-input: '#{$prefix}-input';
  $prefix-error: '#{$prefix}-error';

  display: flex;
  flex-direction: column;
  width: 100%;

  @include element('label') {
    order: 1;
    position: relative;
    margin: get-var(margin, 0, $prefix: $prefix-label);
    padding: get-var(
        padding-y,
        get-var(padding, 0, $prefix: $prefix-label),
        $prefix: $prefix-label
      )
      get-var(
        padding-x,
        get-var(padding, 0, $prefix: $prefix-label),
        $prefix: $prefix-label
      )
      get-var(
        padding-y,
        get-var(padding, 0, $prefix: $prefix-label),
        $prefix: $prefix-label
      )
      calc(
        get-var(
            padding-x,
            get-var(padding, 0px, $prefix: $prefix-label),
            $prefix: $prefix-label
          ) + get-var(gap, rem(30px), $prefix: $prefix-label)
      );
    cursor: pointer;
  }

  @include element('input') {
    position: absolute;
    top: get-var(offset-top, 0, $prefix: $prefix);
    left: get-var(offset-left, 0, $prefix: $prefix);
  }

  @include element('error') {
    order: 2;
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

  @include has('error-message') {
    @include element('error') {
      & > span {
        inset: auto 0 0;
        position: absolute;
      }
    }

    @include has('error-before') {
      @include element('label') {
        order: 1;
      }

      @include element('error') {
        order: 2;
        & > span {
          inset: 0 0 auto;
        }
      }
    }
  }

  @include modifier('inline') {
    width: auto;
  }

  @include modifier('boxed') {
    background-color: get-var(
      background-color,
      get-var(color-white),
      $prefix: $prefix
    );
    border-radius: rem(10px);
    overflow: hidden;

    @include transition(background-color);

    @include is('active') {
      @include set-local-vars(
        $prefix: $prefix,
        $map: (
          background-color: get-var(color-yellow),
        )
      );
    }

    @include element('input') {
      @include set-local-vars(
        $prefix: $prefix,
        $map: (
          offset-top: 50%,
          offset-left:
            get-var(
              padding-x,
              get-var(padding, 0, $prefix: $prefix-label),
              $prefix: $prefix-label
            ),
        )
      );

      transform: translateY(-50%);
    }

    @include element('label') {
      border-radius: rem(10px);
      border: 1px solid get-var(color-black);

      @include set-local-vars(
        $prefix: $prefix-label,
        $map: (
          padding: rem(20px),
        )
      );
    }
  }
}
</style>
