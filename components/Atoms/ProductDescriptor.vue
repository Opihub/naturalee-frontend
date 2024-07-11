<template>
  <div :class="CSS_NAME">
    <BaseIcon :name="iconName" :icon-size="iconSize" />
    {{ value }}
  </div>
</template>

<script setup>
// Imports
import slugify from 'slugify'

// Constants
const CSS_NAME = 'o-cost-descriptor'

// Define (Props, Emits, Page Meta)
const props = defineProps({
  icon: {
    type: String,
    default: null,
  },
  value: {
    type: String,
    default: null,
  },
  iconSize: {
    type: [String, Number, Object],
    default: '1em',
  },
})

// Component life-cycle hooks

// Data

// Watcher

// Computed
const iconName = computed(() => {
  if (!props.icon && !props.value) {
    return 'sfuso'
  }

  let iconName = slugify(props.icon || props.value, {
    lower: true,
  })

  switch (iconName) {
    case 'busta-biodegradabile':
      iconName = 'busta-bio'
      break
    case 'vaschetta-tonda':
      iconName = 'vaschetta-rotonda'
      break
    case 'ciotola-monoporzione':
      iconName = 'ciotola'
      break
  }

  return iconName
})

// Methods
</script>

<style lang="scss">
$prefix: 'cost-descriptor';
@include object($prefix) {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: rem(2px);
}
</style>
