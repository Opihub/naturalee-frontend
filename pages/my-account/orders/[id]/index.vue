<template>
  <section class="s-order-details">
    <BaseParagraph class="u-mb-tiny">{{
      $t('orders.createdAt', {
        // id: orderId(order.id),
        date,
        status: $t(`orders.status.${order.status}`),
      })
    }}</BaseParagraph>
    <BaseHeading>{{ $t('orders.details') }}</BaseHeading>

    <OrderDetails
      class="u-mb-huge u-mt-medium"
      :products="order.products"
      :shipping="order.shipping"
      :payment="order.payment"
    />

    <div class="o-row">
      <div class="o-row__column">
        <BaseHeading tag="h5" class="u-mb-small">{{ $t('addresses.shipping') }}</BaseHeading>
        <ShopAddress :address="order.addresses.shipping" />
      </div>

      <div class="o-row__column">
        <BaseHeading tag="h5" class="u-mb-small">{{ $t('addresses.billing') }}</BaseHeading>
        <ShopAddress :address="order.addresses.billing" />
      </div>
    </div>
  </section>
</template>

<script setup>
// Imports

// Constants

// Define (Props, Emits, Page Meta)
definePageMeta({
  alias: '/my-account/orders/:id/view',
  name: 'order-view',
})

// Component life-cycle hooks

// Composables
const route = useRoute()
const order = await useApi(
  `shop/orders/${route.params.id}`,
  {},
  {
    dataOnly: true,
    cache: false,
  }
)

// Data

// Watcher

// Computed
const date = computed(() => {
  const date = new Date(order.value.date)

  return `${date.toLocaleString('default', {
    month: 'long',
  })} ${date.getDate()}, ${date.getFullYear()}`
})

// Methods
</script>

<style lang="scss" scoped>
@include scope('order-details') {
  @include set-local-vars(
    $prefix: 'row',
    $map: (
      columns: 2,
    )
  );

  @include set-local-vars(
    $prefix: 'heading',
    $map: (
      text-color: get-var(color-green),
    )
  );
}
</style>
