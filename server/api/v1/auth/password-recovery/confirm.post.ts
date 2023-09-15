import { useRemoteApi } from '@/server/utils/remoteApi'
import {
  getPasswordPattern,
  getPasswordRecoveryTokenPattern,
} from '@/utils/pattern'

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

  if (!body.password) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Password mancante',
      data: {
        code: 'missing_password',
        success: false,
      },
    })
  }

  if (!body.confirmPassword) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Password di conferma mancante',
      data: {
        code: 'missing_confirm_password',
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

  if (!body.confirmPassword.match(getPasswordPattern())) {
    throw createError({
      statusCode: 403,
      statusMessage:
        'La password di conferma inserita non rispetta i canoni standard di sicurezza',
      data: {
        code: 'invalid_confirm_password',
        success: false,
      },
    })
  }

  if (body.password !== body.confirmPassword) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Le password inserite non combaciano',
      data: {
        code: 'password_not_matching',
        success: false,
      },
    })
  }

  try {
    const response = await useRemoteApi(
      event,
      '/v1/auth/password-recovery/confirm',
      {
        method: 'POST',
        body,
      }
    )

    return createResponse(response)
  } catch (error) {
    console.error(error)
    throw createErrorResponse(error)
  }
})
