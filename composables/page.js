import { ref, createError, showError, useApi, useSlug } from '#imports'

export const usePage = async (slug = null, namespace = 'pages') => {
  const endpoint = slug || useSlug()
  const page = ref({})

  const { data: response, refresh } = await useApi(`${namespace}/${endpoint}`,{
    expiration_hours:6
  })

  if (!response.value) {
    await refresh()
  }

  if (!response.value.success) {
    if (process.server) {
      throw createError({
        statusCode: response.value.statusCode,
        statusMessage: response.value.message,
      })
    }

    showError({
      statusCode: response.value.statusCode,
      statusMessage: response.value.message,
    })
  }

  page.value = response.value.data

  return {
    page,
    response,
  }
}
