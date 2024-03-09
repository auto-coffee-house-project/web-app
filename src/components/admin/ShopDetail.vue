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
    <Textarea @click="onCopy" v-model="invitationUrl" class="w-full mb-2" readonly autoResize/>
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
      Количество сотрудников: {{ employees.length }}
    </template>
    <template #footer>
      <Button class="w-full" label="Ссылка-приглашение" outlined @click="onCreateInvitationLink"/>
    </template>
  </Card>
</template>

<script setup>
import Card from 'primevue/card'
import Button from 'primevue/button'
import Message from 'primevue/message'
import Dialog from 'primevue/dialog'
import Textarea from 'primevue/textarea'
import { useClipboard } from '@vueuse/core'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { createEmployeeInvitation } from '../../services/api'
import useEmployeeStore from '../../stores/useEmployeeStore.js'
import useBotStore from '../../stores/useBotStore.js'
import useUserStore from '../../stores/useUserStore.js'
import useShopStore from '../../stores/useShopStore.js'

const invitationUrl = ref('')
const dialogMessages = ref([])
const visible = ref(false)

const employeeStore = useEmployeeStore()
const botStore = useBotStore()
const userStore = useUserStore()

const { employees, shopName } = storeToRefs(employeeStore)
const { copy: copyInvitationUrl } = useClipboard({ source: invitationUrl })

const onCopy = () => {
  copyInvitationUrl(invitationUrl.value)
  dialogMessages.value = [
    {
      id: Date.now(),
      severity: 'success',
      content: 'Скопировано',
      life: 2000,
      sticky: false,
    },
  ]
}

const onCreateInvitationLink = async () => {
  try {
    const { data } = await createEmployeeInvitation({
      botId: botStore.id,
      adminUserId: userStore.id,
    })
    invitationUrl.value = data.value?.result?.url
  } finally {
    visible.value = true
  }
}
</script>