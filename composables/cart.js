import { computed } from '#imports'
import { useTotal } from '@/composables/total'

export function useCart(cart, coupon, paymentMethod = null) {
  const hasCoupon = computed(() => {
    return coupon.value.code
  })

  const discount = computed(() => {
    if (!hasCoupon.value) {
      return 0
    }

    let amount = 0
    switch (coupon.value.discount_type) {
      case 'fixed_cart':
        amount = coupon.value.amount
        break
      case 'percent':
        amount = (subTotal.value / 100) * coupon.value.amount
        break
      default:
        console.debug(coupon.value)
        console.debug(cart.value)

        // eslint-disable-next-line no-case-declarations
        let count = 0
        for (const item of cart.value) {
          // Se il coupon è applicabile ad un numero massimo di prodotti e questo valore è stato raggiunto, allora stoppo il coupon
          if (
            coupon.value.limit_usage_to_x_items &&
            count >= coupon.value.limit_usage_to_x_items
          ) {
            break
          }

          // Salto il prodotto se è già scontato ed il coupon non accetta prodotti scontati
          if (coupon.value.exclude_sale_items && item.discountPrice) {
            return amount
          }

          let quantity = parseInt(item.quantity)
          const next = count + quantity
          // Se c'è un limite di prodotti, verifico se la quantità del prodotto corrente
          // rientra nel totale. Se no, allora prendo solo la disponibilità residua
          if (
            coupon.value.limit_usage_to_x_items &&
            next > coupon.value.limit_usage_to_x_items
          ) {
            quantity -= next - coupon.value.limit_usage_to_x_items
          }

          amount += coupon.value.amount * quantity

          count += quantity
        }
        break
    }

    return Math.min(granTotal.value, amount)
  })

  const count = computed(() => {
    return cart.value?.length || 0
  })

  const isEmpty = computed(() => {
    return count.value <= 0
  })

  const hasMinimumOrderCost = computed(() => {
    return subTotal.value >= 20
  })

  const costBeforeFreeShipping = computed(() => {
    return 50 - subTotal.value
  })

  const hasFreeShipping = computed(() => {
    if (hasCoupon.value && coupon.value.free_shipping) {
      return true
    }

    return costBeforeFreeShipping.value <= 0
  })

  const shippingMethod = computed(() => {
    if (hasFreeShipping.value) {
      return {
        cost: 0,
        id: 'free_shipping:1',
        // id: 'free_shipping',
      }
    }

    return {
      cost: 3,
      id: 'flat_rate:5',
      // id: 'flat_rate',
    }
  })

  const shippingCost = computed(() => {
    return shippingMethod.value.cost
  })

  const { subTotal, granTotal, total } = useTotal(cart, {
    shipping: shippingMethod,
    payment: paymentMethod,
    discount,
  })

  return {
    hasCoupon,
    discount,
    count,
    isEmpty,
    hasFreeShipping,
    hasMinimumOrderCost,
    costBeforeFreeShipping,
    shippingMethod,
    shippingCost,
    subTotal,
    granTotal,
    total,
  }
}
