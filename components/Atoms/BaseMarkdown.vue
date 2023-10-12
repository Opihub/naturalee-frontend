<template>
  <VueMarkdown
    :source="content"
    :options="{ ...DEFAULT_OPTIONS, ...options }"
  />
</template>

<script setup>
// Imports
import VueMarkdown from 'vue-markdown-render'

// Constants
const DEFAULT_OPTIONS = {}

// Define (Props, Emits, Page Meta)
defineProps({
  content: {
    type: String,
    required: true,
  },
  options: {
    type: Object,
    default() {
      return {}
    },
  },
})

// Component life-cycle hooks

// Composables

// Data

// Watcher

// Computed

// Methods
</script>
