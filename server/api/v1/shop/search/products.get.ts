import { useRemoteApi } from '@/server/utils/remoteApi'

export default defineEventHandler(async (event) => {
  const params = getQuery(event)

  if (!('search' in params) || !params.search) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Parametro di ricerca mancante',
      data: {
        code: 'missing_search',
        success: false,
      },
    })
  }

  try {
    const response = await useRemoteApi(event, '/v1/shop/search/products')

    return createResponse(response)
  } catch (error) {
    console.error(error)
    return createErrorResponse(error)
  }
})
