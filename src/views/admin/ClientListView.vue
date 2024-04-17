<template>
  <AdminNavbar/>
  <BasicContainer>
    <ClientsTable :clients="clients"/>
  </BasicContainer>
</template>

<script setup>
import { useClientListStore } from '../../stores'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import AdminNavbar from '../../components/admin/AdminNavbar.vue'
import BasicContainer from '../../layouts/BasicContainer.vue'
import ClientsTable from '../../components/admin/clients/ClientsTable.vue'

const clientListStore = useClientListStore()

const { clients } = storeToRefs(clientListStore)

onMounted(clientListStore.fetch)
</script>
