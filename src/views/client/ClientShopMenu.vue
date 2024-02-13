<template>
  <ClientNavbar/>
  menu
</template>

<script setup>
import ClientNavbar from '../../components/client/ClientNavbar.vue'
import { useTitle } from '@vueuse/core'

useTitle('Каталог | Coffeconnect')
</script>
