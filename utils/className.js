export function assembleClassName(raw) {
  let classes = []

  if (Array.isArray(raw)) {
    classes = raw
  } else if (typeof raw === 'string') {
    classes.push(raw)
  } else if (typeof raw === 'object') {
    for (const [className, condition] of Object.entries(raw)) {
      if (condition) {
        classes.push(className)
      }
    }
  } else {
    console.warn(raw)
  }

  return classes
}
