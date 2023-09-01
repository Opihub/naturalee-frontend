import { useRemoteApi } from '@/server/utils/remoteApi'

export default defineEventHandler(async () => {
  try {
    const response = await useRemoteApi(`/v1/faq`)

    return createResponse(response)
  } catch (error) {
    console.debug(error)
    return createError(createResponse(error))
  }
})
