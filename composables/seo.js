import { useServerSeoMeta, useSeoMeta } from '#imports'

export const usePageSeo = (seo) => {
  useServerSeoMeta({
    // title: seo?.title,
    // ogTitle: seo?.ogTitle || seo?.title,
    // description: seo?.description,
    // ogDescription: seo?.ogDescription || seo?.description,
    // ogImage: seo?.ogImage,
    // twitterCard: seo?.twitterCard,
  })

  console.debug(seo)

  useSeoMeta({
    // title: seo?.title,
    // ogTitle: seo?.ogTitle || seo?.title,
    // description: seo?.description,
    // ogDescription: seo?.ogDescription || seo?.description,
    // ogImage: seo?.ogImage,
    // twitterCard: seo?.twitterCard,
  })
}
