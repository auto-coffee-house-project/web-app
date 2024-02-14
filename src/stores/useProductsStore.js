import { defineStore } from 'pinia'
import { getProducts } from '../services/api.js'
import useBotStore from './useBotStore.js'


export default defineStore('products', {
  state: () => ({
    isLoading: false,
    products: [],
  }),
  actions: {
    async fetch() {
      const botStore = useBotStore()

      try {
        this.isLoading = true

        const { data } = await getProducts({
          botId: botStore.id,
        })

        this.products = data.value.result
      } finally {
        this.isLoading = false
      }
    },
  },
  getters: {
    categoryProducts(state) {
      const result = {}
      for (const product of state.products) {

        for (const category of product.categories) {
          if (!result[category.id]) {
            result[category.id] = { products: [], category }
          }
          result[category.id].products.push(product)
        }
      }
      return Object.values(result)
    },
  },
})
