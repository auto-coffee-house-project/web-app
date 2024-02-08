<template>
  <h3 class="text-2xl font-semibold tg-text-primary">Привет, {{ userFirstName }}!</h3>
  <p class="mt-2 my-4 tg-text-primary">{{ startText}}</p>
</template>

<script setup>
defineProps({
  startText: {
    type: String,
    required: true,
  },
  userFirstName: {
    type: String,
    required: true,
  },
})
</script>