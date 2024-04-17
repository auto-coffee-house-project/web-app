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
  </div>
</template>

<script setup>
import InputNumber from 'primevue/inputnumber'
import { onUnmounted } from 'vue'

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

onUnmounted(() => {
  birthdayOfferAfterNthSale.value = null
})
</script>
