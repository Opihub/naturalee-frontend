import { useRemoteApi } from '@/server/utils/remoteApi'

export default defineEventHandler(async (event) => {
  try {
    const response = await useRemoteApi(event, '/v1/shop/wishlist/clear', {
      method: 'DELETE',
    })

    return createResponse(response)
  } catch (error) {
    console.error(error)
    return createErrorResponse(error)
  }
})
