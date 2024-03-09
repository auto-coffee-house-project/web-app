import useApiFetch from '../useApiFetch.js'

export const getUser = ({ userId, botId }) => {
  const url = `/telegram/users/${userId}/`
  return useApiFetch(url, {
    headers: {
      'bot-id': botId,
    },
  }).json()
}
