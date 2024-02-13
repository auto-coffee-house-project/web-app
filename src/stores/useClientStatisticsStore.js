import { defineStore } from 'pinia'
import { getClientStatistics } from '../services/api.js'
import useBotStore from './useBotStore.js'
import useUserStore from './useUserStore.js'


export default defineStore('clientStatistics', {
  state: () => ({
    isLoading: false,
    data: null,
  }),
  actions: {
    async fetch() {
      const botStore = useBotStore()
      const userStore = useUserStore()

      try {
        this.isLoading = true
        const { data } = await getClientStatistics({
          botId: botStore.id,
          userId: userStore.id,
        })
        this.data = data.value.result
      } finally {
        this.isLoading = false
      }
    },
  },
})