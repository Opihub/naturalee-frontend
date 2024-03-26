import { asSitemapUrl, defineSitemapEventHandler } from '#imports'

export default defineSitemapEventHandler(async () => {
  const products = await $fetch<{ data: string[] }>('/v1/sitemap/products', {
    baseURL: process.env.API_ENDPOINT_URL || '',
  })

  return [
    // map URLS as needed
    ...products.data.map((slug) =>
      asSitemapUrl({
        loc: slug,
      })
    ),
  ]
})
