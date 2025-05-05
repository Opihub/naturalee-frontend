export default [
  { UserAgent: '*' },
  { Disallow: '' },
  { BlankLine: true },
  { Comment: 'Sitemap' },

  // Be aware that this will NOT work on target: 'static' mode
  { Sitemap: (req) => `https://${req.headers.host}/sitemap.xml` },
]
