import { useRemoteApi } from '@/server/utils/remoteApi'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.username) {
    throw createError({
      statusCode: 403,
      statusMessage: 'È obbligatorio inserire il nome utente o la mail',
      data: {
        code: 'missing_user',
        success: false,
      },
    })
  }

  try {
    const response = await useRemoteApi(event, '/v1/auth/password-recovery/request', {
      method: 'POST',
      body,
    })

    return createResponse(response)
  } catch (error) {
    throw createErrorResponse(error)
  }
})
