<template>
  <h3 class="text-2xl font-semibold tg-text-primary">Привет {{ userFirstName }}!</h3>
  <p class="mt-2 my-4 tg-text-primary">
    Мы с удовольствием угостим бесплатным кофе, приходи к нам почаще и копи свои бонусы,
    ведь каждая {{ eachNthCupFree + 1 }}-я кружка кофе в подарок!
  </p>
</template>

<script setup>
defineProps({
  eachNthCupFree: {
    type: Number,
    required: true,
  },
  userFirstName: {
    type: String,
    required: true,
  },
})
</script>