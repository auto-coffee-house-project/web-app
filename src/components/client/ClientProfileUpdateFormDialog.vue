<template>
  <Dialog header="Укажите день рождения" v-model:visible="isVisible" class="mx-4 w-full" modal>

    <form
      v-if="!isBornOnAlreadySet"
      @submit.prevent class="flex flex-col gap-y-4">
      <div class="flex flex-col">
        <label for="client-born-on">Дата рождения</label>
        <Calendar
          input-id="client-born-on"
          v-model="bornOn"
          date-format="yy-mm-dd"
          touchUI
        />
      </div>
    </form>
    <p v-else class="font-semibold">
      Вы уже указали дату рождения: {{ formattedBornOn }}
    </p>

    <template #footer>
      <Button
        @click="isVisible = false"
        :disabled="isLoading"
        rounded
        outlined
        severity="secondary"
        label="Закрыть"
      />
      <Button
        @click="onSubmitForm"
        :loading="isLoading"
        :disabled="!bornOn"
        label="Сохранить"
        rounded
      />
    </template>
  </Dialog>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import Calendar from 'primevue/calendar'
import Button from 'primevue/button'
import useClientStore from '../../stores/useClientStore.js'
import { formatDate } from '../../services/helpers.js'
import { ref } from 'vue'
import { useDateFormat } from '@vueuse/core'
import { useToast } from 'primevue/usetoast'
import Dialog from 'primevue/dialog'

const isVisible = defineModel('isVisible', { type: Boolean, required: true })

const toast = useToast()

const clientStore = useClientStore()

const { user, isLoading, bornOn } = storeToRefs(clientStore)

const isBornOnAlreadySet = ref(bornOn.value !== null)

const formattedBornOn = useDateFormat(bornOn, 'D MMMM', { locales: 'ru-RU' })

const onSubmitForm = async () => {
  await clientStore.update({
    userId: user.value.id,
    bornOn: formatDate(bornOn.value),
  })
  isVisible.value = false
  isBornOnAlreadySet.value = true
  toast.add({
    severity: 'success',
    summary: 'Успешно',
    detail: 'Дата рождения сохранена',
    life: 3000,
  })
}
</script>
