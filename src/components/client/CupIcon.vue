<template>
  <img
    width="64"
    height="64"
    :src="giftPhotoUrl || defaultPhotoUrl"
    alt="external-coffee-usa-flatart-icons-lineal-color-flatarticons"
  />

</template>

<script setup>
defineProps({
  giftPhotoUrl: {
    type: String,
  },
})

const defaultPhotoUrl = 'https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/64/external-coffee-usa-flatart-icons-lineal-color-flatarticons.png'
</script>
