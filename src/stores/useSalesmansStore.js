import { defineStore } from 'pinia'
import { deleteSalesman, getSalesmans } from '../services/api.js'
import useBotStore from './useBotStore.js'
import useUserStore from './useUserStore.js'

export default defineStore('salesman', {
  state: () => ({
    isLoading: false,
    shopName: '',
    salesmans: [],
  }),
  actions: {
    async fetch() {
      const botStore = useBotStore()
      const userStore = useUserStore()

      try {
        this.isLoading = true
        const { data } = await getSalesmans({
          botId: botStore.id,
          adminUserId: userStore.id,
        })

        this.salesmans = data.value.result.salesmans
        this.shopName = data.value.result.shop_name
      } finally {
        this.isLoading = false
      }
    },
    async delete({ salesmanUserId }) {
      const botStore = useBotStore()

      await deleteSalesman({
        botId: botStore.id,
        salesmanUserId,
      })
    }
  },
})