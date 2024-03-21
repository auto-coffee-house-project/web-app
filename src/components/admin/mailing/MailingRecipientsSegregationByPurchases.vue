<template>
  <Fieldset legend="Отправить только пользователям, которые">
    <div
      v-for="lastNDaysValue in lastNDaysOptions"
      :key="lastNDaysValue"
      class="flex items-center gap-x-2 my-2"
    >
      <RadioButton
        v-model="lastNDaysSelected"
        :value="lastNDaysValue"
        :input-id="`last-${lastNDaysValue}-days`"
      />
      <label :for="`last-${lastNDaysValue}-days`">За последние {{ lastNDaysValue }} дней</label>
    </div>
    <div class="flex flex-col my-2">
      <label
        class="font-semibold"
        for="purchases-for-last-n-days-count"
      >
        Совершили {{ purchasesForLastNDaysCount || 'N' }} покупок
      </label>
      <InputNumber
        v-model="purchasesForLastNDaysCount"
        input-id="purchases-for-last-n-days-count"
        :use-grouping="false"
        :min="0"
        :max="10000"
        :input-props="{ inputmode: 'numeric' }"
      />
    </div>
  </Fieldset>
</template>

<script setup>
import InputNumber from 'primevue/inputnumber'
import RadioButton from 'primevue/radiobutton'
import Fieldset from 'primevue/fieldset'
import { onUnmounted } from 'vue'

const lastNDaysOptions = [7, 30]

const lastNDaysSelected = defineModel('lastNDays')
const purchasesForLastNDaysCount = defineModel('purchasesForLastNDaysCount')

onUnmounted(() => {
  lastNDaysSelected.value = null
  purchasesForLastNDaysCount.value = null
})
</script>
