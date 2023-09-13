import { useRemoteApi } from '@/server/utils/remoteApi'

export default defineEventHandler(async (event) => {
  try {
    const response = await useRemoteApi(event, '/v1/shop/homepage/products')

    return createResponse(response)
  } catch (error) {
    console.error(error)
    return createErrorResponse(error)
  }
})
