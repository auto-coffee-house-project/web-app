import useApiFetch from '../useApiFetch.js'

export const getShop = ({ botId }) => {
  const url = '/shops/me/'
  return useApiFetch(url, {
    headers: {
      'bot-id': botId,
    },
  }).json()
}


export const updateShop = (
  {
    botId,
    eachNthSaleFree,
    giftName,
    giftPhoto,
    isMenuShown,
    startText,
    birthdayOfferAfterNthSale,
  }) => {
  const url = `/shops/me/`
  return useApiFetch(url, {
    headers: {
      'bot-id': botId,
    },
  }).patch({
    each_nth_sale_free: eachNthSaleFree,
    gift_name: giftName,
    gift_photo: giftPhoto,
    is_menu_shown: isMenuShown,
    start_text: startText,
    birthdays_offer_after_nth_sale: birthdayOfferAfterNthSale,
  }).json()
}

