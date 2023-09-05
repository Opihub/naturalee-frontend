export function getPasswordPattern() {
  return /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
}

export function pattern(pattern) {
  if (pattern instanceof RegExp) {
    return pattern.toString().replace(/^\/(.*)\/$/, '$1')
  }

  let regex = null

  switch (pattern) {
    case 'password':
      regex = getPasswordPattern()
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
