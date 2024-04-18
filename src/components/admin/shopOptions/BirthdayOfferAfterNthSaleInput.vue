<template>
  <div class="flex flex-col gap-y-2">
    <label
      class="font-semibold"
      for="birthday-offer-after-nth-sale">
      После какой покупки предложить заполнить дату рождения
    </label>
    <InputNumber
      v-model="birthdayOfferAfterNthSale"
      :min="0"
      :max="100"
      input-id="birthday-offer-after-nth-sale"
      :disabled="disabled"
    />
    <small>Оставьте пустым если хотите отключить сбор дней рождений</small>
  </div>
</template>

<script setup>
import InputNumber from 'primevue/inputnumber'

defineProps({
  disabled: {
    type: Boolean,
    default: false,
  }
})

const birthdayOfferAfterNthSale = defineModel({
  type: [Number, null],
  required: true,
})
</script>
