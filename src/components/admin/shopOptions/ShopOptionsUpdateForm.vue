<template>
  <form class="flex flex-col gap-y-3" @submit.prevent>
    <IsMenuShownInput
      v-model="isMenuShown"
      :disabled="isLoading"
    />

    <div>
      <Divider/>
      <BirthdaysOfferAfterNthSaleInput
        v-model="birthdayOfferAfterNthSale"
        :disabled="isLoading"
      />
    </div>

    <Button
      @click="onUpdate"
      :loading="isLoading"
      type="submit"
      label="Сохранить"
    />
  </form>
</template>

<script setup>
import Button from 'primevue/button'
import { useShopStore } from '../../../stores'
import { storeToRefs } from 'pinia'
import { useToast } from 'primevue/usetoast'
import Divider from 'primevue/divider'
import IsMenuShownInput from './IsMenuShownInput.vue'
import BirthdaysOfferAfterNthSaleInput from './BirthdayOfferAfterNthSaleInput.vue'

const toast = useToast()
const shopStore = useShopStore()


const { isMenuShown, birthdayOfferAfterNthSale, isLoading } = storeToRefs(shopStore)

const onUpdate = async () => {
  try {
    await shopStore.update({
      isMenuShown: isMenuShown.value,
      birthdayOfferAfterNthSale: birthdayOfferAfterNthSale.value,
    })
    toast.add({
      severity: 'success',
      summary: 'Обновлено',
      detail: 'Настройки обновлены',
      life: 2000,
    })
  } catch (error) {
    console.error(error)
    toast.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: 'Не удалось обновить настройки',
      life: 2000,
    })
  }
}
</script>
