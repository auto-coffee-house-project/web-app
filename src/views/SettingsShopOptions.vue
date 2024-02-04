<template>
  <AdminNavbar/>
  <BasicContainer>
    <form class="flex flex-col gap-y-6" @submit.prevent>
      <div class="flex gap-x-2 items-center">
        <InputSwitch input-id="is-menu-shown" v-model="isMenuShown"/>
        <label for="is-menu-shown">Показывать каталог</label>
      </div>
      <Button type="submit" label="Сохранить"/>
    </form>
  </BasicContainer>
</template>

<script setup>
import AdminNavbar from "../components/admin/AdminNavbar.vue";
import InputSwitch from 'primevue/inputswitch';
import Button from "primevue/button";
import { ref } from "vue";
import BasicContainer from "../layouts/BasicContainer.vue";

const isMenuShown = ref(false)
</script>
