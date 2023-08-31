<template>
  <component :is="component" v-if="isResponsive" v-bind="props">
    <slot name="before" />
    <slot />
    <slot name="after" />
  </component>
  <slot v-else />
</template>

<script setup>
/**
 * Il componente permette di wrappare attorno a del contenuto un qualsiasi
 * componente, il quale verrà caricato solo dopo una determinata risoluzione
 */

// Imports
import { useMediaQuery } from '@vueuse/core'

// Props & Emits
const props = defineProps({
  is: {
    type: [String, Object],
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  desktopFirst: {
    type: Boolean,
    default: false,
  },
  props: {
    type: Object,
    default() {
      return {}
    },
  },
})

// Data
const isResponsive = useMediaQuery(
  `(${props.desktopFirst ? 'max' : 'min'}-width: ${
    props.size - (props.desktopFirst ? 0.02 : 0)
  }px)`
)

const component = computed(() => {
  if (typeof props.is === 'object') {
    return props.is
  }

  const is = ['div', 'section', 'span'].includes(props.is)
    ? props.is
    : resolveComponent(props.is)

  console.debug(is)

  return is
})
</script>
