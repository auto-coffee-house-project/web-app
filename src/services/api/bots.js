import useApiFetch from '../useApiFetch.js'

export const getBot = ({ botId }) => {
  const url = '/telegram/bots/me/'
  return useApiFetch(url, {
    headers: {
      'bot-id': botId,
    },
  }).json()
}


export const updateBot = ({ botId, startText, saleCreatedText, giftGivenText }) => {
  const url = `/telegram/bots/me/`
  return useApiFetch(url, {
    headers: {
      'bot-id': botId,
    },
  }).put(
    {
      start_text: startText,
      sale_created_text: saleCreatedText,
      gift_given_text: giftGivenText,
    },
  ).json()
}
