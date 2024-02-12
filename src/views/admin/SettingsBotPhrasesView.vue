<template>
  <AdminNavbar/>
  <BasicContainer>
    <Message
      v-for="message in messages"
      :key="message.id"
      :severity="message.severity"
      :life="message.life"
      :sticky="message.sticky"
    >
      {{ message.content }}
    </Message>
    <form @submit.prevent>
      <div class="flex flex-col gap-2">
        <label for="bot-start-text">Стартовое сообщение в Telegram</label>
        <Textarea id="bot-start-text" v-model="startText" auto-resize class="w-full"/>
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
import { ref } from 'vue'
import { useTitle } from '@vueuse/core'
import AdminNavbar from '../../components/admin/AdminNavbar.vue'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import Message from 'primevue/message'
import BasicContainer from '../../layouts/BasicContainer.vue'
import Divider from 'primevue/divider'
import useBotStore from '../../stores/useBotStore.js'
import { storeToRefs } from 'pinia'

useTitle('Coffee House Bot | Admin')

const botStore = useBotStore()

const { startText, startTextClientWebApp } = storeToRefs(botStore)

const messages = ref([])

const onSubmit = async () => {
  await botStore.update({
    startText: startText.value,
    startTextClientWebApp: startTextClientWebApp.value,
  })
  messages.value = [
    {
      id: Date.now(),
      content: 'Изменения сохранены',
      severity: 'success',
      life: 2000,
      sticky: false,
    },
  ]
}
</script>
