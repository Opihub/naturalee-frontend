<template>
  <BaseMessage :status="feedback.status">
    <span>{{ feedback.message }}</span>

    <ul v-if="feedback.errors && feedback.errors.length > 0">
      <li v-for="(error, index) in feedback.errors" :key="index">
        {{ error }}
      </li>
    </ul>
  </BaseMessage>
</template>

<script setup>
// Define (Props, Emits, Page Meta)
defineProps({
  feedback: {
    type: Object,
    required: true,
    validator(value) {
      return "status" in value && "message" in value && "errors" in value;
    },
  },
});

onMounted(() => {
  window.scrollTo(0, 0);
})
</script>
