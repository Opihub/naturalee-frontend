const path = require('path')
const jsonServer = require('json-server')

const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()
const DB = require('./db.json')

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

  console.info(namespace)
  switch (namespace) {
    case 'menu':
      data = data.records
      break
    case 'pages':
    case 'shopCategoriesPages':
    case 'shopCategoriesProductsPages':
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

server.post('/v1/auth/login', (request, response) => {
  const { body } = request
  let { statusCode } = response
  let data = false
  const { profile } = DB

  if (
    !body.user ||
    !body.password ||
    ![profile.email, profile.username].includes(body.user)
  ) {
    statusCode = 403
  } else {
    data = {...profile, token: "token.jwt.test"}
  }

  response.status(statusCode).jsonp(createResponse(statusCode, data))
})

server.post('/v1/auth/sign-in', (request, response) => {
  const { body } = request
  let { statusCode } = response
  let data = false
  const { profile } = DB

  if (!body.email || !body.password || [profile.email].includes(body.user)) {
    statusCode = 403
  } else {
    data = {...profile, token: "token.jwt.test"}
  }

  response.status(statusCode).jsonp(createResponse(statusCode, data))
})

server.post('/v1/auth/password-recovery', (request, response) => {
  const { body } = request
  let { statusCode } = response
  let data = false
  const { profile } = DB

  if (
    !body.user ||
    ![profile.email, profile.username].includes(body.user)
  ) {
    statusCode = 403
  } else {
    data = true
  }

  response.status(statusCode).jsonp(createResponse(statusCode, data))
})

// server.use('/api', router)
server.use(
  jsonServer.rewriter({
    '/v1/*': '/$1',
    '/pages/my-account/dashboard': '/pages/my-account',
    '/pages/:page/:subpage': '/pages/$1-$2',
    '/pages/:main-page/': '/sitePages/$2',
    '/layout/marquee': '/marquee',
    '/layout/topbar': '/topbar',
    '/layout/copyright': '/copyright',
    '/shop/homepage/products': '/shopHomepageProducts',
    '/shop/cart/products': '/shopCartProducts',
    '/shop/search/products': '/shopCategoriesPages/verdura/products',
    '/shop/featured/products': '/shopHomepageProducts',
    '/shop/categories/:category/products/:product':
      '/shopCategoriesProductsPages/$2',
    '/shop/categories/:category/products': '/shopCategoriesPages/$1/products',
    '/shop/categories/:category': '/shopCategoriesPages/$1',
    '/shop/categories': '/shopCategories',
  })
)

server.use(router)

server.listen(8888, () => {
  console.log('JSON Server is running')
})
