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

  try {
    const response = await useRemoteApi(`/v1/shop/categories/${category}/products`)

    return createPaginatedResponse(response)
  } catch (error) {
    console.error(error)
    throw createError(createResponse(error))
  }
})
