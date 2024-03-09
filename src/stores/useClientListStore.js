import { defineStore } from 'pinia'
import { getClients } from '../services/api/index.js'
import useBotStore from './useBotStore.js'

export default defineStore('clientList', {
  state: () => ({
    clients: [],
    isLoading: false,
  }),
  actions: {
    async fetch() {
      this.isLoading = true
      try {
        const { data } = await getClients({ botId: useBotStore().id })
        this.clients = data.value.result
      } finally {
        this.isLoading = false
      }
    },
  },
})