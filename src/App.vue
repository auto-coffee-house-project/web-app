<template>
  <Toast class="w-80"/>
  <RouterView/>
</template>

<script setup>
import { onMounted, provide } from 'vue'
import { getColorScheme, getTelegramUser } from './services/telegram'
import { getBotId } from './services/queryParams'
import { RouterView, useRouter } from 'vue-router'
import { usePrimeVue } from 'primevue/config'
import useUserStore from './stores/useUserStore.js'
import useBotStore from './stores/useBotStore.js'
import useShopGroupStore from './stores/useShopStore.js'
import Toast from 'primevue/toast'
import { useDebug } from './composables/index.js'


const PrimeVue = usePrimeVue()
const router = useRouter()

const { isDebug } = useDebug()

const telegramUser = getTelegramUser()

const userStore = useUserStore()
const botStore = useBotStore()
const shopGroupStore = useShopGroupStore()

const botId = isDebug ? 7107835010 : getBotId()

if (!botId) {
  router.push({ name: 'bot-not-identified' })
}

const colorScheme = getColorScheme()
provide('theme', colorScheme)

if (colorScheme === 'dark') {
  PrimeVue.changeTheme(
    'aura-light-green',
    'aura-dark-green',
    'primevue-theme',
    () => {
    },
  )
}

onMounted(async () => {
  botStore.setId(botId)
  userStore.setId(telegramUser.id)

  await userStore.fetch()
  await botStore.fetch()
  await shopGroupStore.fetch()

  const roleToViewName = {
    admin: 'gift',
    client: 'client-gift',
  }
  const viewName = roleToViewName[userStore.role] ?? 'unsupported'
  await router.push({ name: viewName })
})
</script>
