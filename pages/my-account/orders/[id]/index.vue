<template>
  <section class="s-order-details">
    <template v-if="order === null">
      <BaseHeading tag="h1" use="h3" class="u-mb-large" color="black"
        >Stiamo cercando il tuo ordine&hellip;</BaseHeading
      ></template
    >
    <template v-else-if="order.success">
      <BaseParagraph class="u-mb-tiny">{{
        $t('orders.createdAt', {
          id: orderId(order.data.id),
          date: getFormattedDate(order.data.date),
          status: $t(`orders.status.${order.data.status}`),
        })
      }}</BaseParagraph>
      <BaseHeading tag="h1" use="h3" color="black">{{
        $t('orders.details')
      }}</BaseHeading>

      <OrderDetails class="u-mb-huge u-mt-medium" :order="order.data" />

      <div class="o-row">
        <div class="o-row__column">
          <BaseHeading tag="h5" class="u-mb-small">{{
            $t('addresses.shipping')
          }}</BaseHeading>
          <ShopAddress :address="order.data.addresses.shipping" />
        </div>

        <div class="o-row__column">
          <BaseHeading tag="h5" class="u-mb-small">{{
            $t('addresses.billing')
          }}</BaseHeading>
          <ShopAddress :address="order.data.addresses.billing" />
        </div>
      </div>
    </template>
    <template v-else>
      <BaseHeading tag="h1" use="h3" class="u-mb-large" color="black"
        >L'ordine #{{ route.params.id }} non è stato trovato</BaseHeading
      >
      <BaseButton as="link" :to="{ name: 'orders-list' }"
        >Torna agli ordini</BaseButton
      >
    </template>
  </section>
</template>

<script setup>
// Imports

// Constants

// Define (Props, Emits, Page Meta)
definePageMeta({
  path: '/il-mio-account/ordini/:id/visualizza',
  name: 'order-view',
  key: 'order-view',
})

defineI18nRoute({
  paths: {
    it: '/il-mio-account/ordini/[id]/visualizza',
  },
  locales: ['it'],
})

// Component life-cycle hooks

// Composables
const route = useRoute()
const order = ref(null)

onMounted(async () => {
  const response = await useApi(
    `shop/orders/${route.params.id}`,
    {},
    {
      cache: false,
    }
  )

  order.value = response.value
})

// Data

// Watcher

// Computed

// Methods
</script>

<style lang="scss" scoped>
@include scope('order-details') {
  @include set-local-vars(
    $prefix: 'row',
    $map: (
      columns: 1,
    )
  );
  @include from(tablet) {
    @include set-local-vars(
      $prefix: 'row',
      $map: (
        columns: 2,
      )
    );
  }

  @include set-local-vars(
    $prefix: 'heading',
    $map: (
      text-color: get-var(color-green),
    )
  );
}
</style>
