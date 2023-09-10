import { useRemoteApi } from '@/server/utils/remoteApi'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.id) {
    throw createError({
      statusCode: 403,
      statusMessage: 'ID prodotto mancante',
      data: {
        code: 'missing_product',
        success: false,
      },
    })
  }

  if (isNaN(body.id)) {
    throw createError({
      statusCode: 403,
      statusMessage: 'ID prodotto errato',
      data: {
        code: 'invalid_product',
        success: false,
      },
    })
  }

  if (body.variantId && isNaN(body.variantId)) {
    throw createError({
      statusCode: 403,
      statusMessage: 'ID tipologia prodotto errato',
      data: {
        code: 'invalid_variation',
        success: false,
      },
    })
  }

  try {
    const response = await useRemoteApi('/v1/shop/cart/remove', {
      method: 'DELETE',
      body,
    })

    return createResponse(response)
  } catch (error) {
    console.error(error)
    return createErrorResponse(error)
  }
})
