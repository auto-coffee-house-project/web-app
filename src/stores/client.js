import { defineStore } from 'pinia'
import { getClient, updateClient } from '../services/api/index.js'
import { useBotStore } from './bot.js'
import { useShopStore } from './shop.js'


export const useClientStore = defineStore('client', {
  state: () => ({
    isLoading: false,
    id: null,
    user: {},
    totalPurchasesCount: null,
    freePurchasesCount: null,
    currentPurchasesCount: null,
    gifts: [],
    bornOn: null,
  }),

  actions: {
    async fetch({ userId }) {
      const botStore = useBotStore()

      this.isLoading = true
      try {
        const { data } = await getClient({
          botId: botStore.id,
          userId,
        })

        this.id = data.value.result.id
        this.user = data.value.result.user
        this.totalPurchasesCount = data.value.result.total_purchases_count
        this.freePurchasesCount = data.value.result.free_purchases_count
        this.currentPurchasesCount = data.value.result.current_cups_count
        this.gifts = data.value.result.gifts
        this.bornOn = data.value.result.born_on
      } finally {
        this.isLoading = false
      }
    },

    async update({ userId, bornOn, hasGift }) {
      const botStore = useBotStore()

      this.isLoading = true
      try {
        const { data } = await updateClient({
          botId: botStore.id,
          userId,
          bornOn,
          hasGift,
        })

        this.id = data.value.result.id
        this.user = data.value.result.user
        this.totalPurchasesCount = data.value.result.total_purchases_count
        this.freePurchasesCount = data.value.result.free_purchases_count
        this.currentPurchasesCount = data.value.result.current_purchases_count
        this.gifts = data.value.result.gifts
        this.bornOn = data.value.result.born_on
      } finally {
        this.isLoading = false
      }
    },
  },

  getters: {
    currentProgress(state) {
      const shopStore = useShopStore()
      return this.hasMainGift ? shopStore.eachNthSaleFree : state.currentPurchasesCount
    },

    mainGift(state) {
      return state.gifts.find(({ is_main }) => is_main) || null
    },

    hasMainGift() {
      return this.mainGift !== null
    },

    nonMainGifts(state) {
      return state.gifts.filter(({ is_main }) => !is_main)
    },

    hasNonMainGifts() {
      return this.nonMainGifts.length > 0
    },
  },
})
