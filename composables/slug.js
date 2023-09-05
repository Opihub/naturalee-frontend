import { useRoute } from '#imports'

export const useSlug = () => {
  const route = useRoute()

  return (route.params?.slug || ['home']).filter((slug) => slug).join('/')
}
