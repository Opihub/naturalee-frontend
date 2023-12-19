import { joinURL, encodePath, encodeParam } from 'ufo'
import type { ProviderGetImage } from '@nuxt/image'
import { createOperationsGenerator } from '#image'

const operationsGenerator = createOperationsGenerator({
  keyMap: {
    format: 'f',
    fit: 'fit',
    width: 'w',
    height: 'h',
    resize: 's',
    quality: 'q',
    background: 'b'
  },
  joinWith: '&',
  formatter: (key, val) => encodeParam(key) + '_' + encodeParam(val)
})

export const getImage: ProviderGetImage = (src, { modifiers = {}, baseURL } = {}, ctx) => {
  if (modifiers.width && modifiers.height) {
    modifiers.resize = `${modifiers.width}x${modifiers.height}`
    delete modifiers.width
    delete modifiers.height
  }

 const operations = operationsGenerator(modifiers)

   if (!baseURL) {
    // also support runtime config 
    baseURL = useRuntimeConfig().public.siteUrl
  }


  return {
    url: joinURL(baseURL, encodePath(src) + (operations ? '?' + operations : ''))
  }
}

export const validateDomains = true
export const supportsAlias = true