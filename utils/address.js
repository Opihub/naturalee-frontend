/**
 * Determina se un indirizzo ha tutti i campi valorizzati
 *
 * @param {object|null} address
 * @returns boolean
 */
export function isAddressComplete(address) {
  if (!address) {
    return false
  }

  return (
    address.firstName &&
    address.lastName &&
    address.country &&
    address.address &&
    address.province &&
    address.city &&
    address.postcode &&
    address.phone
  )
}

/**
 * Determina se un indirizzo ha almeno un campo valorizzato
 *
 * @param {object|null} address
 * @returns boolean
 */
export function isAddressFilled(address) {
  if (!address) {
    return false
  }

  return (
    address.firstName ||
    address.lastName ||
    address.country ||
    address.address ||
    address.province ||
    address.city ||
    address.postcode ||
    address.phone
  )
}
