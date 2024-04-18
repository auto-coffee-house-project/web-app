<template>
  <Fieldset legend="Отправить только тем, у кого дата рождения между">
    <Calendar
      v-model="datesRange"
      selection-mode="range"
      touchUI
      class="w-full"
      :disabled="isDisabled"
    />
  </Fieldset>
</template>

<script setup>
import Calendar from 'primevue/calendar'
import Fieldset from 'primevue/fieldset'
import { onUnmounted } from 'vue'

defineProps({
  isDisabled: {
    type: Boolean,
    default: false,
  }
})

const datesRange = defineModel('datesRange',)

onUnmounted(() => {
  datesRange.value = null
})
</script>
