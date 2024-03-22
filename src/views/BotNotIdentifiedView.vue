<template>
  <BasicContainer>Не удалось загрузить информацию о боте</BasicContainer>
</template>

<script setup>
import { useWebApp, useWebAppPopup } from 'vue-tg'
import BasicContainer from '../layouts/BasicContainer.vue'

const { close } = useWebApp()
const { showAlert } = useWebAppPopup()

if (!!showAlert) {
  showAlert('Не удалось загрузить информацию о боте', close)
}
</script>
