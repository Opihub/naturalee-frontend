import { useRemoteApi } from '@/server/utils/remoteApi'

export default defineEventHandler(async (event) => {
  const category = event.context.params?.category

  if (!category) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Missing mandatory category slug',
      data: {
        code: 'missing_category_slug',
        success: false,
      },
    })
  }

  try {
    const response = await useRemoteApi(
      event,
      `/v1/shop/categories/${category}/products`
    )

    return createResponse(response)
  } catch (error) {
    console.error(error)
    return createErrorResponse(error)
  }
})
