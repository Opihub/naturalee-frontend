import { useRemoteApi } from '@/server/utils/remoteApi'
import { getPasswordRecoveryTokenPattern } from '@/utils/pattern'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.login) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Nessun username fornito',
      data: {
        code: 'missing_login',
        success: false,
      },
    })
  }

  if (!body.token) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Nessun token fornito',
      data: {
        code: 'missing_token',
        success: false,
      },
    })
  }

  if (!body.token.match(getPasswordRecoveryTokenPattern())) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Il token inviato presenta un formato non valido',
      data: {
        code: 'invalid_token',
        success: false,
      },
    })
  }

  try {
    const response = await useRemoteApi(event, '/v1/auth/password-recovery/validate-token', {
      method: 'POST',
      body,
    })

    return createResponse(response)
  } catch (error) {
    throw createErrorResponse(error)
  }
})
