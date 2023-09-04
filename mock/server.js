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
    case 'shop_categories_pages':
    case 'pages':
      data = data.record
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
    '/shop/homepage/products': '/shop_homepage_products',
    '/shop/cart/products': '/shop_cart_products',
    '/shop/categories/:category': '/shop_categories_pages/$1',
    '/shop/categories': '/shop_categories',
  })
)

server.use(router)

server.listen(8888, () => {
  console.log('JSON Server is running')
})
