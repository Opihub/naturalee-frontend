import { useRemoteApi } from '@/server/utils/remoteApi'
import { getPasswordPattern } from '@/utils/pattern'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  if (!body.oldPassword && (body.newPassword || body.confirmPassword)) {
    throw createError({
      statusCode: 403,
      statusMessage: 'È obbligatorio inserire una password',
      data: {
        code: 'missing_password',
        success: false,
      },
    })
  }

  if ('oldPassword' in body == true) {
    if (!body.oldPassword.match(getPasswordPattern())) {
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
  }

  if (!body.newPassword && (body.oldPassword || body.confirmPassword)) {
    throw createError({
      statusCode: 403,
      statusMessage: 'È obbligatorio inserire una password',
      data: {
        code: 'missing_password',
        success: false,
      },
    })
  }

  if ('newPassword' in body) {
    if (!body.newPassword.match(getPasswordPattern())) {
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
  }
  
  if (!body.confirmPassword && (body.oldPassword || body.newPassword)) {
    throw createError({
      statusCode: 403,
      statusMessage: 'È obbligatorio inserire una password',
      data: {
        code: 'missing_password',
        success: false,
      },
    })
  }

  if ('confirmPassword' in body == true) {
    if (!body.confirmPassword.match(getPasswordPattern())) {
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
  }

  try {
    const response = await useRemoteApi(event,'/v1/profile/update', {
      method: 'POST',
      body,
    })
    console.log(response);
    
    return createResponse(response)
  } catch (error) {   
    throw createErrorResponse(error)
  }
})
