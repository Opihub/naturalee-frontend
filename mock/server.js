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

function makeid(length) {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  let counter = 0
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
    counter += 1
  }
  return result
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

server.post('/v1/shop/checkout/validate/shipping', (request, response) => {
  const { body } = request
  let { statusCode } = response
  let data = []

  if (
    !body.city ||
    !body.country ||
    !body.state ||
    !body.postcode ||
    isNaN(body.postcode)
  ) {
    statusCode = 403
  } else {
    data = [
      {
        id: 'free',
        title: 'Spedizione gratuita',
        price: 0,
      },
      {
        id: 'pick-up',
        title: 'Ritiro in sede',
        price: 0,
      },
    ]
  }

  response.jsonp(createResponse(statusCode, data))
})

server.post('/v1/auth/login', (request, response) => {
  const { body } = request
  let { statusCode } = response
  let data = false
  const { profile } = DB

  if (
    !body.username ||
    !body.password ||
    ![profile.email, profile.username].includes(body.username)
  ) {
    statusCode = 403
  } else {
    data = { ...profile, token: 'token.jwt.test' }
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
    data = { ...profile, token: 'token.jwt.test' }
  }

  response.status(statusCode).jsonp(createResponse(statusCode, data))
})

server.post('/v1/auth/password-recovery', (request, response) => {
  const { body } = request
  let { statusCode } = response
  let data = false
  const { profile } = DB

  if (!body.user || ![profile.email, profile.username].includes(body.user)) {
    statusCode = 403
  } else {
    data = true
  }

  response.status(statusCode).jsonp(createResponse(statusCode, data))
})

server.post('/v1/shop/cart/add', (request, response) => {
  const { body } = request
  let { statusCode } = response
  let data = false

  const { id, quantity } = body

  if (!id || !quantity) {
    statusCode = 403
  } else {
    data = {
      id,
      variationId: id,
      quantity: random(1, 5) + quantity,
      key: makeid(40),
    }
  }

  response.status(statusCode).jsonp(createResponse(statusCode, data))
})

server.delete('/v1/shop/cart/remove', (request, response) => {
  const { body } = request
  let { statusCode } = response
  let data = false

  const { id } = body

  if (!id) {
    statusCode = 403
  } else {
    data = true
  }

  response.status(statusCode).jsonp(createResponse(statusCode, data))
})

server.get('/v1/shop/cart/clear', (request, response) => {
  response.jsonp(createResponse(200, true))
})

server.post('/v1/shop/cart/update', (request, response) => {
  response.jsonp(createResponse(200, true))
})

server.post('/v1/shop/wishlist/add', (request, response) => {
  const { body } = request
  let { statusCode } = response
  let data = false

  const { id } = body

  if (!id) {
    statusCode = 403
  } else {
    data = {
      id,
      variationId: id,
    }
  }

  response.status(statusCode).jsonp(createResponse(statusCode, data))
})

server.delete('/v1/shop/wishlist/remove', (request, response) => {
  const { body } = request
  let { statusCode } = response
  let data = false

  const { id } = body

  if (!id) {
    statusCode = 403
  } else {
    data = true
  }

  response.status(statusCode).jsonp(createResponse(statusCode, data))
})

server.get('/v1/shop/wishlist/clear', (request, response) => {
  response.jsonp(createResponse(200, true))
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
    '/shop/wishlist/products': '/shopCartProducts',
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
