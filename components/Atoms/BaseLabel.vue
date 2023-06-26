<template>
  <label :for="forInput">
    <slot />
  </label>
</template>

<script setup>
defineProps({
  forInput: {
    type: String,
    default: null
  }
})
</script>
