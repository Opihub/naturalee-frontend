<template>
  <input
    :type="type"
    :name="name"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'text',
  },
  name: {
    type: String,
    default: null,
  },
  modelValue: {
    type: [String, Number, Boolean],
    required: true,
  },
})

defineEmits(['update:modelValue'])
</script>
