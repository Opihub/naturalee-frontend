import { ref } from '#imports'

export function useBillingAddress(data) {
  const address = ref({
    firstName: data.value.firstName,
    lastName: data.value.lastName,
    country: data.value.country,
    address: data.value.address,
    address2: data.value.address2,
    province: data.value.province,
    city: data.value.city,
    postcode: data.value.postcode,
    phone: data.value.phone,
  })

  const invoice = ref({
    invoice: data.value.invoice,
    company: data.value.company,
    cfPrivate: data.value.cfPrivate,
    cfCompany: data.value.cfCompany,
    vat: data.value.vat,
    sdi: data.value.sdi,
    pec: data.value.pec,
  })

  return {
    address,
    invoice,
  }
}
