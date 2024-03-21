<template>
  <Fieldset legend="Редактировать подарок">
    <form @submit.prevent class="flex flex-col gap-y-5">

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
        <small class="font-bold">После {{ eachNthSaleFree || 'N' }} чашек будет выдан подарок</small>
      </div>

      <div>
        <p>Фото</p>
        <img v-if="giftPhotoPath" width="128rem" :src="giftPhotoPath" alt="logo photo"/>
        <GiftPhotoUpload v-model="base64Photo"/>
      </div>

      <Button type="submit" @click="onSubmit" label="Сохранить" raised class="w-full"/>
    </form>
  </Fieldset>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useToast } from 'primevue/usetoast'
import Fieldset from 'primevue/fieldset'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import GiftPhotoUpload from './GiftPhotoUpload.vue'
import useBotStore from '../../../stores/useBotStore.js'
import useShopStore from '../../../stores/useShopStore.js'

const toast = useToast()
const botStore = useBotStore()
const shopStore = useShopStore()

const botId = botStore.id
const base64Photo = ref(undefined)

const { giftName, giftPhotoPath, eachNthSaleFree } = storeToRefs(shopStore)

const onSubmit = async () => {
  await shopStore.update({
    giftName: giftName.value,
    giftPhoto: base64Photo.value,
    eachNthSaleFree: eachNthSaleFree.value,
  })
  toast.add({
    severity: 'success',
    summary: 'Изменения сохранены',
    life: 2000,
  })
}
</script>
