<template>
  <Fieldset legend="Отправить только тем, кто">
    <div class="flex flex-col my-2">
      <label
        for="segregation-by-purchases-dates-range"
        class="font-semibold"
      >
        В период
      </label>
      <Calendar
        v-model="datesRange"
        date-format="yy-mm-dd"
        selection-mode="range"
        input-id="segregation-by-purchases-dates-range"
        touchUI
        :disabled="isDisabled"
      />
    </div>

    <div class="flex flex-col my-2">
      <label
        class="font-semibold"
        for="segregation-by-purchases-count"
      >
        Совершили покупок
      </label>
      <InputNumber
        v-model="purchasesCount"
        input-id="segregation-by-purchases-count"
        :use-grouping="false"
        :min="0"
        :max="10000"
        :input-props="{ inputmode: 'numeric' }"
        :disabled="isDisabled"
      />
      <small>Даты покупок регистрируются по UTC времени</small>
    </div>
  </Fieldset>
</template>

<script setup>
import { onUnmounted } from 'vue'
import InputNumber from 'primevue/inputnumber'
import Fieldset from 'primevue/fieldset'
import Calendar from 'primevue/calendar'


defineProps({
  isDisabled: {
    type: Boolean,
    default: false,
  }
})

const datesRange = defineModel('datesRange')
const purchasesCount = defineModel('purchasesCount')

onUnmounted(() => {
  datesRange.value = null
  purchasesCount.value = null
})
</script>
