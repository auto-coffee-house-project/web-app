<template>
  <AdminNavbar/>
  <BasicContainer>
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
        Количество сотрудников: {{ salesmans.length }}
      </template>
      <template #footer>
        <Button class="w-full" label="Ссылка-приглашение" outlined @click="onCreateInvitationLink"/>
      </template>
    </Card>
    <CardSalesmanList
      :salesmans="salesmans"
      @load-salesmans="loadSalesmans"
    />
  </BasicContainer>
</template>

<script setup>
import AdminNavbar from '../components/admin/AdminNavbar.vue';
import { useFetch } from '@vueuse/core';
import { inject, onMounted, ref } from 'vue';
import Dialog from 'primevue/dialog';
import Textarea from 'primevue/textarea';
import BasicContainer from '../layouts/BasicContainer.vue';
import { useClipboard } from '@vueuse/core';
import Message from 'primevue/message';
import Card from 'primevue/card';
import Button from 'primevue/button';
import CardSalesmanList from '../components/admin/CardSalesman/CardSalesmanList.vue'

const botId = inject('botId')
const user = inject('user')

const visible = ref(false)
const invitationUrl = ref('')

const dialogMessages = ref([])

const salesmans = ref([])
const shopName = ref('')

const { copy: copyInvitationUrl } = useClipboard({ source: invitationUrl })

const loadSalesmans = () => {
  const url = `${import.meta.env.VITE_API_BASE_URL}/shops/salesmans/?admin_user_id=${user.id}&bot_id=${botId}`
  const { onFetchResponse, data } = useFetch(url).json()

  onFetchResponse(() => {
    shopName.value = data.value.result.shop_name
    salesmans.value = data.value.result.salesmans
  })
}

onMounted(loadSalesmans)

const onCopy = () => {
  copyInvitationUrl(invitationUrl.value)
  dialogMessages.value = [ { id: Date.now(), severity: 'success', content: 'Скопировано', life: 2000, sticky: false } ]
}

const onCreateInvitationLink = () => {
  const url = `${import.meta.env.VITE_API_BASE_URL}/shops/invitations/`
  const { onFetchResponse, data } = useFetch(url).post({
    bot_id: botId,
    admin_user_id: user.id,
  }).json()
  onFetchResponse(() => {
    invitationUrl.value = data.value.result.url
    visible.value = true
  })
}
</script>
