<template>
  <AdminNavbar/>
  <BasicContainer>
    <Message
      v-for="message in messages"
      :key="message.id"
      :severity="message.severity"
      :life="message.life"
      :sticky="message.sticky"
    >
      {{ message.content }}
    </Message>
    <form class="flex flex-col gap-y-6" @submit.prevent>
      <div class="flex gap-x-2 items-center">
        <InputSwitch input-id="is-menu-shown" v-model="isMenuShown"/>
        <label for="is-menu-shown">Показывать каталог</label>
      </div>
      <Button
        @click="onShopGroupUpdate"
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
import Message from 'primevue/message'
import { onMounted, ref } from 'vue'
import useShopGroupStore from '../../stores/useShopGroupStore.js'
import { storeToRefs } from 'pinia'

const shopGroupStore = useShopGroupStore()

const { giftName, giftPhotoUrl, eachNthCupFree, isMenuShown } = storeToRefs(shopGroupStore)

const messages = ref([])

const onShopGroupUpdate = async () => {
  await shopGroupStore.update({
    giftName: giftName.value,
    giftPhotoUrl: giftPhotoUrl.value,
    eachNthCupFree: eachNthCupFree.value,
    isMenuShown: isMenuShown.value,
  })

  messages.value = [
    {
      id: Date.now(),
      content: 'Изменения сохранены',
      severity: 'success',
      life: 2000,
      sticky: false,
    },
  ]
}
</script>
