import { useDateFormat, get } from '@vueuse/core'

export const clearArrayExceptLast = array => {
  if (array.length >= 2) array.splice(0, array.length - 1)
}

export const formatDate = date => {
  if (!date) return
  return get(useDateFormat(date, 'YYYY-MM-DD'))
}

export const formatDatesRange = datesRange => {
  if (!datesRange || datesRange.length === 0) return null
  const [from, to] = datesRange

  return {
    from_date: formatDate(from),
    to_date: formatDate(to),
  }
}
