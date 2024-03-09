<template>
  <form @submit.prevent class="flex flex-col gap-y-4">

    <div class="flex flex-col">
      <label for="gift-name">Название</label>
      <InputText id="gift-name" v-model="giftName"/>
    </div>

    <div class="flex flex-col">
      <label for="each-nth-sale-free">Необходимо чашек</label>
      <InputNumber
        input-id="each-nth-sale-free"
        :min="2"
        :max="100"
        v-model="eachNthSaleFree"
        :use-grouping="false"
      />
    </div>

    <div class="flex flex-col">
      <img v-if="giftPhotoPath" width="128rem" :src="giftPhotoPath" alt="logo photo"/>
      <label for="gift-photo">Фото</label>
      <GiftPhotoUpload v-model="base64Photo"/>
    </div>

    <Button type="submit" @click="onSubmit" label="Сохранить" class="w-full"/>
  </form>
</template>

<script setup>
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import GiftPhotoUpload from './GiftPhotoUpload.vue'
import { useToast } from 'primevue/usetoast'
import useBotStore from '../../../stores/useBotStore.js'
import useShopStore from '../../../stores/useShopStore.js'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const toast = useToast()
const botStore = useBotStore()
const shopStore = useShopStore()

const botId = botStore.id
const base64Photo = ref(null)

const { giftName, giftPhotoPath, eachNthSaleFree, startText, isMenuShown } = storeToRefs(shopStore)

const onSubmit = async () => {
  await shopStore.update({
    giftName: giftName.value,
    giftPhoto: base64Photo.value,
    startText: startText.value,
    eachNthSaleFree: eachNthSaleFree.value,
    isMenuShown: isMenuShown.value,
  })
  toast.add({
    severity: 'success',
    summary: 'Изменения сохранены',
    life: 2000,
  })
}
</script>
