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
    <Toast position="top-left"/>
    <ConfirmDialog/>
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
    <template v-if="salesmans.length">
      <Card
        v-for="salesman in salesmans"
        :id="salesman.user_id"
        class="my-5"
      >
        <template #title>Продавец: {{ getFullName(salesman) }}</template>
        <template #content>
          <div class="flex justify-between items-center">
            <div>
              <p>Telegram ID: {{ salesman.user_id }}</p>
              <p>Username: {{ salesman.user_username || '-' }}</p>
            </div>
            <Button @click="confirm2(salesman.user_id)" severity="danger" icon="pi pi-trash" rounded/>
          </div>
        </template>
      </Card>
    </template>
    <InlineMessage v-else class="w-full mt-2 mb-6" severity="info">У вас нет других сотрудников</InlineMessage>

  </BasicContainer>
</template>

<script setup>
import AdminNavbar from "../components/admin/AdminNavbar.vue";
import { useFetch } from "@vueuse/core";
import { inject, ref } from "vue";
import Dialog from "primevue/dialog";
import Textarea from "primevue/textarea";
import BasicContainer from "../layouts/BasicContainer.vue";
import InputText from "primevue/inputtext";
import { useClipboard } from "@vueuse/core";
import Message from "primevue/message";
import Card from "primevue/card";
import Button from "primevue/button";
import ConfirmDialog from "primevue/confirmdialog";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
import InlineMessage from 'primevue/inlinemessage';

const confirm = useConfirm();
const toast = useToast();

const confirm2 = userId => {
  confirm.require({
    message: 'Вы уверены что хотите удалить сотрудника?',
    header: 'Удалить сотрудника',
    icon: 'pi pi-info-circle',
    rejectLabel: 'Отменить',
    acceptLabel: 'Удалить',
    rejectClass: 'p-button-secondary',
    acceptClass: 'p-button-danger',
    accept: () => onDeleteSalesman(userId),
  });
};

const botId = inject('botId')
const user = inject('user')

const visible = ref(false)
const invitationUrl = ref('')

const dialogMessages = ref([])

const salesmans = ref([])
const shopName = ref('')

const { copy: copyInvitationUrl } = useClipboard({ source: invitationUrl })

const url = `${import.meta.env.VITE_API_BASE_URL}/shops/salesmans/?admin_user_id=${user.id}&bot_id=${botId}`
const { onFetchResponse, data } = useFetch(url).json()
onFetchResponse(() => {
  shopName.value = data.value.result.shop_name
  salesmans.value = data.value.result.salesmans
})

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

const getFullName = salesman => {
  if (salesman.user_last_name) {
    return `${salesman.user_first_name} ${salesman.user_last_name}`
  }
  return salesman.user_first_name
}

const onDeleteSalesman = (userId) => {
  toast.add({
    severity: 'warn',
    summary: 'Удалено',
    detail: 'Сотрудник удален',
    life: 2000,
  });
  const url = `${import.meta.env.VITE_API_BASE_URL}/shops/salesmans/?user_id=${userId}&bot_id=${botId}`
  const { onFetchResponse } = useFetch(url).delete().json()
  onFetchResponse(() => {
    salesmans.value = salesmans.value.filter(salesman => salesman.user_id !== userId)
  })
}
</script>
