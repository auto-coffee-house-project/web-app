<template>
  <p class="text-2xl font-bold my-3">Редактировать товар</p>
  <ConfirmPopup class="mx-2"/>
  <ProductForm
    :is-delete-button-shown="true"
    @delete="onDeleteProduct"
    @submit="onUpdateProduct"
    v-model:name="name"
    v-model:price="price"
    v-model:category-names="categoryNames"
    v-model:photo="photo"
  />
</template>

<script setup>
import ProductForm from './ProductForm.vue'
import { useRoute, useRouter } from 'vue-router'
import useBotStore from '../../../stores/useBotStore.js'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import { onMounted, ref } from 'vue'
import { deleteProduct, getProduct, updateProduct } from '../../../services/api.js'
import ConfirmPopup from 'primevue/confirmpopup'

const router = useRouter()
const route = useRoute()
const botStore = useBotStore()
const confirm = useConfirm()
const toast = useToast()

const botId = botStore.id
const productId = Number.parseInt(route.params.id)

const name = ref('')
const price = ref(null)
const categoryNames = ref([])
const photo = ref(null)


const parseResponse = product => {
  name.value = product.name
  price.value = Number(product.price)
  categoryNames.value = product.category_names
  photo.value = product.photo
}

const onUpdateProduct = async () => {
  const { data } = await updateProduct({
    productId,
    botId,
    name: name.value,
    price: price.value,
    photo: photo.value,
    categoryNames: categoryNames.value,
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
  const { data } = await getProduct({ productId, botId })
  parseResponse(data.value.result)
})
</script>
