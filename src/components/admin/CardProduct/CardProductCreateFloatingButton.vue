<template>
  <div class="fixed bottom-6 right-4">
    <RouterLink :to="{ name: 'admin-product-create' }">
      <Button rounded raised icon="pi pi-plus" size="large"/>
    </RouterLink>
  </div>
</template>

<script setup>
import Button from 'primevue/button'
import { RouterLink } from 'vue-router'
</script>
