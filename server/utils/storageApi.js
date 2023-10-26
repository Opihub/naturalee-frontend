import fs from 'fs'
import path from 'path'
import slugify from 'slugify'

function getPath() {
  return `${process.cwd()}/assets/fetch/`
}

export async function saveJSON(url, data) {
  return fs.promises.writeFile(
    `${getPath()}${slugify(url)}.json`,
    JSON.stringify(data, null, 2),
    'utf8'
  )
}

export async function loadJSON(url, defaultData = null) {
  const file = `${getPath()}${slugify(url)}.json`


  const exists = await fs.promises
    .access(file, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false)

  if (!exists) {
    return defaultData
  }

  const data = await fs.promises.readFile(file, 'utf8')

  return JSON.parse(data) || defaultData
}

export async function clearJSON() {
  try {
    const files = await fs.promises.readdir(getPath())

    files.forEach(async (file) => {
      if (file === '.gitignore') {
        return
      }

      await fs.promises.unlink(path.join(getPath(), file))
    })
  } catch (err) {
    console.log(err)
  }
}

export default {
  save: saveJSON,
  load: loadJSON,
  clear: clearJSON,
}
