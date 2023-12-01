import { ref, createError } from '#imports'
import { useApi } from '@/composables/api'
import { usePageSeo } from '@/composables/seo'
import { useSlug } from '@/composables/slug'

export const usePage = async (
  slug = null,
  namespace = 'pages',
  loadSeo = true
) => {
  const endpoint = slug || useSlug()
  const page = ref({})

  const response = await useApi(`${namespace}/${endpoint}`, {})

  if (!response.value.success) {
    throw createError({
      statusCode: response.value.statusCode,
      statusMessage: response.value.message,
    })
  }

  page.value = response.value.data

  // if (page.value && loadSeo && 'seo' in page.value) {
  //   usePageSeo(page.value.seo)
  // }

  return {
    page,
    response,
  }
}
