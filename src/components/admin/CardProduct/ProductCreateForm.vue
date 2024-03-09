<template>
  <p class="text-2xl font-bold my-3">Создать товар</p>
  <ProductForm @submit="onCreateProduct"/>
</template>

<script setup>
import ProductForm from './ProductForm.vue'
import useBotStore from '../../../stores/useBotStore.js'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { createProduct } from '../../../services/api.js'

const botStore = useBotStore()
const router = useRouter()
const toast = useToast()

const onCreateProduct = async ({ name, price, categoryNames, photo }) => {
  const requestData = {
    botId: botStore.id,
    name,
    price,
    categoryNames,
    photo,
  }
  const { statusCode } = await createProduct(requestData)

  await router.push({ name: 'admin-shop-menu' })

  if (statusCode.value !== 201) {
    toast.add({ severity: 'error', life: 2000, summary: 'Ошибка', detail: 'Не удалось создать товар' })
  } else {
    toast.add({ severity: 'success', life: 2000, summary: 'Успешно', detail: 'Товар создан' })
  }
}
</script>
