<template>
  <div class="o-container" :style="style">
    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  maxWidth: {
    type: Number,
    default: null
  }
})

const { style } = useMaxWidth(props.maxWidth, 'container')
</script>

<style lang="scss">
$prefix: "container";
@include object($prefix) {
  width: 100%;
  margin: 0 auto;
  padding: 0 get-var(padding, get-var(container-padding), $prefix: $prefix);
  max-width: get-var(max-width, get-var(container-size), $prefix: $prefix);
}
</style>
