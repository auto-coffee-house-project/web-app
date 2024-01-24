<template>
  <p><strong>Скажите код: {{ code }}</strong></p>
  <p>Ваш QR код:</p>
  <VueQrcode @click="emit('updateCode')" :value="`https://t.me/${botUsername}?start=scan-${code}`" />
  <p>Код обновится через: {{ codeRefreshesInSeconds }} сек.</p>
</template>

<script setup>
import VueQrcode from '@chenfengyuan/vue-qrcode';

const emit = defineEmits(['updateCode'])

const props = defineProps({
  code: {
    type: String,
  },
  botUsername: {
    type: String,
    required: true,
  },
  codeRefreshesInSeconds: {
    type: Number,
    required: true,
  }
})
</script>