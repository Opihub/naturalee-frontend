import { useServerSeoMeta, useSeoMeta } from '#imports'

export const usePageSeo = (seo) => {
  const location = useRequestURL();

  useServerSeoMeta({
    title: seo?.title,
    ogTitle: seo?.ogTitle || seo?.title,
    description: seo?.description,
    ogDescription: seo?.ogDescription || seo?.description,
    ogImage: seo?.ogImage || 'https://api.naturalee.it/wp-content/uploads/2024/07/sfondo-popup.png',
    twitterCard: seo?.twitterCard,
    ...seo,
  })

  useSeoMeta({
    title: seo?.title,
    ogTitle: seo?.ogTitle || seo?.title,
    description: seo?.description,
    ogDescription: seo?.ogDescription || seo?.description,
    ogImage: seo?.ogImage || 'https://api.naturalee.it/wp-content/uploads/2024/07/sfondo-popup.png',
    twitterCard: seo?.twitterCard,
    ...seo,
  })

  useHead(() => ({
    link: [
      {
        rel: 'canonical',
        href: seo?.canonical || location.href,
      },
    ],
  }))
}
