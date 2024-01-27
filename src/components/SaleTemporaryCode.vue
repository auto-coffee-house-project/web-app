<template>
  <template v-if="code">
    <p class="font-bold mt-4 mb-2 tg-text-primary">Скажите код: {{ code }}</p>
    <p class="tg-text-primary">Ваш QR код:</p>
    <VueQrcode
      :value="qrCodeUrl"
    />
    <p class="tg-text-primary">Код обновится через: {{ codeRefreshesInSeconds }} сек.</p>
  </template>
  <template v-else>
    <p>Загрузка...</p>
  </template>
</template>

<script setup>
import { useFetch, useIntervalFn } from "@vueuse/core";
import VueQrcode from "@chenfengyuan/vue-qrcode";
import { computed, onMounted, ref } from "vue";


const props = defineProps({
  botId: {
    type: Number,
    required: true,
  },
  botUsername: {
    type: String,
    required: true,
  },
  userId: {
    type: Number,
    required: true,
  },
})

const code = ref()
const codeRefreshesInSeconds = ref(30)

const qrCodeUrl = computed(() => {
  return `https://t.me/${props.botUsername}?start=scan-${code.value}`
})

const updateCode = async () => {
  const url = `${import.meta.env.VITE_API_BASE_URL}/shops/codes/`
  const {data} = await useFetch(url)
    .post({
      bot_id: props.botId,
      client_user_id: props.userId,
    })
    .json()
  code.value = data.value?.result?.code
}

onMounted(updateCode)

useIntervalFn(async () => {
  codeRefreshesInSeconds.value -= 1
  if (codeRefreshesInSeconds.value <= 0) {
    await updateCode()
    codeRefreshesInSeconds.value = 30
  }
}, 1000)

</script>
