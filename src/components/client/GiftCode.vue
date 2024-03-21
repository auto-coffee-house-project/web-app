<template>
  <Button
    v-if="!code"
    label="Получить подарок"
    icon="pi pi-gift"
    class="w-full my-4"
    :loading="isLoading"
    @click="onShownCode"
  />
  <div v-else>
    <p class="font-bold mt-4 mb-2 tg-text-primary">Скажите код: {{ code }}</p>
    <p>Код обновится через: {{ count }} сек.</p>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import { ref } from 'vue'
import { useIntervalFn, useCounter } from '@vueuse/core'
import { createGiftCode } from '../../services/api'
import useBotStore from '../../stores/useBotStore.js'
import useUserStore from '../../stores/useUserStore.js'

const botStore = useBotStore()
const userStore = useUserStore()

const isLoading = ref(false)
const code = ref()


const { count, dec, reset } = useCounter(60)

const onShownCode = async () => {
  await updateCode()
  resume()
}

const updateCode = async () => {
  try {
    const { data } = await createGiftCode({
      botId: botStore.id,
      clientUserId: userStore.id,
    })
    code.value = data.value.result.code
  } finally {
    isLoading.value = false
  }
}

const { resume, pause } = useIntervalFn(async () => {
  dec()
  if (count.value <= 0) {
    reset()
    await updateCode()
  }
}, 1000, { immediate: false })
</script>
