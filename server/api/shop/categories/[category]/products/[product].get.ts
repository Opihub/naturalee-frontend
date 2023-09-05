import { useRemoteApi } from '@/server/utils/remoteApi'

export default defineEventHandler(async (event) => {
  const category = event.context.params?.category

  if (!category) {
    throw createError(
      createResponse({
        success: false,
        statusCode: 403,
        code: 'missing_slug',
        message: 'Missing mandatory menu slug',
        data: false,
      })
    )
  }

  const product = event.context.params?.product

  if (!product) {
    throw createError(
      createResponse({
        success: false,
        statusCode: 403,
        code: 'missing_slug',
        message: 'Missing mandatory menu slug',
        data: false,
      })
    )
  }

  try {
    const response = await useRemoteApi(
      `/v1/shop/categories/${category}/products/${product}`
    )

    return createResponse(response)
  } catch (error) {
    console.debug(error)
    throw createError(createResponse(error))
  }
})
