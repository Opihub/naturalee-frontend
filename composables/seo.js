import { useServerSeoMeta, useSeoMeta } from '#imports'

export const usePageSeo = (page) => {
  const { seo } = page

  if (!seo) {
    return
  }

  useServerSeoMeta({
    title: seo?.title,
    ogTitle: seo?.ogTitle || seo?.title,
    description: seo?.description,
    ogDescription: seo?.ogDescription || seo?.description,
    ogImage: seo?.ogImage,
    twitterCard: seo?.twitterCard,
  })

  useSeoMeta({
    title: page.seo?.title,
    ogTitle: page.seo?.ogTitle || page.seo?.title,
    description: page.seo?.description,
    ogDescription: page.seo?.ogDescription || page.seo?.description,
    ogImage: page.seo?.ogImage,
    twitterCard: page.seo?.twitterCard,
  })
}
