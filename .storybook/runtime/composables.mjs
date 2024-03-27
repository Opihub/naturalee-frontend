import { hash } from 'ohash'
import { $fetch } from 'ofetch'
import {
  getCurrentInstance,
  onBeforeMount,
  onServerPrefetch,
  onUnmounted,
  computed,
  reactive,
  ref,
  toRef,
  unref,
  watch,
} from 'vue'
import { createError } from '#app'

export const useNuxtApp = () => ({
  payload: { data: {}, _errors: {} },
  static: { data: {}, _errors: {} },
  _asyncData: {},
  _asyncDataPromises: {},
})

export const useRuntimeConfig = () => ({
  public: {
    title: process.env.APP_TITLE,
    endpoint: process.env.API_ENDPOINT_URL || '/',
  },
})

export function useFetch(request, arg1, arg2) {
  const [opts = {}, autoKey] =
    typeof arg1 === 'string' ? [{}, arg1] : [arg1, arg2]
  const _key =
    opts.key ||
    hash([
      autoKey,
      unref(opts.baseURL),
      typeof request === 'string' ? request : '',
      unref(opts.params || opts.query),
    ])
  if (!_key || typeof _key !== 'string') {
    throw new TypeError('[nuxt] [useFetch] key must be a string: ' + _key)
  }
  if (!request) {
    throw new Error('[nuxt] [useFetch] request is missing.')
  }
  const key = _key === autoKey ? '$f' + _key : _key
  const _request = computed(() => {
    let r = request
    if (typeof r === 'function') {
      r = r()
    }
    return unref(r)
  })
  if (
    !opts.baseURL &&
    typeof _request.value === 'string' &&
    _request.value.startsWith('//')
  ) {
    throw new Error(
      '[nuxt] [useFetch] the request URL must not start with "//".'
    )
  }
  const {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick,
    watch,
    immediate,
    ...fetchOptions
  } = opts
  const _fetchOptions = reactive({
    ...fetchOptions,
    cache: typeof opts.cache === 'boolean' ? void 0 : opts.cache,
  })
  const _asyncDataOptions = {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick,
    immediate,
    watch: watch === false ? [] : [_fetchOptions, _request, ...(watch || [])],
  }
  let controller
  const asyncData = useAsyncData(
    key,
    () => {
      controller?.abort?.()
      controller =
        typeof AbortController !== 'undefined' ? new AbortController() : {}
      const isLocalFetch =
        typeof _request.value === 'string' && _request.value.startsWith('/')
      return $fetch(_request.value, {
        signal: controller.signal,
        ..._fetchOptions,
      })
    },
    _asyncDataOptions
  )
  return asyncData
}

export function useLazyFetch(request, arg1, arg2) {
  const [opts, autoKey] = typeof arg1 === 'string' ? [{}, arg1] : [arg1, arg2]
  return useFetch(
    request,
    {
      ...opts,
      lazy: true,
    },
    // @ts-expect-error we pass an extra argument with the resolved auto-key to prevent another from being injected
    autoKey
  )
}

const getDefault = () => null
export function useAsyncData(...args) {
  const autoKey =
    typeof args[args.length - 1] === 'string' ? args.pop() : void 0
  if (typeof args[0] !== 'string') {
    args.unshift(autoKey)
  }
  let [key, handler, options = {}] = args
  if (typeof key !== 'string') {
    throw new TypeError('[nuxt] [asyncData] key must be a string.')
  }
  if (typeof handler !== 'function') {
    throw new TypeError('[nuxt] [asyncData] handler must be a function.')
  }
  options.server = options.server ?? true
  options.default = options.default ?? getDefault
  options.lazy = options.lazy ?? false
  options.immediate = options.immediate ?? true
  const nuxt = useNuxtApp()
  const getCachedData = () =>
    nuxt.isHydrating ? nuxt.payload.data[key] : nuxt.static.data[key]
  const hasCachedData = () => getCachedData() !== void 0
  if (!nuxt._asyncData[key]) {
    nuxt._asyncData[key] = {
      data: ref(getCachedData() ?? options.default()),
      pending: ref(!hasCachedData()),
      error: toRef(nuxt.payload._errors, key),
      status: ref('idle'),
    }
  }
  const asyncData = { ...nuxt._asyncData[key] }
  asyncData.refresh = asyncData.execute = (opts = {}) => {
    if (nuxt._asyncDataPromises[key]) {
      if (opts.dedupe === false) {
        return nuxt._asyncDataPromises[key]
      }
      nuxt._asyncDataPromises[key].cancelled = true
    }
    if (
      (opts._initial || (nuxt.isHydrating && opts._initial !== false)) &&
      hasCachedData()
    ) {
      return getCachedData()
    }
    asyncData.pending.value = true
    asyncData.status.value = 'pending'
    const promise = new Promise((resolve, reject) => {
      try {
        resolve(handler(nuxt))
      } catch (err) {
        reject(err)
      }
    })
      .then((_result) => {
        if (promise.cancelled) {
          return nuxt._asyncDataPromises[key]
        }
        let result = _result
        if (options.transform) {
          result = options.transform(_result)
        }
        if (options.pick) {
          result = pick(result, options.pick)
        }
        asyncData.data.value = result
        asyncData.error.value = null
        asyncData.status.value = 'success'
      })
      .catch((error) => {
        if (promise.cancelled) {
          return nuxt._asyncDataPromises[key]
        }
        asyncData.error.value = error
        asyncData.data.value = unref(options.default())
        asyncData.status.value = 'error'
      })
      .finally(() => {
        if (promise.cancelled) {
          return
        }
        asyncData.pending.value = false
        nuxt.payload.data[key] = asyncData.data.value
        if (asyncData.error.value) {
          nuxt.payload._errors[key] = createError(asyncData.error.value)
        }
        delete nuxt._asyncDataPromises[key]
      })
    nuxt._asyncDataPromises[key] = promise
    return nuxt._asyncDataPromises[key]
  }
  const initialFetch = () => asyncData.refresh({ _initial: true })
  const fetchOnServer = options.server !== false && nuxt.payload.serverRendered
  if (process.server && fetchOnServer && options.immediate) {
    const promise = initialFetch()
    if (getCurrentInstance()) {
      onServerPrefetch(() => promise)
    } else {
      nuxt.hook('app:created', () => promise)
    }
  }
  if (process.client) {
    const instance = getCurrentInstance()
    if (instance && !instance._nuxtOnBeforeMountCbs) {
      instance._nuxtOnBeforeMountCbs = []
      const cbs = instance._nuxtOnBeforeMountCbs
      if (instance) {
        onBeforeMount(() => {
          cbs.forEach((cb) => {
            cb()
          })
          cbs.splice(0, cbs.length)
        })
        onUnmounted(() => cbs.splice(0, cbs.length))
      }
    }
    if (fetchOnServer && nuxt.isHydrating && hasCachedData()) {
      asyncData.pending.value = false
      asyncData.status.value = asyncData.error.value ? 'error' : 'success'
    } else if (
      instance &&
      ((nuxt.payload.serverRendered && nuxt.isHydrating) || options.lazy) &&
      options.immediate
    ) {
      instance._nuxtOnBeforeMountCbs.push(initialFetch)
    } else if (options.immediate) {
      initialFetch()
    }
    if (options.watch) {
      watch(options.watch, () => asyncData.refresh())
    }
    // const off = nuxt.hook('app:data:refresh', (keys) => {
    //   if (!keys || keys.includes(key)) {
    //     return asyncData.refresh()
    //   }
    // })
    // if (instance) {
    //   onUnmounted(off)
    // }
  }
  const asyncDataPromise = Promise.resolve(nuxt._asyncDataPromises[key]).then(
    () => asyncData
  )
  Object.assign(asyncDataPromise, asyncData)
  return asyncDataPromise
}

export function useLazyAsyncData(...args) {
  const autoKey =
    typeof args[args.length - 1] === 'string' ? args.pop() : void 0
  if (typeof args[0] !== 'string') {
    args.unshift(autoKey)
  }
  const [key, handler, options] = args
  return useAsyncData(key, handler, { ...options, lazy: true }, null)
}

function pick(obj, keys) {
  const newObj = {}
  for (const key of keys) {
    newObj[key] = obj[key]
  }
  return newObj
}
