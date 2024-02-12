import { defineStore } from 'pinia'
import { getBot, updateBot } from '../services/api.js'


export default defineStore('bot', {
  state: () => ({
    isLoading: false,
    id: null,
    name: '',
    startText: '',
    startTextClientWebApp: '',
  }),
  actions: {
    async fetch() {
      try {
        this.isLoading = true
        const { data } = await getBot({ botId: this.id })

        this.name = data.value.result.name
        this.startText = data.value.result.start_text
        this.startTextClientWebApp = data.value.result.start_text_client_web_app
      } finally {
        this.isLoading = false
      }
    },
    async update({ startText, startTextClientWebApp }) {
      try {
        this.isLoading = true
        const { data } = await updateBot({
          botId: this.id,
          startText,
          startTextClientWebApp,
        })
        this.data = data.value.result
      } finally {
        this.isLoading = false
      }
    },
    setId(botId) {
      this.id = botId
    },
  },
})