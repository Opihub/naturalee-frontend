import { H3Event } from 'h3'

// https://gist.github.com/nathanchase/6440bf72d34c047498edcd4f35c15e2a
export default defineEventHandler(async (event: H3Event): Promise<unknown> => {

  const url = event.context.params?.api
  if (!url) {
    throw createError({
      statusCode: 403,
    })
  }

  console.info(
    'ext',
    `https://via.assets.so/img.jpg?w=400&h=150&tc=blue&bg=#cecece&t=v1/${url}`
  )
  return $fetch(`https://via.assets.so/img.jpg?w=400&h=150&tc=blue&bg=#cecece&t=v1/${url}`)
})
