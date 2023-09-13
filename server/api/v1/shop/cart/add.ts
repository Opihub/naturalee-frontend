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

  if (!body.quantity) {
    throw createError({
      statusCode: 403,
      statusMessage: 'È obbligatorio specificare una quantità',
      data: {
        code: 'missing_quantity',
        success: false,
      },
    })
  }

  if (isNaN(body.quantity)) {
    throw createError({
      statusCode: 403,
      statusMessage: 'La quantità specificata non è valida',
      data: {
        code: 'invalid_quantity',
        success: false,
      },
    })
  }

  try {
    const response = await useRemoteApi(event, '/v1/shop/cart/add', {
      method: 'POST',
      body,
    })

    return createResponse(response)
  } catch (error) {
    console.error(error)
    return createErrorResponse(error)
  }
})
