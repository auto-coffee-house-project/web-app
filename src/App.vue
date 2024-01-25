<template>
  <ClientView v-if="userType === 'client'"/>
  <p v-else>Undefined user type</p>
</template>

<script setup>
import { provide, ref } from 'vue'
import ClientView from './views/ClientView.vue'
import { getTelegramUser } from './services/telegram'
import { getBotData } from "./services/queryParams.js";

const isTelegramMode = import.meta.env.VITE_TELEGRAM_MODE === 'true'
let telegramUser
if (isTelegramMode) {
  telegramUser = getTelegramUser()
} else {
  telegramUser = {
    id: 6314531184,
    first_name: 'Hello',
  }
}

let bot = getBotData()

if (bot === null) {
  bot = {
    id: 6887092432,
    username: 'gfdhgdhdfgbot',
  }
}

provide('bot', bot)
provide('user', telegramUser)
provide('shop', {
  each_nth_cup: 6,
  nth_cup_progress_current: 1,
})
const userType = ref('client')

console.log(telegramUser, bot)
</script>
