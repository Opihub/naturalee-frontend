<template>
  <svg
    width="0"
    height="0"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    :viewBox="`0 0 ${WIDTH} ${HEIGHT}`"
    preserveAspectRatio='xMinYMin'
  >
    <clipPath id="product-mask">
      <path
        d="m600,300c0,165.69-134.31,300-300,300-69.88,0-142.87-15.19-193.86-55.25C36.22,489.83,0,395.81,0,300-.05,134.37,134.17.05,299.81,0c.06,0,.13,0,.19,0C376.4,0,452.17,13.04,499.1,75.59c49.68,66.21,100.9,135.13,100.9,224.41Z"
        style="fill: none; stroke-width: 0px"
      />
    </clipPath>
  </svg>
</template>

<script setup>
const WIDTH = 600
const HEIGHT = 600
</script>
