<template>
  <div
    class="h-6 text-center border border-r-0 last:border first:rounded-l-md last:rounded-r-md grow"
    :class="[theme === 'dark' ? 'border-white bg-neutral-500': 'border-gray-800', {'bg-emerald-400': index <= currentValue} ]"
  >
    <i v-if="index === maxValue" class="pi pi-gift" :class="{'text-white': theme === 'dark'}"/>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  index: number
  maxValue: number
  currentValue: number
  theme: string
}>()
</script>