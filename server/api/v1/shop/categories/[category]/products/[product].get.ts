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

  const product = event.context.params?.product

  if (!product) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Missing mandatory product slug',
      data: {
        code: 'missing_product_slug',
        success: false,
      },
    })
  }

  try {
    const response = await useRemoteApi(
      `/v1/shop/categories/${category}/products/${product}`
    )

    return createResponse(response)
  } catch (error) {
    console.error(error)
    return createErrorResponse(error)
  }
})
