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
import CardProductItem from '../../components/admin/cardProduct/CardProductItem.vue'
import AdminNavbar from '../../components/admin/AdminNavbar.vue'
import BasicContainer from '../../layouts/BasicContainer.vue'
import { useProductListStore } from '../../stores'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import CardProductCreateFloatingButton from '../../components/admin/cardProduct/CardProductCreateFloatingButton.vue'

const isVisible = ref(false)

const productListStore = useProductListStore()

const { products } = storeToRefs(productListStore)

onMounted(productListStore.fetch)
</script>
