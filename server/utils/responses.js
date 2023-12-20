import { isError, createError } from 'h3'

export function createResponse(input, error = false) {
  if (isError(input) || error) {
    return {
      success: false,
      statusCode: input.statusCode || 400,
      code: input?.data?.code || 'generic_error',
      message: input.statusMessage || 'Generic Error',
      data: input?.data?.data || false,
      errors: [],
    }
  }

  return {
    success: typeof input.success !== 'undefined' ? !!input.success : true,
    statusCode: input.statusCode || 200,
    code: input.code || 'default_code',
    message: input.message || 'Generic Message',
    data: typeof input.data !== 'undefined' ? input.data : {},
    errors: input?.errors || [],
  }
}

export function createErrorResponse(error) {
  return createError({
    statusCode: error.statusCode,
    statusMessage: error.statusMessage,
    data: createResponse(error, true),
  })
}

export function createPaginatedResponse(input) {
  const response = createResponse(input)

  const page = parseInt(input.paginate?.page || 0)
  let previous = null
  let next = null
  if (page > 0) {
    previous = page - 1
  }

  const count = parseInt(input.paginate?.count || 0)
  const limit = parseInt(input.paginate?.limit || 12)

  if (limit * page + 1 < count) {
    next = page + 1
  }

  return {
    ...response,
    data: {
      records: response.data,
      pagination: {
        page,
        limit,
        count,
        last: next === null,
        previous,
        next,
        ...input.paginate,
      },
    },
  }
}
