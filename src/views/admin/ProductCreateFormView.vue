<template>
  <AdminNavbar/>
  <BasicContainer>
    <form class="flex flex-col gap-y-4" @submit.prevent>
      <div class="flex flex-col">
        <label for="name" class="font-bold block mb-2">Название</label>
        <InputText id="name" type="text" v-model="productName"/>
      </div>
      <div class="flex flex-col">
        <label for="price" class="font-bold block">Цена</label>
        <InputNumber
          id="price"
          :minFractionDigits="0"
          :maxFractionDigits="2"
          v-model="productPrice"
        />
      </div>
      <div class="flex flex-col">
        <label for="categories" class="font-bold">Теги</label>
        <Chips id="categories" v-model="categoryNames" separator=","/>
        <small>Можно указать несколько тегов через запятую</small>
      </div>
      <Button
        type="submit"
        icon="pi pi-file-edit"
        label="Сохранить"
        @click="onCreateProduct"
      />
      <RouterLink :to="{ name: 'admin-shop-menu' }">
        <Button
          class="w-full"
          outlined
          icon="pi pi-arrow-left"
          label="Назад"
          type="button"
          severity="secondary"
        />
      </RouterLink>
    </form>
  </BasicContainer>
</template>

<script setup>
import Button from 'primevue/button'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import Chips from 'primevue/chips'
import { ref } from 'vue'
import BasicContainer from '../../layouts/BasicContainer.vue'
import AdminNavbar from '../../components/admin/AdminNavbar.vue'
import { createProduct } from '../../services/api.js'
import useBotStore from '../../stores/useBotStore.js'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'

const botStore = useBotStore()
const router = useRouter()
const toast = useToast()

const productName = ref()
const productPrice = ref()
const categoryNames = ref()

const onCreateProduct = async () => {
  const requestData = {
    botId: botStore.id,
    name: productName.value,
    price: productPrice.value,
    categoryNames: categoryNames.value || [],
  }
  const { data, error } = await createProduct(requestData)

  const productId = data.value?.result?.id

  if (error.value || productId === undefined) {
    await router.push({ name: 'admin-shop-menu' })
    toast.add({ severity: 'error', life: 2000, summary: 'Ошибка', detail: error.value })
  } else {
    await router.push({ name: 'admin-product', params: { id: productId } })
    toast.add({ severity: 'success', life: 2000, summary: 'Успешно', detail: 'Товар создан' })
  }
}
</script>
