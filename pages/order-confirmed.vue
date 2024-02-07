<template>
  <section class="s-checkout">
    <SiteContainer v-if="order" :max-width="1060">
      <BaseHeading
        tag="h4"
        class="u-mb-large u-text-center@tablet"
        style="text-wrap: balance"
        >Grazie. Il tuo ordine n. {{ orderId(order.id) }} è stato ricevuto ed è
        attualmente In lavorazione</BaseHeading
      >
      <SiteContainer padless="">
        <BaseHeading tag="h4" class="u-text-center@tablet"
          >Ecco i dettagli del tuo ordine</BaseHeading
        >

        <OrderDetails
          class="u-mb-huge u-mt-medium"
          :products="order.products"
          :shipping="order.shipping"
          :payment="order.payment"
          :time-slots="order.timeSlots"
          :date="getFormattedDate(order.pickedDate)"
        />
        <div class="o-row">
          <div class="o-row__column">
            <BaseHeading tag="h5" class="u-mb-small">{{
              $t('addresses.shipping')
            }}</BaseHeading>
            <ShopAddress :address="order.addresses.shipping" />
          </div>

          <div class="o-row__column">
            <BaseHeading tag="h5" class="u-mb-small">{{
              $t('addresses.billing')
            }}</BaseHeading>
            <ShopAddress :address="order.addresses.billing" />
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
    </SiteContainer>
  </section>
</template>

<script setup>
// Imports

// Constants

// Define (Props, Emits, Page Meta)
definePageMeta({
  layout: 'green',
  middleware: [
    'auth',
    async (to) => {
      if (process.server) {
        return true
      }

      const { orderId } = to.query

      if (!orderId || isNaN(orderId)) {
        return false
      }

      const response = await useApi(
        `shop/orders/${orderId}`,
        {},
        {
          cache: false,
        }
      )

      if (!response.value.success) {
        return navigateTo({
          name: 'orders-list',
          query: {
            redirectBecause: 'orderNotFound',
          },
        })
      }

      return true
    },
  ],
})

// Component life-cycle hooks

// Composables

// Data
const config = useRuntimeConfig()
const route = useRoute()

const order = ref(null)
onMounted(() => {
  nextTick(async () => {
    const response = await useApi(
      `shop/orders/${route.query.orderId}`,
      {},
      {
        dataOnly: true,
        cache: false,
      }
    )

    order.value = response.value
  })
})

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
