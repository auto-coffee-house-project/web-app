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
    <form @submit.prevent class="flex flex-col gap-y-4">
      <div class="flex flex-col">
        <label for="gift-name">Название</label>
        <InputText id="gift-name" v-model="giftName"/>
      </div>
      <!--    <div class="flex flex-col">-->
      <!--      <img v-if="photoUrl" width="128rem" :src="photoUrl" alt="logo photo"/>-->
      <!--      <label for="gift-photo">Фото</label>-->
      <!--      <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" customUpload @uploader="customBase64Uploader" />-->
      <!--    </div>-->
      <div class="flex flex-col">
        <label for="each-nth-cup-free">Необходимо чашек</label>
        <InputNumber id="each-nth-cup-free" :min="2" :max="100" v-model="eachNthCupFree" :use-grouping="false"/>
      </div>
      <Button type="submit" @click="onSubmit" :disabled="isButtonDisabled" label="Сохранить" class="w-full"/>
    </form>
  </BasicContainer>

</template>

<script setup>
import AdminNavbar from "../components/admin/AdminNavbar.vue";
import { useFetch } from "@vueuse/core";
import { inject, ref } from "vue";
import BasicContainer from "../layouts/BasicContainer.vue";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Button from "primevue/button";
import Message from "primevue/message";

const botId = inject('botId')

const giftName = ref('')
const eachNthCupFree = ref(0)

const isButtonDisabled = ref(false)

const messages = ref([])

// const customBase64Uploader = async (event) => {
//   const file = event.files[0];
//   const reader = new FileReader();
//   let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url
//
//   reader.readAsDataURL(blob);
//
//   reader.onloadend = function () {
//     const {onFetchResponse, data} = useFetch(
//       'http://localhost:8000'
//     ).post({data: reader.result}).json()
//     onFetchResponse(() => {
//       photoUrl.value = data.value.url
//     })
//   };
// };
const url = `${import.meta.env.VITE_API_BASE_URL}/shops/groups/bots/${botId}/`
const { onFetchResponse, data } = useFetch(url).json()

onFetchResponse(() => {
  giftName.value = data.value.result.gift_name
  eachNthCupFree.value = data.value.result.each_nth_cup_free
})

const onSubmit = () => {
  const { isFetching, onFetchResponse, data } = useFetch(url).put({
    gift_name: giftName.value,
    gift_photo_url: null,
    each_nth_cup_free: eachNthCupFree.value
  })
  isButtonDisabled.value = isFetching.value
  onFetchResponse(() => {
    messages.value.push({
      id: Date.now(),
      content: 'Изменения сохранены',
      severity: 'success',
      life: 2000,
      sticky: false
    })
    giftName.value = data.value.result.gift_name
    eachNthCupFree.value = data.value.result.each_nth_cup_free

  })
}
</script>
