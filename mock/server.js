const path = require('path')
const jsonServer = require('json-server')

const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

function random(min = 0, max = 1) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) // The maximum is exclusive and the minimum is inclusive
}

function createResponse(statusCode, data) {
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

  return {
    success: statusCode >= 200 && statusCode < 400,
    statusCode,
    code,
    message,
    data: data || null,
  }
}

server.use(middlewares)
server.use(jsonServer.bodyParser)

router.render = (request, response) => {
  let { data } = response.locals
  const { statusCode } = response

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

  response.jsonp(createResponse(statusCode, data))
}

server.post('/v1/postcodes/validate', (request, response) => {
  const { body } = request
  let { statusCode } = response
  let data = true

  if (body.email) {
    data = true
  } else if (body.postcode <= 20000 || body.postcode > 25000) {
    statusCode = 404
    data = random(1, 100)
  }

  response.jsonp(createResponse(statusCode, data))
})

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
