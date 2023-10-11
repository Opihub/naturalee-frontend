<template>
  <icomoon :icon-set="iconSet" v-bind="$props" :size="iconSize" />
</template>

<script setup>
// Imports
import { Icomoon } from 'vue-icomoon'
import icon from '@/assets/icomoon/selection.json'
// Constants

// Define (Props, Emits, Page Meta)
const props = defineProps({
  iconSet: {
    type: Object,
    default: icon,
  },
  iconSize: {
    type: [Number, String],
    default: '1em',
  },
})

// Component life-cycle hooks

// Data

// Watcher

// Computed

// Methods
</script>

<style lang="scss">
$prefix: 'icomoon';
</style>
