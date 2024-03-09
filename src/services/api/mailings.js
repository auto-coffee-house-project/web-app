import useApiFetch from '../useApiFetch.js'

export const createMailing = ({ userId, botId, text, parseMode, buttons, photo }) => {
  const requestData = {
    text,
    parse_mode: parseMode,
    buttons,
    user_id: userId,
    photo: photo,
  }
  const url = `/mailing/`
  return useApiFetch(url, {
    headers: {
      'bot-id': botId,
    },
  }).post(requestData).json()
}
