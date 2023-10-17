import fs from 'fs'
import path from 'path'
import slugify from 'slugify'

function getPath() {
  return `${process.cwd()}/assets/fetch/`
}

export function saveJSON(url, data) {
  try {
    fs.writeFileSync(
      `${getPath()}${slugify(url)}.json`,
      JSON.stringify(data, null, 2),
      'utf8'
    )

    console.log(`File fetched from ${url} and written locally!`)
  } catch (error) {
    console.error(`An error happened while fetching from ${url}`, error)
  }
}

export function loadJSON(url, defaultData = null) {
  const file = `${getPath()}${slugify(url)}.json`

  if (!fs.existsSync(file)) {
    return defaultData
  }

  const data = fs.readFileSync(file, 'utf8')

  return JSON.parse(data) || defaultData
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
