import { useRemoteApi } from '@/server/utils/remoteApi'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id

  if (!id) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Missing mandatory category slug',
      data: {
        code: 'missing_order_id',
        success: false,
      },
    })
  }

  if (parseInt(id).toString() !== id) {
    throw createError({
      statusCode: 403,
      statusMessage: "ID dell'ordine ",
      data: {
        code: 'invalid_order_id',
        success: false,
      },
    })
  }

  try {
    const response = await useRemoteApi(event, `/v1/shop/orders/${id}/products`)

    return createResponse(response)
  } catch (error) {
    console.error(error)
    return createErrorResponse(error)
  }
})
