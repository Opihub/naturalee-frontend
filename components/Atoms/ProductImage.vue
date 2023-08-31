<template>
  <svg viewBox="0 0 600 600">
    <g style="clip-path: url(#product-mask)">
      <image
        width="600"
        height="600"
        :href="src"
        :preserveAspectRatio="aspectRatio"
      />
    </g>
  </svg>
</template>

<script setup>
const props = defineProps({
  src: {
    type: String,
    default: '/logo.png',
  },
  size: {
    type: String,
    default: 'cover',
    validator(value) {
      return ['cover', 'contain'].includes(value)
    },
  },
})

// https://www.digitalocean.com/community/tutorials/svg-preserve-aspect-ratio
const aspectRatio = computed(() => {
  if (props.size === 'contain') {
    return 'xMidYMid meet'
  }

  return 'xMidYMid slice'
})
</script>
