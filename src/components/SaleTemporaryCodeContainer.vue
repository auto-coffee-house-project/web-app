<template>
  <p v-if="isFetching">Загрузка QR кода</p>
  <SaleTemporaryCodeRenderer v-else :bot-username="bot.username" :code="code?.code" />
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

const time = ref(1)
const url = computed(() => `${import.meta.env.VITE_API_BASE_URL}/shops/codes/?t=${time.value}`)
const { isFetching, data: code } = useFetch(url, { refetch: true }).post({ bot_id: props.bot.id, client_user_id: userId }).json()

useIntervalFn(() => {
  time.value += 1
}, 30000)

</script>