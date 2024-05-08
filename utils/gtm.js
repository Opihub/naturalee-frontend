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

  if (!Number.isNaN(listArgs.index)) {
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

export function trackEcommerceEvent(event, products, argsList = {}) {
  const config = useRuntimeConfig()
  const gtm = useGtm()

  if (!Array.isArray(products)) {
    products = [products]
  }

  const items = products.map((product, index) =>
    generateItem(product, { index, ...argsList })
  )

  const ecommerce = {
    items,
  }

  if (argsList.id) {
    ecommerce.item_list_id = argsList.id
  }

  if (argsList.name) {
    ecommerce.item_list_name = argsList.name
  }

  // Controllo Hardcoded per includere il valore di una lista in base all'evento richiesto
  if (!['view_item_list', 'select_item'].includes(event)) {
    ecommerce.currency = config.public.currency
    ecommerce.value = items.reduce((sum, item) => {
      sum += item.quantity * item.price
      return sum
    }, 0)
  }

  gtm.trackEvent({
    event,
    ecommerce,
  })
}
