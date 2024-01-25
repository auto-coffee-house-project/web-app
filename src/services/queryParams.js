export const getBotData = () => {
  const url = new URL(window.location.href)
  const queryParams = Object.fromEntries(url.searchParams.entries())
  if (!queryParams.botId || !queryParams.botUsername) {
    return null
  }
  return {
    id: Number.parseInt(queryParams.botId),
    username: queryParams.botUsername,
  }
}
