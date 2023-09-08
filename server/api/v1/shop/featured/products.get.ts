import { useRemoteApi } from '@/server/utils/remoteApi'

export default defineEventHandler(async (event) => {
  const params = getQuery(event)

  try {
    const response = await useRemoteApi(`/v1/shop/featured/products`, {
      params,
    })

    return createPaginatedResponse(response)
  } catch (error) {
    console.error(error)
    return createErrorResponse(error)
  }
})
