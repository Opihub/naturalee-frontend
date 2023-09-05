import { useApi } from '@/composables/api'
// import { usePageSeo } from '@/composables/usePageSeo'
import { useSlug } from '@/composables/slug'

export const usePage = async (slug = null, namespace = 'pages') => {
  const endpoint = slug || useSlug()

  const page = await useApi(`${namespace}/${endpoint}`, null, {
    dataOnly: true
  })

  // usePageSeo(page.value)

  return {
    page,
  }
}
