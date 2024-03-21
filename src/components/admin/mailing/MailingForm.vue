<template>
  <Fieldset legend="Создать рассылку">
    <form class="flex flex-col gap-y-5" @submit.prevent>
      <div class="flex flex-col">
        <label for="mailing-text">Текст</label>
        <Textarea
          id="mailing-text"
          v-model="text"
          autoResize
          maxlength="1024"
        />
      </div>

      <CheckboxWithLabel
        v-model="isMarkdownFormatted"
        label="Использовать Markdown"
      />
      <MailingMarkdownInfo v-if="isMarkdownFormatted"/>

      <CheckboxWithLabel
        v-model="isPhotoAttached"
        label="Прикрепить фото"
      />
      <MailingPhotoUpload
        v-if="isPhotoAttached"
        v-model:photo="photo"
      />

      <CheckboxWithLabel
        v-model="isKeyboardMarkupAttached"
        label="Прикрепить кнопки"
      />
      <MailingKeyboardMarkupBuilder
        v-if="isKeyboardMarkupAttached"
        v-model:buttons="buttons"
      />

      <Fieldset legend="Сегрегация пользователей">
        <div class="flex flex-col gap-y-4">
          <CheckboxWithLabel
            v-model="isSegregatedByPurchases"
            label="По покупкам"
          />
          <MailingRecipientsSegregationByPurchases
            v-if="isSegregatedByPurchases"
            v-model:last-n-days="lastNDays"
            v-model:purchases-for-last-n-days-count="purchasesForLastNDaysCount"
          />

          <CheckboxWithLabel
            v-model="isSegregatedByBirthdays"
            label="По дням рождений"
          />
          <MailingRecipientsSegregationByBirthdays
            v-if="isSegregatedByBirthdays"
            v-model:dates-range="datesRange"
          />
        </div>
      </Fieldset>

      <Button
        @click="onStartMailing"
        label="Начать рассылку"
        :raised="!isDisabled"
        :disabled="isDisabled"
        :loading="isLoading"
      />
    </form>
  </Fieldset>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useDateFormat } from '@vueuse/core'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import Fieldset from 'primevue/fieldset'
import MailingMarkdownInfo from './MailingMarkdownInfo.vue'
import MailingPhotoUpload from './MailingPhotoUpload.vue'
import MailingKeyboardMarkupBuilder from './MailingKeyboardMarkupBuilder.vue'
import MailingRecipientsSegregationByPurchases from './MailingRecipientsSegregationByPurchases.vue'
import MailingRecipientsSegregationByBirthdays from './MailingRecipientsSegregationByBirthdays.vue'
import CheckboxWithLabel from './CheckboxWithLabel.vue'
import useUserStore from '../../../stores/useUserStore.js'
import useBotStore from '../../../stores/useBotStore.js'
import { createMailing } from '../../../services/api'

const botStore = useBotStore()
const userStore = useUserStore()

const toast = useToast()

const text = ref('')
const photo = ref(null)
const lastNDays = ref(null)
const purchasesForLastNDaysCount = ref(null)
const datesRange = ref()

const isLoading = ref(false)

const isMarkdownFormatted = ref(false)
const isKeyboardMarkupAttached = ref(false)
const isPhotoAttached = ref(false)
const isSegregatedByPurchases = ref(false)
const isSegregatedByBirthdays = ref(false)

const buttons = ref([])

const isDisabled = computed(() => !text.value)

const cleanedButtons = computed(() => {
  return buttons
    .value
    .filter(({ text, url, isUrlValid }) => text && url && isUrlValid)
    .map(({ text, url }) => ({ text, url }))
})

const birthdaysSegregationOptions = computed(() => {
  if (!datesRange.value) return null
  const [from, to] = datesRange.value

  return {
    from: useDateFormat(from, 'YYYY-MM-DD').value,
    to: useDateFormat(to, 'YYYY-MM-DD').value,
  }
})

const purchasesSegregationOptions = computed(() => {
  if (!lastNDays.value || !purchasesForLastNDaysCount) return null

  return {
    lastNDays: lastNDays.value,
    purchasesForLastNDaysCount: purchasesForLastNDaysCount.value,
  }
})

const segregationOptions = computed(() => {
  return {
    birthdaysOptions: birthdaysSegregationOptions.value,
    purchasesOptions: purchasesSegregationOptions.value,
  }
})

const parseMode = computed(() => isMarkdownFormatted.value ? 'Markdown' : null)

const onStartMailing = async () => {
  isLoading.value = true
  try {
    const { data } = await createMailing({
      userId: userStore.id,
      botId: botStore.id,
      text: text.value,
      parseMode: parseMode.value,
      buttons: cleanedButtons.value,
      photo: photo.value,
      segregationOptions: segregationOptions.value,
    })
    if (data.value?.ok) {
      toast.add({
        severity: 'success',
        summary: 'Успешно',
        detail: 'Рассылка создана',
        life: 3000,
      })
    } else {
      toast.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: 'Не удалось создать рассылку',
        life: 3000,
      })
    }
  } finally {
    isLoading.value = false
  }
}
</script>
