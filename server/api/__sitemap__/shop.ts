import { asSitemapUrl, defineSitemapEventHandler } from '#imports'

export default defineSitemapEventHandler(async () => {
  const products = await $fetch<{
    data: Array<ReturnType<typeof asSitemapUrl>>
  }>('/v2/sitemap/products', {
    baseURL: process.env.API_ENDPOINT_URL || '',
  })

  return products.data
})
