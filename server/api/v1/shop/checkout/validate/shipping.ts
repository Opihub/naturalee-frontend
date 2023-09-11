import { useRemoteApi } from '@/server/utils/remoteApi'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.country) {
    throw createError({
      statusCode: 403,
      statusMessage: 'È obbligatorio inserire la nazione di consegna',
      data: {
        code: 'missing_country',
        success: false,
      },
    })
  }

  if (!body.state) {
    throw createError({
      statusCode: 403,
      statusMessage: 'È obbligatorio inserire la provincia di consegna',
      data: {
        code: 'missing_state',
        success: false,
      },
    })
  }

  if (!body.city) {
    throw createError({
      statusCode: 403,
      statusMessage: 'È obbligatorio inserire la città di consegna',
      data: {
        code: 'missing_city',
        success: false,
      },
    })
  }

  if (!body.postcode) {
    throw createError({
      statusCode: 403,
      statusMessage: 'È obbligatorio indicare il CAP',
      data: {
        code: 'missing_postcode',
        success: false,
      },
    })
  }

  if (isNaN(body.postcode)) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Il CAP inserito presenta un formato non valido',
      data: {
        code: 'invalid_postcode',
        success: false,
      },
    })
  }

  try {
    const response = await useRemoteApi('/v1/shop/checkout/validate/shipping', {
      method: 'POST',
      body,
    })

    return createResponse(response)
  } catch (error) {
    console.error(error)
    return createErrorResponse(error)
  }
})
