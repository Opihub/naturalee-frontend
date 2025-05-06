export default defineNuxtRouteMiddleware((to, from) => {
  console.log('ℹ️ Middleware log.global.ts')
  console.log('FROM:', from.fullPath, !!from.redirectedFrom)
  console.log('TO:', to.fullPath, !!to.redirectedFrom)
})
