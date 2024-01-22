<template>
  <p>Ваш код: {{ code }}</p>
  <p>Ваш QR код:</p>
  <VueQrcode :value="`https://t.me/${botUsername}?start=scan-${code}`" />
</template>

<script setup>
import VueQrcode from '@chenfengyuan/vue-qrcode';

const props = defineProps({
  code: {
    type: String,
  },
  botUsername: {
    type: String,
    required: true,
  }
})
</script>