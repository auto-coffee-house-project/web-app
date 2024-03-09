import useApiFetch from '../useApiFetch.js'

export const getProducts = ({ botId }) => {
  const url = `/shops/products/`
  return useApiFetch(url, {
    headers: {
      'bot-id': botId,
    },
  }).json()
}

export const createProduct = ({ botId, name, price, categoryNames, photo }) => {
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
    photo,
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

export const updateProduct = ({ botId, productId, name, photo, price, categoryNames }) => {
  const url = `/shops/products/${productId}/`
  return useApiFetch(url, {
    headers: {
      'bot-id': botId,
    },
  }).put({
    name,
    price,
    photo,
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