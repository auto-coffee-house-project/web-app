import useApiFetch from './useApiFetch.js'

export const getUser = ({ userId, botId }) => {
  const url = `/telegram/users/${userId}/`
  return useApiFetch(url, {
    headers: {
      'bot-id': botId,
    },
  }).json()
}

export const getShop = ({ botId }) => {
  const url = '/shops/me/'
  return useApiFetch(url, {
    headers: {
      'bot-id': botId,
    },
  }).json()
}


export const updateShop = ({ botId, eachNthSaleFree, giftName, isMenuShown, startText }) => {
  const url = `/shops/groups/bots/${botId}/`
  return useApiFetch(url, {
    headers: {
      'bot-id': botId,
    },
  }).put({
    each_nth_sale_free: eachNthSaleFree,
    gift_name: giftName,
    is_menu_shown: isMenuShown,
    start_text: startText,
  }).json()
}


export const getBot = ({ botId }) => {
  const url = '/telegram/bots/me/'
  return useApiFetch(url, {
    headers: {
      'bot-id': botId,
    },
  }).json()
}


export const updateBot = ({ botId, startText }) => {
  const url = `/telegram/bots/${botId}/`
  return useApiFetch(url, {
    headers: {
      'bot-id': botId,
    },
  }).put(
    {
      start_text: startText,
    },
  ).json()
}

export const getClient = ({ userId, botId }) => {
  const url = `/shops/clients/users/${userId}/`
  return useApiFetch(url, {
    headers: {
      'bot-id': botId,
    },
  }).json()
}

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

export const createInvitation = ({ botId, adminUserId }) => {
  const url = '/shops/invitations/'
  return useApiFetch(url, {
    headers: {
      'bot-id': botId,
    },
  }).post({
    admin_user_id: adminUserId,
  }).json()
}

export const deleteEmployee = ({ botId, employeeId }) => {
  const url = `/shops/employees/${employeeId}/`
  return useApiFetch(url, {
    headers: {
      'bot-id': botId,
    },
  }).delete().json()
}

export const getEmployees = ({ botId }) => {
  const url = '/shops/employees/'
  return useApiFetch(url, {
    headers: {
      'bot-id': botId,
    },
  }).json()
}

export const getProducts = ({ botId }) => {
  const url = `/shops/products/`
  return useApiFetch(url, {
    headers: {
      'bot-id': botId,
    },
  }).json()
}

export const createProduct = ({ botId, name, price, categoryNames }) => {
  const url = `/shops/products/`
  return useApiFetch(url, {
      headers: {
        'bot-id': botId,
      },
    },
  ).post({
    name,
    price,
    category_names: categoryNames,
  }).json()
}


export const getProduct = ({ botId, productId }) => {
  const url = `/shops/products/${productId}/`
  return useApiFetch(url, {
    headers: {
      'bot-id': botId,
    },
  }).json()
}

export const updateProduct = ({ botId, productId, name, price, categoryNames, photo }) => {
  const url = `/shops/products/${productId}/`
  return useApiFetch(url, {
    headers: {
      'bot-id': botId,
    },
  }).put({
    name,
    price,
    category_names: categoryNames,
  }).json()
}

export const deleteProduct = ({ botId, productId }) => {
  const url = `/shops/products/${productId}/`
  return useApiFetch(url, {
    headers: {
      'bot-id': botId,
    },
  }).delete().json()
}
