<template>
  <div class="flex gap-x-2 items-center">
    <Checkbox v-model="isChecked" :disabled="isDisabled" binary :input-id="inputId"/>
    <label :for="inputId">{{ label }}</label>
  </div>
</template>

<script setup>
import { v4 as uuidV4 } from 'uuid'
import Checkbox from 'primevue/checkbox'

defineProps({
  label: {
    type: String,
    required: true,
  },
  isDisabled: {
    type: Boolean,
    default: false
  }
})

const isChecked = defineModel()
const inputId = uuidV4()
</script>
