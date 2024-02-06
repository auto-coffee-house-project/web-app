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
        <label for="bot-start-text">Стартовое сообщение</label>
        <Textarea id="bot-start-text" v-model="botStartText" auto-resize class="w-full"/>
        <small>Оно будет показываться каждый раз при запуске бота</small>
      </div>
      <Button @click="onSubmit" type="submit" label="Сохранить" :disabled="isButtonDisabled" class="mt-4 w-full"/>
    </form>
  </BasicContainer>
</template>

<script setup>
import { inject, ref } from 'vue';
import { useTitle } from '@vueuse/core';
import AdminNavbar from '../../components/admin/AdminNavbar.vue';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import Message from 'primevue/message';
import BasicContainer from '../../layouts/BasicContainer.vue';
import useApiFetch from '../../services/useApiFetch.js'

useTitle('Coffee House Bot | Admin')

const botId = inject('botId')
const botStartText = ref('')
const isButtonDisabled = ref(false)

const messages = ref([])

const url = `/telegram/bots/${botId}/`

const { data, onFetchResponse } = useApiFetch(url).json()
onFetchResponse(() => {
  botStartText.value = data?.value?.result.start_text
})

const onSubmit = () => {
  const {
    data,
    isFetching,
    onFetchResponse,
    onFetchError,
  } = useApiFetch(url).put({ start_text: botStartText.value }).json()
  isButtonDisabled.value = isFetching.value
  onFetchResponse(() => {
    botStartText.value = data.value.result.start_text
    messages.value.push({
      id: Date.now(),
      content: 'Изменения сохранены',
      severity: 'success',
      life: 2000,
      sticky: false,
    })
  })
  onFetchError(() => {
    messages.value.push({
      id: Date.now(),
      content: 'Ошибка сохранения',
      severity: 'error',
      life: 2000,
      sticky: false,
    })
  })
}
</script>
