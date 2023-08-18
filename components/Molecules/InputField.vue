<template>
  <div :class="className">
    <BaseLabel v-if="slots.default" :for-input="name">
      <slot />
    </BaseLabel>
    <BaseInput v-model="value" :type="type" :name="name" v-bind="attributes" />
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
</script>

<style lang="scss">
$prefix: 'input-field';
@include component($prefix) {
  @include has('no-label') {
    input {
      height: 100%;
    }
  }
}
</style>
