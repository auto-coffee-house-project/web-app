<template>
  <ClientNavbar/>
  <BasicContainer>
    <ClientProfileUpdateForm/>
  </BasicContainer>
</template>

<script setup>
import BasicContainer from '../../layouts/BasicContainer.vue'
import ClientNavbar from '../../components/client/ClientNavbar.vue'
import ClientProfileUpdateForm from '../../components/client/ClientProfileUpdateForm.vue'
</script>
