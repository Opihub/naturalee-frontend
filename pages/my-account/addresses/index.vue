<template>
  <section class="s-addresses">
    <BaseParagraph class="u-mb-large" :text="$t('addresses.heading')" />

    <div class="o-row">
      <BaseBox
        v-for="(address, type) in response.data"
        :key="type"
        class="o-row__column"
      >
        <template #head>
          <BaseHeading tag="h4" :text="$t(`addresses.${type}`)" />

          <BaseLink
            color="green"
            underline
            :to="{ name: 'address-details', params: { address: type } }"
            :text="$t(isAddressFilled(address) ? 'edit' : 'create')"
          />
        </template>

        <template v-if="isAddressFilled(address)">
          <ShopAddress :address="address" />
          <BaseMessage
            v-if="!isAddressComplete(address)"
            status="warning"
            class="u-mt-tiny"
            :message="$t('addresses.incomplete')"
          />
        </template>
        <BaseParagraph v-else :text="$t('addresses.notSet')" />
      </BaseBox>
    </div>
  </section>
</template>

<script setup>
// Imports

// Constants

// Define (Props, Emits, Page Meta)
definePageMeta({
  name: 'addresses-list',
  key: 'addresses-list',
})

defineI18nRoute({
  paths: {
    it: '/il-mio-account/indirizzi',
  },
  locales: ['it'],
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
@include scope('addresses') {
  @include typography(18px, 28px);

  @include set-vars(
    $prefix: 'row',
    $map: (
      gap: rem(30px),
      columns: 1,
    )
  );

  @include from(desktop) {
    @include set-vars(
      $prefix: 'row',
      $map: (
        columns: 2,
      )
    );
  }

  @include set-vars(
    $prefix: 'box',
    $map: (
      head-display: flex,
      head-justify: space-between,
      head-align: center,
    )
  );

  @include set-vars(
    $prefix: 'paragraph',
    $map: (
      font-family: get-var(family-main),
    )
  );

  @include object('heading') {
    @include customMedia(376px, true) {
      width: 50%;
    }
    @include from(desktop) {
      width: 50%;
    }
    margin-right: rem(35px);

    @include set-vars(
      $prefix: 'heading',
      $map: (
        text-color: color-black,
        text-transform: none,
      )
    );
  }
}
</style>
