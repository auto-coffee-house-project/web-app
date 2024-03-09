<template>
  <DataTable :value="clients" stripedRows :rows="50" :rowsPerPageOptions="[50, 100, 200]">
    <Column field="user.id" header="ID" :sortable="true"/>
    <Column field="user.first_name" header="Имя" :sortable="true">
      <template #body="{ data }">
        <RouterLink class="w-full block" :to="{ name: 'admin-client', params: { id: data.user.id } }">
          {{ data.user.first_name }}
        </RouterLink>
      </template>
    </Column>
    <Column field="total_purchases_count" header="Всего покупок" :sortable="true"/>
    <Column field="free_purchases_count" header="Получено бонусов" :sortable="true"/>
    <Column field="current_cups_count" header="Текущий прогресс" :sortable="true"/>
    <Column field="born_on" header="Дата рождения" :sortable="true">
      <template #body="{ data }">
        <i v-if="data.born_on === null" class="pi pi-minus"/>
        <span v-else>{{ data.born_on }}</span>
      </template>
    </Column>
    <Column field="has_gift" header="Подарок" :sortable="true">
      <template #body="{ data }">
        <i
          class="pi"
          :class="[data.has_gift ? 'pi-check-circle text-green-500' : 'pi-times-circle text-red-400' ]"
        />
      </template>
    </Column>
  </DataTable>
</template>

<script setup>
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'


defineProps({
  clients: {
    type: Array,
    required: true,
  },
})
</script>
