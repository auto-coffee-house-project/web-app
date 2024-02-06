<template>
  <Dialog v-model:visible="visible" modal header="Ссылка-приглашение">
    <Message
      v-for="message in dialogMessages"
      :key="message.id"
      :severity="message.severity"
      :life="message.life"
      :sticky="message.sticky"
    >
      {{ message.content }}
    </Message>
    <Textarea v-model="invitationUrl" class="w-full mb-2" readonly autoResize/>
    <div class="flex gap-x-4">
      <Button label="Закрыть" icon="pi pi-times" @click="visible = false" severity="secondary" class="my-2"/>
      <Button label="Скопировать" icon="pi pi-paperclip" @click="onCopy" class="my-2"/>
    </div>
  </Dialog>
  <Card class="mb-4">
    <template #title>
      <i class="pi pi-shopping-bag mr-1"/>
      Магазин {{ shopName }}
    </template>
    <template #content>
      <i class="pi pi-users mr-1"/>
      Количество сотрудников: {{ salesmansCount }}
    </template>
    <template #footer>
      <Button class="w-full" label="Ссылка-приглашение" outlined @click="onCreateInvitationLink"/>
    </template>
  </Card>
</template>

<script setup>
import Card from 'primevue/card'
import Button from 'primevue/button'
import { useClipboard } from '@vueuse/core'
import Message from 'primevue/message'
import Dialog from 'primevue/dialog'
import Textarea from 'primevue/textarea'
import { inject, ref } from 'vue'
import useApiFetch from '../../services/useApiFetch.js'

const invitationUrl = ref('')
const dialogMessages = ref([])
const visible = ref(false)

const botId = inject('botId')
const user = inject('user')


const props = defineProps({
  shopName: {
    type: String,
    required: true,
  },
  salesmansCount: {
    type: Number,
    required: true,
  },
})

const { copy: copyInvitationUrl } = useClipboard({ source: invitationUrl })

const onCopy = () => {
  copyInvitationUrl(invitationUrl.value)
  dialogMessages.value = [ { id: Date.now(), severity: 'success', content: 'Скопировано', life: 2000, sticky: false } ]
}

const onCreateInvitationLink = () => {
  const url = '/shops/invitations/'
  const { onFetchResponse, data } = useApiFetch(url).post({
    bot_id: botId,
    admin_user_id: user.id,
  }).json()
  onFetchResponse(() => {
    invitationUrl.value = data.value.result.url
    visible.value = true
  })
}
</script>