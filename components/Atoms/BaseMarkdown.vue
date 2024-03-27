<template>
  <VueMarkdown
    :class="CSS_NAME"
    :source="content"
    :options="{ ...DEFAULT_OPTIONS, ...options }"
  />
</template>

<script setup>
// Imports
import VueMarkdown from 'vue-markdown-render'

// Constants
const CSS_NAME = 'c-content'
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

<style lang="scss">
$prefix: 'content';
@include component($prefix) {
  font-family: get-var(font-family, inherit, $prefix: $prefix);
  font-size: get-var(font-size, inherit, $prefix: $prefix);
  line-height: get-var(line-height, inherit, $prefix: $prefix);

  & > p {
    white-space: pre-line;
  }
}
</style>
