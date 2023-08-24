import { computed } from '#imports'

export function useMaxWidth(maxWidth, prefix = '') {
  const style = computed(() => {
    const style = {}

    if (maxWidth) {
      const key = [prefix, 'max', 'width'].filter((value) => value).join('-')

      style[`--${key}`] =
        typeof maxWidth === 'number'
          ? `${maxWidth}px`
          : maxWidth
    }

    return style
  })

  return { style }
}
