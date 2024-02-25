<template>
  <ConfirmDialog class="mx-4"/>
  <template v-if="employees.length">
    <CardSalesmanItem
      v-for="employee in employees"
      :key="employee.id"
      :employee="employee"
      @show-dialog-for-delete="onShowDialogForDelete"
    />
  </template>
  <InlineMessage v-else class="w-full mt-2 mb-6" severity="info">
    У вас нет других сотрудников
  </InlineMessage>
</template>

<script setup>
import CardSalesmanItem from './CardEmployeeItem.vue'
import InlineMessage from 'primevue/inlinemessage'
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'
import useEmployeeStore from '../../../stores/useEmployeeStore.js'
import { storeToRefs } from 'pinia'

const toast = useToast()
const confirm = useConfirm()

const employeeStore = useEmployeeStore()

const { employees } = storeToRefs(employeeStore)


const onDeleteSalesman = async employeeId => {
  await employeeStore.delete({ employeeId })
  toast.add({
    severity: 'warn',
    summary: 'Удалено',
    detail: 'Сотрудник удален',
    life: 2000,
  })
  await employeeStore.fetch()
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
    accept: async () => await onDeleteSalesman(userId),
  })
}
</script>
