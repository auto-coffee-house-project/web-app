<template>
  <Toast class="w-80"/>
  <RouterView/>
  {{ userStore.id }}
  {{ botStore.id }}
</template>

<script setup>
import { inject, onMounted } from 'vue'
import { getColorScheme, getTelegramUser } from './services/telegram'
import { getBotId } from './services/queryParams'
import { useRouter } from 'vue-router'
import { RouterView } from 'vue-router'
import { usePrimeVue } from 'primevue/config'
import useUserStore from './stores/useUserStore.js'
import useBotStore from './stores/useBotStore.js'
import useShopGroupStore from './stores/useShopStore.js'
import Toast from 'primevue/toast'


const PrimeVue = usePrimeVue()
const router = useRouter()
const telegramUser = getTelegramUser()

const userStore = useUserStore()
const botStore = useBotStore()
const shopGroupStore = useShopGroupStore()

const botId = getBotId() || provide('botId') || 6887092432

inject('botId', botId)


const colorScheme = getColorScheme()

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
