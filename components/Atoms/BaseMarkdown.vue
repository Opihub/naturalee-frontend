<template>
  <VueMarkdown :source="content" />
</template>

<script setup>
// Imports
import VueMarkdown from 'vue-markdown-render'

// Constants

// Define (Props, Emits, Page Meta)
defineProps({
  content: {
    type: String,
    required: true,
  },
})

// Component life-cycle hooks

// Composables

// Data

// Watcher

// Computed

// Methods
</script>
