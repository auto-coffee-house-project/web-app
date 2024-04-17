<template>
  <form class="flex flex-col gap-y-6" @submit.prevent>
    <div class="flex gap-x-2 items-center">
      <InputSwitch
        input-id="is-menu-shown"
        v-model="isMenuShown"
        :disabled="isLoading"
      />
      <label for="is-menu-shown">Показывать каталог</label>
    </div>
    <div class="flex flex-col gap-y-2">
      <div class="flex gap-x-2 items-center">
        <InputSwitch
          input-id="is-birthdays-collecting"
          v-model="isBirthdaysOfferAfterNthSaleFeatureEnabled"
          :disabled="isLoading"
        />
        <label for="is-birthdays-collecting">Система дней рождений</label>
      </div>
    </div>
    <BirthdaysOfferAfterNthSaleInput
      v-if="isBirthdaysOfferAfterNthSaleFeatureEnabled"
      v-model="birthdayOfferAfterNthSale"
      :disabled="isLoading"
    />
    <Button
      @click="onUpdate"
      :loading="isLoading"
      type="submit"
      label="Сохранить"
    />
  </form>
</template>

<script setup>
import InputSwitch from 'primevue/inputswitch'
import Button from 'primevue/button'
import { useShopStore } from '../../../stores'
import { storeToRefs } from 'pinia'
import { useToast } from 'primevue/usetoast'
import BirthdaysOfferAfterNthSaleInput from './BirthdayOfferAfterNthSaleInput.vue'
import { ref } from 'vue'

const toast = useToast()
const shopStore = useShopStore()

const isBirthdaysOfferAfterNthSaleFeatureEnabled = ref(false)

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
