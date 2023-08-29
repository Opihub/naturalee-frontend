import { isError } from 'h3'

export function createResponse(input) {
  if (isError(input)) {
    return {
      success: false,
      statusCode: input.statusCode || 400,
      code: input?.data?.code || 'generic_error',
      message: input.statusMessage || 'Generic Error',
      data: input?.data?.data || false,
    }
  }

  return {
    success: typeof input.success !== 'undefined' ? !!input.success : true,
    statusCode: input.statusCode || 200,
    code: input.code || 'default_code',
    message: input.message || 'Generic Message',
    data: typeof input.data !== 'undefined' ? input.data : {},
  }
}
