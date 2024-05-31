import { useRoute } from '#imports'

export const useSlug = () => {
  const route = useRoute()

  let slug = 'home'
  if (route.params?.slug) {
    slug = route.params?.slug.filter((slug) => slug).join('/')
  } else if (route.path !== '/') {
    slug = route.path
  }

  return slug
}
