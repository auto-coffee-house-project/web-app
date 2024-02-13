<template>
  <ClientNavbar/>
  <BasicContainer>
    <ShopMenuList/>
  </BasicContainer>
</template>

<script setup>
import ClientNavbar from '../../components/client/ClientNavbar.vue'
import { useTitle } from '@vueuse/core'
import BasicContainer from '../../layouts/BasicContainer.vue'
import ShopMenuList from '../../components/client/ShopMenu/ShopMenuList.vue'

useTitle('Каталог | Coffeconnect')
</script>
