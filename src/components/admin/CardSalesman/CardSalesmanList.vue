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
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'
import { inject } from 'vue'
import { deleteSalesman } from '../../../services/api.js'

const toast = useToast()
const confirm = useConfirm()

const emit = defineEmits(['loadSalesmans'])

const botId = inject('botId')

defineProps({
  salesmans: {
    type: Array,
    required: true,
  },
})

const onDeleteSalesman = async (userId) => {
  await deleteSalesman({ botId, salesmanUserId: userId })
  toast.add({
    severity: 'warn',
    summary: 'Удалено',
    detail: 'Сотрудник удален',
    life: 2000,
  })
  emit('loadSalesmans')
}

const onShowDialogForDelete = (userId) => {
  confirm.require({
    message: 'Вы уверены что хотите удалить сотрудника?',
    header: 'Удалить сотрудника',
    icon: 'pi pi-info-circle',
    rejectLabel: 'Отменить',
    acceptLabel: 'Удалить',
    rejectClass: 'p-button-secondary',
    acceptClass: 'p-button-danger',
    accept: async () => await onDeleteSalesman(userId),
  })
}
</script>
