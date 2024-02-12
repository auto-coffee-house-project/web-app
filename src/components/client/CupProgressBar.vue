<template>
  <div class="flex h-full w-full">
    <div
      class="h-6 text-center border border-r-0 last:border border-gray-800 bg-gray-100 dark:border-white first:rounded-l-md last:rounded-r-md grow"
      :class="{'bg-emerald-500 dark:bg-emerald-400': index <= currentValue}"
      v-for="index in maxValue"
    >
      <i v-if="index === maxValue" class="pi pi-gift"/>
    </div>
  </div>
</template>

<script setup>
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
</script>
