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
      <KeyboardMarkupBuilder
        v-if="isKeyboardMarkup"
        v-model:buttons="buttons"
      />
      <Button @click="onStartMailing" label="Начать" :disabled="isDisabled"/>
    </form>
  </BasicContainer>
</template>

<script setup>
import { computed, ref } from 'vue'
import Textarea from 'primevue/textarea'
import Checkbox from 'primevue/checkbox'
import Button from 'primevue/button'
import BasicContainer from '../../layouts/BasicContainer.vue'
import MarkdownInfo from '../../components/admin/MarkdownInfo.vue'
import AdminNavbar from '../../components/admin/AdminNavbar.vue'
import KeyboardMarkupBuilder from '../../components/admin/KeyboardMarkupBuilder.vue'
import useBotStore from '../../stores/useBotStore.js'
import { createMailing } from '../../services/api.js'

const botStore = useBotStore()

const text = ref('')
const isMarkdown = ref(false)
const isKeyboardMarkup = ref(false)

const buttons = ref([])

const isDisabled = computed(() => !text.value)

const cleanedButtons = computed(() => {
  return buttons
    .value
    .filter(({ text, url, isUrlValid }) => text && url && isUrlValid)
    .map(({ text, url }) => ({ text, url }))
})

const onStartMailing = async () => {
  await createMailing({
    botId: botStore.id,
    text: text.value,
    isMarkdown: isMarkdown.value,
    buttons: cleanedButtons.value,
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
