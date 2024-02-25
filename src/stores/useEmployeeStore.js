import { defineStore } from 'pinia'
import { deleteEmployee, getEmployees } from '../services/api.js'
import useBotStore from './useBotStore.js'
import useUserStore from './useUserStore.js'

export default defineStore('employee', {
  state: () => ({
    isLoading: false,
    shopName: '',
    employees: [],
  }),
  actions: {
    async fetch() {
      const botStore = useBotStore()
      const userStore = useUserStore()

      try {
        this.isLoading = true
        const { data } = await getEmployees({
          botId: botStore.id,
          adminUserId: userStore.id,
        })

        this.employees = data.value.result.employees
        this.shopName = data.value.result.shop_name
      } finally {
        this.isLoading = false
      }
    },
    async delete({ employeeId }) {
      const botStore = useBotStore()

      await deleteEmployee({
        botId: botStore.id,
        employeeId,
      })
    }
  },
})