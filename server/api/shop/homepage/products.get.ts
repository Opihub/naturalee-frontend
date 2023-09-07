import { useRemoteApi } from '@/server/utils/remoteApi'

export default defineEventHandler(async () => {
  try {
    const response = await useRemoteApi(`/v1/shop/homepage/products`)

    return createResponse(response)
  } catch (error) {
    console.error(error)
    return createError(createResponse(error))
  }
})
