import { defineNuxtRouteMiddleware, abortNavigation } from '#imports'
import { useApi } from '@/composables/api'

export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.params.category) {
    return abortNavigation("Categoria non trovata")
  }

  if (!to.params.product) {
    return abortNavigation('Prodotto non trovato')
  }

  const url = [
    'shop',
    'categories',
    to.params.category,
    'products',
    to.params.product,
  ]

  if (to.params.variation) {
    url.push(to.params.variation)
  }

  const response = await useApi(url.implode('/'))

  if (!response.value.success) {
    return abortNavigation('Prodotto non trovato!')
  }

  return true
})
