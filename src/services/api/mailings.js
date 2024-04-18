import useApiFetch from '../useApiFetch.js'

export const createMailing = ({ user_id, bot_id, text, parse_mode, buttons, photo, segregation_options }) => {
  const url = '/mailing/'
  return useApiFetch(url, {
    headers: {
      'bot-id': bot_id,
    },
  }).post({
    text,
    parse_mode,
    buttons,
    user_id,
    photo,
    segregation_options,
  }).json()
}
