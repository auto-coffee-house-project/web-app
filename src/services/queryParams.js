export const getBotId = () => {
  const url = new URL(window.location.href)
  const queryParams = Object.fromEntries(url.searchParams.entries())
  if (!queryParams.botId) return null
  return Number.parseInt(queryParams.botId)
}
