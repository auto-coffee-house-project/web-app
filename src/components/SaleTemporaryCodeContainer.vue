<template>
  <SaleTemporaryCodeRenderer @update-code="updateCode" :bot-username="bot.username" :code="data?.result?.code" :code-refreshes-in-seconds="codeRefreshesInSeconds" />
</template>

<script setup>
import { useFetch, useIntervalFn } from '@vueuse/core';
import SaleTemporaryCodeRenderer from '../components/SaleTemporaryCodeRenderer.vue'
import { computed, inject, ref } from 'vue';

const userId = inject('userId')

const props = defineProps({
  bot: {
    type: Object,
    required: true,
  },
})

const codeRefreshesInSeconds = ref(30)
const time = ref(1)
const url = computed(() => `${import.meta.env.VITE_API_BASE_URL}/shops/codes/?t=${time.value}`)
const { isFetching, data } = useFetch(url, { refetch: true }).post({ bot_id: props.bot.id, client_user_id: userId }).json()

const updateCode = () => {
  time.value += 1
  codeRefreshesInSeconds.value = 30
}

useIntervalFn(() => {
  codeRefreshesInSeconds.value -= 1
  if (codeRefreshesInSeconds.value <= 0 ) {
    codeRefreshesInSeconds.value = 30
    time.value += 1
  }
}, 1000)

</script>