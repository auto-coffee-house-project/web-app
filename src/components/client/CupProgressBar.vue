<template>
  <div class="flex h-full w-full">
    <div
      class="h-6 text-center border border-r-0 last:border first:rounded-l-md last:rounded-r-md grow"
      :class="[theme === 'dark' ? 'dark:bg-neutral-400 dark:border-neutral-600': 'bg-neutral-100 border-gray-800', index <= currentValue ? 'bg-emerald-400' : 'bg-gray-100']"
      v-for="index in maxValue"
    >
      <i v-if="index === maxValue" class="pi pi-gift" :class="{'text-black': theme === 'dark'}"/>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue'

defineProps({
  maxValue: {
    type: Number,
    required: true,
  },
  currentValue: {
    type: Number,
    required: true,
  },
})

const theme = inject('theme')
</script>
