<template>
  <BaseOverlay :class="CSS_NAME">
    <Vue3Lottie
      :class="`${CSS_NAME}__spinner`"
      :animation-data="SpinnerLottie"
      loop
      :width="500"
      :height="500"
      no-margin
    />
  </BaseOverlay>
</template>

<script setup>
// Imports
import SpinnerLottie from 'assets/lotties/spinner.json'

// Constants
const CSS_NAME = 'c-loader'

// Define (Props, Emits, Page Meta)

// Component life-cycle hooks

// Composables

// Data

// Watcher

// Computed

// Methods
</script>
