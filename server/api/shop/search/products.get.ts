import { useRemoteApi } from '@/server/utils/remoteApi'

export default defineEventHandler(async (event) => {
  const params = getQuery(event)

  if (!('search' in params) || !params.search) {
    throw createError(
      createResponse({
        success: false,
        statusCode: 403,
        code: 'missing_search',
        message: 'Parametro di ricerca mancante',
        data: false,
      })
    )
  }

  try {
    const response = await useRemoteApi(`/v1/shop/search/products`, {
      params,
    })

    return createPaginatedResponse(response)
  } catch (error) {
    console.debug(error)
    throw createError(createResponse(error))
  }
})
