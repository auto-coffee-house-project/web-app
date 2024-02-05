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
        :disabled="isButtonDisabled"
      />
    </form>
  </BasicContainer>
</template>

<script setup>
import BasicContainer from '../layouts/BasicContainer.vue'
import AdminNavbar from '../components/admin/AdminNavbar.vue'
import InputSwitch from 'primevue/inputswitch'
import Button from 'primevue/button'
import Message from 'primevue/message'
import { inject, onMounted, ref } from 'vue'
import { useFetch } from '@vueuse/core'

const isMenuShown = ref(false)
const giftName = ref('')
const giftPhotoUrl = ref(null)
const eachNthCupFree = ref(0)

const botId = inject('botId')

const messages = ref([])

const isButtonDisabled = ref(false)

const url = `${import.meta.env.VITE_API_BASE_URL}/shops/groups/bots/${botId}/`

const loadShopGroup = () => {
  const { onFetchResponse, data } = useFetch(url).json()

  onFetchResponse(() => {
    isMenuShown.value = data.value.result.is_menu_shown
    giftName.value = data.value.result.gift_name
    giftPhotoUrl.value = data.value.result.gift_photo_url
    eachNthCupFree.value = data.value.result.each_nth_cup_free
  })
}

const onShopGroupUpdate = () => {
  const { onFetchResponse, data, isFetching } = useFetch(url).put({
    is_menu_shown: isMenuShown.value,
    gift_name: giftName.value,
    gift_photo_url: giftPhotoUrl.value,
    each_nth_cup_free: eachNthCupFree.value,
  }).json()

  isButtonDisabled.value = isFetching.value

  onFetchResponse(() => {
      messages.value = [ {
        id: Date.now(),
        content: 'Изменения сохранены',
        severity: 'success',
        life: 2000,
        sticky: false,
      } ]
      isMenuShown.value = data.value.result.is_menu_shown
      giftName.value = data.value.result.gift_name
      giftPhotoUrl.value = data.value.result.gift_photo_url
      eachNthCupFree.value = data.value.result.each_nth_cup_free
      isButtonDisabled.value = false
    },
  )
}

onMounted(loadShopGroup)

</script>
