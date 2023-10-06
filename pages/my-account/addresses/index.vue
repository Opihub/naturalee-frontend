<template>
  <section>
    <BaseParagraph class="u-mb-large">{{
      $t('addresses.heading')
    }}</BaseParagraph>
    <SiteContainer flex>
      <BaseBox v-for="(address, index) in response.data" :key="index">
        <template #head>
          <BaseHeading tag="h4">{{
            index == 'billing'
              ? $t('addresses.billing')
              : $t('addresses.shipping')
          }}</BaseHeading>
          <BaseLink
            color="green"
            underline
            :to="`/my-account/addresses/${index}`"
            >{{
              address.firstName == '' &&
              address.lastName == '' &&
              address.country == '' &&
              address.address == '' &&
              address.province == '' &&
              address.city == '' &&
              address.postcode == ''
                ? $t('create')
                : $t('edit')
            }}</BaseLink
          >
        </template>
        <ShopAddress
          v-if="
            address.firstName != '' &&
            address.lastName != '' &&
            address.country != '' &&
            address.address != '' &&
            address.province != '' &&
            address.city != '' &&
            address.postcode != ''
          "
          :address="address"
        />
        <BaseParagraph v-else>{{ $t('addresses.notSet') }}</BaseParagraph>
      </BaseBox>
    </SiteContainer>
  </section>
</template>

<script setup>
// Imports

// Constants

// Define (Props, Emits, Page Meta)
definePageMeta({
  name: 'addresses-list',
})
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
      justify-content: start,
    )
  );
  @include set-vars(
    $prefix: 'container',
    $map: (
      align-items: stretch,
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
