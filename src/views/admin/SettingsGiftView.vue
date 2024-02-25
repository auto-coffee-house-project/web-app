<template>
  <AdminNavbar/>
  <BasicContainer>
    <form @submit.prevent class="flex flex-col gap-y-4">
      <div class="flex flex-col">
        <label for="gift-name">Название</label>
        <InputText id="gift-name" v-model="giftName"/>
      </div>
      <div class="flex flex-col">
        <label for="each-nth-cup-free">Необходимо чашек</label>
        <InputNumber
          input-id="each-nth-cup-free"
          :min="2"
          :max="100"
          v-model="eachNthSaleFree"
          :use-grouping="false"
        />
      </div>
      <div class="flex flex-col">
        <img v-if="giftPhoto" width="128rem" :src="giftPhoto" alt="logo photo"/>
        <label for="gift-photo">Фото</label>
        <FileUpload
          mode="advanced"
          name="photo"
          :url="uploadPhotoUrl"
          accept="image/*"
          @before-send="onBeforeSend"
        />
      </div>
      <Button type="submit" @click="onSubmit" label="Сохранить" class="w-full"/>
    </form>
  </BasicContainer>

</template>

<script setup>
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import FileUpload from 'primevue/fileupload'
import { useToast } from 'primevue/usetoast'
import { storeToRefs } from 'pinia'
import AdminNavbar from '../../components/admin/AdminNavbar.vue'
import BasicContainer from '../../layouts/BasicContainer.vue'
import useShopStore from '../../stores/useShopStore.js'
import useBotStore from '../../stores/useBotStore.js'

const toast = useToast()
const botStore = useBotStore()
const shopStore = useShopStore()

const botId = botStore.id
const { giftName, giftPhoto, eachNthSaleFree, startText, isMenuShown } = storeToRefs(shopStore)


const uploadPhotoUrl = `${import.meta.env.VITE_API_BASE_URL}/shops/me/gift-photos/`

const onBeforeSend = event => event.xhr.setRequestHeader('bot-id', String(botId))

const onSubmit = async () => {
  await shopStore.update({
    giftName: giftName.value,
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
