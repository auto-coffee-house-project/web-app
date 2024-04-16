<template>
  <div ref="autoAnimated" class="my-2">
    <Button
      v-if="!isShown"
      label="Получить подарок"
      icon="pi pi-gift"
      rounded
      class="w-full my-4"
      @click="isShown = true"
    />
    <p v-else class="font-bold my-4 text-lg">Скажите код: {{ gift.code }}</p>
  </div>
</template>

<script setup>
import Button from 'primevue/button'
import useBotStore from '../../stores/useBotStore.js'
import { useAutoAnimate } from '@formkit/auto-animate/vue'
import { ref } from 'vue'

defineProps({
  gift: {
    type: Object,
    required: true,
  },
})

const isShown = ref(false)
const botStore = useBotStore()

const [autoAnimated] = useAutoAnimate({ duration: 150 })
</script>
