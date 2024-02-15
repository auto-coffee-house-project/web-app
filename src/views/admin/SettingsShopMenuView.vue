<template>
  <AdminNavbar/>
  <BasicContainer>
    <CardProductCreateFloatingButton
      @click="isVisible = true"
      :is-visible="isVisible"
    />
    <InlineMessage
      severity="secondary"
      class="w-full"
    >
      Количество товаров: {{ products.length }}
    </InlineMessage>
    <CardProductItem
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </BasicContainer>
</template>

<script setup>
import InlineMessage from 'primevue/inlinemessage'
import CardProductItem from '../../components/admin/CardProduct/CardProductItem.vue'
import AdminNavbar from '../../components/admin/AdminNavbar.vue'
import BasicContainer from '../../layouts/BasicContainer.vue'
import useProductsStore from '../../stores/useProductsStore.js'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import CardProductCreateFloatingButton from '../../components/admin/CardProduct/CardProductCreateFloatingButton.vue'

const isVisible = ref(false)

const productsStore = useProductsStore()


const { products } = storeToRefs(productsStore)

onMounted(productsStore.fetch)
</script>