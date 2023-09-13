export function getElement(element) {
  return element?.value?.$el || element?.value || element?.$el || element
}
