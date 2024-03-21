import useApiFetch from '../useApiFetch.js'

export const createMailing = ({ userId, botId, text, parseMode, buttons, photo, segregationOptions }) => {
  const requestData = {
    text,
    parse_mode: parseMode,
    buttons,
    user_id: userId,
    photo: photo,
    segregation_options: segregationOptions,
  }
  const url = `/mailing/`
  return useApiFetch(url, {
    headers: {
      'bot-id': botId,
    },
  }).post(requestData).json()
}
