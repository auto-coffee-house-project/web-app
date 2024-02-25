import useBotStore from './useBotStore.js'
import { getShop, updateShop } from '../services/api.js'
import { defineStore } from 'pinia'

export default defineStore('shop', {
  state: () => ({
    isLoading: false,
    eachNthSaleFree: null,
    name: '',
    giftName: '',
    giftPhoto: null,
    startText: '',
    isMenuShown: false,
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
    async update({ eachNthSaleFree, startText, giftName, isMenuShown }) {
      const botStore = useBotStore()

      try {
        this.isLoading = true
        const { data } = await updateShop({
          botId: botStore.id,
          eachNthSaleFree,
          giftName,
          startText,
          isMenuShown,
        })

        this.eachNthSaleFree = data.value.result.each_nth_sale_free
        this.giftName = data.value.result.gift_name
        this.giftPhotoUrl = data.value.result.gift_photo_url
        this.isMenuShown = data.value.result.is_menu_shown
        this.startText = data.value.result.start_text
      } finally {
        this.isLoading = false
      }
    },
  },
})