export const clearArrayExceptLast = array => {
  if (array.length >= 2) array.splice(0, array.length - 1)
}
