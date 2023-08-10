<template>
  <div class="o-container">
    <slot />
  </div>
</template>

<style lang="scss">
@include object("container") {
  width: 100%;
  margin: 0 auto;
  max-width: #{get-var(container-width)};
}
</style>
