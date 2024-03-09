<template>
  <form class="flex flex-col gap-y-4" @submit.prevent>

    <div class="flex flex-col">
      <label for="product-name" class="font-bold block mb-2">Название</label>
      <InputText id="product-name" type="text" v-model="name"/>
    </div>

    <div class="flex flex-col">
      <label for="product-price" class="font-bold block">Цена</label>
      <InputNumber
        input-id="product-price"
        :minFractionDigits="0"
        :maxFractionDigits="2"
        v-model="price"
      />
    </div>

    <div class="flex flex-col">
      <label for="product-category-names" class="font-bold">Теги</label>
      <Chips input-id="product-category-names" v-model="categoryNames" separator=","/>
      <small>Можно указать несколько тегов через запятую</small>
    </div>

    <div class="flex flex-col">
      <label for="product-photo" class="font-bold">Фотография</label>
      <ProductPhotoUpload v-model="photo"/>
    </div>

    <Button
      type="submit"
      icon="pi pi-file-edit"
      label="Сохранить"
      @click="onSubmit"
      :disabled="!isFormValid"
    />

    <Button
      v-if="isDeleteButtonShown"
      icon="pi pi-trash"
      label="Удалить"
      severity="danger"
      @click="emit('delete', $event)"
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

<script setup>
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Chips from 'primevue/chips'
import InputNumber from 'primevue/inputnumber'
import ProductPhotoUpload from './ProductPhotoUpload.vue'
import { computed } from 'vue'

defineProps({
  isDeleteButtonShown: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['submit', 'delete'])

const name = defineModel('name', { type: String, default: '' })
const price = defineModel('price', { type: Number, default: 0 })
const categoryNames = defineModel('categoryNames', { type: Array, default: [] })
const photo = defineModel('photo', { type: String, default: null })

const isFormValid = computed(() => {
  return name.value.length > 0 && price.value > 0
})

const onSubmit = () => {
  emit('submit', {
    name: name.value,
    price: price.value,
    categoryNames: categoryNames.value,
    photo: photo.value,
  })
}
</script>
