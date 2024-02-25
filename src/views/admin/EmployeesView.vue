<template>
  <AdminNavbar/>
  <BasicContainer>
    <ShopDetail/>
    <CardEmployeesList/>
  </BasicContainer>
</template>

<script setup>
import AdminNavbar from '../../components/admin/AdminNavbar.vue'
import BasicContainer from '../../layouts/BasicContainer.vue'
import CardEmployeesList from '../../components/admin/CardSalesman/CardEmployeesList.vue'
import ShopDetail from '../../components/admin/ShopDetail.vue'
import { onMounted } from 'vue'
import useSalesmansStore from '../../stores/useEmployeeStore.js'

const salesmansStore = useSalesmansStore()

onMounted(salesmansStore.fetch)
</script>
