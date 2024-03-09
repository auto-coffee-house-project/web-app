<template>
  <form @submit.prevent>

    <div class="flex flex-col gap-2">
      <label for="bot-start-text">Стартовое сообщение в Telegram</label>
      <Textarea id="bot-start-text" v-model="startTextBot" auto-resize class="w-full"/>
      <small>Оно будет показываться каждый раз при запуске бота в Telegram</small>
    </div>

    <Divider class="my-5"/>

    <div class="flex flex-col gap-2">
      <label for="bot-start-text-client-web-app">Стартовое сообщение в меню подарка</label>
      <Textarea id="bot-start-text-client-web-app" v-model="startTextClientWebApp" auto-resize class="w-full"/>
      <small>Оно будет показываться каждый раз при нажатии на кнопку "Get coffee"</small>
    </div>

    <Divider class="my-5"/>

    <div class="flex flex-col gap-2">
      <InlineMessage v-if="!isSaleCreatedTextValid" severity="error">
        Текст должен содержать строку {count} куда будет подставляться число оставшихся покупок до получения подарка
      </InlineMessage>
      <label for="bot-start-text-client-web-app">Сканирование кода</label>
      <Textarea :invalid="!isSaleCreatedTextValid" id="bot-start-text-client-web-app" v-model="saleCreatedText"
                auto-resize class="w-full"/>
      <small>Оно будет отправляться клиенту каждый раз, когда продавец будет сканировать его код</small>
    </div>

    <Divider class="my-5"/>

    <div class="flex flex-col gap-2">
      <label for="bot-start-text-client-web-app">Уведомление о подарке</label>
      <Textarea id="bot-start-text-client-web-app" v-model="giftGivenText" auto-resize class="w-full"/>
      <small>
        Оно будет отправляться клиенту, когда он накопит достаточное количество покупок для получения подарка
      </small>
    </div>

    <Button @click="onSubmit" type="submit" label="Сохранить" class="mt-4 w-full"/>
  </form>
</template>

<script setup>
import Textarea from 'primevue/textarea'
import Divider from 'primevue/divider'
import Button from 'primevue/button'
import InlineMessage from 'primevue/inlinemessage'
import { useToast } from 'primevue/usetoast'
import useBotStore from '../../stores/useBotStore.js'
import useShopStore from '../../stores/useShopStore.js'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const toast = useToast()

const botStore = useBotStore()
const shopStore = useShopStore()

const {
  startText: startTextBot,
  saleCreatedText,
  giftGivenText,
} = storeToRefs(botStore)
const {
  giftName,
  eachNthSaleFree,
  startText: startTextClientWebApp,
  isMenuShown,
} = storeToRefs(shopStore)


const isSaleCreatedTextValid = computed(() => {
  return saleCreatedText.value.includes('{count}')
})

const onSubmit = async () => {
  await botStore.update({
    startText: startTextBot.value,
    saleCreatedText: saleCreatedText.value,
    giftGivenText: giftGivenText.value,
  })
  await shopStore.update({
    startText: startTextClientWebApp.value,
  })
  toast.add({
    severity: 'success',
    summary: 'Изменения сохранены',
    life: 2000,
  })
}
</script>
