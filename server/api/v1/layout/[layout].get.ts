import { useRemoteApi } from '@/server/utils/remoteApi'
import storage from '@/server/utils/storageApi'

export default defineEventHandler(async (event) => {
  const layout = event.context.params?.layout

  if (!layout) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Missing mandatory layout slug',
      data: {
        code: 'missing_layout_slug',
        success: false,
      },
    })
  }

  const URL = `/v1/layout/${layout}`

  try {
    const json = await storage.load(URL)

    if (json) {
      return json
    }

    const data = await useRemoteApi(event, URL)
    const response = createResponse(data)

    try {
      await storage.save(URL, response)
      console.log(`File fetched from ${URL} and written locally!`)
    } catch (error) {
      console.error(`An error happened while fetching from ${URL}`, error)
    }

    return response
  } catch (error) {
    console.error(error)
    return createErrorResponse(error)
  }
})
