// First import the useReCaptcha composable
import { useReCaptcha } from 'vue-recaptcha-v3'

export const useCaptcha = (action = 'submit') => {
  // initialize a instance
  const recaptchaInstance = useReCaptcha()

  const recaptcha = async () => {
    // optional you can await for the reCaptcha load
    await recaptchaInstance?.recaptchaLoaded()

    // get the token, a custom action could be added as argument to the method
    const token = await recaptchaInstance?.executeRecaptcha(action)

    return token
  }

  return {
    recaptcha,
  }
}
