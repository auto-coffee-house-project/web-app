<template>
  <AdminNavbar/>
  <BasicContainer>
    <template v-if="!isProductsLoading">
      <Card
        v-for="product in products"
        :key="product.id"
      >
        {{ product }}
      </Card>
    </template>
    <CardSkeleton v-else/>
  </BasicContainer>
</template>

<script setup>
import AdminNavbar from '../../components/admin/AdminNavbar.vue'
import BasicContainer from '../../layouts/BasicContainer.vue'
import { useFetch } from '@vueuse/core'
import { ref } from 'vue'
import Card from 'primevue/card'
import CardSkeleton from '../../components/skeletons/CardSkeleton.vue'

const isProductsLoading = ref(true)
const products = ref([])

const loadShopProducts = () => {
  const {onFetchResponse, data} = useFetch('http://localhost:3000/products').json()
  onFetchResponse(() => {
    console.log(products.value)
    products.value = data.value?.result
    isProductsLoading.value = false
  })
}
</script>