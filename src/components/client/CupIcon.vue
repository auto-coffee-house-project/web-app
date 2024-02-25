<template>
  <img
    class="w-16"
    :src="giftPhotoUrl"
    alt="external-coffee-usa-flatart-icons-lineal-color-flatarticons"
  />
</template>

<script setup>
const defaultPhotoUrl = 'https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/64/external-coffee-usa-flatart-icons-lineal-color-flatarticons.png'

defineProps({
  giftPhotoUrl: {
    type: String,
    default: defaultPhotoUrl,
  },
})
</script>
