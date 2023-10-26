export function generatePassword(
  length = 12,
  specialCharacters = true,
  extraSpecialCharacters = false
) {
  let characters =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  if (specialCharacters) {
    characters += '!@#$%^&*()'
  }
  if (extraSpecialCharacters) {
    characters += '-_ []{}<>~`+=,.;:/?|'
  }

  const charactersLength = characters.length

  let password = ''
  let counter = 0
  while (counter < length) {
    password += characters.charAt(Math.floor(Math.random() * charactersLength))
    counter += 1
  }

  return password
}
