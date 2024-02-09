<template>
  <h3 class="text-2xl font-semibold">Привет, {{ userFirstName }}!</h3>
  <p class="mt-2 my-4">{{ startText}}</p>
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