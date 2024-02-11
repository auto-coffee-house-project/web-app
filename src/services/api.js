import useApiFetch from './useApiFetch.js'

export const getUser = ({ userId, botId }) => {
  const url = `/telegram/users/?user_id=${userId}&bot_id=${botId}`
  return useApiFetch(url).json()
}

export const getShopGroup = botId => {
  const url = `/shops/groups/bots/${botId}/`
  return useApiFetch(url).json()
}


export const getBot = ({ botId }) => {
  const url = `/telegram/bots/${botId}/`
  return useApiFetch(url).json()
}


export const updateBot = ({ botId, startText, startTextClientWebApp }) => {
  const url = `/telegram/bots/${botId}/`
  return useApiFetch(url)
    .put({
      start_text: startText,
      start_text_client_web_app: startTextClientWebApp,
    })
    .json()
}

export const getClientStatistics = ({ userId, botId }) => {
  const url = `/shops/clients/statistics/?bot_id=${botId}&user_id=${userId}`
  return useApiFetch(url).json()
}

export const createSaleCode = ({ botId, clientUserId }) => {
  const url = `/shops/codes/`
  return useApiFetch(url)
    .post({
      bot_id: botId,
      client_user_id: clientUserId,
    })
    .json()
}

export const createInvitation = ({ botId, adminUserId }) => {
  const url = '/shops/invitations/'
  return useApiFetch(url)
    .post({
      bot_id: botId,
      admin_user_id: adminUserId,
    })
    .json()
}

export const deleteSalesman = ({ botId, salesmanUserId }) => {
  const url = `/shops/salesmans/?user_id=${salesmanUserId}&bot_id=${botId}`
  return useApiFetch(url).delete().json()
}