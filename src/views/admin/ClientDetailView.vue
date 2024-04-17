<template>
  <AdminNavbar/>
  <BasicContainer>
    <ClientUpdateForm/>
    <RouterLink :to="{ name: 'admin-clients' }">
      <Button
        class="w-full my-4"
        outlined
        icon="pi pi-arrow-left"
        label="Назад"
        type="button"
        severity="secondary"
      />
    </RouterLink>
  </BasicContainer>
</template>

<script setup>
import BasicContainer from '../../layouts/BasicContainer.vue'
import AdminNavbar from '../../components/admin/AdminNavbar.vue'
import { useClientStore } from '../../stores'
import { onMounted } from 'vue'
import ClientUpdateForm from '../../components/admin/clients/ClientUpdateForm.vue'
import { RouterLink, useRoute } from 'vue-router'
import Button from 'primevue/button'

const clientStore = useClientStore()

const route = useRoute()

const userId = Number.parseInt(route.params.id)

onMounted(async () => {
  await clientStore.fetch({ userId })
})
</script>
