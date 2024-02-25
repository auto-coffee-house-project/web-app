<template>
  <div class="flex h-full w-full">
    <div
      class="h-6 text-center border border-r-0 last:border border-gray-800  dark:border-white first:rounded-l-md last:rounded-r-md grow"
      :class="[index <= currentValue ? 'bg-emerald-400' : 'bg-gray-100']"
      v-for="index in maxValue"
    >
      <i v-if="index === maxValue" class="pi pi-gift dark:text-black"/>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  maxValue: number;
  currentValue: number;
}>()
</script>
