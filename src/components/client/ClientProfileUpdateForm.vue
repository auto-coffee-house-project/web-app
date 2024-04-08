<template>
  <Fieldset legend="Ваш профиль">
    <form @submit.prevent class="flex flex-col gap-y-4">
      <div>
        <span class="font-semibold">Всего покупок:</span> {{ totalPurchasesCount }}
      </div>
      <div>
        <span class="font-semibold">Получено подарков:</span> {{ freePurchasesCount }}
      </div>
      <div v-if="!isBornOnAlreadySet">
        <div class="flex flex-col mb-3">
          <label for="client-born-on">Дата рождения</label>
          <Calendar
            input-id="client-born-on"
            v-model="bornOn"
            date-format="yy-mm-dd"
            touchUI
          />
        </div>
        <Button
          @click="onSubmitForm"
          :loading="isLoading"
          :disabled="!bornOn"
          label="Сохранить"
          class="w-full"
        />
      </div>
      <div v-else>
        <span class="font-semibold">Дата рождения:</span> {{ formattedBornOn }}
      </div>
    </form>
  </Fieldset>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import Fieldset from 'primevue/fieldset'
import Calendar from 'primevue/calendar'
import Button from 'primevue/button'
import useClientStore from '../../stores/useClientStore.js'
import { formatDate } from '../../services/helpers.js'
import { ref } from 'vue'
import { useDateFormat } from '@vueuse/core'
import { useToast } from 'primevue/usetoast'

const clientStore = useClientStore()

const toast = useToast()

const {
  user,
  isLoading,
  totalPurchasesCount,
  freePurchasesCount,
  bornOn,
} = storeToRefs(clientStore)

const isBornOnAlreadySet = ref(bornOn.value !== null)

const formattedBornOn = useDateFormat(bornOn, 'D MMMM', { locales: 'ru-RU' })

const onSubmitForm = async () => {
  await clientStore.update({
    userId: user.value.id,
    bornOn: formatDate(bornOn.value),
  })
  isBornOnAlreadySet.value = true
  toast.add({
    severity: 'success',
    summary: 'Успешно',
    detail: 'Дата рождения сохранена',
    life: 3000,
  })
}
</script>
