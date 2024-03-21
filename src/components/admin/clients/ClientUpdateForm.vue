<template>
  <Fieldset legend="Редактировать клиента">
    <form class="flex flex-col gap-y-3" @submit.prevent>
      <div><span class="font-bold">Имя:</span> {{ user?.first_name }}</div>
      <div v-if="user.last_name">Фамилия: {{ user?.last_name }}</div>
      <span v-if="user.username"><span class="font-bold">Username:</span> @{{ user?.username }}</span>

      <div class="flex items-center gap-x-2">
        <label class="font-bold" for="client-has-gift">Подарок:</label>
        <Checkbox input-id="client-has-gift" v-model="hasGift" :binary="true"/>
      </div>

      <div class="flex flex-col">
        <label class="font-bold mb-1" for="client-born-on">Дата рождения</label>
        <Calendar
          input-id="client-born-on"
          v-model="bornOn"
          date-format="yy-mm-dd"
          touchUI
        />
      </div>
      <Button :loading="isLoading" @click="onUpdateClient" class="my-2" label="Сохранить"/>
    </form>
  </Fieldset>
</template>

<script setup>
import Calendar from 'primevue/calendar'
import Checkbox from 'primevue/checkbox'
import Fieldset from 'primevue/fieldset'
import Button from 'primevue/button'
import { storeToRefs } from 'pinia'
import useClientStore from '../../../stores/useClientStore.js'
import { useToast } from 'primevue/usetoast'
import { formatDate } from '../../../services/helpers.js'

const clientStore = useClientStore()


const toast = useToast()

const { user, bornOn, hasGift, isLoading } = storeToRefs(clientStore)

const onUpdateClient = async () => {
  await clientStore.update({
    userId: user.value.id,
    bornOn: formatDate(bornOn.value),
    hasGift: hasGift.value,
  })
  toast.add({ severity: 'success', summary: 'Успешно', life: 2000, detail: 'Клиент обновлен' })
}
</script>
