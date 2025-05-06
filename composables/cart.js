import { computed, useTotal } from '#imports'

export function useCart(cart, coupon, paymentMethod = null) {
  const hasCoupon = computed(() => {
    return coupon.value.code
  })

  const validProducts = computed(() => {
    return cart.value.filter((item) => {
      // Salto il prodotto se è già scontato ed il coupon non accetta prodotti scontati
      if (coupon.value.exclude_sale_items && item.discountPrice) {
        return false
      }

      // TODO: verificare le condizioni. Probabilmente un prodotto deve rispettare tutte le condizioni applicati

      // Se il coupon è applicabile a determinati prodotti,
      // allora mantiene solo questi
      if (coupon.value.product_ids.length) {
        return (
          coupon.value.product_ids.includes(item.id) ||
          coupon.value.product_ids.includes(item.variationId)
        )
      }

      // Se il coupon non è applicabile a determinati prodotti,
      // allora procede a scartarli
      if (coupon.value.excluded_product_ids.length) {
        return (
          !coupon.value.excluded_product_ids.includes(item.id) &&
          !coupon.value.excluded_product_ids.includes(item.variationId)
        )
      }

      if (coupon.value.product_categories.length) {
        const categories = item.categories.map((category) => category.id)
        const matchedCategories = categories.filter((value) =>
          coupon.value.product_categories.includes(value)
        )

        return matchedCategories.length
      }

      if (coupon.value.excluded_product_categories.length) {
        const categories = item.categories.map((category) => category.id)
        const matchedCategories = categories.filter((value) =>
          coupon.value.excluded_product_categories.includes(value)
        )

        return matchedCategories.length === 0
      }

      return true
    })
  })

  const discount = computed(() => {
    if (!hasCoupon.value) {
      return 0
    }

    // Estrapolo prima tutti i prodotti che rientrano nello sconto
    const basket = validProducts.value

    if (!basket.length) {
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
      default: {
        let count = 0
        const maxUsage = coupon.value.limit_usage_to_x_items

        for (const item of basket) {
          // Se il coupon è applicabile ad un numero massimo di prodotti
          // e questo valore è stato raggiunto, allora stoppo il coupon
          if (maxUsage && count >= maxUsage) {
            break
          }

          let quantity = parseInt(item.quantity)
          const next = count + quantity
          // Se c'è un limite di prodotti, verifico se la quantità del prodotto corrente
          // rientra nel totale. Se no, allora prendo solo la disponibilità residua
          if (maxUsage && next > maxUsage) {
            quantity -= next - maxUsage
          }

          const price = item.discountPrice || item.price
          amount += Math.min(price, coupon.value.amount) * quantity

          count += quantity
        }
        break
      }
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
    validProducts,
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
