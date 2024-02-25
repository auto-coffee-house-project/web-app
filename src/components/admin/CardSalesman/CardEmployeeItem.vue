<template>
  <Card class="my-5">
    <template #title>
      <template v-if="employee.is_admin">Админ</template>
      <template v-else>Продавец</template>: {{ userFullName }}
    </template>
    <template #content>
      <div class="flex justify-between items-center mb-3">
        <div>
          <p>Telegram ID: {{ employee.user.id }}</p>
          <p>Username: {{ employee.user.username || '-' }}</p>
        </div>
        <Button
          v-if="employee.user.id !== userId"
          @click="$emit('showDialogForDelete', employee.id)"
          severity="danger"
          icon="pi pi-trash"
          rounded
        />
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import Card from 'primevue/card'
import Button from 'primevue/button'
import { computed } from 'vue'
import useUserStore from '../../../stores/useUserStore.js'
import { storeToRefs } from 'pinia'

interface User {
  id: number
  first_name: string
  last_name?: string
  username?: string
}

interface Employee {
  id: number
  user: User
  is_admin: boolean
}

const userStore = useUserStore()

const { id: userId } = storeToRefs(userStore)

const props = defineProps<{
  employee: Employee,
}>()


const userFullName = computed(() => {
  if (!props.employee.user.last_name) return props.employee.user.last_name
  return `${props.employee.user.first_name} ${props.employee.user.last_name}`
})
</script>
