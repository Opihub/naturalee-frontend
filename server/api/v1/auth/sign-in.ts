import { useRemoteApi } from '@/server/utils/remoteApi'
import { getPasswordPattern, getEmailPattern } from '@/utils/pattern'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.email) {
    throw createError({
      statusCode: 403,
      statusMessage: 'È obbligatorio inserire il nome utente o la mail',
      data: {
        code: 'missing_email',
        success: false,
      },
    })
  }

  if (!body.email.match(getEmailPattern())) {
    throw createError({
      statusCode: 403,
      statusMessage: 'La mail inserita non è valida',
      data: {
        code: 'invalid_email',
        success: false,
      },
    })
  }

  if (!body.password) {
    throw createError({
      statusCode: 403,
      statusMessage: 'È obbligatorio inserire una password',
      data: {
        code: 'missing_password',
        success: false,
      },
    })
  }

  if (!body.password.match(getPasswordPattern())) {
    throw createError({
      statusCode: 403,
      statusMessage:
        'La password inserita non rispetta i canoni standard di sicurezza',
      data: {
        code: 'invalid_password',
        success: false,
      },
    })
  }

  try {
    const response = await useRemoteApi(event, '/v1/auth/sign-in', {
      method: 'POST',
      body,
    })

    return createResponse(response)
  } catch (error) {
    throw createErrorResponse(error)
  }
})
