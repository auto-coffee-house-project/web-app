<template>
  <ClientView/>
</template>

<script setup>
import ClientView from './views/ClientView.vue'
import { provide } from 'vue'
import { getTelegramUser } from './services/telegram'
import { getBotData } from "./services/queryParams";

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
</script>
