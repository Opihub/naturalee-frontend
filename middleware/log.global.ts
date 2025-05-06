export default defineNuxtRouteMiddleware((to, from) => {
  console.log('ℹ️ Middleware log.global.ts')
  console.log('FROM:', from)
  console.log('TO:', to)
})
