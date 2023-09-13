import { ref } from '#imports'
import { useApi } from '@/composables/api'
import { usePageSeo } from '@/composables/seo'
import { useSlug } from '@/composables/slug'

export const usePage = async (slug = null, namespace = 'pages') => {
  const endpoint = slug || useSlug()
  const page = ref({})

  const response = await useApi(`${namespace}/${endpoint}`, null)

  page.value = response.value.data

  if (page.value) {
    usePageSeo(page.value)
  }

  return {
    page,
    response,
  }
}
