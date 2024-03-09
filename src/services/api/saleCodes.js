import useApiFetch from '../useApiFetch.js'

export const createSaleCode = ({ botId, clientUserId }) => {
  const url = `/shops/sale-codes/`
  return useApiFetch(url, {
    headers: {
      'bot-id': botId,
    },
  }).post({
    client_user_id: clientUserId,
  }).json()
}
