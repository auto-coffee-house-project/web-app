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
    <div class="flex gap-x-2 items-center">
      <Checkbox v-model="isPhoto" binary input-id="isPhoto"/>
      <label for="isPhoto">Прикрепить фото</label>
    </div>
    <MailingPhotoUpload
      v-if="isPhoto"
      v-model:photo="photo"
    />
    <MailingKeyboardMarkupBuilder
      v-if="isKeyboardMarkup"
      v-model:buttons="buttons"
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

const botStore = useBotStore()

const text = ref('')
const photo = ref(null)

const isMarkdown = ref(false)
const isKeyboardMarkup = ref(false)
const isPhoto = ref(false)

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
  // await createMailing({
  //   botId: botStore.id,
  //   text: text.value,
  //   isMarkdown: isMarkdown.value,
  //   buttons: cleanedButtons.value,
  // })
}

</script>
