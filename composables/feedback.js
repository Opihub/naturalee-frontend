import { reactive, computed } from '#imports'

export function useFeedback() {
  const defaultFeedback = () => {
    return {
      status: 'danger',
      message: null,
      errors: [],
    }
  }

  const feedback = reactive(defaultFeedback())

  const resetFeedback = () => {
    const { message, errors, status } = defaultFeedback()

    feedback.message = message
    feedback.errors = errors
    feedback.status = status
  }

  const setSuccess = () => {
    feedback.status = 'success'
  }

  const validateAddress = (address, after = '') => {
    if (
      !address.firstName ||
      !address.lastName ||
      !address.country ||
      !address.address ||
      !address.province ||
      !address.city ||
      !address.postcode
    ) {
      feedback.message = 'Compila tutti i campi obbligatori'

      if (!address.firstName) {
        feedback.errors.push(`Il nome è un campo obbligatorio${after}`)
      }

      if (!address.lastName) {
        feedback.errors.push(`Il cognome è un campo obbligatorio${after}`)
      }

      if (!address.country) {
        feedback.errors.push(`La nazione è un campo obbligatorio${after}`)
      }

      if (!address.address) {
        feedback.errors.push(`L'indirizzo è un campo obbligatorio${after}`)
      }

      if (!address.province) {
        feedback.errors.push(`La provincia è un campo obbligatorio${after}`)
      }

      if (!address.city) {
        feedback.errors.push(`La città è un campo obbligatorio${after}`)
      }

      if (!address.postcode) {
        feedback.errors.push(`Il CAP è un campo obbligatorio${after}`)
      }

      return false
    }

    return true
  }

  const validateInvoice = (invoice) => {
    const errors = []

    switch (invoice.invoice) {
      case 'private':
        if (!invoice.cfPrivate) {
          errors.push('Il codice fiscale è obbligatorio')
        }
        break

      case 'company':
        if (!invoice.cfCompany) {
          errors.push('Il codice fiscale è obbligatorio')
        }

        if (!invoice.company) {
          errors.push('La ragione sociale è un campo obbligatorio')
        }

        if (!invoice.vat) {
          errors.push('La partita IVA è obbligatoria')
        }

        if (!invoice.sdi && !invoice.pec) {
          errors.push(
            'È necessario specificare almeno un campo tra la PEC ed il Codice univoco'
          )
        }
        break

      default:
        break
    }

    feedback.errors = errors

    return errors.length === 0
  }

  const hasErrors = computed(() => {
    return feedback.errors.length > 0
  })

  const showFeedback = computed(() => {
    return hasErrors.value || feedback.message
  })

  return {
    feedback,
    hasErrors,
    showFeedback,
    resetFeedback,
    setSuccess,
    validateAddress,
    validateInvoice,
  }
}
