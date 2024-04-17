<template>
  <div class="flex flex-col gap-y-2">
    <div class="flex justify-between gap-x-3">
      <p>Бесплатный напиток</p>
      <p class="font-semibold">
        {{ currentProgress }}/{{ eachNthSaleFree }}
      </p>
    </div>
    <ProgressBar
      :current-value="currentProgress"
      :max-value="eachNthSaleFree"
    />
  </div>
</template>
<script setup lang="ts">

defineProps<{
  currentProgress: number;
  eachNthSaleFree: number;
}>()
</script>