import { useBotStore } from './bot.js'
import { getShop, updateShop } from '../services/api'
import { defineStore } from 'pinia'

export const useShopStore = defineStore('shop', {
  state: () => ({
    isLoading: false,
    eachNthSaleFree: null,
    name: '',
    giftName: '',
    giftPhoto: null,
    startText: '',
    isMenuShown: false,
    birthdayOfferAfterNthSale: null,
  }),
  actions: {
    async fetch() {
      const botStore = useBotStore()

      try {
        this.isLoading = true
        const { data } = await getShop({ botId: botStore.id })

        this.eachNthSaleFree = data.value.result.each_nth_sale_free
        this.name = data.value.result.name
        this.giftName = data.value.result.gift_name
        this.giftPhoto = data.value.result.gift_photo
        this.isMenuShown = data.value.result.is_menu_shown
        this.startText = data.value.result.start_text
      } finally {
        this.isLoading = false
      }
    },
    async update({ eachNthSaleFree, startText, giftName, giftPhoto, isMenuShown, birthdayOfferAfterNthSale }) {
      const botStore = useBotStore()

      try {
        this.isLoading = true
        const { data } = await updateShop({
          botId: botStore.id,
          eachNthSaleFree,
          giftName,
          giftPhoto,
          startText,
          isMenuShown,
          birthdayOfferAfterNthSale,
        })

        this.eachNthSaleFree = data.value.result.each_nth_sale_free
        this.giftName = data.value.result.gift_name
        this.giftPhotoUrl = data.value.result.gift_photo_url
        this.isMenuShown = data.value.result.is_menu_shown
        this.startText = data.value.result.start_text
        this.birthdayOfferAfterNthSale = data.value.result.birthdays_offer_after_nth_sale
      } finally {
        this.isLoading = false
      }
    },
  },
})