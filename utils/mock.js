import mockData from '@/mock/db.json'

export function getFromMock(main, find = null) {
  if (!(main in mockData)) {
    throw new Error(`Missing data ${main}`)
  }

  const data = mockData[main]
  if (!find) {
    return data
  }

  const sub = data.find((item) => item.id === find)

  if (!sub) {
    throw new Error(`Missing sub ${find} in main ${main}`)
  }

  if (!('records' in sub)) {
    throw new Error(`Missing records for sub ${find}`)
  }

  return sub.records
}
