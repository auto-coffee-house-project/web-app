<template>
  <div class="flex flex-col gap-y-2">
    <div class="flex justify-between gap-x-3">
      <p>Бесплатный напиток</p>
      <p class="font-semibold">
        {{ currentCupsCount }}/{{ eachNthCupFree }}
      </p>
    </div>
    <CupProgressBar
      :current-value="currentCupsCount"
      :max-value="eachNthCupFree"
    />
  </div>
</template>
<script setup>
import CupProgressBar from "./CupProgressBar.vue";

defineProps({
  currentCupsCount: {
    type: Number,
    required: true,
  },
  eachNthCupFree: {
    type: Number,
    required: true,
  },
})
</script>