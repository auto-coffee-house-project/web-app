import { defineStore } from 'pinia'
import { getClient } from '../services/api.js'
import useBotStore from './useBotStore.js'
import useUserStore from './useUserStore.js'
import useShopStore from './useShopStore.js'


export default defineStore('client', {
  state: () => ({
    isLoading: false,
    currentCupsCount: null,
    hasGift: null,
  }),
  actions: {
    async fetch() {
      const botStore = useBotStore()
      const userStore = useUserStore()

      try {
        this.isLoading = true
        const { data } = await getClient({
          botId: botStore.id,
          userId: userStore.id,
        })
        this.currentCupsCount = data.value.result.current_cups_count
        this.hasGift = data.value.result.has_gift
      } finally {
        this.isLoading = false
      }
    },
  },
  getters: {
    currentProgress(state) {
      const shopStore = useShopStore()

      return state.hasGift ? shopStore.eachNthSaleFree : state.currentCupsCount
    }
  }
})