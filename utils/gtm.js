import { useRuntimeConfig, useGtm } from '#imports'

export function generateItem(product, listArgs = {}) {
  const config = useRuntimeConfig()

  const {
    brand,
    variationId,
    price,
    categories,
    discountPrice,
    title,
    selling,
    quantity,
  } = product

  const item = {
    item_id: variationId, // ID del prodotto, obbligatorio
    item_name: title, // Nome del prodotto, obbligatorio
    // affiliation: null,
    // coupon: null,
    currency: config.public.currency,
    discount: discountPrice === 0 ? discountPrice : price - discountPrice,
    // index: 0,
    item_brand: brand || config.public.title,
    // item_category: '',
    // item_category2: '',
    // item_list_id: '',
    // item_list_name: '',
    item_variant: selling,
    price: price,
    quantity: quantity || 1,
  }

  if (!isNaN(listArgs.index)) {
    const offset = listArgs?.offset || 0
    item.index = listArgs.index + offset
  }

  if (listArgs.id) {
    item.item_list_id = listArgs.id
  }

  if (listArgs.name) {
    item.item_list_name = listArgs.name
  }

  categories.forEach((element, index) => {
    // Google accetta solo 5 categorie
    if (index > 4) {
      return
    }

    let key = 'item_category'
    if (index > 0) {
      key += index + 1
    }

    item[key] = element.title
  })

  return item
}

export function trackEcommerceEvent(event, products, listArgs = {}) {
  const config = useRuntimeConfig()
  const gtm = useGtm()

  if (!Array.isArray(products)) {
    products = [products]
  }

  const items = products.map((product, index) =>
    generateItem(product, { ...listArgs, index })
  )

  gtm.trackEvent({
    event,
    currency: config.public.currency,
    value: items.reduce((sum, item) => {
      sum += item.quantity * item.price
      return sum
    }, 0),
    ecommerce: {
      items,
    },
  })
}
