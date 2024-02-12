<template>
  <RouterView/>
</template>

<script setup>
import { onMounted } from 'vue'
import { getColorScheme, getTelegramUser } from './services/telegram'
import { getBotId } from './services/queryParams'
import { useRouter } from 'vue-router'
import { RouterView } from 'vue-router'
import { usePrimeVue } from 'primevue/config'
import useUserStore from './stores/useUserStore.js'
import useBotStore from './stores/useBotStore.js'
import useShopGroupStore from './stores/useShopGroupStore.js'


const PrimeVue = usePrimeVue()
const router = useRouter()
const telegramUser = getTelegramUser()

const userStore = useUserStore()
const botStore = useBotStore()
const shopGroupStore = useShopGroupStore()

const botId = getBotId() || 6887092432

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
