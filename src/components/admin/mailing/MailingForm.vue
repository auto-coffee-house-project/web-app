<template>
  <form class="flex flex-col gap-y-5" @submit.prevent>
    <div class="flex flex-col">
      <label for="mailing-text">Текст рассылки</label>
      <Textarea
        id="mailing-text"
        v-model="text"
        autoResize
        maxlength="1024"
      />
    </div>
    <div class="flex gap-x-2 items-center">
      <Checkbox v-model="isMarkdown" binary input-id="isMarkdown"/>
      <label for="isMarkdown">Использовать Markdown</label>
    </div>
    <MailingMarkdownInfo v-if="isMarkdown"/>
    <div class="flex gap-x-2 items-center">
      <Checkbox v-model="isKeyboardMarkup" binary input-id="isKeyboardMarkup"/>
      <label for="isKeyboardMarkup">Прикрепить Inline-клавиатуру</label>
    </div>
    <MailingKeyboardMarkupBuilder
      v-if="isKeyboardMarkup"
      v-model:buttons="buttons"
    />
    <div class="flex gap-x-2 items-center">
      <Checkbox v-model="isPhoto" binary input-id="isPhoto"/>
      <label for="isPhoto">Прикрепить фото</label>
    </div>
    <MailingPhotoUpload
      v-if="isPhoto"
      v-model:photo="photo"
    />
    <div class="flex gap-x-2 items-center">
      <Checkbox v-model="isAdditionalOptions" binary input-id="isAdditionalOptions"/>
      <label for="isAdditionalOptions">Сегрегация пользователей</label>
    </div>
    <MailingRecipientsSegregation
      v-if="isAdditionalOptions"
      v-model:last-n-days="lastNDays"
      v-model:purchases-for-last-n-days-count="purchasesForLastNDaysCount"
    />
    <Button @click="onStartMailing" label="Начать" :disabled="isDisabled"/>
  </form>
</template>

<script setup>
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import MailingMarkdownInfo from './MailingMarkdownInfo.vue'
import MailingPhotoUpload from './MailingPhotoUpload.vue'
import MailingKeyboardMarkupBuilder from './MailingKeyboardMarkupBuilder.vue'
import Checkbox from 'primevue/checkbox'
import useBotStore from '../../../stores/useBotStore.js'
import { computed, ref } from 'vue'
import MailingRecipientsSegregation from './MailingRecipientsSegregation.vue'
import { createMailing } from '../../../services/api'
import useUserStore from '../../../stores/useUserStore.js'

const botStore = useBotStore()
const userStore = useUserStore()

const text = ref('')
const photo = ref(null)
const lastNDays = ref(null)
const purchasesForLastNDaysCount = ref(null)

const isMarkdown = ref(false)
const isKeyboardMarkup = ref(false)
const isPhoto = ref(false)
const isAdditionalOptions = ref(false)

const buttons = ref([])

const isDisabled = computed(() => !text.value)

const cleanedButtons = computed(() => {
  return buttons
    .value
    .filter(({ text, url, isUrlValid }) => text && url && isUrlValid)
    .map(({ text, url }) => ({ text, url }))
})

const onStartMailing = async () => {
  console.log('onStartMailing', {
    botId: botStore.id,
    text: text.value,
    isMarkdown: isMarkdown.value,
    buttons: cleanedButtons.value,
    photo: photo.value,
  })
  await createMailing({
    userId: userStore.id,
    botId: botStore.id,
    text: text.value,
    parseMode: isMarkdown.value ? 'Markdown' : null,
    buttons: cleanedButtons.value,
    photo: photo.value,
  })
}
</script>
