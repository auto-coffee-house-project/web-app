<template>
  <RouterView/>
</template>

<script setup>
import { onMounted, provide } from 'vue'
import { getTelegramUser } from './services/telegram'
import { getBotId } from './services/queryParams'
import { useRouter } from 'vue-router'
import { RouterView } from 'vue-router'
import { getUser } from './services/api.js'


const router = useRouter()
const telegramUser = getTelegramUser()

const botId = getBotId() || 6828517506

provide('botId', botId)
provide('user', telegramUser)

onMounted(async () => {
  const { data } = await getUser({
    botId: botId,
    userId: telegramUser.id,
  })
  const role = data.value?.result?.role
  const roleToViewName = {
    admin: 'gift',
    client: 'client-gift',
  }
  const viewName = roleToViewName[role] ?? 'unsupported'
  await router.push({ name: viewName })
})
</script>
