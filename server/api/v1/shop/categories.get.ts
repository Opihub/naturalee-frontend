import { useRemoteApi } from '@/server/utils/remoteApi'

export default defineEventHandler(async () => {
  try {
    const response = await useRemoteApi(`/v1/shop/categories`)

    return createResponse(response)
  } catch (error) {
    console.error(error)
    return createErrorResponse(error)
  }
})
