<template>
  <Panel :header="`Истекает: ${expiresAt}`" class="mb-4 rounded-2xl">
    <div ref="parent">
      <Button
        size="small"
        label="Показать код"
        icon="pi pi-gift"
        rounded
        v-if="!isShown"
        @click="isShown = true"
        outlined
      />
      <p v-else class="font-bold">Скажите код: {{ gift.code }}</p>
    </div>
  </Panel>
</template>

<script setup lang="ts">
import Panel from 'primevue/panel'
import Button from 'primevue/button'
import { ref } from 'vue'
import { useDateFormat } from '@vueuse/core'
import { useAutoAnimate } from '@formkit/auto-animate/vue'


const [parent] = useAutoAnimate({ duration: 150 })

const props = defineProps<{
  gift: {
    code: string,
    expires_at: string,
  }
}>()

const expiresAt = useDateFormat(props.gift.expires_at, 'D MMMM', { locales: 'ru-RU' })
const isShown = ref(false)
</script>
