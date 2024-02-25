<template>
  <AdminNavbar/>
  <BasicContainer>
    <CardSkeleton v-if="isLoading"/>
    <template v-else>
      <p class="text-2xl font-bold my-3">Редактировать товар</p>
      <ConfirmPopup class="mx-2"/>
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
        <CardProductUpdatePhotoUpload
          :bot-id="botId"
          :product-id="productId"
        />
        <Button
          icon="pi pi-file-edit"
          type="submit"
          label="Сохранить"
          @click="onUpdateProduct"
        />
        <Button
          icon="pi pi-trash"
          label="Удалить"
          severity="danger"
          @click="onDeleteProduct"
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
    </template>
  </BasicContainer>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { deleteProduct, getProduct, updateProduct } from '../../services/api.js'
import useBotStore from '../../stores/useBotStore.js'
import BasicContainer from '../../layouts/BasicContainer.vue'
import AdminNavbar from '../../components/admin/AdminNavbar.vue'
import Button from 'primevue/button'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import Chips from 'primevue/chips'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import CardSkeleton from '../../components/skeletons/CardSkeleton.vue'
import ConfirmPopup from 'primevue/confirmpopup'
import CardProductUpdatePhotoUpload from '../../components/admin/CardProduct/CardProductPhotoUpload.vue'

const router = useRouter()
const route = useRoute()
const botStore = useBotStore()
const confirm = useConfirm();
const toast = useToast()

const botId = botStore.id
const productId = Number(route.params.id)

const isLoading = ref(true)
const productName = ref()
const productPrice = ref()
const categoryNames = ref()
const photo = ref()


const parseResponse = product => {
  productName.value = product.name
  productPrice.value = Number(product.price)
  categoryNames.value = product.categories.map(category => category.name)
  photo.value = product.photo
}

const onUpdateProduct = async () => {
  const { data } = await updateProduct({
    productId,
    botId,
    name: productName.value,
    price: productPrice.value,
    categoryNames: categoryNames.value || [],
  })
  parseResponse(data.value.result)
  toast.add({ severity: 'success', summary: 'Успешно', detail: 'Товар обновлен', life: 3000 })
}

const onDeleteProduct = event => {
  confirm.require({
    target: event.currentTarget,
    message: 'Вы уверены, что хотите удалить товар?',
    icon: 'pi pi-exclamation-triangle',
    rejectClass: 'p-button-secondary p-button-outlined p-button-sm',
    acceptClass: 'p-button-sm p-button-danger',
    rejectLabel: 'Отменить',
    acceptLabel: 'Удалить',
    accept: async () => {
      await deleteProduct({ productId, botId })
      await router.push({ name: 'admin-shop-menu' })
      toast.add({ severity: 'warn', summary: 'Успешно', detail: 'Товар удален', life: 3000 })
    },
  })
}

onMounted(async () => {
  try {
    const { data } = await getProduct({ productId, botId })
    parseResponse(data.value.result)
  } finally {
    isLoading.value = false
  }
})
</script>
