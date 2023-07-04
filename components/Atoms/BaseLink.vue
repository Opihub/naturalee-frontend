<template>
  <NuxtLink>
    <Suspense>
      <slot name="svg">
        <NuxtIcon v-if="svg" :name="svg" />
      </slot>
    </Suspense>

    <slot>
      <span v-if="text">{{ text }}</span>
    </slot>

    <ArrowSVG v-if="arrow" />
  </NuxtLink>
</template>

<script setup>
import ArrowSVG from 'assets/svg/arrow.svg'

defineProps({
  svg: {
    type: String,
    default: null,
  },
  text: {
    type: String,
    default: null,
  },
  arrow: {
    type: Boolean,
    default: false,
  },
})
</script>
