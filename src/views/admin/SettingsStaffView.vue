<template>
  <AdminNavbar/>
  <BasicContainer>
    <ShopDetail/>
    <CardSalesmanList/>
  </BasicContainer>
</template>

<script setup>
import AdminNavbar from '../../components/admin/AdminNavbar.vue'
import BasicContainer from '../../layouts/BasicContainer.vue'
import CardSalesmanList from '../../components/admin/CardSalesman/CardSalesmanList.vue'
import ShopDetail from '../../components/admin/ShopDetail.vue'
import { onMounted } from 'vue'
import useSalesmansStore from '../../stores/useSalesmansStore.js'

const salesmansStore = useSalesmansStore()

onMounted(salesmansStore.fetch)
</script>
