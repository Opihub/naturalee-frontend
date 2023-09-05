import { useRemoteApi } from '@/server/utils/remoteApi'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.address) {
    throw createError({
      statusCode: 403,
      statusMessage: 'È obbligatorio inserire un indirizzo di consegna',
      data: {
        code: 'missing_address',
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
    const response = await useRemoteApi('/v1/postcodes/validate', {
      method: 'POST',
      body,
    })

    return createResponse(response)
  } catch (error) {
    console.debug(error)
    throw createError(createResponse(error))
  }
})
