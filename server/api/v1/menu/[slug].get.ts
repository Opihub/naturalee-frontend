import { useRemoteApi } from '@/server/utils/remoteApi'

export default defineEventHandler(async (event) => {
  const slug = event.context.params?.slug

  if (!slug) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Missing mandatory menu slug',
      data: {
        code: 'missing_slug',
        success: false,
      },
    })
  }

  try {
    const response = await useRemoteApi(event, `/v1/menu/${slug}`)

    return createResponse(response)
  } catch (error) {
    console.error(error)
    return createErrorResponse(error)
  }
})
