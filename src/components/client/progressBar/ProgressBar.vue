<template>
  <div class="flex h-full w-full">
    <ProgressBarDivision
      v-for="index in maxValue"
      :key="index"
      :current-value="currentValue"
      :max-value="maxValue"
      :index="index"
      :theme="theme"
    />
  </div>
</template>

<script setup>
import { inject } from 'vue'
import ProgressBarDivision from './ProgressBarDivision.vue'

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
