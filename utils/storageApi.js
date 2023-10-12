import fs from 'fs'
import path from 'path'
import slugify from 'slugify'

function getPath() {
  return `${process.cwd()}/assets/fetch/`
}

export function saveJSON(url, data) {
  fs.writeFile(
    `${getPath()}${slugify(url)}.json`,
    JSON.stringify(data, null, 2),
    'utf8',
    (err) => {
      if (err) return console.log('An error happened', err)
      console.log(`File fetched from ${url} and written locally!`)
    }
  )
}

export function loadJSON(url, defaultData = null) {
  const file = `${getPath()}${slugify(url)}.json`

  if (!fs.existsSync(file)) {
    return defaultData
  }

  const data = fs.readFileSync(file, 'utf8')

  return JSON.parse(data)
}

export function clearJSON() {
  try {
    const files = fs.readdirSync(getPath())

    files.forEach((file) => {
      if (file === '.gitignore') {
        return
      }

      fs.unlinkSync(path.join(getPath(), file))
    })
  } catch (err) {
    console.log(err)
  }
}
