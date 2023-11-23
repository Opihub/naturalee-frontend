import { capitalize } from '@/utils/capitalize'

export function getFormattedDate(date, locale = 'it-IT') {
  const newDate = date.toLocaleDateString(locale, {
    weekday: 'short',
    // year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return newDate
    .split(' ')
    .map((part) => capitalize(part))
    .join(' ')
}

export function getToday() {
  return new Date(new Date().setDate(new Date().getDate() + 1))
}

export function getEaster(years, nextDay = true) {
  const dates = []

  years.forEach((year) => {
    const y = year

    const a = y % 19
    const b = Math.floor(y / 100)
    const c = y % 100
    const d = Math.floor(b / 4)
    const e = b % 4
    const f = Math.floor((b + 8) / 25)
    const g = Math.floor((b - f + 1) / 3)
    const h = (19 * a + b - d - g + 15) % 30
    const i = Math.floor(c / 4)
    const k = c % 4
    const l = (32 + 2 * e + 2 * i - h - k) % 7
    const m = Math.floor((a + 11 * h + 22 * l) / 451)
    const n = Math.floor((h + l - 7 * m + 114) / 31)
    const p = (h + l - 7 * m + 114) % 31

    const month = n
    const day = p + 1

    const easter = new Date(`${y}-${month}-${day}`)
    dates.push(easter)

    if (nextDay) {
      const easterMonday = new Date(easter.valueOf())
      easterMonday.setDate(easter.getDate() + 1)

      dates.push(easterMonday)
    }
  })

  return dates
}
