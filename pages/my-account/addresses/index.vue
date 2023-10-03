<template>
  <BaseParagraph class="u-mb-large"
    >I seguenti indirizzi saranno usati come predefiniti nella pagina di
    riepilogo dell'ordine.</BaseParagraph
  >
  <SiteContainer flex>
    <BaseBox
      v-for="(address, index) in response.data"
      :key="index"
      :link="`addresses/${index}`"
    >
      <template #head>
        <BaseHeading tag="h4">{{
          index == 'billing'
            ? 'Indirizzo di Fatturazione'
            : 'Indirizzo di Spedizione'
        }}</BaseHeading>
      </template>
      <ShopAddress :address="address" />
    </BaseBox>
  </SiteContainer>
</template>

<script setup>
// Imports

// Constants

// Define (Props, Emits, Page Meta)

// Component life-cycle hooks

// Composables

// Data
const response = await useApi(
  `shop/addresses`,
  {
    method: 'GET',
  },
  {
    cache: false,
  }
)

// Watcher

// Computed

// Methods
</script>

<style lang="scss" scoped>
@include object('container') {
  @include set-vars(
    $prefix: 'container',
    $map: (
      gap: rem(30px),
    )
  );
  @include set-vars(
    $prefix: 'container',
    $map: (
      justify-content start,
    )
  );
  @include set-vars(
    $prefix: 'box',
    $map: (
      head-display: flex,
    )
  );
  @include set-vars(
    $prefix: 'box',
    $map: (
      head-justify: space-between,
    )
  );
  @include set-vars(
    $prefix: 'box',
    $map: (
      head-align: center,
    )
  );
}
@include object('heading') {
  width: 50%;
  margin-right: rem(35px);
  @include set-vars(
    $prefix: 'heading',
    $map: (
      text-color: color-black,
    )
  );
  @include set-vars(
    $prefix: 'heading',
    $map: (
      text-transform: none,
    )
  );
}
</style>
