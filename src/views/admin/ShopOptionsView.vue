<template>
  <AdminNavbar/>
  <BasicContainer>
    <form class="flex flex-col gap-y-6" @submit.prevent>
      <div class="flex gap-x-2 items-center">
        <InputSwitch input-id="is-menu-shown" v-model="isMenuShown"/>
        <label for="is-menu-shown">Показывать каталог</label>
      </div>
      <div class="flex flex-col gap-y-2">
        <div class="flex gap-x-2 items-center">
          <InputSwitch input-id="is-birthdays-collecting" disabled/>
          <label for="is-birthdays-collecting">Система дней рождений</label>
        </div>
        <small class="font-semibold">В разработке</small>
      </div>
      <Button
        @click="onUpdate"
        type="submit"
        label="Сохранить"
      />
    </form>
  </BasicContainer>
</template>

<script setup>
import BasicContainer from '../../layouts/BasicContainer.vue'
import AdminNavbar from '../../components/admin/AdminNavbar.vue'
import InputSwitch from 'primevue/inputswitch'
import Button from 'primevue/button'
import useShopStore from '../../stores/useShopStore.js'
import { storeToRefs } from 'pinia'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
const shopStore = useShopStore()

const { isMenuShown } = storeToRefs(shopStore)

const onUpdate = async () => {
  await shopStore.update({ isMenuShown: isMenuShown.value })
  toast.add({
    severity: 'success',
    summary: 'Обновлено',
    detail: 'Настройки обновлены',
    life: 2000,
  })
}
</script>
