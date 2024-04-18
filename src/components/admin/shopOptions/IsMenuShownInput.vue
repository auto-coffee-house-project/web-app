<template>
  <div class="flex gap-x-2 items-center">
    <InputSwitch
      input-id="is-menu-shown"
      v-model="isMenuShown"
      :disabled="disabled"
    />
    <label for="is-menu-shown">Показывать каталог</label>
  </div>
</template>

<script setup>
import InputSwitch from 'primevue/inputswitch'

defineProps({
  disabled: {
    type: Boolean,
    default: false,
  }
})

const isMenuShown = defineModel({
  type: Boolean,
  required: true,
})
</script>
