<template>
  <template v-if="code">
    <p>
      <strong>Скажите код: {{ code }}</strong>
    </p>
    <p>Ваш QR код:</p>
    <VueQrcode
      :value="qrCodeUrl"
    />
    <p>Код обновится через: {{ codeRefreshesInSeconds }} сек.</p>
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
  bot: {
    type: Object,
    required: true,
  },
  user: {
    type: Object,
    required: true,
  },
})

const code = ref()
const codeRefreshesInSeconds = ref(5)

const qrCodeUrl = computed(() => {
  return `https://t.me/${props.bot.username}?start=${props.code}`
})

const updateCode = async () => {
  const url = `${import.meta.env.VITE_API_BASE_URL}/shops/codes/`
  const {data} = await useFetch(url)
    .post({
      bot_id: props.bot.id,
      client_user_id: props.user.id,
    })
    .json()
  code.value = data.value?.result?.code
}

onMounted(updateCode)

useIntervalFn(async () => {
  codeRefreshesInSeconds.value -= 1
  if (codeRefreshesInSeconds.value <= 0) {
    await updateCode()
    codeRefreshesInSeconds.value = 5
  }
}, 1000)

</script>
