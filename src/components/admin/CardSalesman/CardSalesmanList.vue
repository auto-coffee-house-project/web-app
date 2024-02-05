<template>
  <Toast/>
  <ConfirmDialog class="mx-4"/>
  <template v-if="salesmans.length">
    <CardSalesmanItem
      v-for="salesman in salesmans"
      :key="salesman.user_id"
      :salesman="salesman"
      @show-dialog-for-delete="onShowDialogForDelete"
    />
  </template>
  <InlineMessage v-else class="w-full mt-2 mb-6" severity="info">У вас нет других сотрудников</InlineMessage>
</template>

<script setup>
import CardSalesmanItem from './CardSalesmanItem.vue'
import InlineMessage from 'primevue/inlinemessage'
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import { useFetch } from '@vueuse/core'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'
import { inject } from 'vue'

const toast = useToast()
const confirm = useConfirm()

const emit = defineEmits([ 'loadSalesmans' ])

const botId = inject('botId')

defineProps({
  salesmans: {
    type: Array,
    required: true,
  },
})

const onDeleteSalesman = (userId) => {
  toast.add({
    severity: 'warn',
    summary: 'Удалено',
    detail: 'Сотрудник удален',
    life: 2000,
  })

  const url = `${import.meta.env.VITE_API_BASE_URL}/shops/salesmans/?user_id=${userId}&bot_id=${botId}`

  const { onFetchResponse } = useFetch(url).delete().json()

  onFetchResponse(() => {
    emit('loadSalesmans')
  })
}

const onShowDialogForDelete = userId => {
  confirm.require({
    message: 'Вы уверены что хотите удалить сотрудника?',
    header: 'Удалить сотрудника',
    icon: 'pi pi-info-circle',
    rejectLabel: 'Отменить',
    acceptLabel: 'Удалить',
    rejectClass: 'p-button-secondary',
    acceptClass: 'p-button-danger',
    accept: () => onDeleteSalesman(userId),
  })
}

</script>
