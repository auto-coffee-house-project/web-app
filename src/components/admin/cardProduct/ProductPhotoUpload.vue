<template>
  <FileUpload
    mode="advanced"
    accept="image/*"
    :show-upload-button="false"
    cancel-label="Отменить"
    choose-label="Выбрать"
    customUpload
    @select="onUpload"
  />
</template>

<script setup>
import FileUpload from 'primevue/fileupload'
import { onUnmounted } from 'vue'
import { createSingleFileUploader } from '../../../services/fileUpload.js'

const photo = defineModel()

const onUpload = createSingleFileUploader(base64File => photo.value = base64File)

onUnmounted(() => {
  photo.value = null
})
</script>
