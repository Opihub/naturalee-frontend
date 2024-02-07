<template>
  <section class="s-checkout">
    <SiteContainer
      v-if="order && Object.keys(order).length > 0"
      :max-width="1060"
    >
      <BaseHeading tag="h4" class="u-mb-large u-text-center@tablet"
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
  validate: async (route) => {
    return true
    // defineNuxtRouteMiddleware(async () => {
    //   const { token, login } = route.query

    //   if (
    //     !login ||
    //     !token ||
    //     token.match(getPasswordRecoveryTokenPattern()).length <= 0
    //   ) {
    //     return false
    //   }

    //   const response = await useApi(
    //     `auth/password-recovery/validate-token`,
    //     {
    //       method: 'POST',
    //       body: {
    //         token,
    //         login,
    //       },
    //     },
    //     {
    //       cache: false,
    //     }
    //   )

    //   // TODO: trovare un modo di ritornare gli errori

    //   return response.value.success
    // })
  },
})

// Component life-cycle hooks

// Composables

// Data
const config = useRuntimeConfig()
const route = useRoute()
console.log(route)
const order = await useApi(
  `shop/orders/${route.query.orderId}`,
  {},
  {
    dataOnly: true,
    cache: false,
  }
)

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
