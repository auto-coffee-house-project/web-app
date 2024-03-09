import { defineStore } from 'pinia'
import { getUser } from '../services/api'
import useBotStore from './useBotStore'

export default defineStore('user', {
  state: () => ({
    isLoading: false,
    id: null,
    firstName: '',
    lastName: '',
    username: '',
    role: '',
  }),
  actions: {
    async fetch() {
      const botStore = useBotStore()

      try {
        this.isLoading = true
        const { data } = await getUser({
          botId: botStore.id,
          userId: this.id,
        })

        this.firstName = data.value.result.first_name
        this.lastName = data.value.result.last_name
        this.username = data.value.result.username
        this.role = data.value.result.role
      } finally {
        this.isLoading = false
      }
    },
    setId(userId) {
      this.id = userId
    },
  },
  getters: {
    userFullName(state) {
      if (!state.lastName) return state.firstName
      return `${state.firstName} ${state.lastName}`
    },
  },
})