<template>
  <AdminNavbar/>
  <BasicContainer>
    <form @submit.prevent>
      <div class="flex flex-col gap-2">
        <label for="bot-start-text">Стартовое сообщение в Telegram</label>
        <Textarea id="bot-start-text" v-model="startTextBot" auto-resize class="w-full"/>
        <small>Оно будет показываться каждый раз при запуске бота в Telegram</small>
      </div>
      <Divider class="my-5"/>
      <div class="flex flex-col gap-2">
        <label for="bot-start-text-client-web-app">Стартовое сообщение в меню подарка</label>
        <Textarea id="bot-start-text-client-web-app" v-model="startTextClientWebApp" auto-resize class="w-full"/>
        <small>Оно будет показываться каждый раз при нажатии на кнопку "Get coffee"</small>
      </div>
      <Button @click="onSubmit" type="submit" label="Сохранить" class="mt-4 w-full"/>
    </form>
  </BasicContainer>
</template>

<script setup>
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import { useToast } from 'primevue/usetoast'
import { storeToRefs } from 'pinia'
import AdminNavbar from '../../components/admin/AdminNavbar.vue'
import BasicContainer from '../../layouts/BasicContainer.vue'
import useBotStore from '../../stores/useBotStore.js'
import useShopStore from '../../stores/useShopStore.js'

const toast = useToast()

const botStore = useBotStore()
const shopStore = useShopStore()

const { startText: startTextBot } = storeToRefs(botStore)
const {
  giftName,
  eachNthSaleFree,
  startText: startTextClientWebApp,
  isMenuShown,
} = storeToRefs(shopStore)


const onSubmit = async () => {
  await botStore.update({ startText: startTextBot.value })
  await shopStore.update({
    giftName: giftName.value,
    eachNthSaleFree: eachNthSaleFree.value,
    startText: startTextClientWebApp.value,
    isMenuShown: isMenuShown.value,
  })
  toast.add({
    severity: 'success',
    summary: 'Изменения сохранены',
    life: 2000,
  })
}
</script>
