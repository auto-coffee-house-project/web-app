import { defineStore } from 'pinia'
import { getBot, updateBot } from '../services/api'


export default defineStore('bot', {
  state: () => ({
    isLoading: false,
    id: null,
    name: '',
    username: '',
    startText: '',
    saleCreatedText: '',
    giftGivenText: '',
  }),
  actions: {
    async fetch() {
      try {
        this.isLoading = true
        const { data } = await getBot({ botId: this.id })

        this.name = data.value.result.name
        this.username = data.value.result.username
        this.startText = data.value.result.start_text
        this.saleCreatedText = data.value.result.sale_created_text
        this.giftGivenText = data.value.result.gift_given_text
      } finally {
        this.isLoading = false
      }
    },
    async update({ startText, saleCreatedText, giftGivenText }) {
      try {
        this.isLoading = true
        const { data } = await updateBot({
          botId: this.id,
          startText,
          saleCreatedText,
          giftGivenText,
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