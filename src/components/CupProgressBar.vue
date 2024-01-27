<template>
  <div class="flex h-full w-full">
    <div
      class="h-6 tg-bg-primary tg-border border first:rounded-l-md last:rounded-r-md grow"
      :class="{'tg-btn': index <= currentValue}"
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
