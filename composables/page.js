import { ref, createError, useApi, useSlug } from '#imports'

export const usePage = async (slug = null, namespace = 'pages') => {
  const endpoint = slug || useSlug()
  const page = ref({})

  const { data: response } = await useApi(`${namespace}/${endpoint}`, {})

  if (!response.value.success) {
    throw createError({
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
