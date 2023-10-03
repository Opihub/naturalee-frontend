<template>
  <main>
    <SiteContainer>
      <div class="o-row">
        <template v-if="!isEmpty">
          <SiteContainer :max-width="1060" padless>
            <WorkInProgress />
          </SiteContainer>

          <SiteContainer :max-width="520" padless>
            <CheckoutCart :products="basket" :sub-total="subTotal" />

            <OrderResume
              container-class="u-mt-huge"
              :sub-total="subTotal"
              :heading="$t('checkout.payment')"
              without-sub-total
            >
              <template #after="{ className }">
                <div :class="className">metodi di pagamento</div>
              </template>
            </OrderResume>
          </SiteContainer>
        </template>

        <BaseMessage v-else :message="$t('cart.empty')" />
      </div>
    </SiteContainer>
  </main>
</template>

<script setup>
// Imports
import { useCartStore } from '@/stores/cart'

// Constants

// Define (Props, Emits, Page Meta)
definePageMeta({
  layout: 'green',
})

// Component life-cycle hooks

// Composables
const cart = useCartStore()
const basket = await cart.load()

// Data
const { isEmpty, subTotal } = storeToRefs(cart)

// Watcher

// Computed

// Methods
</script>

<style lang="scss"></style>
