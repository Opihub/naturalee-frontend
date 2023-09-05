import { useRemoteApi } from '@/server/utils/remoteApi'

export default defineEventHandler(async (event) => {
  const slug = event.context.params?.slug

  if (!slug) {
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
    const response = await useRemoteApi(`/v1/menu/${slug}`)

    return createResponse(response)
  } catch (error) {
    console.debug(error)
    throw createError(createResponse(error))
  }
})
