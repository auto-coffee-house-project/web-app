import useApiFetch from '../useApiFetch.js'

export const getClient = ({ userId, botId }) => {
  const url = `/shops/clients/users/${userId}/`
  return useApiFetch(url, {
    headers: {
      'bot-id': botId,
    },
  }).json()
}

export const updateClient = ({ botId, userId, bornOn, hasGift }) => {
  const url = `/shops/clients/users/${userId}/`
  return useApiFetch(url, {
    headers: {
      'bot-id': botId,
    },
  }).patch({
    born_on: bornOn,
    has_gift: hasGift,
  }).json()
}
