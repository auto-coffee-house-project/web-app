<template>
  <Button
    class="w-full my-4"
    label="Получить код"
    v-if="!code"
    @click="onShownCode"
    :loading="isLoading"
  />
  <div v-else>
    <p class="font-bold mt-4 mb-2 tg-text-primary">Скажите код: {{ code }}</p>
    <p>Код обновится через: {{ count }} сек.</p>
  </div>
</template>

<script setup>
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'
import { useCounter, useIntervalFn } from '@vueuse/core'
import { ref } from 'vue'
import { createSaleCode } from '../../services/api'
import useUserStore from '../../stores/useUserStore.js'
import useBotStore from '../../stores/useBotStore.js'

const userStore = useUserStore()
const botStore = useBotStore()

const toast = useToast()

const isLoading = ref(false)
const code = ref()

const { count, dec, reset } = useCounter(30)


const onShownCode = async () => {
  await updateCode()
  resume()
}

const updateCode = async () => {
  isLoading.value = true
  try {
    const { data } = await createSaleCode({
      botId: botStore.id,
      clientUserId: userStore.id,
    })
    code.value = data.value.result.code
  } catch (error) {
    console.error(error)
    toast.add({ severity: 'error', summary: 'Ошибка', life: 2000, detail: 'Не удалось получить код' })
  } finally {
    isLoading.value = false
  }
}

const { pause, resume } = useIntervalFn(async () => {
  dec(1)
  if (count.value <= 0) {
    reset()
    await updateCode()
  }
}, 1000, { immediate: false })
</script>
