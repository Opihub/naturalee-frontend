import { useApi } from '@/composables/api'
// import { usePageSeo } from '@/composables/usePageSeo'
import { useSlug } from '@/composables/slug'

export const usePage = async (slug = null) => {
  const endpoint = slug || useSlug()

  const page = await useApi(`pages/${endpoint}`, null, {
    dataOnly: true
  })

  // usePageSeo(page.value)

  return {
    page,
  }
}
