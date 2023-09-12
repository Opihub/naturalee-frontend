export default defineEventHandler((event) => {
  event.context.authorization = getRequestHeader(event, 'authorization')
})
