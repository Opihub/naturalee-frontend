/**
 * Minimo 8 caratteri, almeno una minuscola, almeno una maiuscola
 * e almeno un numero o un carattere speciale
 *
 * @returns RegExp
 */
export function getPasswordPattern() {
  return /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
}

export function getEmailPattern() {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
}

export function pattern(pattern, custom = false) {
  if (pattern instanceof RegExp) {
    return pattern.toString().replace(/^\/(.*)\/$/, '$1')
  }

  let regex = null

  switch (pattern) {
    case 'password':
      regex = getPasswordPattern()
      break
    case 'email':
      // Il controllo lato client viene già fatto dai browser
      if (!custom) {
        return null
      }
      regex = getEmailPattern()
      break
    /**
     * @link https://stackoverflow.com/questions/73974103/how-do-you-write-a-field-that-can-allow-both-username-and-email-address-in-an-ht
     */
    // case 'username':
    //   break

    default:
      return null
  }

  if (regex instanceof RegExp) {
    return regex.toString().replace(/^\/(.*)\/$/, '$1')
  }

  throw new Error('Pattern is not a valid Regular Expression')
}
