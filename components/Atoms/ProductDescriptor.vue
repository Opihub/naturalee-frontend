<template>
  <div :class="className">
    <div
      v-if="costDescriptor"
      :class="`${className}__weight`"
      class="u-mr-medium"
    >
      <BaseIcon name="peso" />
      {{ costDescriptor }}
    </div>
    <div v-if="selling" :class="`${className}__selling`">
      <BaseIcon :name="value" />
      {{ selling }}
    </div>
  </div>
</template>

<script setup>
// Imports

// Constants
const CSS_NAME = 'o-cost-descriptor'

// Define (Props, Emits, Page Meta)
const props = defineProps({
  costDescriptor: {
    type: String,
    default: null,
  },
  selling: {
    type: String,
    default: null,
  },
})

// Component life-cycle hooks

// Data

// Watcher

// Computed
const className = computed(() => {
  const className = [CSS_NAME]

  return className
})

const value = computed(() => {
  let selling = null
  selling = props.selling.toLowerCase().replace(' ', '-').trim()
  //cassetta
  switch (selling) {
    case 'busta-biodegradabile':
      selling = 'busta-bio'
      break
    case 'vaschetta-tonda':
      selling = 'vaschetta-rotonda'
      break
    case 'ciotola-monoporzione':
      selling = 'ciotola'
      break
  }
  return selling
})

// Methods
</script>

<style lang="scss">
$prefix: 'cost-descriptor';
@include object($prefix) {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  @include from('tablet') {
    justify-content: flex-start;
    align-items: center;
  }
  @include element('weight') {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: rem(2px);
  }
  @include element('selling') {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: rem(2px);
  }
}
</style>
