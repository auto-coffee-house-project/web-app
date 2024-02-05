<template>
  <Card class="my-5">
    <template #title>Продавец: {{ userFullName }}</template>
    <template #content>
      <div class="flex justify-between items-center">
        <div>
          <p>Telegram ID: {{ salesman.user_id }}</p>
          <p>Username: {{ salesman.user_username || '-' }}</p>
        </div>
        <Button
          @click="$emit('showDialogForDelete', salesman.user_id)"
          severity="danger"
          icon="pi pi-trash"
          rounded
        />
      </div>
    </template>
  </Card>
</template>

<script setup>
import Card from 'primevue/card'
import Button from 'primevue/button'
import { computed } from 'vue'


const props = defineProps({
  salesman: {
    type: Object,
    required: true,
  },
})

const userFullName = computed(() => {
  if (props.salesman.user_last_name) {
    return `${props.salesman.user_first_name} ${props.salesman.user_last_name}`
  }
  return props.salesman.user_first_name
})
</script>
