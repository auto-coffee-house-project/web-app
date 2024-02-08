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
        <Textarea id="bot-start-text" v-model="botStartText" auto-resize class="w-full"/>
        <small>Оно будет показываться каждый раз при запуске бота в Telegram</small>
      </div>
      <Divider class="my-5"/>
      <div class="flex flex-col gap-2">
        <label for="bot-start-text-client-web-app">Стартовое сообщение в меню подарка</label>
        <Textarea id="bot-start-text-client-web-app" v-model="botStartTextClientWebApp" auto-resize class="w-full"/>
        <small>Оно будет показываться каждый раз при нажатии на кнопку "Get coffee"</small>
      </div>
      <Button @click="onSubmit" type="submit" label="Сохранить" :disabled="isButtonDisabled" class="mt-4 w-full"/>
    </form>
  </BasicContainer>
</template>

<script setup>
import { inject, ref } from 'vue'
import { useTitle } from '@vueuse/core'
import AdminNavbar from '../../components/admin/AdminNavbar.vue'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import Message from 'primevue/message'
import BasicContainer from '../../layouts/BasicContainer.vue'
import { getBot, updateBot } from '../../services/api.js'
import Divider from 'primevue/divider'

useTitle('Coffee House Bot | Admin')

const botId = inject('botId')
const botStartText = ref('')
const botStartTextClientWebApp = ref('')
const isButtonDisabled = ref(false)

const messages = ref([])

const url = `/telegram/bots/${botId}/`

const { data, onFetchResponse } = getBot({ botId })
onFetchResponse(() => {
  botStartText.value = data.value?.result.start_text
  botStartTextClientWebApp.value = data.value?.result.start_text_client_web_app
})

const onSubmit = () => {
  const {
    data,
    isFetching,
    onFetchResponse,
    onFetchError,
  } = updateBot({
    botId,
    startText: botStartText.value,
    startTextClientWebApp: botStartTextClientWebApp.value,
  })
  isButtonDisabled.value = isFetching.value
  onFetchResponse(() => {
    botStartText.value = data.value.result.start_text
    botStartTextClientWebApp.value = data.value.result.start_text_client_web_app
    messages.value = [{
      id: Date.now(),
      content: 'Изменения сохранены',
      severity: 'success',
      life: 2000,
      sticky: false,
    }]
  })
  onFetchError(() => {
    messages.value = [{
      id: Date.now(),
      content: 'Ошибка сохранения',
      severity: 'error',
      life: 2000,
      sticky: false,
    }]
  })
}
</script>
