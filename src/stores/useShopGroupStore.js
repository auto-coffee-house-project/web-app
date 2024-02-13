import useBotStore from './useBotStore.js'
import { getShopGroup, updateShopGroup } from '../services/api.js'
import { defineStore } from 'pinia'

export default defineStore('shopGroup', {
  state: () => ({
    isLoading: false,
    eachNthCupFree: null,
    giftName: '',
    giftPhotoUrl: null,
    isMenuShown: false,
  }),
  actions: {
    async fetch() {
      const botStore = useBotStore()

      try {
        this.isLoading = true
        const { data } = await getShopGroup({ botId: botStore.id })

        this.eachNthCupFree = data.value.result.each_nth_cup_free
        this.giftName = data.value.result.gift_name
        this.giftPhotoUrl = data.value.result.gift_photo_url
        this.isMenuShown = data.value.result.is_menu_shown
      } finally {
        this.isLoading = false
      }
    },
    async update({ eachNthCupFree, giftName, giftPhotoUrl, isMenuShown }) {
      const botStore = useBotStore()

      try {
        this.isLoading = true
        const { data } = await updateShopGroup({
          botId: botStore.id,
          eachNthCupFree,
          giftName,
          giftPhotoUrl,
          isMenuShown,
        })

        this.eachNthCupFree = data.value.result.each_nth_cup_free
        this.giftName = data.value.result.gift_name
        this.giftPhotoUrl = data.value.result.gift_photo_url
        this.isMenuShown = data.value.result.is_menu_shown
      } finally {
        this.isLoading = false
      }
    },
  },
})