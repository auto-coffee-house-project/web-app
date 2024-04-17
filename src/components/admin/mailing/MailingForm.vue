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
          :disabled="isLoading"
        />
      </div>

      <CheckboxWithLabel
        v-model="isMarkdownFormatted"
        label="Использовать Markdown"
        :is-disabled="isLoading"
      />
      <MailingMarkdownInfo v-if="isMarkdownFormatted"/>

      <CheckboxWithLabel
        v-model="isPhotoAttached"
        label="Прикрепить фото"
        :is-disabled="isLoading"
      />
      <MailingPhotoUpload
        v-if="isPhotoAttached"
        v-model:photo="photo"
        :is-disabled="isLoading"
      />

      <CheckboxWithLabel
        v-model="isKeyboardMarkupAttached"
        label="Прикрепить кнопки"
        :is-disabled="isLoading"
      />
      <MailingKeyboardMarkupBuilder
        v-if="isKeyboardMarkupAttached"
        v-model:buttons="buttons"
        :is-disabled="isLoading"
      />

      <Fieldset legend="Сегрегация пользователей">
        <div class="flex flex-col gap-y-4">
          <CheckboxWithLabel
            v-model="isSegregatedByPurchases"
            label="По покупкам"
            :is-disabled="isLoading"
          />
          <MailingRecipientsSegregationByPurchases
            v-if="isSegregatedByPurchases"
            v-model:dates-range="segregationByPurchasesDatesRange"
            v-model:purchases-count="segregationByPurchasesCount"
            :is-disabled="isLoading"
          />

          <CheckboxWithLabel
            v-model="isSegregatedByBirthdays"
            label="По дням рождений"
            :is-disabled="isLoading"
          />
          <MailingRecipientsSegregationByBirthdays
            v-if="isSegregatedByBirthdays"
            v-model:dates-range="segregationByBirthdaysDatesRange"
            :is-disabled="isLoading"
          />
        </div>
      </Fieldset>

      <Button
        @click="onCreateMailing"
        label="Начать рассылку"
        :raised="!!text"
        :disabled="!text"
        :loading="isLoading"
      />
    </form>
  </Fieldset>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import Fieldset from 'primevue/fieldset'
import MailingMarkdownInfo from './MailingMarkdownInfo.vue'
import MailingPhotoUpload from './MailingPhotoUpload.vue'
import MailingKeyboardMarkupBuilder from './MailingKeyboardMarkupBuilder.vue'
import MailingRecipientsSegregationByPurchases from './MailingRecipientsSegregationByPurchases.vue'
import MailingRecipientsSegregationByBirthdays from './MailingRecipientsSegregationByBirthdays.vue'
import CheckboxWithLabel from './CheckboxWithLabel.vue'
import { useBotStore, useUserStore } from '../../../stores'
import { createMailing } from '../../../services/api'
import { formatDatesRange } from '../../../services/helpers.js'

const botStore = useBotStore()
const userStore = useUserStore()

const toast = useToast()

const text = ref('')
const photo = ref(null)
const segregationByBirthdaysDatesRange = ref(null)
const segregationByPurchasesCount = ref(null)
const segregationByPurchasesDatesRange = ref(null)

const isLoading = ref(false)

const isMarkdownFormatted = ref(false)
const isKeyboardMarkupAttached = ref(false)
const isPhotoAttached = ref(false)
const isSegregatedByPurchases = ref(false)
const isSegregatedByBirthdays = ref(false)

const buttons = ref([])

const cleanedButtons = computed(() => {
  return buttons
    .value
    .filter(({ text, url, isUrlValid }) => text && url && isUrlValid)
    .map(({ text, url }) => ({ text, url }))
})

const purchasesSegregationOptions = computed(() => {
  if (!segregationByPurchasesCount.value || !segregationByPurchasesDatesRange.value) return null
  return {
    ...formatDatesRange(segregationByPurchasesDatesRange.value),
    purchases_count: segregationByPurchasesCount.value,
  }
})

const segregationOptions = computed(() => {
  return {
    by_birthdays: formatDatesRange(segregationByBirthdaysDatesRange.value) || undefined,
    by_purchases: purchasesSegregationOptions.value || undefined,
  }
})

const parseMode = computed(() => isMarkdownFormatted.value ? 'MarkdownV2' : null)

const requestData = computed(() => {
  return {
    user_id: userStore.id,
    bot_id: botStore.id,
    text: text.value,
    parse_mode: parseMode.value || undefined,
    buttons: cleanedButtons.value || undefined,
    photo: photo.value || undefined,
    segregation_options: segregationOptions.value || undefined,
  }
})

const onCreateMailing = async () => {
  isLoading.value = true
  try {
    const { data } = await createMailing(requestData.value)
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
