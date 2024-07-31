import { ref, createError, showError, useApi, useSlug } from '#imports'
import { useConfigurationStore } from '@/stores/configuration'

export const usePage = async (slug = null, namespace = 'pages') => {
  const configurationStore = useConfigurationStore()
  const { shopCategories} = storeToRefs(configurationStore)

  const endpoint = slug || useSlug()
  const page = ref({})

  //CONTROLLO CHE LA PAGINA DI CATEGORIA ESISTA
  if(namespace === "shop/categories"){
    console.log("🔴 È stata richiesta una pagina che non esiste: "+slug);
    if(!shopCategories.value.some(cat=>cat.title.toLowerCase() == slug)){
      let feedbackError = {
        statusCode: 404,
        message:
          'Pagina non esiste',
      }

      if (process.server) {
        throw createError(feedbackError)
      }

      showError(feedbackError)
    }
  }

  if (Array.isArray(namespace)) {
    namespace = namespace.filter((part) => part).join('/')
  }

  const {
    data: response,
    error,
    refresh,
  } = await useApi(`${namespace}/${endpoint}`, {
    expiration_hours: 6,
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
