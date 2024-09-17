import { ref, createError, showError, useApi, useSlug } from '#imports'

export const usePage = async (slug = null, namespace = 'pages') => {

  const endpoint = slug || useSlug()
  const page = ref({})

  if (Array.isArray(namespace)) {
    namespace = namespace.filter((part) => part).join('/')
  }

  const {
    data: response,
    error,
    refresh,
  } = await useApi(`${namespace}/${endpoint}`, {
    expiration_hours: 48,
  })

  if (!response.value) {
    await refresh()
  }

  let feedbackError = false
  if (error.value) {
    feedbackError = {
      statusCode: 500,
      message:
        'È avvenuto un errore inaspettato durante il caricamento della pagina',
    }
  } else if (!response.value?.success) {
    feedbackError = {
      statusCode: response.value.statusCode,
      message: response.value.message,
    }
  }

  if (feedbackError) {
    console.error(error.value)

    if (process.server) {
      throw createError(feedbackError)
    }

    showError(feedbackError)
  }

  page.value = response.value.data

  return {
    page,
    response,
  }
}
