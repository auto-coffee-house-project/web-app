<template>
  <FileUpload
    mode="advanced"
    accept="image/*"
    :show-upload-button="false"
    cancel-label="Отменить"
    choose-label="Выбрать"
    customUpload
    @select="onUpload"
    :disabled="isDisabled"
  />
</template>

<script setup>
import FileUpload from 'primevue/fileupload'
import { createSingleFileUploader } from '../../../services/fileUpload.js'
import { onUnmounted } from 'vue'

defineProps({
  isDisabled: {
    type: Boolean,
    default: false,
  }
})

const photo = defineModel('photo')

const onUpload = createSingleFileUploader(base64File => photo.value = base64File)

onUnmounted(() => {
  photo.value = null
})
</script>
