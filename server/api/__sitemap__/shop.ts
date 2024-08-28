import { asSitemapUrl, defineSitemapEventHandler } from '#imports'

export default defineSitemapEventHandler(async () => {
  const config = useRuntimeConfig()

  const products = await $fetch<{
    data: Array<ReturnType<typeof asSitemapUrl>>
  }>('/v2/sitemap/products', {
    baseURL: config.endpoint || '',
  })

  return products.data
})
