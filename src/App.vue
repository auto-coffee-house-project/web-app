<template>
  <RouterView/>
</template>

<script setup>
import { onMounted, provide } from 'vue'
import { getColorScheme, getTelegramUser } from './services/telegram'
import { getBotId } from './services/queryParams'
import { useRouter } from 'vue-router'
import { RouterView } from 'vue-router'
import { getUser } from './services/api.js'
import { usePrimeVue } from 'primevue/config'


const PrimeVue = usePrimeVue()
const router = useRouter()
const telegramUser = getTelegramUser()

const botId = getBotId() || 6828517506

provide('botId', botId)
provide('user', telegramUser)

const colorScheme = getColorScheme()

if (colorScheme === 'dark') {
  PrimeVue.changeTheme(
    'aura-light-green',
    'aura-dark-green',
    'primevue-theme',
    () => {},
  )
}

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
