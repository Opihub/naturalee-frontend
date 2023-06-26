<template>
  <div>
    <BaseLabel :for-input="name">
      <slot />
    </BaseLabel>
    <BaseInput v-model="value" :type="type" :name="name" v-bind="$attrs" />
  </div>
</template>

<script setup>
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

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})
</script>
