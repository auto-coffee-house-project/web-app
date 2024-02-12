import { defineStore } from 'pinia'
import { getClientStatistics } from '../services/api.js'


export default defineStore('clientStatistics', {
  state: () => ({
    isLoading: false,
    data: null,
  }),
  actions: {
    async fetchClientStatistics({ botId, userId }) {
      try {
        this.isLoading = true
        const { data } = await getClientStatistics({ botId, userId })
        this.data = data.value.result
      } finally {
        this.isLoading = false
      }
    },
  },
})