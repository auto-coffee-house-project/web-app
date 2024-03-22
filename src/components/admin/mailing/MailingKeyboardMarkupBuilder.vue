<template>
  <Fieldset
    v-for="(button, index) in buttons"
    :legend="`Кнопка №${index + 1}`"
    :key="button.id"
  >

    <div class="flex flex-col mb-3">
      <label :for="`${button.id}-text`">Текст</label>
      <InputText :disabled="isDisabled" v-model="button.text" :id="`${button.id}-text`"/>
    </div>

    <div class="flex flex-col mb-3">
      <label :for="`${button.id}-url`">Ссылка</label>
      <InputText :disabled="isDisabled" :id="`${button.id}-url`" v-model="button.url" :invalid="!button.isUrlValid"/>
    </div>

    <Button
      @click="onRemove(button.id)"
      severity="danger"
      :label="`Удалить кнопку №${index + 1}`"
      icon="pi pi-trash"
      class="w-full mt-2"
      :disabled="isDisabled"
    />

  </Fieldset>

  <Button
    @click="onAddButton"
    icon="pi pi-plus"
    label="Добавить кнопку"
    :disabled="isDisabled"
  />
  <Divider/>
</template>

<script setup>
import { onUnmounted, watchEffect } from 'vue'
import Divider from 'primevue/divider'
import Fieldset from 'primevue/fieldset'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { v4 as uuid4 } from 'uuid'
import isUrl from 'is-url'

defineProps({
  isDisabled: {
    type: Boolean,
    default: false,
  }
})

const buttons = defineModel('buttons', { required: true })

const onRemove = buttonId => buttons.value = buttons.value.filter(button => button.id !== buttonId)

watchEffect(() => {
  buttons.value.forEach(button => {
    button.isUrlValid = isUrl(button.url)
  })
})

const onAddButton = () => {
  buttons.value.push({
    id: uuid4(),
    text: '',
    url: '',
    isUrlValid: false,
  })
}

onUnmounted(() => {
  buttons.value = []
})
</script>
