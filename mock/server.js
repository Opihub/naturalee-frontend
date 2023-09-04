const path = require('path')
const jsonServer = require('json-server')

const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

server.use(middlewares)

router.render = (request, response) => {
  let { data } = response.locals

  const [namespace] = request.url.split('/').filter((part) => part)

  console.debug(namespace)
  switch (namespace) {
    case 'menu':
      data = data.records
      break
    case 'shopCategoriesPages':
    case 'pages':
      data = data.record
      break
    case 'products':
      data = Array(3).fill(data).flat()
      break
  }

  const { statusCode } = response
  let code = 'generic'
  let message = 'Generic message'
  switch (statusCode) {
    case 200:
      code = 'found'
      message = 'OK'
      break
    case 401:
      code = 'unauthorized'
      message = 'Unauthorized'
      break
    case 403:
      code = 'forbidden'
      message = 'Forbidden'
      break
    case 404:
      code = 'not_found'
      message = 'Not found'
      break
  }

  response.jsonp({
    success: statusCode >= 200 && statusCode < 400,
    statusCode,
    code,
    message,
    data: data || null,
  })
}

// server.use('/api', router)
server.use(
  jsonServer.rewriter({
    '/v1/*': '/$1',
    '/layout/marquee': '/marquee',
    '/layout/topbar': '/topbar',
    '/layout/copyright': '/copyright',
    '/shop/homepage/products': '/shopHomepageProducts',
    '/shop/cart/products': '/shopCartProducts',
    '/shop/categories/:category/products': '/shopCategoriesPages/$1/products',
    '/shop/categories/:category': '/shopCategoriesPages/$1',
    '/shop/categories': '/shopCategories',
  })
)

server.use(router)

server.listen(8888, () => {
  console.log('JSON Server is running')
})
