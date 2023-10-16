<template>
  <icomoon
    v-if="checkIcon"
    :icon-set="iconSet"
    v-bind="$props"
    :size="checkSize"
  />
  <NuxtIcon v-else :name="name" :style="checkSize" />
</template>

<script setup>
// Imports
import { Icomoon, iconList } from 'vue-icomoon'
import icon from '@/assets/icomoon/selection.json'
// Constants

// Define (Props, Emits, Page Meta)
const props = defineProps({
  iconSet: {
    type: Object,
    default: icon,
  },
  iconSize: {
    type: [String, Number, Object],
    default: '1em',
  },
  name: {
    type: String,
    default: null,
  },
})

// Component life-cycle hooks

// Data

// Watcher

// Computed

const checkIcon = computed(() => {
  if (iconList(props.iconSet).includes(props.name)) {
    return true
  }
  return false
})

const checkSize = computed(() => {
  if (checkIcon && typeof props.iconSize === 'object') {
    return Object.values(props.iconSize)[0]
  }

  return props.iconSize
})

// Methods
</script>

<style lang="scss">
$prefix: 'icomoon';
</style>
