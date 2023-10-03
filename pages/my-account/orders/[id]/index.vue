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

    <OrderResume
      class="u-mb-huge u-mt-medium"
      :products="order.products"
      :shipping="_shipping"
      :payment="_payment"
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
const _shipping = ref({
  id: order.shippingMethod,
  title: order.shippingMethod,
  cost: order.shippingCost || 0,
})
const _payment = ref({
  id: order.paymentMethod,
  title: order.paymentMethod,
  cost: order.shippingCost || 0,
})

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
