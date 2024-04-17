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
import CardEmployeesList from '../../components/admin/cardSalesman/CardEmployeesList.vue'
import ShopDetail from '../../components/admin/ShopDetail.vue'
import { onMounted } from 'vue'
import { useEmployeeStore } from '../../stores/employee.js'

const employeeStore = useEmployeeStore()

onMounted(employeeStore.fetch)
</script>
