import { useDateFormat } from '@vueuse/core'

export const clearArrayExceptLast = array => {
  if (array.length >= 2) array.splice(0, array.length - 1)
}

export const formatDate = date => {
  if (!date) return
  return useDateFormat(date, 'YYYY-MM-DD').value
}
