<template>
  <Fieldset legend="Отправить только тем, у кого дата рождения между">
    <Calendar class="w-full" v-model="datesRange" selection-mode="range" touchUI/>
  </Fieldset>
</template>

<script setup>
import Calendar from 'primevue/calendar'
import Fieldset from 'primevue/fieldset'
import { onUnmounted } from 'vue'

const datesRange = defineModel('datesRange',)

onUnmounted(() => {
  datesRange.value = null
})
</script>
