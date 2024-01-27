<template>
  <div class="flex h-full w-full">
    <div
      class="h-6 bg-white border-black border first:rounded-l-md last:rounded-r-md grow"
      :class="{'bg-sky-500': index <= currentValue}"
      v-for="index in maxValue"
    >
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
