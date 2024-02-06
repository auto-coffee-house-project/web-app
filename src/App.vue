<template>
  <router-view/>
</template>

<script setup>
import { provide } from 'vue'
import { getTelegramUser } from './services/telegram'
import { getBotId } from "./services/queryParams";
import { useRoute, useRouter } from "vue-router";

const isTelegramMode = import.meta.env.VITE_TELEGRAM_MODE === 'true'
let telegramUser
if (isTelegramMode) {
  telegramUser = getTelegramUser()
} else {
  telegramUser = {
    id: 6125802367,
    first_name: 'Hello',
  }
}

const botId = getBotId() || 6887092432

const userRole = 'client'

provide('botId', botId)
provide('user', telegramUser)

if (userRole === 'admin') {
  useRouter().push({name: 'gift'})
} else if (userRole === 'client') {
  useRouter().push({name: 'client-gift'})
}
</script>
