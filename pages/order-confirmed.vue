<template>
  <section class="s-checkout">
    <SiteContainer :max-width="1060">
      <template v-if="order.data">
        <BaseHeading
          tag="h4"
          class="u-mb-large u-text-center@tablet"
          style="text-wrap: balance"
          >Grazie. Il tuo ordine n. {{ orderId(order.data.id) }} è stato ricevuto ed
          è attualmente In lavorazione</BaseHeading
        >
        <SiteContainer padless="">
          <BaseHeading tag="h4" class="u-text-center@tablet"
            >Ecco i dettagli del tuo ordine</BaseHeading
          >

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
        </SiteContainer>

        <SiteContainer class="u-text-center">
          <BaseButton
            class="u-mt-large"
            as="link"
            to="/#frutta-verdura"
            color="yellow"
            >Continua gli acquisti</BaseButton
          >
        </SiteContainer>
      </template>
      <template v-else>
        <BaseHeading
          tag="h4"
          class="u-mb-large u-text-center@tablet"
          style="text-wrap: balance"
          >L'ordine richiesto non è stato trovato</BaseHeading
        >
      </template>
    </SiteContainer>
  </section>
</template>

<script setup>
// Imports

// Constants

// Define (Props, Emits, Page Meta)
definePageMeta({
  name: 'order-confirmed',
  layout: 'green',
  middleware: [
    'auth',
    async (to) => {
      if (process.server) {
        return true
      }

      const { orderId } = to.query

      if (!orderId || Number.isNaN(orderId)) {
        return false
      }

      return true
    },
  ],
})

defineRouteRules({
  index: false,
  robots: false,
})

// Component life-cycle hooks

// Composables

// Data
const config = useRuntimeConfig()
const route = useRoute()

const { data: order } = await useApi(`shop/orders/${route.query.orderId}`, {
  cache: 'no-cache',
})

if (!order.value || !order.value.success) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Order Not Found',
  })
}

// Watcher

// Computed
const seoTitle = computed(() => {
  let title = `Grazie! Ordine #${route.query.orderId}`

  if (config.public.title) {
    title += ` ${config.public.seoSeparator || '|'} ${config.public.title}`
  }

  return title
})

usePageSeo({
  title: seoTitle,
})

// Methods
</script>

<style lang="scss" scoped>
@include object('row') {
  @include element('column') {
    padding: rem(20px) rem(40px);
    border-radius: rem(20px);
    background-color: get-var(color-white);
  }
  @include from('tablet') {
    @include set-local-vars(
      $prefix: 'row',
      $map: (
        columns: 2,
      )
    );
  }
}
@include object('button') {
  // display: block;
  margin: 0 auto;
}
</style>
