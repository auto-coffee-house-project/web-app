<template>
  <template v-if="code">
    <p class="font-bold mt-4 mb-2 tg-text-primary">Скажите код: {{ code }}</p>
    <p class="tg-hint">Код обновится через: {{ codeRefreshesInSeconds }} сек.</p>
  </template>
  <LoadingSpinner v-else/>
</template>

<script setup>
import { useIntervalFn } from '@vueuse/core'
import { onMounted, ref } from 'vue'
import LoadingSpinner from './LoadingSpinner.vue'
import { createCode } from '../../services/api.js'


const props = defineProps({
  botId: {
    type: Number,
    required: true,
  },
  userId: {
    type: Number,
    required: true,
  },
})

const code = ref()
const codeRefreshesInSeconds = ref(30)

const updateCode = async () => {
  const { data } = await createCode({ botId: props.botId, clientUserId: props.userId })
  code.value = data.value?.result?.code
}

onMounted(updateCode)

useIntervalFn(async () => {
  codeRefreshesInSeconds.value -= 1
  if (codeRefreshesInSeconds.value <= 0) {
    await updateCode()
    codeRefreshesInSeconds.value = 30
  }
}, 1000)

</script>
