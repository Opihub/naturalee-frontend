import { defineNuxtRouteMiddleware } from '#imports'
import { isCategory } from '@/utils/shop'

export default defineNuxtRouteMiddleware((to) => {
  return isCategory(to.params.category)
})
