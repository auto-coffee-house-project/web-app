import useApiFetch from '../useApiFetch.js'

export const createGiftCode = ({ botId, clientUserId }) => {
  const url = '/shops/gift-codes/'
  return useApiFetch(url, {
    headers: {
      'bot-id': botId,
    },
  }).post({
    client_user_id: clientUserId,
  }).json()
}
