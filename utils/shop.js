export function isCategory(category = null) {
  return ['verdura', 'frutta', 'esotico', 'aromi', 'dispensa'].includes(
    category
  )
}

export function orderId(id) {
  return `#${id.toString().padStart(7, '0')}`
}
