<template>
  <label class="font-bold">Загрузка фото</label>
  <FileUpload
    name="photo"
    :url="photoUploadUrl"
    accept="image/*"
    mode="advanced"
    :maxFileSize="5000000"
    choose-label="Выбрать"
    upload-label="Загрузить"
    cancel-label="Отменить"
    @before-send="onBeforeSend"
  >
    <template #empty>
      <p>Выберите файл</p>
    </template>
  </FileUpload>
</template>

<script setup>
import FileUpload from 'primevue/fileupload'

const props = defineProps({
  productId: {
    type: Number,
    required: true,
  },
  botId: {
    type: Number,
    required: true,
  },
})

const photoUploadUrl = `${import.meta.env.VITE_API_BASE_URL}/shops/products/${props.productId}/photos/`

const onBeforeSend = event => event.xhr.setRequestHeader('bot-id', String(props.botId))
</script>
