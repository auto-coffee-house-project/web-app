<template>
  <AdminNavbar/>
  <BasicContainer>
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
      <MarkdownInfo v-if="isMarkdown"/>
      <div class="flex gap-x-2 items-center">
        <Checkbox v-model="isKeyboardMarkup" binary input-id="isKeyboardMarkup"/>
        <label for="isKeyboardMarkup">Прикрепить Inline-клавиатуру</label>
      </div>
      <div v-if="isKeyboardMarkup" class="flex flex-col gap-y-4">
        <div class="flex flex-col">
          <label for="keyboard-markup-text">Текст кнопки</label>
          <InputText v-model="keyboardMarkupText" id="keyboard-markup-text" maxlength="64"/>
        </div>
        <div class="flex flex-col">
          <label for="keyboard-markup-url">Ссылка кнопки</label>
          <InputText v-model="keyboardMarkupUrl" id="keyboard-markup-url"/>
        </div>
      </div>
      <Button @click="onStartMailing" label="Начать" :disabled="isDisabled"/>
    </form>
  </BasicContainer>
</template>

<script setup>
import AdminNavbar from '../../components/admin/AdminNavbar.vue'
import Textarea from 'primevue/textarea'
import { computed, ref, watchEffect } from 'vue'
import BasicContainer from '../../layouts/BasicContainer.vue'
import Checkbox from 'primevue/checkbox'
import Button from 'primevue/button'
import MarkdownInfo from '../../components/admin/MarkdownInfo.vue'
import InputText from 'primevue/inputtext'
import { createMailing } from '../../services/api.js'
import useBotStore from '../../stores/useBotStore.js'

const botStore = useBotStore()

const text = ref('')
const isMarkdown = ref(false)
const keyboardMarkupText = ref('')
const keyboardMarkupUrl = ref('')

const keyboardMarkup = computed(() => {
  let markup = []
  if (keyboardMarkupText.value.length > 0 && keyboardMarkupUrl.value.length > 0) {
    markup = [
      {
        text: keyboardMarkupText.value,
        url: keyboardMarkupUrl.value,
      }
    ]
  }
  return markup
})

const isKeyboardMarkup = ref(false)

const isDisabled = computed(() => !text.value)

const onStartMailing = async () => {
  console.log(keyboardMarkup.value)
  await createMailing({
    botId: botStore.id,
    text: text.value,
    isMarkdown: isMarkdown.value,
    buttons: keyboardMarkup.value,
  })
}


const customBase64Uploader = async (event) => {
  const file = event.files[0]
  const reader = new FileReader()
  let blob = await fetch(file.objectURL).then((r) => r.blob()) //blob:url

  reader.readAsDataURL(blob)

  reader.onloadend = function () {
    const base64data = reader.result
    console.log(base64data)
  }
}
</script>
